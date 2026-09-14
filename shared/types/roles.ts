export enum ROLE {
  ADMIN = 'ADMIN',
  HOD = 'HOD',
  FACULTY = 'FACULTY',
  STUDENT = 'STUDENT',
}

export enum QUESTION_APPROVAL_STATUS {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CHANGES_REQUESTED = 'CHANGES_REQUESTED',
}

export interface UserSession {
  id: string;
  email: string;
  role: ROLE;
  name: string;
}
