import { Request, Response } from 'express';
import { asyncHandler, getPaginationParams } from '../utils/helpers';
import { CustomerService } from '../services/customerService';
import { auditLog } from '../middleware/audit';

export const getAllCustomers = asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = getPaginationParams(req.query);
  const customers = await CustomerService.getAllCustomers(limit, offset);
  const total = await CustomerService.getCustomerCount();

  res.json({
    data: customers,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
});

export const getCustomerById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await CustomerService.getCustomerById(id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  res.json(customer);
});

export const createCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, email, phone, physical_address, city, country, postal_code, contact_person_name, contact_person_phone, contact_person_email, tax_id, registration_number, notes } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Customer name is required' });
  }

  const customer = await CustomerService.createCustomer({
    name,
    category,
    email,
    phone,
    physical_address,
    city,
    country,
    postal_code,
    contact_person_name,
    contact_person_phone,
    contact_person_email,
    tax_id,
    registration_number,
    notes
  });

  await auditLog(req.user?.id, 'CREATE', 'customer', customer.id, null, customer);

  res.status(201).json(customer);
});

export const updateCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldCustomer = await CustomerService.getCustomerById(id);

  if (!oldCustomer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const updatedCustomer = await CustomerService.updateCustomer(id, req.body);
  await auditLog(req.user?.id, 'UPDATE', 'customer', id, oldCustomer, updatedCustomer);

  res.json(updatedCustomer);
});

export const deleteCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await CustomerService.getCustomerById(id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  await CustomerService.deleteCustomer(id);
  await auditLog(req.user?.id, 'DELETE', 'customer', id, customer, null);

  res.json({ message: 'Customer deleted successfully' });
});

export const getCustomerSubscriptions = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const customer = await CustomerService.getCustomerById(id);

  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }

  const subscriptions = await CustomerService.getCustomerSubscriptions(id);
  res.json(subscriptions);
});
