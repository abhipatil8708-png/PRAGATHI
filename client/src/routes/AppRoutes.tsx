import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLE } from 'shared';
import RoleRoute from './RoleRoute';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth, AuthProvider } from '../contexts/AuthContext';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import UnauthorizedPage from '../pages/public/UnauthorizedPage';

// Dashboards
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminFaculty from '../pages/admin/AdminFaculty';
import AdminStudents from '../pages/admin/AdminStudents';
import AdminHOD from '../pages/admin/AdminHOD';
import HodDashboard from '../pages/hod/HodDashboard';
import HodQuestionApproval from '../pages/hod/HodQuestionApproval';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultyQuestions from '../pages/faculty/FacultyQuestions';
import CreateQuestion from '../pages/faculty/CreateQuestion';
import QuestionDetails from '../pages/faculty/QuestionDetails';
import StudentDashboard from '../pages/student/StudentDashboard';

const AppRoutesInner = () => {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={user ? <Navigate to={`/${user.role.toLowerCase()}`} replace /> : <LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes Wrapper */}
      <Route element={<DashboardLayout user={user} onLogout={logout} />}>
        {/* Admin Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.ADMIN]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/faculty" element={<AdminFaculty />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/hod" element={<AdminHOD />} />
        </Route>

        {/* HOD Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.HOD]} />}>
          <Route path="/hod" element={<HodDashboard />} />
          <Route path="/hod/questions" element={<HodQuestionApproval />} />
        </Route>

        {/* Faculty Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.FACULTY]} />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
          <Route path="/faculty/questions" element={<FacultyQuestions />} />
          <Route path="/faculty/questions/create" element={<CreateQuestion />} />
          <Route path="/faculty/questions/:id" element={<QuestionDetails />} />
        </Route>

        {/* Student Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.STUDENT]} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <AuthProvider>
      <AppRoutesInner />
    </AuthProvider>
  );
};

export default AppRoutes;
