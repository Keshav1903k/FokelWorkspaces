import requests
import json
import uuid

BASE_URL = "http://localhost:3000"

def test_suite():
    results = []
    print("=" * 60)
    print("STARTING COMPREHENSIVE PRE-LAUNCH VERIFICATION SUITE")
    print("=" * 60)

    # 1. Page Routes HTTP Status Check
    routes_to_test = [
        ("/", "Homepage"),
        ("/coworking-spaces", "Coworking Spaces Index"),
        ("/virtual-offices", "Virtual Offices Index"),
        ("/workspaces", "Workspaces Search & Directory"),
        ("/solutions", "Solutions Hub"),
        ("/solutions/business-registration", "Business Registration Solution"),
        ("/solutions/support-services", "Support Services Solution"),
        ("/pricing", "Pricing Plans"),
        ("/workspaces/list-space", "List Your Space (Partner Onboarding)"),
        ("/about-us", "About Us & Legal"),
        ("/contact", "Contact & Support Desk"),
        ("/login", "Dedicated Login Page"),
        ("/coworking/gurugram/dlf-cyber-city/ofchr01", "Property Detail - DLF Cyber City"),
        ("/coworking/delhi/aerocity/ofcdl13", "Property Detail - Aerocity"),
        ("/coworking/bangalore/koramangala/ofcka02", "Property Detail - Koramangala"),
    ]

    print("\n--- 1. Testing Page Route Availability (HTTP 200) ---")
    for route, label in routes_to_test:
        url = f"{BASE_URL}{route}"
        try:
            r = requests.get(url, timeout=10)
            status = r.status_code
            ok = status == 200
            results.append((f"Page: {label} ({route})", ok, f"HTTP {status}"))
            print(f"[{'PASS' if ok else 'FAIL'}] {label} ({route}) -> HTTP {status}")
        except Exception as e:
            results.append((f"Page: {label} ({route})", False, str(e)))
            print(f"[FAIL] {label} ({route}) -> Error: {e}")

    # 2. Testing API Workspace Directory & Filtering
    print("\n--- 2. Testing Workspaces API & Search Filters ---")
    api_tests = [
        ("/api/workspaces", "All Workspaces"),
        ("/api/workspaces?city=Delhi+NCR", "Filter by Delhi NCR"),
        ("/api/workspaces?city=Bangalore", "Filter by Bangalore"),
        ("/api/workspaces?type=COWORKING", "Filter by Coworking"),
        ("/api/workspaces?type=VIRTUAL_OFFICE", "Filter by Virtual Office"),
        ("/api/workspaces?search=Cyber+City", "Search by Keyword (Cyber City)"),
        ("/api/cities", "Cities List API"),
    ]

    for api_path, label in api_tests:
        url = f"{BASE_URL}{api_path}"
        try:
            r = requests.get(url, timeout=10)
            ok = r.status_code == 200
            data = r.json() if ok else {}
            count = len(data.get("items", [])) if "items" in data else len(data)
            results.append((f"API: {label}", ok, f"Count: {count}"))
            print(f"[{'PASS' if ok else 'FAIL'}] {label} -> HTTP {r.status_code} (items: {count})")
        except Exception as e:
            results.append((f"API: {label}", False, str(e)))
            print(f"[FAIL] {label} -> Error: {e}")

    # 3. Testing Authentication & Registration
    print("\n--- 3. Testing User Registration & Double-Password Validation ---")
    test_email = f"test_{uuid.uuid4().hex[:6]}@example.com"
    
    # 3a: Password Mismatch Validation (should return 400)
    try:
        r = requests.post(f"{BASE_URL}/api/auth/register", json={
            "name": "Test User",
            "email": test_email,
            "password": "Password@123",
            "confirmPassword": "DifferentPassword@456"
        }, timeout=10)
        ok = r.status_code == 400
        results.append(("Validation: Reject Password Mismatch", ok, f"HTTP {r.status_code}"))
        print(f"[{'PASS' if ok else 'FAIL'}] Password Mismatch Validation -> HTTP {r.status_code} (Expected 400)")
    except Exception as e:
        results.append(("Validation: Reject Password Mismatch", False, str(e)))
        print(f"[FAIL] Password Mismatch Validation -> Error: {e}")

    # 3b: Successful User Creation
    try:
        r = requests.post(f"{BASE_URL}/api/auth/register", json={
            "name": "Test User",
            "email": test_email,
            "password": "Password@123",
            "confirmPassword": "Password@123"
        }, timeout=10)
        ok = r.status_code in (200, 201)
        results.append(("Auth: User Account Creation", ok, f"HTTP {r.status_code}"))
        print(f"[{'PASS' if ok else 'FAIL'}] User Account Creation -> HTTP {r.status_code} (Expected 201)")
    except Exception as e:
        results.append(("Auth: User Account Creation", False, str(e)))
        print(f"[FAIL] User Account Creation -> Error: {e}")

    # 4. Testing Leads & Consultation API
    print("\n--- 4. Testing Lead / Consultation Submission ---")
    try:
        r = requests.post(f"{BASE_URL}/api/leads", json={
            "type": "Consultation Request",
            "name": "Test Client",
            "email": "testclient@example.com",
            "phone": "+91 9876543210",
            "interest": "virtual-office",
            "sourceUrl": "http://localhost:3000"
        }, timeout=10)
        ok = r.status_code in (200, 201)
        results.append(("API: Consultation Lead Submission", ok, f"HTTP {r.status_code}"))
        print(f"[{'PASS' if ok else 'FAIL'}] Consultation Lead Submission -> HTTP {r.status_code}")
    except Exception as e:
        results.append(("API: Consultation Lead Submission", False, str(e)))
        print(f"[FAIL] Consultation Lead Submission -> Error: {e}")

    # 5. Testing Callback Request API
    print("\n--- 5. Testing Callback Request Submission ---")
    try:
        r = requests.post(f"{BASE_URL}/api/callbacks", json={
            "name": "Rohan Gupta",
            "phone": "9988776655",
            "preferredTime": "ASAP",
            "workspaceId": "prop-1"
        }, timeout=10)
        ok = r.status_code in (200, 201)
        results.append(("API: Instant Callback Request", ok, f"HTTP {r.status_code}"))
        print(f"[{'PASS' if ok else 'FAIL'}] Callback Request -> HTTP {r.status_code}")
    except Exception as e:
        results.append(("API: Instant Callback Request", False, str(e)))
        print(f"[FAIL] Callback Request -> Error: {e}")

    # 6. Testing Tour Booking API
    print("\n--- 6. Testing Tour / Visit Booking Submission ---")
    try:
        r = requests.post(f"{BASE_URL}/api/bookings", json={
            "workspaceId": "prop-1",
            "visitDate": "2026-11-25T11:00:00.000Z",
            "timeSlot": "11:00 AM",
            "guestName": "Rohan Gupta",
            "guestEmail": "rohan.gupta@example.com",
            "guestPhone": "9876501234",
            "teamSize": "1-5",
            "notes": "Looking for private cabin space"
        }, timeout=10)
        ok = r.status_code in (200, 201)
        results.append(("API: Schedule Tour Booking", ok, f"HTTP {r.status_code}"))
        print(f"[{'PASS' if ok else 'FAIL'}] Schedule Tour Booking -> HTTP {r.status_code}")
    except Exception as e:
        results.append(("API: Schedule Tour Booking", False, str(e)))
        print(f"[FAIL] Schedule Tour Booking -> Error: {e}")

    # 7. Testing Newsletter Subscription API
    print("\n--- 7. Testing Newsletter Subscription ---")
    try:
        r = requests.post(f"{BASE_URL}/api/newsletter", json={
            "email": f"subscriber_{uuid.uuid4().hex[:5]}@example.com"
        }, timeout=10)
        ok = r.status_code in (200, 201)
        results.append(("API: Newsletter Subscription", ok, f"HTTP {r.status_code}"))
        print(f"[{'PASS' if ok else 'FAIL'}] Newsletter Subscription -> HTTP {r.status_code}")
    except Exception as e:
        results.append(("API: Newsletter Subscription", False, str(e)))
        print(f"[FAIL] Newsletter Subscription -> Error: {e}")

    # Print Summary Table
    print("\n" + "=" * 60)
    print("VERIFICATION SUMMARY REPORT")
    print("=" * 60)
    passed = sum(1 for _, ok, _ in results if ok)
    failed = sum(1 for _, ok, _ in results if not ok)
    print(f"Total Tests Run: {len(results)}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    if failed == 0:
        print("\nALL VERIFICATION CHECKS PASSED SUCCESSFULLY!")
    else:
        print("\nATTENTION: Some checks had issues.")
        for name, ok, detail in results:
            if not ok:
                print(f"  FAILED: {name} -> {detail}")

if __name__ == "__main__":
    test_suite()
