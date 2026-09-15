import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ROLE } from 'shared';
import { LogOut, User as UserIcon, Settings, Home, Users, UserCheck, Shield, FileQuestion } from 'lucide-react';

interface DashboardLayoutProps {
  user: { role: ROLE; name: string } | null;
  onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return <Outlet />;

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const roleDisplay = user.role.charAt(0) + user.role.slice(1).toLowerCase();

  const getNavLinks = () => {
    switch (user.role) {
      case ROLE.ADMIN:
        return [
          { name: 'Dashboard', path: '/admin', icon: Home },
          { name: 'Users', path: '/admin/users', icon: Users },
          { name: 'Faculty', path: '/admin/faculty', icon: UserCheck },
          { name: 'Students', path: '/admin/students', icon: Users },
          { name: 'HOD', path: '/admin/hod', icon: Shield },
        ];
      case ROLE.HOD:
        return [
          { name: 'Dashboard', path: '/hod', icon: Home },
          { name: 'Question Approvals', path: '/hod/questions', icon: FileQuestion },
        ];
      case ROLE.FACULTY:
        return [
          { name: 'Dashboard', path: '/faculty', icon: Home },
          { name: 'Questions', path: '/faculty/questions', icon: FileQuestion },
        ];
      case ROLE.STUDENT:
        return [
          { name: 'Dashboard', path: '/student', icon: Home },
        ];
      default:
        return [];
    }
  };

  const links = getNavLinks();

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <Link to={`/${user.role.toLowerCase()}`} className="text-xl font-bold tracking-tight text-primary">
            PRAGATI
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path || (link.path !== `/${user.role.toLowerCase()}` && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold uppercase">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium leading-none truncate w-36">{user.name}</span>
              <span className="text-xs text-gray-500 mt-1">{roleDisplay}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-semibold text-gray-800">
            {roleDisplay} Portal
          </h1>
          <div className="flex items-center gap-4">
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-gray-700 transition-colors">
              <UserIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
