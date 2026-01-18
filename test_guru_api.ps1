# Guru API Endpoint Test Script
# Run: .\test_guru_api.ps1

$baseUrl = "http://localhost:8080"
$testGuruId = [guid]::NewGuid().ToString()

Write-Host ""
Write-Host "========================================"
Write-Host "     GURU API ENDPOINT TEST"
Write-Host "========================================"
Write-Host "Test guru_id: $testGuruId"
Write-Host ""

# Test 1: Save Draft
Write-Host "[1] Save Draft POST /api/guru/studio/.../save"
$saveBody = '{"snapshot":{"hero":{"studioName":"Test Studio","guruName":"Test Guru","stats":{"rating":4.8,"consultations":100,"startingPrice":888}},"basic":{"realName":"Zhang San","title":"Senior Master","bio":"20 years experience","specialties":["Bazi","Fengshui"]}}}'

try {
    $save = Invoke-RestMethod -Uri "$baseUrl/api/guru/studio/$testGuruId/save" -Method POST -Body $saveBody -ContentType "application/json"
    Write-Host "  OK success=$($save.success), message=$($save.message)" -ForegroundColor Green
} catch {
    Write-Host "  FAIL: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Get Draft
Write-Host ""
Write-Host "[2] Get Draft GET /api/guru/studio/..."
try {
    $get = Invoke-RestMethod -Uri "$baseUrl/api/guru/studio/$testGuruId" -Method GET
    Write-Host "  OK success=$($get.success), studioName=$($get.data.snapshot.hero.studioName)" -ForegroundColor Green
} catch {
    Write-Host "  FAIL: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Publish
Write-Host ""
Write-Host "[3] Publish POST /api/guru/studio/.../publish"
try {
    $publish = Invoke-RestMethod -Uri "$baseUrl/api/guru/studio/$testGuruId/publish" -Method POST -ContentType "application/json"
    Write-Host "  OK success=$($publish.success), message=$($publish.message)" -ForegroundColor Green
} catch {
    Write-Host "  FAIL: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Get Public Profile
Write-Host ""
Write-Host "[4] Get Public Profile GET /api/guru/public/..."
try {
    $public = Invoke-RestMethod -Uri "$baseUrl/api/guru/public/$testGuruId" -Method GET
    Write-Host "  OK success=$($public.success), is_published=$($public.data.is_published)" -ForegroundColor Green
} catch {
    Write-Host "  FAIL: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 5: Search
Write-Host ""
Write-Host "[5] Search GET /api/guru/search"
try {
    $search = Invoke-RestMethod -Uri "$baseUrl/api/guru/search?page=1&page_size=10" -Method GET
    Write-Host "  OK success=$($search.success), returned $($search.data.Count) records, total $($search.pagination.total)" -ForegroundColor Green
} catch {
    Write-Host "  FAIL: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================"
Write-Host "     TEST COMPLETE"
Write-Host "========================================"
Write-Host ""

# Browser test URLs
Write-Host "Browser Test URLs:"
Write-Host "  Setup: $baseUrl/uxbot/guru-business-page-setup.html?guru_id=$testGuruId"
Write-Host "  Public: $baseUrl/uxbot/guru-business-page.html?guru_id=$testGuruId"
Write-Host "  Search: $baseUrl/uxbot/guru-search-result.html"
