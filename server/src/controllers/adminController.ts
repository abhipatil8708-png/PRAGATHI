import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AdminService } from '../services/adminService';
import { Role, UserStatus } from '@prisma/client';

const querySchema = z.object({
  role: z.enum(['ADMIN', 'HOD', 'FACULTY', 'STUDENT']).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
  page: z.string().regex(/^\d+$/).transform(Number).optional(),
  limit: z.string().regex(/^\d+$/).transform(Number).optional(),
});

const statusSchema = z.object({
  status: z.enum(['ACTIVE', 'INACTIVE']),
});

const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'HOD', 'FACULTY', 'STUDENT']),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await AdminService.getDashboardStats();
    return res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = querySchema.parse(req.query);
    const result = await AdminService.listUsers(
      query.role as Role | undefined,
      query.status as UserStatus | undefined,
      query.page || 1,
      query.limit || 10
    );
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { status } = statusSchema.parse(req.body);
    const result = await AdminService.updateUserStatus(userId, status as UserStatus);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createUserSchema.parse(req.body);
    const result = await AdminService.createUser(data);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
