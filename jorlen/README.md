# Jorlen ICT Services CRM System

Enterprise-grade Customer Relationship Management system for Jorlen ICT Services Ltd, an ICT service provider delivering networking, internet services, IT support, cybersecurity, cloud solutions, and digital infrastructure projects.

## 🎯 Quick Overview

A comprehensive CRM purpose-built for ICT service providers with modules for:
- **Customer Management** - Client profiles, subscriptions, documents
- **Sales Pipeline** - Lead tracking, quotations, forecasting  
- **Support Ticketing** - Service requests with SLA tracking
- **Project Management** - Installation tracking with milestones
- **Billing & Invoicing** - Invoice generation, payment tracking (UGX)
- **Inventory Management** - Equipment tracking and stock control
- **Reporting & Analytics** - Dashboards and comprehensive reports
- **User Management** - Role-based access control

## 📊 Tech Stack

```
Frontend:    React 18 + TypeScript + Tailwind CSS
Backend:     Node.js + Express + TypeScript  
Database:    PostgreSQL 15
Auth:        JWT Tokens
Deployment:  Docker
Currency:    Uganda Shilling (UGX)
```

## 🚀 Quick Start (5 minutes)

### Prerequisites
- Node.js 16+
- PostgreSQL 12+ (or Docker)
- npm/yarn

### Setup

```bash
# 1. Start PostgreSQL
docker-compose up -d

# 2. Backend
cd backend && npm install && npm run migrate && npm run dev

# 3. Frontend (new terminal)
cd frontend && npm install && npm start
```

**Access the system:**
- Frontend: http://localhost:3000
- API: http://localhost:5000
- Database: http://localhost:8080 (Adminer)

**Default Login:**
- Email: admin@jorlen.com
- Password: password

⚠️ Change default passwords in production!

## 📁 Project Structure

```
jorlen/
├── backend/          # Express API + TypeScript
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── services/       # Business logic
│   │   ├── routes/         # API endpoints
│   │   ├── middleware/     # Auth, audit
│   │   ├── types/          # TypeScript interfaces
│   │   ├── migrations/     # Database schema
│   │   └── app.ts          # Express app
│   └── package.json
│
├── frontend/         # React + TypeScript
│   ├── src/
│   │   ├── pages/          # Page components
│   │   ├── components/     # Reusable components
│   │   ├── services/       # API client
│   │   └── App.tsx
│   └── package.json
│
├── docker-compose.yml
├── .env.example
├── QUICKSTART.md          # Quick setup guide
├── DOCUMENTATION.md       # Complete documentation
└── ARCHITECTURE.md        # System design & API docs
```

## 🔑 Core Features

### ✅ Customer Management
- Individual and corporate profiles
- Multiple contacts per customer
- Service history and subscriptions
- Document attachments (contracts, SLAs)
- Customer categorization

### ✅ Sales Pipeline
- Multi-stage sales funnel
- Lead qualification and tracking
- Quotation generation
- Win/loss analysis
- Activity logging and follow-ups

### ✅ Support Ticketing
- Service request categorization
- Priority-based assignment
- SLA compliance monitoring
- Comment threads
- Resolution tracking

### ✅ Project Tracking
- Installation management
- Milestone tracking
- Budget vs. actual
- Resource allocation
- Photo and diagram attachments

### ✅ Billing (in UGX)
- Invoice generation
- Payment tracking (cash, bank, mobile money)
- Receipt generation
- Outstanding balance reports

### ✅ Inventory Management
- Equipment stock tracking
- Reorder alerts
- Warranty management
- Asset assignment to projects
- Stock valuation

### ✅ Analytics & Reporting
- Dashboard with KPIs
- Sales pipeline reports
- Financial reports
- Support metrics
- User performance tracking

### ✅ Security & Compliance
- JWT authentication
- Role-based access control
- Audit logging
- User activity tracking
- Encrypted passwords

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Administrator** | Full system access |
| **Sales Team** | Customer, lead, quotation management |
| **Technicians** | Ticket, project management |
| **Finance** | Invoicing and payment tracking |
| **Management** | Reporting and analytics |

## 📡 API Endpoints

All endpoints require JWT authentication except login/register.

### Authentication
```
POST   /api/auth/login              - Login user
POST   /api/auth/register           - Register new user
GET    /api/auth/profile            - Get user profile
```

