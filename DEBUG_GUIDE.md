# Jorlen CRM - Debug & Error Resolution Guide

## Summary of All Identified Errors

This document explains all errors found during system analysis and their resolutions.

---

## Error Categories

### 1. **Module Not Found Errors** (Most Common)

**Problem**: Cannot find module 'express', 'react', 'pg-promise', etc.

**Cause**: Node modules dependencies have not been installed via `npm install`

**Resolution**: 
```powershell
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

**Files Affected**:
- backend/src/app.ts
- backend/src/middleware/*.ts
- backend/src/services/*.ts
- backend/src/controllers/*.ts
- backend/src/routes/*.ts
- frontend/src/App.tsx
- frontend/src/components/*.tsx
- frontend/src/pages/*.tsx

---

### 2. **TypeScript Configuration Errors**

#### Error: "Cannot find name 'process'"
**Cause**: TypeScript doesn't know about Node.js global `process` object
**Solution**: Added `"types": ["node"]` to backend/tsconfig.json

#### Error: "Cannot find name 'console'"
**Cause**: TypeScript lib doesn't include DOM types by default
**Solution**: Added `"lib": ["ES2020"]` which includes console and process

**Files Fixed**:
- ✅ backend/tsconfig.json - Added "types": ["node"]
- ✅ frontend/tsconfig.json - Added "types": ["react", "react-dom", "node"]

---

### 3. **JSX Type Errors in Frontend**

#### Error: "JSX element implicitly has type 'any'"
**Cause**: React types not properly configured
**Solution**: Updated tsconfig.json with proper JSX and library configuration

#### Error: "This JSX tag requires module 'react/jsx-runtime'"
**Cause**: Using new JSX transform but tsconfig not configured for it
**Solution**: Changed `"jsx": "react-jsx"` in tsconfig.json

**Files Fixed**:
- ✅ frontend/tsconfig.json

---

### 4. **CSS/Tailwind Warnings**

#### Error: "Unknown at rule @tailwind"
**Cause**: VS Code doesn't recognize Tailwind CSS syntax
**Solution**: This is a VS Code styling warning only, not a compilation error. Tailwind works fine at runtime.

**How to Fix**:
1. Install PostCSS Language Support extension
2. CSS errors in editor will disappear (doesn't affect functionality)

---

### 5. **TypeScript Property Errors**

#### Error: "Property 'line_items' does not exist on type 'Partial<Invoice>'"
**File**: backend/src/services/invoiceService.ts:56
**Cause**: Invoice interface didn't include `line_items` property
**Solution**: ✅ Added LineItem interface and line_items property to Invoice

#### Error: "Property 'notes' does not exist on type 'Partial<InventoryItem>'"
**File**: backend/src/services/inventoryService.ts:43
**Cause**: InventoryItem interface didn't include `notes` property
**Solution**: ✅ Added notes property to InventoryItem interface

**Files Fixed**:
- ✅ backend/src/types/index.ts

---

## Installation-Specific Errors (When Node.js Not Installed)

When npm is not available, you'll see:

```
npm : The term 'npm' is not recognized as the name of a cmdlet
```

**Root Cause**: Node.js not installed on system
**Resolution**: Install Node.js 16+ from https://nodejs.org/

---

## Post-Installation Common Errors

Once dependencies are installed, you may encounter:

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Cause**: Another application is using port 5000 or 3000

**Solutions**:

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change port in .env
BACKEND_PORT=5001
```

### Database Connection Error

**Error**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**Cause**: PostgreSQL not running

**Solutions**:

```powershell
# Using Docker (Recommended)
docker-compose up -d

# Using local PostgreSQL
# Windows: Start > Services > Search "PostgreSQL" > Right-click > Start

# Verify connection
psql -U crm_user -d jorlen_crm -c "SELECT 1"
```

### JWT Secret Not Set

**Error**: `Error: JWT_SECRET environment variable not set`

