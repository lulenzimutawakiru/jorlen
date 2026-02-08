# Jorlen CRM - Complete Installation Guide

## ⚠️ Prerequisites Required

### 1. Install Node.js

Download and install Node.js 16+ from https://nodejs.org/

- **Windows**: Download the LTS installer and run it
- Your system must have Node.js installed for npm to work

**Verify Installation:**
```powershell
node --version    # Should return v16.x.x or higher
npm --version     # Should return 8.x.x or higher
```

### 2. Install PostgreSQL

Download and install PostgreSQL 12+ from https://www.postgresql.org/download/

**Option A: Using PostgreSQL Directly**
- Download installer from postgresql.org
- Install PostgreSQL with default settings
- Remember the password you set for the `postgres` user

**Option B: Using Docker (Recommended)**
- Install Docker Desktop from https://www.docker.com/products/docker-desktop
- Docker handles PostgreSQL setup automatically

## Installation Steps

### Step 1: Navigate to Project

```powershell
cd C:\Users\user\OneDrive\Desktop\jorlen
```

### Step 2: Configure Environment

```powershell
# Copy environment template
copy .env.example .env

# Open .env and set (if using local PostgreSQL):
# DB_PASSWORD=your_postgres_password
# JWT_SECRET=your_random_secret_key
```

### Step 3: Start PostgreSQL

**Option A: Using Docker (Recommended)**
```powershell
docker-compose up -d
```

This starts:
- PostgreSQL database
- Adminer (web database manager at http://localhost:8080)

**Option B: Manual PostgreSQL Installation**
```powershell
# Ensure PostgreSQL service is running

# Create database
psql -U postgres -c "CREATE DATABASE jorlen_crm;"
psql -U postgres -c "CREATE USER crm_user WITH PASSWORD 'your_password';"
psql -U postgres -c "ALTER ROLE crm_user WITH CREATEDB;"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE jorlen_crm TO crm_user;"
```

### Step 4: Install Backend Dependencies

```powershell
cd backend
npm install

# This installs:
# - express (web framework)
# - pg-promise (PostgreSQL driver)
# - typescript (type checking)
# - jsonwebtoken (authentication)
# - bcryptjs (password hashing)
# - And 15+ other packages
```

### Step 5: Run Database Migrations

```powershell
npm run migrate

# This creates all database tables and sample data
```

### Step 6: Start Backend Server

```powershell
npm run dev

# Backend will start on http://localhost:5000
# You should see:
# ✓ Jorlen CRM Backend running on port 5000
# ✓ Environment: development
```

**Keep this terminal open!**

### Step 7: Install Frontend Dependencies (New Terminal)

```powershell
cd C:\Users\user\OneDrive\Desktop\jorlen\frontend
npm install

# This installs:
# - react (UI framework)
# - react-router-dom (routing)
# - axios (HTTP client)
# - tailwindcss (styling)
# - And other React dependencies
```

### Step 8: Start Frontend Development Server

```powershell
npm start

# Frontend will start on http://localhost:3000
# Browser should open automatically
```

## System is Ready! 🎉

### Access Points

| Component | URL | Login |
|-----------|-----|-------|
| **Frontend** | http://localhost:3000 | Email: admin@jorlen.com<br/>Password: password |
| **API** | http://localhost:5000 | N/A (requires token) |
| **Database** | http://localhost:8080 | Username: crm_user<br/>Password: (from .env) |
| **Health Check** | http://localhost:5000/health | N/A |

## Verification Checklist

- [ ] Node.js installed (`node --version` returns version)
- [ ] npm working (`npm --version` returns version)
- [ ] .env file configured with database credentials
- [ ] PostgreSQL running (docker-compose up or service)
- [ ] Backend dependencies installed (`npm install` completed)
- [ ] Database migrations run (`npm run migrate` succeeded)
- [ ] Backend running on port 5000 (no errors)
- [ ] Frontend dependencies installed (`npm install` completed)
- [ ] Frontend running on port 3000
- [ ] Can login with admin@jorlen.com / password

## Troubleshooting Installation

### npm: command not found
**Solution**: Node.js is not installed. Download from https://nodejs.org/

### PostgreSQL connection refused
**Solutions**:
1. Check PostgreSQL is running: `services.msc` → find PostgreSQL → check status
2. Verify .env database credentials match PostgreSQL installation
3. Try using Docker instead: `docker-compose up -d`

### Port 5000 already in use
**Solution**:
```powershell
# Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or change port in .env
BACKEND_PORT=5001
```

### Port 3000 already in use
**Solution**:
```powershell
# Kill process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### "Cannot find module" errors
**Solution**: Dependencies not installed
```powershell
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Database migrations fail
**Solution**: Check database connection
```powershell
# Verify connection works
psql -U crm_user -d jorlen_crm -c "SELECT version();"

# Or check .env credentials
```

## Next Steps After Installation

1. **Change Default Passwords**
   - Login to http://localhost:3000 with admin@jorlen.com / password
   - Go to Settings → Change Password
   - Update all default user accounts

2. **Database Backup**
   ```powershell
   pg_dump -U crm_user -d jorlen_crm > backup.sql
   ```

3. **Explore Features**
   - Navigate through Dashboard
   - Create sample customers
   - Test different user roles
   - Review Reports

4. **Customize**
   - Update company details in code
   - Add your branding (logos, colors)
   - Customize email templates
   - Configure SMS/WhatsApp (optional)

## Development Commands

### Backend
```bash
cd backend
npm run dev          # Start development server (auto-reload)
npm run build        # Compile TypeScript to JavaScript
npm run start        # Run production build
npm run lint         # Check code style
npm test             # Run tests (when configured)
npm run migrate      # Run database migrations
```

### Frontend
```bash
cd frontend
npm start            # Start development server
npm run build        # Build for production
npm run lint         # Check code style
npm test             # Run tests (when configured)
```

### Database
```bash
# Start PostgreSQL with Docker
docker-compose up -d

# Stop PostgreSQL
docker-compose down

# Access database with Adminer
# http://localhost:8080

# Command line access
psql -U crm_user -d jorlen_crm
```

## Production Deployment

Before deploying to production:

1. **Security**
   - [ ] Change all default passwords
   - [ ] Generate new strong JWT_SECRET
   - [ ] Enable HTTPS/SSL
   - [ ] Setup CORS for your domain

2. **Database**
   - [ ] Configure automated backups
   - [ ] Setup replication for HA
   - [ ] Enable query logging
   - [ ] Configure maintenance windows

3. **Application**
   - [ ] Build and optimize frontend: `npm run build`
   - [ ] Build backend: `npm run build`
   - [ ] Set NODE_ENV=production
   - [ ] Configure logging/monitoring
   - [ ] Setup error tracking (Sentry, etc.)

4. **Infrastructure**
   - [ ] Setup reverse proxy (nginx/Apache)
   - [ ] Configure firewall rules
   - [ ] Setup CDN for static assets
   - [ ] Setup uptime monitoring
   - [ ] Configure load balancing (if needed)

## Support

For detailed information, see:
- [README.md](README.md) - Project overview
- [QUICKSTART.md](QUICKSTART.md) - Quick setup
- [DOCUMENTATION.md](DOCUMENTATION.md) - Complete documentation
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical design

---

**Last Updated**: February 8, 2026  
**Version**: 1.0.0
