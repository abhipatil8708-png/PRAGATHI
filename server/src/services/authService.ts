import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { env } from '../config/env';
import { ROLE } from 'shared';

const prisma = new PrismaClient();

export class AuthService {
  static async login(email: string, passwordString: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(passwordString, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role as ROLE,
      name: user.name,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
    const refreshToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRES_IN });

    return { user: payload, token, refreshToken };
  }

  static async register(data: any) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        name: data.name,
        role: data.role,
      },
    });

    return { id: user.id, email: user.email, role: user.role, name: user.name };
  }
}
