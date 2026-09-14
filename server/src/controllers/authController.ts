import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthService } from '../services/authService';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(['ADMIN', 'HOD', 'FACULTY', 'STUDENT']),
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const result = await AuthService.login(data.email, data.password);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const result = await AuthService.register(data);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