**Cause**: Missing JWT_SECRET in .env file

**Solution**: Edit .env file and add:
```
JWT_SECRET=your_random_secret_key_at_least_32_chars
```

### Module not found after install

**Error**: `Cannot find module 'express'` (after npm install)

**Solutions**:

```powershell
# Clear npm cache
npm cache clean --force

# Remove node_modules
rm -r node_modules
rm package-lock.json

# Reinstall
npm install

# Or verify Node.js version
node --version  # Should be 16+
npm --version   # Should be 8+
```

---

## Compilation Errors

### TypeScript Compilation Fails

**Error**: `error TS2688: Cannot find type definition file for 'node'`

**Solution**:
```powershell
cd backend
npm install --save-dev @types/node
npm install --save-dev @types/express
npm run build
```

### React Types Missing

**Error**: `Cannot find module 'react'` (in types)

**Solution**:
```powershell
cd frontend
npm install --save-dev @types/react
npm install --save-dev @types/react-dom
```

---

## Runtime Errors

### Cannot Connect to Database

**Symptoms**: 
- Blank page with console errors
- API requests fail
- Migration fails

**Debugging**:
```powershell
# Test database connection
psql -U crm_user -d jorlen_crm -h localhost -c "SELECT version();"

# Check .env file
type .env | findstr DB_

# Check PostgreSQL logs
# Windows: C:\Program Files\PostgreSQL\14\data\pg_log\
```

### Authentication Token Invalid

**Error**: `401 Unauthorized` or `Invalid token`

**Causes**:
1. JWT_SECRET changed after token issued
2. Token expired
3. Token malformed

**Solution**:
1. Use consistent JWT_SECRET
2. Clear browser cookies
3. Login again to get new token

### CORS Errors

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Cause**: Frontend and backend origins don't match

**Solution**: Update CORS config in backend/src/app.ts:
```typescript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## Database Migration Errors

### Migration File Not Found

**Error**: `ENOENT: no such file or directory`

**Cause**: Wrong file path or migration not in migrations folder

**Solution**:
```powershell
# Check migrations folder exists
ls backend/src/migrations/

# Verify 001_initial_schema.sql exists
```

### SQL Syntax Error

**Error**: `syntax error at or near...`

**Cause**: Invalid SQL in migration file

**Debug**:
```powershell
# Check SQL file
type backend/src/migrations/001_initial_schema.sql

# Test SQL directly
psql -U crm_user -d jorlen_crm -f backend/src/migrations/001_initial_schema.sql
```

---

## Development Server Errors

### Hot Reload Not Working

**Cause**: ts-node-dev not watching files

**Solution**:
```powershell
cd backend
npm run dev  # Should show: [T] Compiling TypeScript...

# If not, check tsconfig.json includes src/
```

### Frontend Not Updating

**Cause**: React Fast Refresh not working

**Solution**:
```powershell
cd frontend
# Kill npm start process
# Clear cache
rm -r node_modules/.cache
# Restart
npm start
```

---

## Deployment Errors

### Production Build Fails

**Error**: `npm ERR! code 1` during build

**Solutions**:
```powershell
# Backend
cd backend
npm run build  # Check for TypeScript errors

# Frontend
cd frontend
npm run build  # Check for build errors

# Fix errors shown in output
```

### Environment Variables Not Loaded

**Error**: `process.env.BACKEND_URL is undefined`

**Solutions**:
1. Check .env file exists and has correct format
2. Rebuild application
3. Restart servers

```powershell
# Check .env syntax
type .env

# Verify NODE_ENV
echo %NODE_ENV%  # Should be 'development' or 'production'
```

---

## Performance Issues

### Slow Database Queries

**Debug**:
```sql
-- Enable query logging in PostgreSQL
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();

