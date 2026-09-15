import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class HodService {
  static async getDashboardStats() {
    const totalFaculty = await prisma.user.count({ where: { role: 'FACULTY' } });
    const activeFaculty = await prisma.user.count({ where: { role: 'FACULTY', status: 'ACTIVE' } });
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    const activeStudents = await prisma.user.count({ where: { role: 'STUDENT', status: 'ACTIVE' } });
    
    // In future modules, fetch actual questions
    const pendingQuestions = await prisma.questionApproval.count({ where: { status: 'PENDING' } });
    const approvedQuestions = await prisma.questionApproval.count({ where: { status: 'APPROVED' } });

    return {
      totalFaculty,
      activeFaculty,
      totalStudents,
      activeStudents,
      pendingQuestions,
      approvedQuestions
    };
  }

  static async getPendingQuestions() {
    return prisma.questionApproval.findMany({
      where: { status: 'PENDING' },
      include: {
        question: {
          select: {
            title: true,
            difficulty: true,
            createdAt: true,
            facultyId: true,
          }
        }
      },
      orderBy: { reviewedAt: 'desc' },
    });
  }

  static async updateQuestionApproval(approvalId: string, status: any, comments: string) {
    return prisma.questionApproval.update({
      where: { id: approvalId },
      data: { status, comments, reviewedAt: new Date() },
    });
  }
}
