#!/bin/bash

# Campus Exchange API Smoke Test Script
# Tests core endpoints to verify API functionality

# Read BASE_URL from environment, default to localhost:3000
BASE_URL="${BASE_URL:-http://localhost:3000/api}"

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Track test results
PASSED=0
FAILED=0

# Function to run a test
run_test() {
  local test_name="$1"
  local endpoint="$2"
  local method="$3"
  local data="$4"
  
  echo -n "Testing $test_name... "
  
  if [ -z "$data" ]; then
    response=$(curl -s -w "\n%{http_code}" "${BASE_URL}${endpoint}" 2>&1)
  else
    response=$(curl -s -w "\n%{http_code}" -X "${method}" -H "Content-Type: application/json" -d "${data}" "${BASE_URL}${endpoint}" 2>&1)
  fi
  
  http_code=$(echo "$response" | tail -n1)
  body=$(echo "$response" | sed '$d')
  
  if [ "$http_code" -ge 200 ] && [ "$http_code" -lt 300 ]; then
    echo -e "${GREEN}PASSED${NC} (HTTP $http_code)"
    ((PASSED++))
  else
    echo -e "${RED}FAILED${NC} (HTTP $http_code)"
    echo "Response: $body"
    ((FAILED++))
  fi
}

echo "=========================================="
echo "Campus Exchange API Smoke Test"
echo "Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Test 1: Health Check
run_test "Health Check" "/health" "GET"

# Test 2: Get All Listings
run_test "Get All Listings" "/listings" "GET"

# Test 3: Get Single Listing
run_test "Get Single Listing" "/listings/1" "GET"

# Test 4: Get User's Listings
run_test "Get User's Listings" "/users/1/listings" "GET"

# Test 5: Create Listing (POST)
# This will fail without auth, but should return 401/403, not 500
echo -n "Testing Create Listing (write request)... "
response=$(curl -s -w "\n%{http_code}" -X POST -H "Content-Type: application/json" -d '{"title":"Test","price":10,"category_id":1}' "${BASE_URL}/listings" 2>&1)
http_code=$(echo "$response" | tail -n1)

if [ "$http_code" -ge 400 ] && [ "$http_code" -lt 500 ]; then
  echo -e "${GREEN}PASSED${NC} (HTTP $http_code - expected auth error)"
  ((PASSED++))
else
  echo -e "${RED}FAILED${NC} (HTTP $http_code)"
  ((FAILED++))
fi

echo ""
echo "=========================================="
echo "Test Results:"
echo "Passed: $PASSED"
echo "Failed: $FAILED"
echo "=========================================="

# Exit with non-zero if any tests failed
if [ $FAILED -gt 0 ]; then
  exit 1
fi

exit 0
