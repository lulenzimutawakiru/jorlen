import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as leadController from '../controllers/leadController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', leadController.getAllLeads);
router.get('/:id', leadController.getLeadById);
router.get('/stage/:stage', leadController.getLeadsByStage);

router.post('/', authorizeRole(['administrator', 'sales']), leadController.createLead);
router.put('/:id', authorizeRole(['administrator', 'sales']), leadController.updateLead);

export default router;
