import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/studentService';

export const getDashboardStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await StudentService.getDashboardStats(req.user!.id);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getQuestions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const difficulty = req.query.difficulty as string | undefined;
    const topic = req.query.topic as string | undefined;

    const data = await StudentService.getApprovedQuestions(page, limit, difficulty, topic);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getQuestionDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const question = await StudentService.getQuestionDetails(id);
    return res.status(200).json(question);
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = await StudentService.getProfile(req.user!.id);
    return res.status(200).json(profile);
  } catch (err) {
    next(err);
  }
};
