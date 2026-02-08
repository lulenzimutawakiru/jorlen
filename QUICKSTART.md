# Jorlen CRM - Quick Start Guide

## System Overview

Jorlen ICT Services CRM is a comprehensive, enterprise-grade Customer Relationship Management system designed specifically for ICT service providers. It covers the complete business lifecycle from lead generation through customer management, service delivery, billing, and financial reporting.

## Quick Setup (5 Minutes)

### 1. Clone/Extract the Project

```bash
cd ~/Desktop/jorlen
```

### 2. Environment Setup

```bash
# Copy and configure environment variables
cp .env.example .env

# Edit .env file with your settings
# At minimum, set:
# - DB_PASSWORD
# - JWT_SECRET (generate a strong random string)
```

### 3. Start PostgreSQL Database

```bash
# Using Docker Compose (recommended)
docker-compose up -d

# Or start PostgreSQL manually
# The Adminer interface will be at http://localhost:8080
```

### 4. Setup Backend

```bash
cd backend
npm install

# Run database migrations
npm run migrate

# Start development server
npm run dev

# Backend will run on http://localhost:5000
```

### 5. Setup Frontend (in another terminal)

```bash
cd frontend
npm install
npm start

# Frontend will run on http://localhost:3000
```

## System Access

### Default Users

The database includes sample users (see database migrations):

- **Admin**: admin@jorlen.com / password
- **Sales Agent**: sales@jorlen.com / password
- **Technician**: tech@jorlen.com / password
- **Finance**: finance@jorlen.com / password
- **Manager**: manager@jorlen.com / password

⚠️ **IMPORTANT**: Change these passwords in production!

### Access Points

| Component | URL | Purpose |
|-----------|-----|---------|
| Frontend | http://localhost:3000 | User interface |
| Backend API | http://localhost:5000 | API endpoints |
| Adminer | http://localhost:8080 | Database management |
| Health Check | http://localhost:5000/health | API status |

## Key Features Implemented

### ✅ Core Modules
- **Customer Management**: Complete customer profiles, contacts, subscriptions
- **Sales Pipeline**: Lead tracking with pipeline stages
- **Support Ticketing**: Service request management with SLA tracking
- **Project Management**: Installation and project tracking with milestones
- **Billing & Invoicing**: Invoice generation, payment tracking in UGX
- **Inventory**: Equipment and supply management
- **Reporting & Analytics**: Comprehensive dashboards and reports
- **User Management**: Role-based access control (5 roles)

### ✅ Technical Features
- JWT Authentication & Authorization
- Comprehensive Audit Logging
- RESTful API Architecture
- TypeScript for Type Safety
- Database Migrations
- Error Handling & Validation
- CORS & Security Headers
- Role-Based Access Control

## File Structure

```
jorlen/
├── README.md                    # Main documentation
├── ARCHITECTURE.md              # System design & API docs
├── .env.example                 # Configuration template
├── docker-compose.yml           # PostgreSQL + Adminer
│
├── backend/                     # Node.js/Express API
│   ├── src/
│   │   ├── config/             # Database config
│   │   ├── controllers/        # API request handlers
│   │   ├── services/           # Business logic
│   │   ├── routes/             # API endpoints
│   │   ├── middleware/         # Auth, audit, errors
│   │   ├── types/              # TypeScript interfaces
│   │   ├── utils/              # Helper functions
│   │   ├── migrations/         # Database schema
│   │   └── app.ts              # Express app
│   ├── package.json
│   ├── tsconfig.json
│   └── SETUP.md                # Backend setup guide
│
├── frontend/                    # React/TypeScript UI
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API client
│   │   ├── types/              # TypeScript types
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   ├── tailwind.config.js      # Tailwind CSS config
│   └── SETUP.md                # Frontend setup guide
│
└── shared/                      # Shared utilities (future)
```

## API Quick Reference

### Authentication
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@jorlen.com","password":"password"}'

