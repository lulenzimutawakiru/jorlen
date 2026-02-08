@echo off
REM Jorlen CRM - Automated Setup Script for Windows
REM This script installs all dependencies and sets up the system

echo.
echo ========================================
echo Jorlen CRM - Complete Setup
echo ========================================
echo.

REM Check if Node.js is installed
echo [1/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js 16+ from https://nodejs.org/
    echo Then run this script again.
    pause
    exit /b 1
)
echo ✓ Node.js found
node --version

REM Check if npm is available
echo.
echo [2/6] Checking npm installation...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not found!
    echo Please ensure Node.js was installed correctly.
    pause
    exit /b 1
)
echo ✓ npm found
npm --version

REM Copy environment file
echo.
echo [3/6] Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo ✓ .env file created
    echo.
    echo IMPORTANT: Edit .env file with your database credentials
    echo - Set DB_PASSWORD to your PostgreSQL password
    echo - Set JWT_SECRET to a random string
    echo.
) else (
    echo ✓ .env file already exists
)

REM Install backend dependencies
echo.
echo [4/6] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd ..

REM Install frontend dependencies
echo.
echo [5/6] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
cd ..

REM Setup complete
echo.
echo [6/6] Setup Complete!
echo ========================================
echo.
echo Next Steps:
echo.
echo 1. Start PostgreSQL
echo    Option A (Docker - Recommended):
echo       docker-compose up -d
echo    Option B (Local PostgreSQL):
echo       Ensure PostgreSQL service is running
echo.
echo 2. Run database migrations:
echo    cd backend
echo    npm run migrate
echo    cd ..
echo.
echo 3. Start the backend server:
echo    cd backend
echo    npm run dev
echo    (Keep this window open)
echo.
echo 4. Start the frontend (new terminal):
echo    cd frontend
echo    npm start
echo.
echo 5. Access the system:
echo    Frontend: http://localhost:3000
echo    API: http://localhost:5000
echo    Database: http://localhost:8080 (Adminer)
echo    Login: admin@jorlen.com / password
echo.
echo ========================================
pause
