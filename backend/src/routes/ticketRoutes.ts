import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as ticketController from '../controllers/ticketController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', ticketController.getAllTickets);
router.get('/:id', ticketController.getTicketById);
router.get('/:id/comments', ticketController.getTicketComments);

router.post('/', authorizeRole(['administrator', 'sales', 'technician']), ticketController.createTicket);
router.put('/:id', authorizeRole(['administrator', 'technician']), ticketController.updateTicket);
router.post('/:id/comments', authorizeRole(['administrator', 'technician']), ticketController.addComment);

export default router;
