import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { auditMiddleware } from './middleware/audit';

// Import routes
import authRoutes from './routes/authRoutes';
import customerRoutes from './routes/customerRoutes';
import leadRoutes from './routes/leadRoutes';
import ticketRoutes from './routes/ticketRoutes';
import projectRoutes from './routes/projectRoutes';
import invoiceRoutes from './routes/invoiceRoutes';
import inventoryRoutes from './routes/inventoryRoutes';
import reportRoutes from './routes/reportRoutes';

dotenv.config();

const app: Express = express();
const PORT = process.env.BACKEND_PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auditMiddleware);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Jorlen CRM Backend is running', timestamp: new Date().toISOString() });
});

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Jorlen ICT Services CRM API',
    version: '1.0.0',
    company: 'Jorlen ICT Services Ltd',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      customers: '/api/customers',
      leads: '/api/leads',
      tickets: '/api/tickets',
      projects: '/api/projects',
      invoices: '/api/invoices',
      inventory: '/api/inventory',
      reports: '/api/reports'
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/reports', reportRoutes);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500,
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`✓ Jorlen CRM Backend running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API Documentation available at http://localhost:${PORT}`);
});

export default app;
