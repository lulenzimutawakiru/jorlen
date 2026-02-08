import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as customerController from '../controllers/customerController';

const router = express.Router();

// All customer routes require authentication
router.use(authenticateToken);

// GET all customers
router.get('/', customerController.getAllCustomers);

// GET customer by ID
router.get('/:id', customerController.getCustomerById);

// GET customer subscriptions
router.get('/:id/subscriptions', customerController.getCustomerSubscriptions);

// POST create customer (Sales and Admin only)
router.post('/', authorizeRole(['administrator', 'sales']), customerController.createCustomer);

// PUT update customer (Sales and Admin only)
router.put('/:id', authorizeRole(['administrator', 'sales']), customerController.updateCustomer);

// DELETE customer (Admin only)
router.delete('/:id', authorizeRole(['administrator']), customerController.deleteCustomer);

export default router;
