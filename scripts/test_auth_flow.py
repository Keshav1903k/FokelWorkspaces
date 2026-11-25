import requests
import sys
import time

BASE_URL = "http://localhost:3000"

def test_auth():
    print("========================================")
    print("STARTING AUTH & LOGIN VERIFICATION SUITE")
    print("========================================")
    session = requests.Session()

    # 1. Check /login page
    res = session.get(f"{BASE_URL}/login")
    assert res.status_code == 200, f"/login status {res.status_code}"
    text = res.text
    assert "Sign In" in text, "Sign In not in /login"
    assert "Create an Account" in text or "Create Account" in text, "Create Account not in /login"
    assert "Quick Fill Credentials" not in text, "LEAK: Quick Fill Credentials found in /login!"
    assert "administrative operations" not in text, "LEAK: administrative operations found in /login!"
    print("[PASS] /login is a clean user portal without admin leak")

    # 2. Check /admin/login page
    res_admin_login = session.get(f"{BASE_URL}/admin/login")
    assert res_admin_login.status_code == 200, f"/admin/login status {res_admin_login.status_code}"
    print("[PASS] /admin/login is available for administrators")

    # 3. Check /admin protection (unauthenticated must redirect to /admin/login)
    res_admin = session.get(f"{BASE_URL}/admin", allow_redirects=False)
    assert res_admin.status_code in [302, 307], f"/admin did not redirect: {res_admin.status_code}"
    redirect_loc = res_admin.headers.get("Location", "")
    assert "/admin/login" in redirect_loc or "login" in redirect_loc, f"Unexpected redirect: {redirect_loc}"
    print(f"[PASS] /admin correctly redirects unauthenticated visitors to {redirect_loc}")

    # 4. Test User Registration Password Mismatch
    mismatch_payload = {
        "name": "Test User",
        "email": f"mismatch_{int(time.time())}@officera.in",
        "password": "Password123!",
        "confirmPassword": "DifferentPassword123!",
        "role": "USER"
    }
    res_mismatch = session.post(f"{BASE_URL}/api/auth/register", json=mismatch_payload)
    assert res_mismatch.status_code == 400, f"Expected 400, got {res_mismatch.status_code}"
    print("[PASS] Registration rejects mismatched passwords (HTTP 400)")

    # 5. Test Successful User Registration
    test_email = f"verifieduser_{int(time.time())}@officera.in"
    test_pass = "SecurePass123!"
    success_payload = {
        "name": "Verified User",
        "email": test_email,
        "password": test_pass,
        "confirmPassword": test_pass,
        "role": "USER"
    }
    res_reg = session.post(f"{BASE_URL}/api/auth/register", json=success_payload)
    assert res_reg.status_code == 201, f"Expected 201, got {res_reg.status_code}: {res_reg.text}"
    reg_data = res_reg.json()
    assert reg_data.get("user", {}).get("email") == test_email.lower()
    print(f"[PASS] User registration succeeded for {test_email} (HTTP 201)")

    # 6. Test Duplicate Email Rejection
    res_dup = session.post(f"{BASE_URL}/api/auth/register", json=success_payload)
    assert res_dup.status_code == 409, f"Expected 409 for duplicate, got {res_dup.status_code}"
    print("[PASS] Duplicate registration rejected (HTTP 409)")

    # 7. Test User Sign-in via NextAuth Credentials Callback
    # First get CSRF token
    csrf_res = session.get(f"{BASE_URL}/api/auth/csrf")
    csrf_token = csrf_res.json().get("csrfToken")

    signin_data = {
        "email": test_email,
        "password": test_pass,
        "csrfToken": csrf_token,
        "redirect": "false",
        "json": "true"
    }
    signin_res = session.post(f"{BASE_URL}/api/auth/callback/credentials", data=signin_data)
    print(f"SignIn response: {signin_res.status_code}")
    assert signin_res.status_code in [200, 302], f"Sign-in failed with {signin_res.status_code}: {signin_res.text}"
    print(f"[PASS] User sign-in succeeded for registered user")

    # 8. Check authenticated session
    session_res = session.get(f"{BASE_URL}/api/auth/session")
    session_data = session_res.json()
    print(f"Session data: {session_data}")
    assert session_data.get("user", {}).get("email") == test_email.lower(), "Session user email mismatch"
    assert session_data.get("user", {}).get("role") == "USER", "User role should be USER"
    print(f"[PASS] NextAuth session verified: role=USER")

    # 9. Verify regular user accessing /admin is denied
    admin_access_res = session.get(f"{BASE_URL}/admin", allow_redirects=False)
    assert admin_access_res.status_code in [302, 307], f"Expected redirect, got {admin_access_res.status_code}"
    admin_loc = admin_access_res.headers.get("Location", "")
    assert "/profile" in admin_loc or "/" in admin_loc, f"Non-admin should redirect to /profile, got: {admin_loc}"
    print(f"[PASS] Non-admin user denied access to /admin and redirected to {admin_loc}")

    print("========================================")
    print("ALL AUTH & LOGIN TESTS PASSED 100%!")
    print("========================================")

if __name__ == "__main__":
    test_auth()
