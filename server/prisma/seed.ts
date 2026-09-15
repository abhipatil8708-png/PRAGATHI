import { PrismaClient, Role, UserStatus } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial data...');

  const passwordHash = await bcrypt.hash('admin123', 10);

  // Seed Admin
  const adminEmail = 'admin@pragati.edu';
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!admin) {
    admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'System Admin',
        passwordHash,
        role: Role.ADMIN,
        status: UserStatus.ACTIVE,
      },
    });
    console.log(`Created admin: ${admin.email}`);
  } else {
    console.log('Admin already exists.');
  }

  // Seed HOD
  const hodEmail = 'hod@pragati.edu';
  let hod = await prisma.user.findUnique({ where: { email: hodEmail } });
  if (!hod) {
    hod = await prisma.user.create({
      data: {
        email: hodEmail,
        name: 'Head of Department',
        passwordHash,
        role: Role.HOD,
        status: UserStatus.ACTIVE,
      },
    });
    console.log(`Created HOD: ${hod.email}`);
  } else {
    console.log('HOD already exists.');
  }

  // Optional: Seed a Faculty
  const facultyEmail = 'faculty@pragati.edu';
  let faculty = await prisma.user.findUnique({ where: { email: facultyEmail } });
  if (!faculty) {
    faculty = await prisma.user.create({
      data: {
        email: facultyEmail,
        name: 'Faculty Member',
        passwordHash,
        role: Role.FACULTY,
        status: UserStatus.ACTIVE,
      },
    });
    console.log(`Created Faculty: ${faculty.email}`);
  }

  // Optional: Seed a Student
  const studentEmail = 'student@pragati.edu';
  let student = await prisma.user.findUnique({ where: { email: studentEmail } });
  if (!student) {
    student = await prisma.user.create({
      data: {
        email: studentEmail,
        name: 'John Doe',
        passwordHash,
        role: Role.STUDENT,
        status: UserStatus.ACTIVE,
      },
    });
    console.log(`Created Student: ${student.email}`);
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
