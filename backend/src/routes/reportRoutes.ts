import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as reportController from '../controllers/reportController';

const router = express.Router();

router.use(authenticateToken);

// All reporting endpoints are read-only, accessible to authorized users
router.get('/dashboard', authorizeRole(['administrator', 'management']), reportController.getDashboardSummary);
router.get('/customers', authorizeRole(['administrator', 'sales', 'management']), reportController.getCustomerStats);
router.get('/sales-pipeline', authorizeRole(['administrator', 'sales', 'management']), reportController.getSalesPipelineStats);
router.get('/support-tickets', authorizeRole(['administrator', 'technician', 'management']), reportController.getTicketStats);
router.get('/financial', authorizeRole(['administrator', 'finance', 'management']), reportController.getFinancialStats);
router.get('/projects', authorizeRole(['administrator', 'technician', 'management']), reportController.getProjectStats);
router.get('/inventory', authorizeRole(['administrator', 'technician']), reportController.getInventoryStats);
router.get('/performance', authorizeRole(['administrator', 'management']), reportController.getUserPerformance);

export default router;
