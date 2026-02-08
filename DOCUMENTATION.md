# Jorlen CRM - Complete System Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [System Architecture](#system-architecture)
3. [Installation](#installation)
4. [Features](#features)
5. [API Documentation](#api-documentation)
6. [Database Schema](#database-schema)
7. [Deployment](#deployment)
8. [Support](#support)

---

## Overview

**Jorlen CRM** is an enterprise-grade Customer Relationship Management system purpose-built for ICT service providers. It's designed to streamline operations across customer management, sales, support, projects, billing, and inventory management.

### Quick Facts
- **Company**: Jorlen ICT Services Ltd
- **Industry**: Information & Communication Technology (ICT)
- **Currency**: Uganda Shilling (UGX)
- **Users**: 5000+ customer records, unlimited transactions
- **Tech**: React + Node.js + PostgreSQL
- **Status**: Production-ready

---

## System Architecture

### Technology Stack

```
Frontend: React 18 + TypeScript + Tailwind CSS
API: Node.js + Express + TypeScript
Database: PostgreSQL 15
Auth: JWT Tokens
Deployment: Docker
```

### Core Modules

| Module | Purpose | Key Features |
|--------|---------|-------------|
| **Customers** | Customer & org profiles | Contacts, subscriptions, documents, history |
| **Leads** | Sales pipeline management | Stages, quotations, follow-ups, forecasting |
| **Tickets** | Support request tracking | Priority, SLA, assignment, resolution |
| **Projects** | Installation & project management | Milestones, budgets, resource allocation |
| **Invoices** | Billing & payment tracking | UGX currency, payment methods, reports |
| **Inventory** | Equipment & supplies | Stock levels, reorders, asset tracking |
| **Reports** | Analytics & dashboards | Revenue, pipeline, performance metrics |
| **Users** | Team management | 5 roles, permissions, activity logs |

---

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn
- PostgreSQL 12+
- Docker & Docker Compose (optional)
- Git for version control

### Quick Start (Docker)

```bash
# 1. Start database
docker-compose up -d

# 2. Backend setup
cd backend
npm install
npm run migrate
npm run dev

# 3. Frontend setup (new terminal)
cd frontend
npm install
npm start
```

### Manual Setup

See detailed guides:
- [Backend Installation](backend/SETUP.md)
- [Frontend Installation](frontend/SETUP.md)
- [Database Setup](backend/src/migrations/001_initial_schema.sql)

---

## Features

### ✅ Customer Management
- **Profiles**: Organization/individual customer data
- **Contacts**: Multiple contact persons per customer
- **Categories**: SME, Enterprise, Government, Residential, Educational, Healthcare
- **Subscriptions**: Track active service subscriptions
- **Documents**: Attach contracts, IDs, SLAs, approvals
- **History**: Complete service history and interactions

### ✅ Sales Pipeline
- **Lead Capture**: From phone, email, WhatsApp, website, referrals
- **Pipeline Stages**: New → Qualified → Survey → Quote → Negotiation → Won/Lost
- **Quotations**: Generate and track sales proposals
- **Forecasting**: Estimated value and probability tracking
- **Activity Logging**: Follow-ups, meetings, reminders
- **Analytics**: Conversion rates, win/loss analysis

### ✅ Support Ticketing
- **Categories**: Network, Internet, Equipment, Configuration, Other
- **Priority**: Low, Medium, High, Critical
- **Status**: Open, In Progress, Resolved, Closed
- **SLA Tracking**: Response and resolution time monitoring
- **Comments**: Internal notes and client communication
- **Assignment**: Route to appropriate technicians

### ✅ Project Management
- **Tracking**: Installation and project lifecycle management
- **Milestones**: Deliverables and phase tracking
- **Resources**: Engineer and technician assignment
- **Budgets**: Cost tracking and variance analysis
- **Attachments**: Diagrams, photos, configurations
- **Completion**: Sign-off and documentation

### ✅ Billing & Invoicing
- **Invoice Types**: Standard, Proforma, Credit Notes
- **Generation**: One-time services, subscriptions, maintenance
- **Currency**: Uganda Shilling (UGX)
- **Payments**: Cash, bank transfer, mobile money
- **Tracking**: Receipt generation, payment confirmation
- **Reports**: Revenue, outstanding balance, aging analysis

### ✅ Inventory Management
- **Equipment**: Routers, switches, APs, cameras, cabling
- **Stock Control**: Quantity, reorder levels, alerts
- **Assignments**: Track equipment to projects/customers
- **Warranty**: Expiry tracking and maintenance
- **Valuation**: Cost and selling price tracking
- **Reports**: Stock levels, low stock alerts, value reports

### ✅ Reporting & Analytics
- **Dashboard**: KPI summary and trend monitoring
- **Sales Reports**: Pipeline, conversion, win/loss, forecasts
- **Financial Reports**: Revenue, billing, payment status
- **Support Reports**: Ticket metrics, SLA compliance, resolution time
- **Project Reports**: Status, budget vs. actual, completion rates
- **Inventory Reports**: Stock levels, reorder needs, valuations
- **User Performance**: Sales metrics, support resolution rates

### ✅ Security & Compliance
- **Authentication**: JWT-based with expiration
- **Authorization**: Role-based access control
- **Audit Logs**: Complete transaction history
- **Data Protection**: Encrypted passwords, secure queries
- **Backup**: Automated database backups
- **Compliance**: GDPR-style data protection

### ✅ User Management
- **Roles**: Administrator, Sales, Technician, Finance, Management
- **Permissions**: Role-specific access to modules
- **Activity Tracking**: Login history and actions
- **Team Management**: User creation and role assignment

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All endpoints (except `/auth/register` and `/auth/login`) require JWT token:

```bash
Authorization: Bearer <token>
```

### Response Format
```json
{
  "data": {...},
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

### Authentication Endpoints
```
POST   /auth/register              - Create user account
POST   /auth/login                 - Get JWT token
GET    /auth/profile               - Current user details
PUT    /auth/profile               - Update profile
GET    /auth/users/all             - List all users (admin)
```

### Customer Endpoints
```
GET    /customers                  - List customers (paginated)
GET    /customers/:id              - Get customer details
GET    /customers/:id/subscriptions - Active subscriptions
POST   /customers                  - Create customer
PUT    /customers/:id              - Update customer
DELETE /customers/:id              - Delete customer (admin)
```

### Lead Endpoints
```
GET    /leads                      - List all leads
GET    /leads/:id                  - Get lead details
GET    /leads/stage/:stage         - Filter by pipeline stage
POST   /leads                      - Create new lead
PUT    /leads/:id                  - Update lead
```

### Ticket Endpoints
```
GET    /tickets                    - List tickets
GET    /tickets/:id                - Get ticket details
GET    /tickets/:id/comments       - Ticket comments
POST   /tickets                    - Create ticket
PUT    /tickets/:id                - Update status/assignment
POST   /tickets/:id/comments       - Add comment
```

### Project Endpoints
```
GET    /projects                   - List all projects
GET    /projects/:id               - Get project details
GET    /projects/:id/milestones    - Get milestones
GET    /projects/customer/:id      - Customer's projects
POST   /projects                   - Create project
PUT    /projects/:id               - Update project
```

### Invoice Endpoints
```
GET    /invoices                   - List invoices
GET    /invoices/:id               - Get invoice details
GET    /invoices/stats/revenue     - Revenue statistics
POST   /invoices                   - Create invoice
PUT    /invoices/:id               - Update invoice
```

### Inventory Endpoints
```
GET    /inventory                  - List items
GET    /inventory/:id              - Get item details
GET    /inventory/low-stock/items  - Low stock items
GET    /inventory/stats/overview   - Statistics
POST   /inventory                  - Create item
PUT    /inventory/:id              - Update item
```

### Report Endpoints
```
GET    /reports/dashboard          - Dashboard summary
GET    /reports/customers          - Customer analytics
GET    /reports/sales-pipeline     - Sales pipeline stats
GET    /reports/support-tickets    - Ticket metrics
GET    /reports/financial          - Financial statistics
GET    /reports/projects           - Project statistics
GET    /reports/inventory          - Inventory statistics
GET    /reports/performance        - User performance
```

---

## Database Schema

### Tables Overview

**User System**
- `users` - System users with roles
- `audit_logs` - Activity tracking

**Customer Data**
- `customers` - Customer profiles
- `customer_attachments` - Documents
- `customer_subscriptions` - Service subscriptions
- `customer_categories` - Segmentation

**Sales**
- `leads` - Sales leads and opportunities
- `lead_activities` - Follow-ups and meetings
- `quotations` - Sales proposals

**Support**
- `support_tickets` - Service requests
- `ticket_comments` - Communications

**Projects**
- `projects` - Installations and projects
- `project_milestones` - Deliverables
- `project_attachments` - Documentation

**Financial**
- `invoices` - Customer bills
- `payments` - Payment records

**Inventory**
- `inventory_items` - Equipment and supplies
- `equipment_assignments` - Asset allocation

For complete schema, see [/backend/src/migrations/001_initial_schema.sql](/backend/src/migrations/001_initial_schema.sql)

---

## Deployment

### Development Setup
```bash
npm run dev  # Backend
npm start    # Frontend
```

### Production Build
```bash
# Backend
npm run build
npm start

# Frontend
npm run build
# Deploy 'build/' folder to CDN/hosting
```

### Docker Deployment
```bash
docker build -t jorlen-crm-backend ./backend
docker build -t jorlen-crm-frontend ./frontend
docker run -p 5000:5000 jorlen-crm-backend
docker run -p 3000:3000 jorlen-crm-frontend
```

### Environment Variables
Create `.env` in project root:
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jorlen_crm
DB_USER=crm_user
DB_PASSWORD=secure_password

# API
BACKEND_PORT=5000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000

# Authentication
JWT_SECRET=super_secret_key_change_in_production
JWT_EXPIRE=7d

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=app_password

# SMS/WhatsApp (optional)
SMS_API_KEY=your_api_key
WHATSAPP_API_KEY=your_api_key
```

---

## Support

### Documentation Files
- [Quick Start Guide](QUICKSTART.md)
- [System Architecture](ARCHITECTURE.md)
- [Backend Setup](backend/SETUP.md)
- [Frontend Setup](frontend/SETUP.md)

### Getting Help
1. Check relevant setup guide
2. Review API documentation in [ARCHITECTURE.md](ARCHITECTURE.md)
3. Check database schema in migrations
4. Review error logs in console/terminal

### Reporting Issues
Include:
- Clear description of issue
- Steps to reproduce
- Error messages
- Environment details (OS, Node version, etc.)

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | Feb 8, 2026 | Initial release with all core modules |

---

## License

Internal use only. All rights reserved by Jorlen ICT Services Ltd.

© 2026 Jorlen ICT Services Ltd
