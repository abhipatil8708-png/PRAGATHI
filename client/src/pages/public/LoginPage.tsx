
import { useNavigate } from 'react-router-dom';
import { ROLE } from 'shared';
import { Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (role: ROLE) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (role: ROLE) => {
    onLogin(role);
    navigate(`/${role.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary/10 flex items-center justify-center rounded-full mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Sign in to PRAGATI</h2>
          <p className="mt-2 text-sm text-gray-600">
            For development, select a role to mock login
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => handleLogin(ROLE.ADMIN)}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            Login as Admin
          </button>
          
          <button
            onClick={() => handleLogin(ROLE.HOD)}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
          >
            Login as HOD
          </button>

          <button
            onClick={() => handleLogin(ROLE.FACULTY)}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            Login as Faculty
          </button>

          <button
            onClick={() => handleLogin(ROLE.STUDENT)}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Login as Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
