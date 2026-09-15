import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { HodService } from '../services/hodService';
import { ApprovalStatus } from '@prisma/client';

const approvalSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'CHANGES_REQUESTED']),
  comments: z.string().optional().default(''),
}).refine((data) => {
  if ((data.status === 'REJECTED' || data.status === 'CHANGES_REQUESTED') && (!data.comments || data.comments.trim() === '')) {
    return false;
  }
  return true;
}, {
  message: "Comments are required when rejecting or requesting changes.",
  path: ["comments"],
});

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await HodService.getDashboardStats();
    return res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

export const getPendingQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const questions = await HodService.getPendingQuestions();
    return res.status(200).json(questions);
  } catch (err) {
    next(err);
  }
};

export const updateQuestionApproval = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { approvalId } = req.params;
    const { status, comments } = approvalSchema.parse(req.body);
    const result = await HodService.updateQuestionApproval(approvalId, req.user!.id, status as ApprovalStatus, comments);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
