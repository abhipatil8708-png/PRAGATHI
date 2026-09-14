# PRAGATI Security Architecture

## Principles
1. **Never trust the client**: All validation must happen on the backend, regardless of frontend checks.
2. **Never execute untrusted code on the main server**: Student code execution must happen in isolated sandboxes.
3. **Least Privilege**: Users only have access to the data required for their role.

## Authentication
- **Method**: JSON Web Tokens (JWT).
- **Storage**: HttpOnly, secure cookies (preferred) or Authorization header with strict XSS protections.
- **Passwords**: Hashed using bcrypt (or Argon2) with a unique salt per user. Plain text passwords are NEVER stored.

## Authorization (RBAC)
- Middleware intercepts requests to check the `role` embedded in the JWT payload.
- Roles are strictly defined in `shared/types/roles.ts`.
- **HOD Approval**: Backend enforces that only the HOD role can change a QuestionApproval status.

## Data Protection
- **Environment Variables**: Secrets (Database URLs, JWT secrets) are kept in `.env` and never committed to source control.
- **SQL Injection**: Prevented by utilizing the Prisma ORM, which uses parameterized queries.
- **Cross-Origin Resource Sharing (CORS)**: Configured to only allow the specific origin of the frontend application.

## Anti-Cheating (Future)
- Browsers events (blur, visibilitychange) will be logged.
- The backend will collect these events and flag Submissions as "suspicious" for Faculty/HOD review.
- Automated cheating detection is suggestive, not punitive; human review is required.
