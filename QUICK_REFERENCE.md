# Jorlen CRM - Quick Reference Guide

## Essential Commands

### Installation & Setup

```powershell
# Initial setup (choose one)
powershell -ExecutionPolicy Bypass -File setup.ps1      # Recommended: prettier output
setup.bat                                                # Simpler batch version

# Manual setup
copy .env.example .env
cd backend && npm install
cd ../frontend && npm install
```

### Start Development Servers

```powershell
# Terminal 1: Start Backend
cd backend
npm run dev              # Starts on http://localhost:5000

# Terminal 2: Start Database (Docker)
docker-compose up -d    # Starts PostgreSQL + Adminer (admin panel on :8080)

# Terminal 3: Start Frontend
cd frontend
npm start               # Starts on http://localhost:3000
```

### Database Operations

```powershell
# Run migrations (creates tables)
cd backend
npm run migrate

# Access database directly
psql -U crm_user -d jorlen_crm

# Docker database access
docker exec -it jorlen_crm_db psql -U crm_user -d jorlen_crm

# Backup database
pg_dump -U crm_user -d jorlen_crm > backup.sql

# Restore database
psql -U crm_user -d jorlen_crm < backup.sql
```

### Build & Deployment

```powershell
# Build for production
cd backend && npm run build
cd frontend && npm run build

# Check for errors
cd backend && npm run lint
cd frontend && npm run lint
```

---

## Default Login Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@jorlen.com | password | Admin |
| sales@jorlen.com | password | Sales Manager |
| tech@jorlen.com | password | Support Manager |
| invoice@jorlen.com | password | Finance |
| inventory@jorlen.com | password | Inventory Manager |

⚠️ **IMPORTANT**: Change all default passwords in production!

---

## API Base URLs

**Development**:
- Backend: `http://localhost:5000`
- Frontend: `http://localhost:3000`
- Database Admin: `http://localhost:8080` (Adminer)

**Production**:
- Backend: `https://api.jorlen.local`
- Frontend: `https://jorlen.local`

---

## Common API Endpoints

### Authentication
```
POST   /auth/register          - Register new user
POST   /auth/login            - Login user
GET    /auth/profile          - Get current user
PUT    /auth/profile          - Update profile
GET    /auth/users/all        - List all users (admin only)
```

### Customers
```
GET    /customers             - List customers
GET    /customers/:id         - Get customer
POST   /customers             - Create customer
PUT    /customers/:id         - Update customer
DELETE /customers/:id         - Delete customer
GET    /customers/:id/subscriptions - Get subscriptions
```

### Leads
```
GET    /leads                 - List leads
GET    /leads/:id             - Get lead
POST   /leads                 - Create lead
PUT    /leads/:id             - Update lead
GET    /leads/stage/:stage    - Filter by stage
```

### Support
```
GET    /tickets               - List tickets
GET    /tickets/:id           - Get ticket
POST   /tickets               - Create ticket
PUT    /tickets/:id           - Update ticket
POST   /tickets/:id/comments  - Add comment
GET    /tickets/:id/comments  - Get comments
```

### Projects
```
GET    /projects              - List projects
GET    /projects/:id          - Get project
POST   /projects              - Create project
PUT    /projects/:id          - Update project
GET    /projects/customer/:id - Get customer's projects
GET    /projects/:id/milestones - Get milestones
```

### Invoices
```
GET    /invoices              - List invoices
GET    /invoices/:id          - Get invoice
POST   /invoices              - Create invoice
PUT    /invoices/:id          - Update invoice
GET    /invoices/stats/revenue - Get revenue stats
```

### Inventory
```
GET    /inventory             - List items
GET    /inventory/:id         - Get item
POST   /inventory             - Create item
PUT    /inventory/:id         - Update item
GET    /inventory/alerts/low-stock - Get low stock items
GET    /inventory/stats       - Get statistics
```

### Reports
```
GET    /reports/dashboard     - Dashboard summary
GET    /reports/customers     - Customer statistics
GET    /reports/sales         - Sales pipeline
GET    /reports/tickets       - Support statistics
GET    /reports/financial     - Financial data
GET    /reports/projects      - Project metrics
GET    /reports/inventory     - Inventory stats
GET    /reports/users         - User performance
```

---

## Environment Variables

### Backend (.env)

```env
# Server
NODE_ENV=development
BACKEND_PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jorlen_crm
DB_USER=crm_user
DB_PASSWORD=your_password
DB_SSL=false

# Authentication
JWT_SECRET=your_secret_key_change_this
JWT_EXPIRATION=7d

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM=noreply@jorlen.com

# SMS (Optional)
SMS_PROVIDER=twilio
SMS_ACCOUNT_SID=your_sid
SMS_AUTH_TOKEN=your_token
SMS_FROM=+256123456789

# WhatsApp (Optional)
WHATSAPP_ACCESS_TOKEN=your_token
WHATSAPP_PHONE_NUMBER_ID=your_id

# Logging
LOG_LEVEL=debug
LOG_FILE=logs/app.log

# Currency
DEFAULT_CURRENCY=UGX
DEFAULT_TIMEZONE=Africa/Kampala

# API
API_RATE_LIMIT=100
API_TIMEOUT=30000
```

