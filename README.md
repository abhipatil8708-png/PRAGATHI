# PRAGATI

**PRAGATI — Programming Skill Assessment & Progress Management Platform**

*Learn. Code. Progress.*

## Overview
PRAGATI is an academic platform designed to manage programming skill assessments, coding submissions, evaluations, and student progress monitoring. It is a highly scalable, secure, production-quality system tailored for institutional use.

## Core Roles
- **ADMIN**: System-level management.
- **HOD**: Department oversight, faculty monitoring, and exclusive authority to approve/reject faculty-created questions.
- **FACULTY**: Creates questions (requires HOD approval), monitors assigned students, and manages submissions.
- **STUDENT**: Solves coding assessments, views personal progress and submission history.

## Technology Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router.
- **Backend**: Node.js, Express.js, TypeScript, Zod.
- **Database**: PostgreSQL, Prisma ORM.

## Architecture
The platform is structured as a monorepo, with clear boundaries between the frontend, backend, and shared libraries. The application is built using a REST API design pattern.

## Project Structure
```
PRAGATHI/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and utilities
└── docs/            # Technical documentation
```

## Local Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL

### Installation
1. Clone the repository.
2. Install all dependencies across workspaces:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Copy `.env.example` to `.env` in the root (or `server` directory, depending on configuration).
   ```bash
   cp .env.example .env
   ```

### Database Setup
1. Configure your `DATABASE_URL` in `.env`.
2. Push the Prisma schema to the database:
   ```bash
   cd server
   npx prisma db push
   ```

### Running Locally
Run both client and server concurrently from the root:
```bash
npm run dev
```
Alternatively:
- Frontend: `npm run dev --workspace=client`
- Backend: `npm run dev --workspace=server`

## Current Development Status
- **Implemented**: Full-stack monorepo foundation, basic routing, dashboard layouts, Prisma database schema.
- **In Progress**: Real authentication integration.
- **Planned**: Code execution engine (Docker sandboxing), anti-cheating architecture, analytics reporting.

## Future Modules
- **Secure Code Execution**: Isolated Docker sandbox for evaluating C, C++, Java, and Python.
- **Anti-Cheating**: Monitoring clipboard, window visibility, and potential face detection/camera integration.

## Security Considerations
- Authentication is built using JWT with refresh token strategies.
- Passwords are hashed using bcrypt/Argon2.
- CORS is strictly configured to only allow authorized client origins.
