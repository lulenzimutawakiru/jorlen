import express from 'express';
import { authenticateToken, authorizeRole } from '../middleware/auth';
import * as inventoryController from '../controllers/inventoryController';

const router = express.Router();

router.use(authenticateToken);

router.get('/', inventoryController.getAllItems);
router.get('/:id', inventoryController.getItemById);
router.get('/low-stock/items', inventoryController.getLowStockItems);
router.get('/stats/overview', inventoryController.getInventoryStats);

router.post('/', authorizeRole(['administrator', 'technician']), inventoryController.createItem);
router.put('/:id', authorizeRole(['administrator', 'technician']), inventoryController.updateItem);

export default router;