### Frontend (.env)

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENV=development
```

---

## Project Structure

```
jorlen/
├── backend/                          # Node.js/Express API
│   ├── src/
│   │   ├── app.ts                   # Express app setup
│   │   ├── config/
│   │   │   └── database.ts          # PostgreSQL connection
│   │   ├── controllers/             # Route handlers
│   │   ├── services/                # Business logic
│   │   ├── routes/                  # API endpoints
│   │   ├── middleware/              # Auth, audit, validation
│   │   ├── types/
│   │   │   └── index.ts             # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── helpers.ts           # Utility functions
│   │   └── migrations/              # Database schemas
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── frontend/                         # React application
│   ├── src/
│   │   ├── App.tsx                  # Root component
│   │   ├── AppLayout.tsx            # Main layout
│   │   ├── pages/                   # Page components
│   │   ├── components/              # Reusable components
│   │   │   ├── layout/              # Layout components
│   │   │   └── common/              # UI components
│   │   ├── services/                # API client
│   │   ├── icons/                   # SVG icons
│   │   └── index.css                # Global styles
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js           # Tailwind CSS config
│   └── postcss.config.js            # PostCSS config
│
├── Documentation/
│   ├── README.md                    # Project overview
│   ├── QUICKSTART.md                # 5-min setup guide
│   ├── INSTALLATION.md              # Detailed installation
│   ├── ARCHITECTURE.md              # System design
│   ├── DOCUMENTATION.md             # Full documentation
│   └── DEBUG_GUIDE.md               # This file structure
│
├── Configuration/
│   ├── docker-compose.yml           # Docker setup
│   ├── .env.example                 # Environment template
│   ├── setup.bat                    # Windows setup
│   ├── setup.ps1                    # PowerShell setup
│   └── .gitignore
```

---

## Database Schema Overview

**Core Tables**:
- `users` - System users and login info
- `customers` - Client companies
- `customer_subscriptions` - Service subscriptions
- `leads` - Sales opportunities
- `quotations` - Price quotes
- `support_tickets` - Support requests
- `projects` - Implementation projects
- `invoices` - Billing information
- `payments` - Payment records
- `inventory_items` - Equipment stock
- `audit_logs` - Compliance tracking

**View Relationships**:
```
customers ←→ subscriptions
customers ←→ leads
customers ←→ projects
customers ←→ invoices
projects ←→ milestones
tickets ←→ comments
invoices ←→ payments
```

---

## Debugging Tips

### 1. Check what's running

```powershell
# List processes
Get-Process | Where-Object {$_.Name -like "*node*"}

# Kill a process if needed
Stop-Process -Name "node" -Force
```

### 2. Check ports

```powershell
# Show what's using port 5000
netstat -ano | findstr :5000

# Kill process using port
taskkill /PID <PID> /F
```

### 3. View logs

```powershell
# Backend logs (from running terminal)
# Docker logs
docker logs jorlen_crm_db

# Frontend logs
# Open Browser DevTools: F12 > Console tab
```

### 4. Test API endpoints

```powershell
# Using curl
curl http://localhost:5000/auth/login -X POST -H "Content-Type: application/json" `
  -d '{"email":"admin@jorlen.com","password":"password"}'

# Using Invoke-WebRequest
$response = Invoke-WebRequest -Uri "http://localhost:5000/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"admin@jorlen.com","password":"password"}'
```

### 5. Database queries

```sql
-- Show all tables
\dt

-- Describe table
\d customers

-- Count records
SELECT COUNT(*) FROM users;

-- Find errors
SELECT * FROM audit_logs WHERE action_type = 'ERROR' ORDER BY created_at DESC LIMIT 10;
```

---

## Performance Optimization

### 1. Database
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_customers_status ON customers(status);
CREATE INDEX idx_tickets_priority ON support_tickets(priority);

-- Monitor slow queries
SELECT * FROM pg_stat_statements ORDER BY mean_exec_time DESC LIMIT 10;
```

### 2. Backend
```typescript
// Use pagination
GET /customers?page=1&limit=20

// Cache frequently accessed data
const cachedCustomers = await redis.get('customers');

// Use database connection pooling (already configured)
```

### 3. Frontend
```typescript
// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Memoize expensive operations
export const CustomerTable = memo(({ data }) => {
  return <table>...{data.map(...)...}</table>;
});

// Minimize re-renders
useCallback and useMemo hooks
```

---

## Troubleshooting Checklist

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] PostgreSQL running (`npm run migrate`)
- [ ] .env file created and configured
- [ ] Backend compiles (`cd backend && npm run build`)
- [ ] Frontend compiles (`cd frontend && npm run build`)
- [ ] Backend starts (`cd backend && npm run dev`)
- [ ] Frontend starts (`cd frontend && npm start`)
- [ ] Login works with default credentials
- [ ] Database has data (`SELECT COUNT(*) FROM users;`)

---

## Getting Help

1. **Check DEBUG_GUIDE.md** - Comprehensive error database
2. **Check ARCHITECTURE.md** - API documentation
3. **Check logs** - Both backend terminal and browser DevTools
4. **Test database** - Connect directly to verify data
5. **Test API** - Use curl/Postman to test endpoints

---

## Version Control

```powershell
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Jorlen CRM"

# Create .gitignore (already provided)
# Ignores: node_modules, .env, dist/, logs/, .DS_Store

# Branch management
git branch develop
git checkout develop
git push origin develop
```

---

## Deployment Checklist

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] SSL certificates ready
- [ ] Backups configured
- [ ] Monitoring enabled
- [ ] Error tracking (Sentry) configured
- [ ] Logging aggregation (DataDog) configured
- [ ] CDN configured for static assets
- [ ] Email templates tested
- [ ] Default passwords changed

---

**For detailed information, see:**
- [README.md](README.md) - Overview
- [QUICKSTART.md](QUICKSTART.md) - 5-minute setup
- [INSTALLATION.md](INSTALLATION.md) - Full installation guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - System design & API docs
- [DOCUMENTATION.md](DOCUMENTATION.md) - Complete reference
- [DEBUG_GUIDE.md](DEBUG_GUIDE.md) - Error troubleshooting

**Last Updated**: February 8, 2026
