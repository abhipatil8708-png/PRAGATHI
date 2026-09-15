import { PrismaClient, ApprovalStatus } from '@prisma/client';

const prisma = new PrismaClient();

export class QuestionService {
  static async createQuestion(facultyId: string, data: any) {
    return prisma.$transaction(async (tx) => {
      // Create the question
      const question = await tx.question.create({
        data: {
          title: data.title,
          problemStatement: data.problemStatement,
          topic: data.topic,
          difficulty: data.difficulty,
          inputDescription: data.inputDescription,
          outputDescription: data.outputDescription,
          constraints: data.constraints,
          examples: data.examples,
          supportedLanguages: data.supportedLanguages,
          timeLimit: data.timeLimit,
          marks: data.marks,
          status: 'PENDING',
          facultyId,
        },
      });

      // Create the initial approval record
      await tx.questionApproval.create({
        data: {
          questionId: question.id,
          status: 'PENDING',
        },
      });

      return question;
    });
  }

  static async getFacultyQuestions(facultyId: string, page = 1, limit = 10, status?: ApprovalStatus, difficulty?: string) {
    const skip = (page - 1) * limit;
    const where: any = { facultyId };
    
    if (status) where.status = status;
    if (difficulty) where.difficulty = difficulty;

    const [questions, total] = await Promise.all([
      prisma.question.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
      }),
      prisma.question.count({ where }),
    ]);

    return { questions, total, page, limit };
  }

  static async getQuestionDetails(questionId: string, facultyId: string) {
    const question = await prisma.question.findFirst({
      where: { id: questionId, facultyId },
      include: {
        approvals: {
          orderBy: { reviewedAt: 'desc' },
        },
      },
    });

    if (!question) throw new Error('Question not found or unauthorized');
    return question;
  }

  static async updateQuestion(questionId: string, facultyId: string, data: any) {
    const question = await prisma.question.findFirst({
      where: { id: questionId, facultyId },
    });

    if (!question) throw new Error('Question not found or unauthorized');
    
    // Can only edit if changes were requested
    if (question.status !== 'CHANGES_REQUESTED') {
      throw new Error('Can only edit questions that require changes');
    }

    return prisma.question.update({
      where: { id: questionId },
      data: {
        title: data.title,
        problemStatement: data.problemStatement,
        topic: data.topic,
        difficulty: data.difficulty,
        inputDescription: data.inputDescription,
        outputDescription: data.outputDescription,
        constraints: data.constraints,
        examples: data.examples,
        supportedLanguages: data.supportedLanguages,
        timeLimit: data.timeLimit,
        marks: data.marks,
      },
    });
  }

  static async resubmitQuestion(questionId: string, facultyId: string) {
    return prisma.$transaction(async (tx) => {
      const question = await tx.question.findFirst({
        where: { id: questionId, facultyId },
      });

      if (!question) throw new Error('Question not found or unauthorized');
      if (question.status !== 'CHANGES_REQUESTED') {
        throw new Error('Only questions with CHANGES_REQUESTED can be resubmitted');
      }

      const updated = await tx.question.update({
        where: { id: questionId },
        data: { status: 'PENDING' },
      });

      await tx.questionApproval.create({
        data: {
          questionId,
          status: 'PENDING',
        },
      });

      return updated;
    });
  }

  static async getFacultyDashboardStats(facultyId: string) {
    const total = await prisma.question.count({ where: { facultyId } });
    const pending = await prisma.question.count({ where: { facultyId, status: 'PENDING' } });
    const approved = await prisma.question.count({ where: { facultyId, status: 'APPROVED' } });
    const rejected = await prisma.question.count({ where: { facultyId, status: 'REJECTED' } });
    const changesRequested = await prisma.question.count({ where: { facultyId, status: 'CHANGES_REQUESTED' } });

    const recent = await prisma.question.findMany({
      where: { facultyId },
      take: 5,
      orderBy: { updatedAt: 'desc' },
      select: { id: true, title: true, status: true, updatedAt: true },
    });

    return { total, pending, approved, rejected, changesRequested, recent };
  }
}
