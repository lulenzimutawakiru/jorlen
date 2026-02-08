import { Request, Response } from 'express';
import { asyncHandler, getPaginationParams } from '../utils/helpers';
import { ProjectService } from '../services/projectService';
import { auditLog } from '../middleware/audit';

export const getAllProjects = asyncHandler(async (req: Request, res: Response) => {
  const { limit, offset } = getPaginationParams(req.query);
  const projects = await ProjectService.getAllProjects(limit, offset, req.query);

  res.json({
    data: projects,
    pagination: {
      page: Math.floor(offset / limit) + 1,
      limit,
      total: projects.length,
      pages: Math.ceil(projects.length / limit)
    }
  });
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await ProjectService.getProjectById(id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.json(project);
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const { customer_id, title, start_date } = req.body;

  if (!customer_id || !title || !start_date) {
    return res.status(400).json({ error: 'Customer ID, title, and start date are required' });
  }

  const project = await ProjectService.createProject(req.body);
  await auditLog(req.user?.id, 'CREATE', 'project', project.id, null, project);

  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const oldProject = await ProjectService.getProjectById(id);

  if (!oldProject) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const updatedProject = await ProjectService.updateProject(id, req.body);
  await auditLog(req.user?.id, 'UPDATE', 'project', id, oldProject, updatedProject);

  res.json(updatedProject);
});

export const getProjectsByCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const projects = await ProjectService.getProjectsByCustomer(customerId);

  res.json(projects);
});

export const getProjectMilestones = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const project = await ProjectService.getProjectById(id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const milestones = await ProjectService.getProjectMilestones(id);
  res.json(milestones);
});
