import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as invoiceController from '../controllers/invoiceController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', invoiceController.getAllInvoices);
router.get('/:id', invoiceController.getInvoiceById);
router.get('/stats/revenue', invoiceController.getRevenueStats);

router.post('/', authorizeRole(['administrator', 'finance']), invoiceController.createInvoice);
router.put('/:id', authorizeRole(['administrator', 'finance']), invoiceController.updateInvoice);

export default router;