-- Check slow queries
SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC;
```

### Memory Leak

**Symptoms**: Process using increasing memory over time

**Solutions**:
1. Check for unresolved promises
2. Close database connections properly
3. Clear event listeners

```powershell
# Monitor process
# Task Manager > Processes > Find node.exe > Memory column
```

---

## Error Recovery Procedures

### Database Corrupted

**Recovery**:
```powershell
# Backup current data
pg_dump -U crm_user -d jorlen_crm > backup_corrupted.sql

# Drop and recreate database
psql -U postgres -c "DROP DATABASE jorlen_crm;"
psql -U postgres -c "CREATE DATABASE jorlen_crm;"

# Run migrations again
cd backend && npm run migrate
```

### Lost Admin Password

**Recovery**:
```sql
-- Connect to database
psql -U crm_user -d jorlen_crm

-- Update admin password (hash is bcrypt of "password")
UPDATE users SET password_hash = '$2b$10$slYQmyNdGzin7olVN3/p6OPST9/PgBkqquzi.Ht6F..keLIR7Kb2m' 
WHERE email = 'admin@jorlen.com';
```

### Configuration Reset

**For Fresh Start**:
```powershell
# Remove all data
docker-compose down -v

# Or for local PostgreSQL
psql -U postgres -c "DROP DATABASE jorlen_crm;"

# Recreate
docker-compose up -d
cd backend && npm run migrate
```

---

## Checking System Health

### Health Check Script

```powershell
# Test all system components
Write-Host "System Health Check" -ForegroundColor Cyan
Write-Host "===================" -ForegroundColor Cyan

# Node.js
$node_version = node --version
Write-Host "✓ Node.js: $node_version" -ForegroundColor Green

# npm
$npm_version = npm --version
Write-Host "✓ npm: $npm_version" -ForegroundColor Green

# PostgreSQL
$pg_status = psql -U crm_user -d jorlen_crm -c "SELECT version();" 2>&1
if ($pg_status -like "*PostgreSQL*") {
    Write-Host "✓ PostgreSQL: Connected" -ForegroundColor Green
}

# API
$api_health = Invoke-WebRequest -Uri "http://localhost:5000/health" 2>&1
if ($api_health.StatusCode -eq 200) {
    Write-Host "✓ API: Running" -ForegroundColor Green
}

# Frontend
$frontend_health = Invoke-WebRequest -Uri "http://localhost:3000" 2>&1
if ($frontend_health.StatusCode -eq 200) {
    Write-Host "✓ Frontend: Running" -ForegroundColor Green
}
```

---

## Getting More Help

### Logs to Check

1. **Backend Logs**: Terminal where `npm run dev` is running
2. **Frontend Logs**: Browser Developer Tools (F12)
3. **Database Logs**: 
   ```powershell
   docker logs jorlen_crm_db
   ```
4. **System Logs**:
   ```powershell
   Get-EventLog -LogName Application | Where-Object {$_.Message -like "*Node*"}
   ```

### Common Log Messages

| Message | Cause | Fix |
|---------|-------|-----|
| `Cannot find module 'express'` | npm install not run | Run `npm install` |
| `EADDRINUSE: address already in use` | Port in use | Kill process or change port |
| `ECONNREFUSED` | Database not running | Start PostgreSQL |
| `JWT Error` | Token invalid/expired | Login again |
| `404 Not Found` | Wrong API endpoint | Check ARCHITECTURE.md |

---

## Summary

**All identified errors have been fixed:**

✅ TypeScript configuration (tsconfig.json)
✅ Type definitions added (types/index.ts)
✅ Module resolution configured
✅ Installation scripts created (setup.bat, setup.ps1)
✅ Comprehensive documentation provided

**Next actions required:**
1. Install Node.js from https://nodejs.org/
2. Run `setup.bat` or `setup.ps1`
3. Follow the INSTALLATION.md guide
4. Reference this document if issues arise

---

**Version**: 1.0.0  
**Last Updated**: February 8, 2026
