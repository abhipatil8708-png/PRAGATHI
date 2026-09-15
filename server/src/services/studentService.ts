import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StudentService {
  static async getDashboardStats(userId: string) {
    // Only count APPROVED questions
    const totalQuestions = await prisma.question.count({
      where: { status: 'APPROVED' }
    });
    
    // Submissions not implemented yet, using placeholder logic
    const completedQuestions = 0;
    
    const todayQuestion = await prisma.question.findFirst({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        topic: true,
        difficulty: true,
        marks: true,
        timeLimit: true,
        supportedLanguages: true,
      }
    });

    return {
      stats: {
        total: totalQuestions,
        completed: completedQuestions,
        pending: totalQuestions - completedQuestions,
        accuracy: 0, // Placeholder
        streak: 0,   // Placeholder
      },
      todayQuestion
    };
  }

  static async getApprovedQuestions(page = 1, limit = 10, difficulty?: string, topic?: string) {
    const skip = (page - 1) * limit;
    const where: any = { status: 'APPROVED' };
    
    if (difficulty) where.difficulty = difficulty;
    if (topic) where.topic = { contains: topic, mode: 'insensitive' };

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          topic: true,
          difficulty: true,
          marks: true,
          timeLimit: true,
          supportedLanguages: true,
          createdAt: true,
        }
      }),
      prisma.question.count({ where }),
    ]);

    return { questions, total, page, limit };
  }

  static async getQuestionDetails(questionId: string) {
    // Security check: ONLY return if status is APPROVED
    const question = await prisma.question.findFirst({
      where: { 
        id: questionId,
        status: 'APPROVED'
      },
      select: {
        id: true,
        title: true,
        problemStatement: true,
        topic: true,
        difficulty: true,
        inputDescription: true,
        outputDescription: true,
        constraints: true,
        examples: true,
        supportedLanguages: true,
        timeLimit: true,
        marks: true,
      }
    });

    if (!question) {
      throw new Error('Question not found or is not approved for student access.');
    }

    return question;
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        studentProfile: true
      }
    });
    
    if (!user) throw new Error('User not found');
    
    // Remove sensitive info
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }
}
