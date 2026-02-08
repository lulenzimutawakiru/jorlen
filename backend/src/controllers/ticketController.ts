import { Request, Response } from 'express';
import { asyncHandler, getPaginationParams } from '../utils/helpers';
import { TicketService } from '../services/ticketService';
import { auditLog } from '../middleware/audit';

export const getAllTickets = asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = getPaginationParams(req.query);
  const tickets = await TicketService.getAllTickets(limit, offset, req.query);
  const total = await TicketService.getOpenTicketsCount();

  res.json({
    data: tickets,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const getTicketById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await TicketService.getTicketById(id);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  res.json(ticket);
});

export const createTicket = asyncHandler(async (req: Request, res: Response) => {
  const { customer_id, title, description, issue_category, priority } = req.body;

  if (!customer_id || !title) {
    return res.status(400).json({ error: 'Customer ID and title are required' });
  }

  const ticket = await TicketService.createTicket({
    customer_id,
    title,
    description,
    issue_category,
    priority
  });

  await auditLog(req.user?.id, 'CREATE', 'ticket', ticket.id, null, ticket);

  res.status(201).json(ticket);
});

export const updateTicket = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldTicket = await TicketService.getTicketById(id);

  if (!oldTicket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  const updatedTicket = await TicketService.updateTicket(id, req.body);
  await auditLog(req.user?.id, 'UPDATE', 'ticket', id, oldTicket, updatedTicket);

  res.json(updatedTicket);
});

export const addComment = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: 'Comment is required' });
  }

  const ticket = await TicketService.getTicketById(id);
  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  const newComment = await TicketService.addComment(id, comment, req.user.id);
  res.status(201).json(newComment);
});

export const getTicketComments = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const ticket = await TicketService.getTicketById(id);

  if (!ticket) {
    return res.status(404).json({ error: 'Ticket not found' });
  }

  const comments = await TicketService.getTicketComments(id);
  res.json(comments);
});
