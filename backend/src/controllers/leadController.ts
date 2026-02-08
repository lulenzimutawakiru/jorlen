import { Request, Response } from 'express';
import { asyncHandler, getPaginationParams } from '../utils/helpers';
import { LeadService } from '../services/leadService';
import { auditLog } from '../middleware/audit';

export const getAllLeads = asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = getPaginationParams(req.query);
  const leads = await LeadService.getAllLeads(limit, offset, req.query);
  const total = await LeadService.getLeadsCount();

  res.json({
    data: leads,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const getLeadById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const lead = await LeadService.getLeadById(id);

  if (!lead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  res.json(lead);
});

export const createLead = asyncHandler(async (req: Request, res: Response) => {
  const { title, company_name, contact_name, contact_email, contact_phone, service_interested, estimated_value_ugx, source } = req.body;

  if (!title || !contact_name) {
    return res.status(400).json({ error: 'Title and contact name are required' });
  }

  const lead = await LeadService.createLead({
    title,
    company_name,
    contact_name,
    contact_email,
    contact_phone,
    service_interested,
    estimated_value_ugx,
    source
  });

  await auditLog(req.user?.id, 'CREATE', 'lead', lead.id, null, lead);

  res.status(201).json(lead);
});

export const updateLead = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldLead = await LeadService.getLeadById(id);

  if (!oldLead) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  const updatedLead = await LeadService.updateLead(id, req.body);
  await auditLog(req.user?.id, 'UPDATE', 'lead', id, oldLead, updatedLead);

  res.json(updatedLead);
});

export const getLeadsByStage = asyncHandler(async (req: Request, res: Response) => {
  const { stage } = req.params;
  const leads = await LeadService.getLeadsByStage(stage);
  res.json(leads);
});
