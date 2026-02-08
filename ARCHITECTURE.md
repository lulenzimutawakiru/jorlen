# Jorlen CRM System - Architecture & Implementation Guide

## System Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: PostgreSQL 15
- **Authentication**: JWT
- **API Style**: RESTful

### Database Design

The system uses PostgreSQL with the following main tables:

#### 1. User Management
- `users` - System users with roles (admin, sales, technician, finance, management)

#### 2. Customer Management
- `customers` - Organization/individual customer profiles
- `customer_attachments` - Documents (contracts, SLAs, IDs)
- `customer_subscriptions` - Service subscriptions and contracts

#### 3. Sales & Leads
- `leads` - Sales pipeline leads
- `lead_activities` - Follow-ups and activities
- `quotations` - Sales quotations

#### 4. Service Management
- `support_tickets` - Customer support tickets
- `ticket_comments` - Ticket communications

#### 5. Project Management
- `projects` - Installation and project tracking
- `project_milestones` - Project phases and deliverables
- `project_attachments` - Diagrams, photos, configs

#### 6. Financial Management
- `invoices` - Customer invoices
- `payments` - Payment records

#### 7. Inventory Management
- `inventory_items` - Equipment and supplies
- `equipment_assignments` - Equipment allocation to projects/customers

#### 8. Audit & Compliance
- `audit_logs` - All system changes for compliance
- `customer_categories` - Customer segmentation

## API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
GET    /api/auth/profile           - Get current user profile
PUT    /api/auth/profile           - Update user profile
GET    /api/auth/users/all         - Get all users (admin only)
```

### Customers
```
GET    /api/customers              - List all customers
GET    /api/customers/:id          - Get customer details
GET    /api/customers/:id/subscriptions - Get customer subscriptions
POST   /api/customers              - Create customer (sales/admin)
PUT    /api/customers/:id          - Update customer (sales/admin)
DELETE /api/customers/:id          - Delete customer (admin only)
```

### Sales Leads
```
GET    /api/leads                  - List all leads
GET    /api/leads/:id              - Get lead details
GET    /api/leads/stage/:stage     - Get leads by pipeline stage
POST   /api/leads                  - Create lead (sales/admin)
PUT    /api/leads/:id              - Update lead (sales/admin)
```

### Support Tickets
```
GET    /api/tickets                - List all tickets
GET    /api/tickets/:id            - Get ticket details
GET    /api/tickets/:id/comments   - Get ticket comments
POST   /api/tickets                - Create ticket
PUT    /api/tickets/:id            - Update ticket (technician/admin)
POST   /api/tickets/:id/comments   - Add comment (technician/admin)
```

### Projects
```
GET    /api/projects               - List all projects
GET    /api/projects/:id           - Get project details
GET    /api/projects/:id/milestones - Get project milestones
GET    /api/projects/customer/:customerId - Get customer projects
POST   /api/projects               - Create project (admin/technician/management)
PUT    /api/projects/:id           - Update project (admin/technician)
```

### Invoicing
```
GET    /api/invoices               - List all invoices
GET    /api/invoices/:id           - Get invoice details
GET    /api/invoices/stats/revenue - Get revenue statistics
POST   /api/invoices               - Create invoice (admin/finance)
PUT    /api/invoices/:id           - Update invoice (admin/finance)
```

### Inventory
```
GET    /api/inventory              - List all items
GET    /api/inventory/:id          - Get item details
GET    /api/inventory/low-stock/items - Get low stock items
GET    /api/inventory/stats/overview - Get inventory statistics
POST   /api/inventory              - Create item (admin/technician)
PUT    /api/inventory/:id          - Update item (admin/technician)
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- PostgreSQL 12+
- Docker & Docker Compose (optional)

### Backend Setup

```bash
# Install dependencies
cd backend
npm install

# Copy environment template
cp ../.env.example ../.env

# Configure database in .env
# DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD

# Run database migrations
npm run migrate

# Start development server
npm run dev
```

