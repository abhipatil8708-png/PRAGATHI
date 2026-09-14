
import { BookOpen, Users } from 'lucide-react';

const FacultyDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Faculty Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">My Questions</dt>
                <dd className="text-lg font-semibold text-gray-900">24</dd>
              </dl>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">My Students</dt>
                <dd className="text-lg font-semibold text-gray-900">120</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Submissions (Placeholder)</h3>
        <p className="text-gray-500 text-sm">Table of recent student submissions will appear here.</p>
      </div>
    </div>
  );
};

export default FacultyDashboard;
