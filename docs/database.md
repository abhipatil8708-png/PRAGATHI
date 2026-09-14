# PRAGATI Database Schema

## Overview
The database is managed via Prisma ORM connected to PostgreSQL. The schema is designed to enforce strict relationships and role-based data isolation.

## Core Entities

### User
The central authentication entity.
- `id`: UUID (Primary Key)
- `email`: String (Unique)
- `passwordHash`: String
- `role`: Enum (ADMIN, HOD, FACULTY, STUDENT)
- `createdAt`, `updatedAt`

### Profile Entities
To keep the `User` table clean, role-specific data is separated:
- **StudentProfile**: Belongs to User. Contains `rollNumber`, `batch`, `semester`.
- **FacultyProfile**: Belongs to User. Contains `employeeId`, `department`.

### Question & Approvals
- **Question**: Contains `title`, `description`, `difficulty`, `languageConstraints`.
- **QuestionApproval**: Links a Question to the HOD reviewing it. Tracks `status` (PENDING, APPROVED, REJECTED, CHANGES_REQUESTED) and `comments`.

### Assessment & Evaluation
- **Submission**: Represents a student's code submission for a specific Question. Contains `code`, `language`, `status`.
- **Evaluation**: The result of a submission. Contains `score`, `feedback`, `executionTime`, `memoryUsed`.
- **TestCase**: Belongs to a Question. Contains `input`, `expectedOutput`, `isHidden`.
- **Rubric**: Criteria for manual or AST-based grading.

### System & Audit
- **Violation**: Records of suspicious activity (e.g., tab switching) related to a Submission.
- **AuditLog**: Generic logging for system-wide administrative actions.
- **SystemSetting**: Global configurations.