### Frontend Setup

```bash
# Install dependencies
cd frontend
npm install

# Create .env file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start development server
npm start
```

### Docker Setup

```bash
# Start PostgreSQL and Adminer
docker-compose up -d

# Access Adminer at http://localhost:8080
# Default credentials in .env.example
```

## User Roles & Permissions

| Role | Customers | Leads | Tickets | Projects | Invoices | Inventory |
|------|-----------|-------|---------|----------|----------|-----------|
| Administrator | Full | Full | Full | Full | Full | Full |
| Sales | View/Create | Full | View | View | View | View |
| Technician | View | View | Full | Create/Update | View | Create/Update |
| Finance | View | View | View | View | Full | View |
| Management | View | View | View | View | View | View |

## Key Features

### 1. Customer Management
- Track customer profiles, contacts, and locations
- Maintain service history and active contracts
- Attach documents (contracts, SLAs, approvals)
- Monitor customer subscriptions

### 2. Sales Pipeline
- Capture leads from multiple sources
- Track pipeline stages (New → Won/Lost)
- Generate quotations and proposals
- Log follow-ups and meetings

### 3. Ticketing System
- Log and categorize service requests
- Assign to technicians
- Track SLA compliance
- Monitor resolution timelines

### 4. Project Tracking
- Manage ICT installations and projects
- Track milestones and deliverables
- Assign engineers and technicians
- Attach diagrams and configurations

### 5. Billing & Invoicing
- Generate invoices for services
- Track payments in UGX
- Monitor outstanding balances
- Generate receipts

### 6. Inventory Management
- Track equipment and supply stock
- Monitor reorder levels
- Assign equipment to projects
- Track warranties

### 7. Reporting & Analytics
- Sales pipeline reports
- Revenue and billing reports
- Technician productivity metrics
- SLA compliance dashboard

### 8. Audit & Compliance
- Complete audit logs
- User activity tracking
- Change documentation
- Data protection

## Development Workflow

### Adding a New Feature

1. **Database** - Create migration SQL file
2. **Backend Service** - Create service class with business logic
3. **Backend Controller** - Create controller for routes
4. **Backend Routes** - Define API endpoints
5. **Frontend Service** - Create API client handler
6. **Frontend Components** - Build UI components
7. **Frontend Pages** - Integrate pages

### Code Standards

- Use TypeScript strict mode
- Follow naming conventions
- Write async/await (no callback hell)
- Implement proper error handling
- Use meaningful variable names
- Add JSDoc comments for complex functions

## Security Considerations

1. **Authentication** - JWT tokens with expiration
2. **Authorization** - Role-based access control
3. **Validation** - Input validation on both client and server
4. **SQL Injection** - Use parameterized queries
5. **CORS** - Configured for frontend domain
6. **Helmet** - Security headers via Helmet.js
7. **Environment** - Sensitive data in .env files
8. **Audit Logs** - Track all critical actions

## Deployment

### Backend Deployment

```bash
npm run build
npm start
```

### Frontend Deployment

```bash
npm run build
# Deploy dist/ folder to CDN or static host
```

### Database Backup

```bash
pg_dump -U crm_user -h localhost jorlen_crm > backup.sql
```

## Troubleshooting

### Database Connection Error
- Verify PostgreSQL is running
- Check DB credentials in .env
- Ensure database exists: `createdb jorlen_crm`

### JWT Token Errors
- Verify JWT_SECRET is set in .env
- Check token hasn't expired
- Ensure Authorization header format: `Bearer <token>`

### CORS Errors
- Verify frontend URL in CORS config
- Check API endpoint URLs match

## Future Enhancements

1. Email & SMS notifications
2. WhatsApp integration
3. PDF invoice generation
4. Advanced reporting with charts
5. Mobile app (React Native)
6. Real-time notifications (WebSocket)
7. Document management system
8. Multi-language support
9. Recurring billing automation
10. Integration with ISP platforms
