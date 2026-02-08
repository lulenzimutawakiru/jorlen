import { Request, Response } from 'express';
import { asyncHandler } from '../utils/helpers';
import { ReportService } from '../services/reportService';

export const getDashboardSummary = asyncHandler(async (req: Request, res: Response) => {
  const summary = await ReportService.getDashboardSummary();
  res.json(summary);
});

export const getCustomerStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getCustomerStats();
  res.json(stats);
});

export const getSalesPipelineStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getSalesPipelineStats();
  res.json(stats);
});

export const getTicketStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getTicketStats();
  res.json(stats);
});

export const getFinancialStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getFinancialStats();
  res.json(stats);
});

export const getProjectStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getProjectStats();
  res.json(stats);
});

export const getInventoryStats = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getInventoryStats();
  res.json(stats);
});

export const getUserPerformance = asyncHandler(async (req: Request, res: Response) => {
  const stats = await ReportService.getUserPerformance();
  res.json(stats);
});
