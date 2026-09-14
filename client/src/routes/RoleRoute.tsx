
import { Navigate, Outlet } from 'react-router-dom';
import { ROLE } from 'shared';

interface RoleRouteProps {
  user: { role: ROLE; name: string } | null;
  allowedRoles: ROLE[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ user, allowedRoles }) => {
  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Logged in but not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
