import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export class AdminService {
  static async getDashboardStats() {
    const totalUsers = await prisma.user.count();
    const activeUsers = await prisma.user.count({ where: { status: 'ACTIVE' } });
    const totalFaculty = await prisma.user.count({ where: { role: 'FACULTY' } });
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    const hod = await prisma.user.findFirst({ where: { role: 'HOD', status: 'ACTIVE' } });
    
    return {
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      totalFaculty,
      totalStudents,
      hodStatus: hod ? 'Assigned' : 'Unassigned',
    };
  }

  static async listUsers(role?: Role, status?: UserStatus, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    
    const where: any = {};
    if (role) where.role = role;
    if (status) where.status = status;

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total, page, limit };
  }

  static async updateUserStatus(userId: string, status: UserStatus) {
    // If activating an ADMIN, ensure no other active ADMIN exists
    if (status === 'ACTIVE') {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) throw new Error('User not found');

      if (user.role === 'ADMIN') {
        const existingAdmin = await prisma.user.findFirst({
          where: { role: 'ADMIN', status: 'ACTIVE', id: { not: userId } },
        });
        if (existingAdmin) throw new Error('Cannot have more than one active ADMIN');
      }

      if (user.role === 'HOD') {
        const existingHod = await prisma.user.findFirst({
          where: { role: 'HOD', status: 'ACTIVE', id: { not: userId } },
        });
        if (existingHod) throw new Error('Cannot have more than one active HOD');
      }
    }

    return prisma.user.update({
      where: { id: userId },
      data: { status },
      select: { id: true, name: true, email: true, role: true, status: true },
    });
  }

  static async createUser(data: any) {
    if (data.role === 'ADMIN') {
      const existingAdmin = await prisma.user.findFirst({ where: { role: 'ADMIN', status: 'ACTIVE' } });
      if (existingAdmin) throw new Error('Cannot create another active ADMIN');
    }

    if (data.role === 'HOD') {
      const existingHod = await prisma.user.findFirst({ where: { role: 'HOD', status: 'ACTIVE' } });
      if (existingHod) throw new Error('Cannot create another active HOD');
    }

    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) throw new Error('Email already in use');

    const passwordHash = await bcrypt.hash(data.password, 10);

    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role,
        status: data.status || 'ACTIVE',
      },
      select: { id: true, name: true, email: true, role: true, status: true },
    });
  }
}
