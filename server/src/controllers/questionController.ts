import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { QuestionService } from '../services/questionService';
import { ApprovalStatus } from '@prisma/client';

const exampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string().optional(),
});

const questionSchema = z.object({
  title: z.string().min(3),
  problemStatement: z.string().min(10),
  topic: z.string().min(2),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  inputDescription: z.string().optional(),
  outputDescription: z.string().optional(),
  constraints: z.string().optional(),
  examples: z.array(exampleSchema).min(1),
  supportedLanguages: z.array(z.string()).min(1),
  timeLimit: z.number().positive().optional(),
  marks: z.number().positive().optional(),
});

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await QuestionService.getFacultyDashboardStats(req.user!.id);
    return res.status(200).json(stats);
  } catch (err) {
    next(err);
  }
};

export const createQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = questionSchema.parse(req.body);
    const question = await QuestionService.createQuestion(req.user!.id, data);
    return res.status(201).json({ message: 'Question submitted for HOD approval.', question });
  } catch (err) {
    next(err);
  }
};

export const getFacultyQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as ApprovalStatus | undefined;
    const difficulty = req.query.difficulty as string | undefined;

    const result = await QuestionService.getFacultyQuestions(req.user!.id, page, limit, status, difficulty);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getQuestionDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const question = await QuestionService.getQuestionDetails(id, req.user!.id);
    return res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};

export const updateQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const data = questionSchema.parse(req.body);
    const question = await QuestionService.updateQuestion(id, req.user!.id, data);
    return res.status(200).json({ message: 'Question updated successfully.', question });
  } catch (err) {
    next(err);
  }
};

export const resubmitQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const question = await QuestionService.resubmitQuestion(id, req.user!.id);
    return res.status(200).json({ message: 'Question resubmitted successfully.', question });
  } catch (err) {
    next(err);
  }
};
