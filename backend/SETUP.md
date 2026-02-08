# Backend Setup Guide

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # PostgreSQL connection
│   ├── models/                  # Database models (future)
│   ├── services/                # Business logic
│   │   ├── authService.ts
│   │   ├── customerService.ts
│   │   ├── leadService.ts
│   │   ├── ticketService.ts
│   │   ├── projectService.ts
│   │   ├── invoiceService.ts
│   │   └── inventoryService.ts
│   ├── controllers/             # Route handlers
│   │   ├── authController.ts
│   │   ├── customerController.ts
│   │   ├── leadController.ts
│   │   ├── ticketController.ts
│   │   ├── projectController.ts
│   │   ├── invoiceController.ts
│   │   └── inventoryController.ts
│   ├── routes/                  # API routes
│   │   ├── authRoutes.ts
│   │   ├── customerRoutes.ts
│   │   ├── leadRoutes.ts
│   │   ├── ticketRoutes.ts
│   │   ├── projectRoutes.ts
│   │   ├── invoiceRoutes.ts
│   │   └── inventoryRoutes.ts
│   ├── middleware/              # Express middleware
│   │   ├── auth.ts              # Authentication & authorization
│   │   ├── audit.ts             # Audit logging
│   │   └── errorHandler.ts      # Error handling
│   ├── types/                   # TypeScript interfaces
│   │   └── index.ts
│   ├── utils/                   # Helper functions
│   │   └── helpers.ts
│   ├── migrations/              # Database migrations
│   │   └── 001_initial_schema.sql
│   └── app.ts                   # Express app setup
├── package.json
├── tsconfig.json
├── .eslintrc.json
└── SETUP.md
```

## Installation

```bash
cd backend
npm install
```

## Database Setup

### Using Docker Compose

```bash
cd .. && docker-compose up -d
```

This starts PostgreSQL and Adminer.

### Manual PostgreSQL Setup

```bash
# Create database
createdb jorlen_crm

# Create user
createuser -P crm_user
# Enter password when prompted

# Connect and run migrations
psql -U crm_user -d jorlen_crm < src/migrations/001_initial_schema.sql
```

### Environment Configuration

Copy `.env.example` to `.env` and update:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=jorlen_crm
DB_USER=crm_user
DB_PASSWORD=<your_password>

BACKEND_PORT=5000
NODE_ENV=development
JWT_SECRET=<your_secret_key>
JWT_EXPIRE=7d
```

## Development

```bash
npm run dev
# Backend runs on http://localhost:5000
```

## Building

```bash
npm run build
# Creates TypeScript output in dist/
```

## Running Production Build

```bash
npm run build
npm start
```

## Database Operations

### Create Migration

```bash
# Create SQL file in src/migrations/
# Example: 002_add_columns.sql
```

### Run Migration

```bash
npm run migrate
```

### Query Examples

Connect using Adminer or psql:

```sql
-- See all customers
SELECT * FROM customers;

-- See tickets by customer
SELECT * FROM support_tickets WHERE customer_id = '...' ORDER BY created_at DESC;

-- Calculate total revenue
SELECT SUM(total_amount_ugx) FROM invoices WHERE payment_status = 'paid';

-- Low stock inventory
SELECT * FROM inventory_items WHERE quantity_in_stock <= reorder_level;
```

## API Testing

### Using cURL

```bash
# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'

# Create customer (with token)
curl -X POST http://localhost:5000/api/customers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "name": "ABC Company",
    "email": "contact@abc.com",
    "phone": "+256700000001",
    "category": "SME"
  }'
```

### Using Postman

Import the API endpoints and use the JWT token in the Authorization header.

## Logging

Logs are printed to console in development. Configure logging service for production:

```typescript
// Add winston or pino for production logging
npm install winston
```

## Error Handling

All errors are caught and formatted consistently:

```json
{
  "error": "Error message",
  "status": 400,
  "timestamp": "2024-02-08T10:30:00Z"
}
```

## Security

1. **JWT Tokens** - Set strong JWT_SECRET in .env
2. **Password Hashing** - Uses bcryptjs (10 salt rounds)
3. **CORS** - Configured for your frontend URL
4. **SQL Injection** - Uses parameterized queries
5. **Request Validation** - Validate all inputs
6. **Helmet** - Security headers enabled

## Key Dependencies

- **express** - Web framework
- **pg-promise** - PostgreSQL driver
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **cors** - Cross-origin requests
- **helmet** - Security headers
- **express-validator** - Input validation
- **multer** - File uploads
- **TypeScript** - Type safety

## Troubleshooting

### Database Connection Refused
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Or with Docker
docker ps | grep postgres
```

### Port Already in Use
```bash
# Change port in .env
BACKEND_PORT=5001

# Or kill process using port
lsof -ti:5000 | xargs kill -9
```

### JWT Token Invalid
- Ensure JWT_SECRET is consistent
- Check token hasn't expired
- Verify Authorization header format: `Bearer <token>`

### TypeScript Errors
```bash
# Rebuild
npm run build

# Or clear cache
rm -rf dist/ && npm run build
```

## Next Steps

1. Add request validation middleware
2. Implement file upload handling
3. Add email service integration
4. Create background job queue (Bull)
5. Add caching layer (Redis)
6. Implement API rate limiting
7. Add API documentation (Swagger/OpenAPI)
8. Write unit tests (Jest)
9. Add integration tests
10. Setup CI/CD pipeline

## Support

For issues or questions, check:
- Database logs: `docker logs jorlen_crm_db`
- Application logs: Check console output
- TypeScript errors: `npm run build`
