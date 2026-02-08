# Jorlen CRM - Automated Setup Script for PowerShell
# Run with: powershell -ExecutionPolicy Bypass -File setup.ps1

Write-Host ""
Write-Host "========================================"
Write-Host "Jorlen CRM - Complete Setup" -ForegroundColor Cyan
Write-Host "========================================"
Write-Host ""

# Check if Node.js is installed
Write-Host "[1/6] Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Node.js is not installed!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check npm
Write-Host ""
Write-Host "[2/6] Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✓ npm found: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: npm is not found!" -ForegroundColor Red
    Write-Host "Please ensure Node.js was installed correctly." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Setup .env file
Write-Host ""
Write-Host "[3/6] Setting up environment file..." -ForegroundColor Yellow
if (!(Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✓ .env file created" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Edit the .env file with your database credentials:" -ForegroundColor Yellow
    Write-Host "  - DB_PASSWORD: Your PostgreSQL password" -ForegroundColor Gray
    Write-Host "  - JWT_SECRET: A random string for token signing" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}

# Install backend dependencies
Write-Host ""
Write-Host "[4/6] Installing backend dependencies..." -ForegroundColor Yellow
Set-Location backend
Write-Host "Running: npm install" -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to install backend dependencies" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
Set-Location ..

# Install frontend dependencies
Write-Host ""
Write-Host "[5/6] Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
Write-Host "Running: npm install" -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ ERROR: Failed to install frontend dependencies" -ForegroundColor Red
    Set-Location ..
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
Set-Location ..

# Success
Write-Host ""
Write-Host "========================================"
Write-Host "[6/6] Setup Complete!" -ForegroundColor Green
Write-Host "========================================"
Write-Host ""

Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Start PostgreSQL" -ForegroundColor Yellow
Write-Host "   Option A (Docker - Recommended):" -ForegroundColor Gray
Write-Host "      docker-compose up -d" -ForegroundColor Gray
Write-Host ""
Write-Host "   Option B (Local PostgreSQL):" -ForegroundColor Gray
Write-Host "      Start the PostgreSQL service" -ForegroundColor Gray
Write-Host ""

Write-Host "2. Run database migrations:" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run migrate" -ForegroundColor Gray
Write-Host "   cd .." -ForegroundColor Gray
Write-Host ""

Write-Host "3. Start the backend server:" -ForegroundColor Yellow
Write-Host "   cd backend" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host "   (Keep this window open)" -ForegroundColor Gray
Write-Host ""

Write-Host "4. Start the frontend (new PowerShell window):" -ForegroundColor Yellow
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm start" -ForegroundColor Gray
Write-Host ""

Write-Host "5. Access the system:" -ForegroundColor Yellow
Write-Host "   Frontend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "   API:       http://localhost:5000" -ForegroundColor Cyan
Write-Host "   Database:  http://localhost:8080 (Adminer)" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Default Login:" -ForegroundColor Yellow
Write-Host "   Email:    admin@jorlen.com" -ForegroundColor Cyan
Write-Host "   Password: password" -ForegroundColor Cyan
Write-Host ""
Write-Host "   ⚠️  Change default password after first login!" -ForegroundColor Red
Write-Host ""

Write-Host "========================================"
Write-Host "For help, see INSTALLATION.md" -ForegroundColor Gray
Write-Host "========================================"
Write-Host ""

Read-Host "Press Enter to exit"
