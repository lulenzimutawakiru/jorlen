import { Request, Response } from 'express';
import { asyncHandler, getPaginationParams } from '../utils/helpers';
import { InvoiceService } from '../services/invoiceService';
import { auditLog } from '../middleware/audit';

export const getAllInvoices = asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = getPaginationParams(req.query);
  const invoices = await InvoiceService.getAllInvoices(limit, offset, req.query);
  const total = invoices.length; // Would need total count in real implementation

  res.json({
    data: invoices,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const getInvoiceById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const invoice = await InvoiceService.getInvoiceById(id);

  if (!invoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  res.json(invoice);
});

export const createInvoice = asyncHandler(async (req: Request, res: Response) => {
  const { customer_id, issue_date, due_date, total_amount_ugx } = req.body;

  if (!customer_id || !issue_date || !due_date || !total_amount_ugx) {
    return res.status(400).json({ error: 'Missing required invoice fields' });
  }

  const invoice = await InvoiceService.createInvoice({
    customer_id,
    issue_date,
    due_date,
    total_amount_ugx,
    ...req.body
  });

  await auditLog(req.user?.id, 'CREATE', 'invoice', invoice.id, null, invoice);

  res.status(201).json(invoice);
});

export const updateInvoice = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldInvoice = await InvoiceService.getInvoiceById(id);

  if (!oldInvoice) {
    return res.status(404).json({ error: 'Invoice not found' });
  }

  const updatedInvoice = await InvoiceService.updateInvoice(id, req.body);
  await auditLog(req.user?.id, 'UPDATE', 'invoice', id, oldInvoice, updatedInvoice);

  res.json(updatedInvoice);
});

export const getRevenueStats = asyncHandler(async (req: Request, res: Response) => {
  const totalRevenue = await InvoiceService.getTotalRevenue();
  const outstanding = await InvoiceService.getOutstandingBalance();

  res.json({
    total_revenue_ugx: totalRevenue,
    outstanding_balance_ugx: outstanding
  });
});
