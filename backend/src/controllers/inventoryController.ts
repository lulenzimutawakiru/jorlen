import { Request, Response } from 'express';
import { asyncHandler, getPaginationParams } from '../utils/helpers';
import { InventoryService } from '../services/inventoryService';
import { auditLog } from '../middleware/audit';

export const getAllItems = asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = getPaginationParams(req.query);
  const items = await InventoryService.getAllItems(limit, offset, req.query);

  res.json({
    data: items,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total: items.length
    }
  });
});

export const getItemById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await InventoryService.getItemById(id);

  if (!item) {
    return res.status(404).json({ error: 'Inventory item not found' });
  }

  res.json(item);
});

export const createItem = asyncHandler(async (req: Request, res: Response) => {
  const { item_code, name, category } = req.body;

  if (!item_code || !name || !category) {
    return res.status(400).json({ error: 'Item code, name, and category are required' });
  }

  const item = await InventoryService.createItem(req.body);
  await auditLog(req.user?.id, 'CREATE', 'inventory_item', item.id, null, item);

  res.status(201).json(item);
});

export const updateItem = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldItem = await InventoryService.getItemById(id);

  if (!oldItem) {
    return res.status(404).json({ error: 'Inventory item not found' });
  }

  const updatedItem = await InventoryService.updateItem(id, req.body);
  await auditLog(req.user?.id, 'UPDATE', 'inventory_item', id, oldItem, updatedItem);

  res.json(updatedItem);
});

export const getLowStockItems = asyncHandler(async (req: Request, res: Response) => {
  const items = await InventoryService.getLowStockItems();
  res.json(items);
});

export const getInventoryStats = asyncHandler(async (req: Request, res: Response) => {
  const totalValue = await InventoryService.getTotalInventoryValue();
  const lowStockItems = await InventoryService.getLowStockItems();

  res.json({
    total_inventory_value_ugx: totalValue,
    low_stock_items_count: lowStockItems.length,
    low_stock_items: lowStockItems
  });
});
