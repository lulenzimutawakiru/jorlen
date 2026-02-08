import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public message: string,
    public status: number
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
  return phoneRegex.test(phone);
};

export const formatCurrency = (amount: number, currency: string = 'UGX'): string => {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const generateTicketNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TKT-${timestamp}-${random}`;
};

export const generateInvoiceNumber = (): string => {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(5, '0');
  return `INV-${year}${month}-${random}`;
};

export const generateProjectCode = (): string => {
  const timestamp = Date.now().toString().slice(-4);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `PRJ-${timestamp}-${random}`;
};

export const calculateSLABreach = (createdAt: Date, slaHours: number): boolean => {
  const now = new Date();
  const timeDiff = now.getTime() - new Date(createdAt).getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);
  return hoursDiff > slaHours;
};

export const getPaginationParams = (query: any) => {
  const page = Math.max(1, parseInt(query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit) || 10));
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};
