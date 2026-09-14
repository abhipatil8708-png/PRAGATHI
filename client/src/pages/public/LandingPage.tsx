
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-3xl text-center space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          PRAGATI
        </h1>
        <p className="text-xl text-gray-600">
          Programming Skill Assessment & Progress Management Platform
        </p>
        <p className="text-lg font-medium text-primary">
          Learn. Code. Progress.
        </p>
        
        <div className="pt-8">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors shadow-sm"
          >
            Sign In to Portal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
