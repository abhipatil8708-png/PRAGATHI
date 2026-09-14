# PRAGATI Architecture

## Overview
PRAGATI follows a modern, scalable client-server architecture split into a monorepo containing the `client`, `server`, and `shared` modules.

## Diagram (Conceptual)
```
[React Frontend] (Vite, Tailwind, shadcn/ui)
       |
  HTTPS REST API
       |
[Express Backend] (Node.js, Express, Zod Validator)
       |
   Service Layer (Business Logic)
       |
   Prisma ORM
       |
[PostgreSQL Database]
```

## Frontend (Client)
- **Framework**: React with TypeScript.
- **Build Tool**: Vite.
- **Styling**: Tailwind CSS, utilizing shadcn/ui for consistent, accessible components.
- **State/Routing**: React Router for Role-Based Access Control (RBAC).
- **Directory Structure**:
  - `src/components`: Reusable UI elements.
  - `src/pages`: Top-level page components (Dashboards, Login, etc).
  - `src/layouts`: Dashboard wrappers managing the Sidebar/Topbar.
  - `src/routes`: Route definition and role-guard logic.

## Backend (Server)
- **Framework**: Node.js + Express.
- **Validation**: Zod is used for runtime request validation.
- **Directory Structure**:
  - `src/controllers`: Request/response handling.
  - `src/services`: Core business logic (isolated from Express req/res objects).
  - `src/routes`: API endpoint definitions.
  - `src/middleware`: JWT authentication, role authorization, and error handling.
  - `prisma`: Database schema and migrations.

## Shared Module
Contains TypeScript interfaces, Zod schemas, and Enums (e.g., `ROLE`) that both the frontend and backend utilize, preventing code duplication.

## Future: Code Execution Engine
In the future, the backend will offload code execution to an isolated service (Docker Sandbox). Untrusted code will NEVER execute on the main Node.js backend.
