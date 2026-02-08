import { Request, Response } from 'express';
import { asyncHandler } from '../utils/helpers';
import { AuthService } from '../services/authService';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, firstName, lastName, role } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const user = await AuthService.registerUser(email, password, firstName, lastName, role || 'staff');
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await AuthService.loginUser(email, password);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const user = await AuthService.getUserById(req.user.id);
  res.json(user);
});

export const updateProfile = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const updatedUser = await AuthService.updateUserProfile(req.user.id, req.body);
  res.json(updatedUser);
});

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await AuthService.getAllUsers();
  res.json(users);
});