# Response: { user: {...}, token: "eyJhbGc..." }
# Use token in Authorization header: Bearer <token>
```

### Example: Create a Customer
```bash
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your_token>" \
  -d '{
    "name": "ABC Limited",
    "email": "contact@abc.com",
    "phone": "+256700000001",
    "category": "Enterprise",
    "physical_address": "123 Main Street, Kampala"
  }'
```

### Key Endpoints
- `GET /api/customers` - List customers
- `POST /api/customers` - Create customer
- `GET /api/leads` - View sales leads
- `GET /api/tickets` - Support tickets
- `GET /api/invoices` - Invoicing
- `GET /api/reports/dashboard` - Dashboard analytics

See [ARCHITECTURE.md](ARCHITECTURE.md) for complete API documentation.

## Development Workflow

### Making Code Changes

1. **Backend Changes**
   - Edit files in `backend/src/`
   - Server auto-reloads with ts-node-dev
   - Changes are immediate

2. **Frontend Changes**
   - Edit files in `frontend/src/`
   - React dev server auto-reloads
   - Changes appear in browser instantly

3. **Database Changes**
   - Add migration SQL file in `backend/src/migrations/`
   - Run: `npm run migrate`

### Common Commands

```bash
# Backend
cd backend
npm run dev          # Start development server
npm run build        # Compile TypeScript
npm run lint         # Check code style
npm test             # Run tests

# Frontend
cd frontend
npm start            # Start dev server
npm run build        # Build for production
npm run lint         # Check code style

# Database
docker-compose up -d # Start PostgreSQL
docker-compose down  # Stop PostgreSQL
```

## Troubleshooting

### Port Already in Use
```bash
# Change ports in .env:
BACKEND_PORT=5001
# Frontend: REACT_APP_API_URL=http://localhost:5001/api

# Or kill process:
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error
```bash
# Verify PostgreSQL is running:
docker ps | grep postgres

# Check credentials in .env match docker-compose.yml
```

### TypeScript Compilation Error
```bash
# Clear cache and rebuild:
cd backend
rm -rf dist/
npm run build
```

### CORS Error
```bash
# Ensure frontend URL matches backend CORS config
# In backend/src/app.ts, cors() allows all origins in dev mode
```

## Next Steps

### To Extend the CRM:

1. **Add More Pages**
   - Create new components in `frontend/src/pages/`
   - Add routes in `frontend/src/AppLayout.tsx`

2. **Add APIs**
   - Create service class in `backend/src/services/`
   - Create controller in `backend/src/controllers/`
   - Create routes in `backend/src/routes/`

3. **Database Changes**
   - Add migration in `backend/src/migrations/`
   - Update TypeScript types in `backend/src/types/`

4. **Add Features**
   - Email notifications
   - SMS alerts via Twilio
   - WhatsApp integration
   - PDF report generation
   - Real-time WebSocket updates

## Deployment

### Production Checklist

- [ ] Change default user passwords
- [ ] Set strong JWT_SECRET
- [ ] Add environment-specific .env file
- [ ] Build frontend: `npm run build`
- [ ] Build backend: `npm run build`
- [ ] Set NODE_ENV=production
- [ ] Setup SSL/TLS certificates
- [ ] Configure database backup
- [ ] Setup reverse proxy (nginx)
- [ ] Enable rate limiting
- [ ] Configure logging/monitoring

## Support & Documentation

- **Architecture & API**: See [ARCHITECTURE.md](ARCHITECTURE.md)
- **Backend Setup**: See [backend/SETUP.md](backend/SETUP.md)
- **Frontend Setup**: See [frontend/SETUP.md](frontend/SETUP.md)
- **Database Schema**: See [backend/src/migrations/001_initial_schema.sql](backend/src/migrations/001_initial_schema.sql)

## License

Internal use only - Jorlen ICT Services Ltd

---

**System Version**: 1.0.0  
**Last Updated**: February 8, 2026  
**Built for**: Jorlen ICT Services Ltd
