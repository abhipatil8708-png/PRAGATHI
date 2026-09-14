
import { Link } from 'react-router-dom';

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md text-center space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <h2 className="text-2xl font-semibold text-gray-900">Access Denied</h2>
        <p className="text-gray-600">
          You do not have permission to view this page. Please ensure you are logged in with the correct role.
        </p>
        <div className="pt-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
