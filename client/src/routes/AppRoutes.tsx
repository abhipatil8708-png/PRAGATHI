import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROLE } from 'shared';
import RoleRoute from './RoleRoute';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import LandingPage from '../pages/public/LandingPage';
import LoginPage from '../pages/public/LoginPage';
import UnauthorizedPage from '../pages/public/UnauthorizedPage';

// Dashboards
import AdminDashboard from '../pages/admin/AdminDashboard';
import HodDashboard from '../pages/hod/HodDashboard';
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';

const AppRoutes = () => {
  // Mock auth state for foundation testing
  const [user, setUser] = useState<{ role: ROLE; name: string } | null>(null);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage onLogin={(role) => setUser({ role, name: 'Test User' })} />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Protected Routes Wrapper */}
      <Route element={<DashboardLayout user={user} onLogout={() => setUser(null)} />}>
        {/* Admin Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.ADMIN]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* HOD Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.HOD]} />}>
          <Route path="/hod" element={<HodDashboard />} />
        </Route>

        {/* Faculty Routes */}
        <Route element={<RoleRoute user={user} allowedRoles={[ROLE.FACULTY]} />}>
          <Route path="/faculty" element={<FacultyDashboard />} />
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

export default AppRoutes;
