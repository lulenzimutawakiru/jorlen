import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as projectController from '../controllers/projectController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.get('/:id/milestones', projectController.getProjectMilestones);
router.get('/customer/:customerId', projectController.getProjectsByCustomer);

router.post('/', authorizeRole(['administrator', 'technician', 'management']), projectController.createProject);
router.put('/:id', authorizeRole(['administrator', 'technician']), projectController.updateProject);

export default router;