### Customer Management
```
GET    /api/customers               - List customers
POST   /api/customers               - Create customer
GET    /api/customers/:id           - Get customer
PUT    /api/customers/:id           - Update customer
GET    /api/customers/:id/subscriptions - Get subscriptions
```

### Sales
```
GET    /api/leads                   - List leads
POST   /api/leads                   - Create lead
GET    /api/leads/stage/:stage      - Filter by stage
```

### Support
```
GET    /api/tickets                 - List tickets
POST   /api/tickets                 - Create ticket
POST   /api/tickets/:id/comments    - Add comment
```

### Projects
```
GET    /api/projects                - List projects
POST   /api/projects                - Create project
GET    /api/projects/:id/milestones - Get milestones
```

### Financial
```
GET    /api/invoices                - List invoices
POST   /api/invoices                - Create invoice
GET    /api/invoices/stats/revenue  - Revenue stats
```

### Inventory
```
GET    /api/inventory               - List items
POST   /api/inventory               - Create item
GET    /api/inventory/low-stock/items - Low stock alerts
```

### Reporting
```
GET    /api/reports/dashboard       - Dashboard stats
GET    /api/reports/sales-pipeline  - Sales analytics
GET    /api/reports/financial       - Financial stats
GET    /api/reports/performance     - User performance
```

For complete API documentation, see [ARCHITECTURE.md](ARCHITECTURE.md).

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [QUICKSTART.md](QUICKSTART.md) | 5-minute setup guide |
| [DOCUMENTATION.md](DOCUMENTATION.md) | Complete system docs |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical design & API |
| [backend/SETUP.md](backend/SETUP.md) | Backend setup guide |
| [frontend/SETUP.md](frontend/SETUP.md) | Frontend setup guide |

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev        # Start dev server (with auto-reload)
npm run build      # Compile TypeScript
npm run lint       # Check code style
npm test           # Run tests
```

### Frontend Development
```bash
cd frontend
npm start          # Start dev server
npm run build      # Build for production
npm run lint       # Check code style
```

### Database Management
```bash
# Start database
docker-compose up -d

# Run migrations
cd backend && npm run migrate

# Access Adminer (web interface)
# http://localhost:8080
```

## 🚢 Deployment

### Production Build
```bash
# Backend
cd backend
npm run build
NODE_ENV=production npm start

# Frontend
cd frontend
npm run build
# Deploy 'build/' folder to CDN/web server
```

### Environment Configuration
Create `.env` file with production values:
```bash
DB_HOST=your_db_host
DB_PASSWORD=secure_password
JWT_SECRET=strong_random_secret
NODE_ENV=production
BACKEND_PORT=5000
```

### Docker Deployment
```bash
docker-compose up -d
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in .env or kill process
lsof -ti:5000 | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
docker ps | grep postgres

# Verify credentials in .env
```

### CORS Error
The system is configured for `http://localhost:3000` in development. For other origins, update CORS config in `backend/src/app.ts`.

## 📋 Checklist - Before Production

- [ ] Change default user passwords
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS/SSL
- [ ] Configure email notifications
- [ ] Setup database backups
- [ ] Configure logging & monitoring
- [ ] Run security audit
- [ ] Load test the system
- [ ] Document custom configurations
- [ ] Setup monitoring/alerts

## 🔒 Security

- **Authentication**: JWT tokens with expiration
- **Authorization**: Role-based access control  
- **Validation**: Input validation on client and server
- **SQL Prevention**: Parameterized queries
- **Security Headers**: Helmet.js
- **Audit Logs**: Complete action tracking
- **Data Protection**: Encrypted passwords

## 📞 Support & Maintenance

### Reporting Issues
Include:
- Clear issue description
- Steps to reproduce
- Error messages
- Environment details

### Updates & Maintenance
- Check documentation for latest setup
- Review changelogs before upgrades
- Test in development before production
- Backup database before major changes

## 📈 Future Enhancements

- Email & SMS notifications
- WhatsApp integration  
- PDF report generation
- Advanced analytics with charts
- Mobile app (React Native)
- Real-time notifications (WebSocket)
- Document management system
- Multi-language support
- Recurring billing automation
- ISP integration

## 📄 License

Internal use only. All rights reserved by Jorlen ICT Services Ltd.

---

**Version**: 1.0.0  
**Last Updated**: February 8, 2026  
**Company**: Jorlen ICT Services Ltd  
**Currency**: Uganda Shilling (UGX)

