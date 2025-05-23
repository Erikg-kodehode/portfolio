# Stop existing Node processes
Write-Host "Stopping Node processes..." -ForegroundColor Yellow
Get-Process | Where-Object { $_.ProcessName -like "*node*" } | Stop-Process -Force

# Wait a moment to ensure processes are stopped
Start-Sleep -Seconds 2

# Clean .next directory
Write-Host "Cleaning .next directory..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item ".next" -Recurse -Force
}

# Clean node_modules/.cache
Write-Host "Cleaning node_modules/.cache..." -ForegroundColor Yellow
if (Test-Path "node_modules/.cache") {
    Remove-Item "node_modules/.cache" -Recurse -Force
}

# Install dependencies (in case any are missing)
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Start the development server
Write-Host "Starting development server..." -ForegroundColor Green
npm run dev

