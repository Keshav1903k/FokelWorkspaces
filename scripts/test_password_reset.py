import urllib.request
import urllib.error
import json
import os
import sys

BASE_URL = "http://localhost:3000"

def post(endpoint, data):
    url = f"{BASE_URL}{endpoint}"
    req = urllib.request.Request(
        url,
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            body = resp.read().decode("utf-8")
            return resp.status, json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            parsed = json.loads(body)
        except Exception:
            parsed = {"raw": body}
        return e.code, parsed

def run_tests():
    print("--- 1. Testing Forgot Password with Unknown User ---")
    status, res = post("/api/auth/forgot-password", {"email": "nonexistent_officera_user_999@gmail.com"})
    print(f"Status: {status}, Response: {res}")
    assert status == 404, f"Expected 404, got {status}"
    assert "No account found" in res.get("error", ""), f"Unexpected error message: {res}"
    print("PASS: Non-existent user correctly rejected.\n")

    print("--- 2. Registering Test User ---")
    test_email = "autotest_user@officera.in"
    test_old_pass = "OldPassword123!"
    test_new_pass = "NewPassword456!"

    status, res = post("/api/auth/register", {
        "name": "Auto Test User",
        "email": test_email,
        "password": test_old_pass,
        "confirmPassword": test_old_pass,
        "role": "USER"
    })
    print(f"Register Status: {status}, Response: {res}")
    assert status in (200, 201) or (status in (400, 409) and "already exists" in res.get("error", "")), f"Register failed: {res}"
    print("PASS: User exists / registered.\n")

    print("--- 3. Testing Forgot Password Request for Registered User ---")
    status, res = post("/api/auth/forgot-password", {"email": test_email})
    print(f"Forgot PW Status: {status}, Response: {res}")
    assert status == 200, f"Expected 200, got {status}"
    print("PASS: OTP successfully requested.\n")

    # Read OTP from data/password_otps.json
    otp_file = os.path.join(os.path.dirname(__file__), "..", "data", "password_otps.json")
    assert os.path.exists(otp_file), f"OTP file not found at {otp_file}"
    with open(otp_file, "r", encoding="utf-8") as f:
        otps = json.load(f)
    user_otp_entry = otps.get(test_email)
    assert user_otp_entry, f"No OTP entry found for {test_email}"
    otp_code = user_otp_entry.get("otp")
    print(f"Retrieved generated OTP: {otp_code} (Expires: {user_otp_entry.get('expiresAt')})\n")

    print("--- 4. Testing Reset Password with Wrong OTP ---")
    status, res = post("/api/auth/reset-password", {
        "email": test_email,
        "otp": "000000",
        "newPassword": test_new_pass,
        "confirmPassword": test_new_pass
    })
    print(f"Wrong OTP Status: {status}, Response: {res}")
    assert status == 400, f"Expected 400 for wrong OTP, got {status}"
    assert "Invalid" in res.get("error", ""), f"Expected invalid OTP error: {res}"
    print("PASS: Wrong OTP correctly rejected.\n")

    print("--- 5. Testing Reset Password with Mismatched Passwords ---")
    status, res = post("/api/auth/reset-password", {
        "email": test_email,
        "otp": otp_code,
        "newPassword": test_new_pass,
        "confirmPassword": "DifferentPassword789!"
    })
    print(f"Mismatched Passwords Status: {status}, Response: {res}")
    assert status == 400, f"Expected 400, got {status}"
    assert "do not match" in res.get("error", ""), f"Expected mismatch error: {res}"
    print("PASS: Password mismatch correctly rejected.\n")

    print("--- 6. Testing Successful Password Reset ---")
    status, res = post("/api/auth/reset-password", {
        "email": test_email,
        "otp": otp_code,
        "newPassword": test_new_pass,
        "confirmPassword": test_new_pass
    })
    print(f"Success Status: {status}, Response: {res}")
    assert status == 200, f"Expected 200, got {status}"
    assert "Password updated successfully" in res.get("message", ""), f"Expected success message, got {res}"
    print("PASS: Password successfully reset.\n")

    print("--- 7. Testing OTP Cannot Be Reused ---")
    status, res = post("/api/auth/reset-password", {
        "email": test_email,
        "otp": otp_code,
        "newPassword": "AnotherPassword999!",
        "confirmPassword": "AnotherPassword999!"
    })
    print(f"Re-use OTP Status: {status}, Response: {res}")
    assert status == 400, f"Expected 400 for reused OTP, got {status}"
    print("PASS: Replay attack prevented (OTP single-use).\n")

    print("========================================")
    print("ALL FORGOT/RESET PASSWORD TESTS PASSED!")
    print("========================================")

if __name__ == "__main__":
    run_tests()
