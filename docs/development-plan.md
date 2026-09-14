# PRAGATI Development Plan

## Phase 1: Foundation (Current)
- Monorepo setup (Client, Server, Shared).
- Backend boilerplate (Express, Prisma schema, Routing structure).
- Frontend boilerplate (React, Vite, Tailwind, Routing shells).
- Documentation creation.

## Phase 2: Authentication & Authorization
- Implement User login and JWT generation.
- Implement RBAC middleware on the backend.
- Connect frontend login to the backend.
- Route protection based on user role.

## Phase 3: Core Entities (CRUD)
- HOD and Faculty dashboards connected to the database.
- Faculty creating questions.
- HOD reviewing and approving questions.
- Student viewing approved questions.

## Phase 4: Code Execution Engine
- Implement isolated Docker sandboxes.
- Build the compilation and runtime validation pipeline.
- Implement Test Case evaluation.

## Phase 5: Anti-Cheating & Analytics
- Frontend event listeners for browser focus/clipboard.
- Backend violation logging.
- HOD and Faculty analytics dashboards to track progress and integrity.
