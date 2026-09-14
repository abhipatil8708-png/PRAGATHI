
import { Target, CheckCircle, Flame } from 'lucide-react';

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Student Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Daily Goal</dt>
                <dd className="text-lg font-semibold text-gray-900">1 / 2 Solved</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Solved</dt>
                <dd className="text-lg font-semibold text-gray-900">45</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-orange-100 rounded-md p-3">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Current Streak</dt>
                <dd className="text-lg font-semibold text-gray-900">7 Days</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Questions (Placeholder)</h3>
        <p className="text-gray-500 text-sm">List of programming questions available for the student.</p>
      </div>
    </div>
  );
};

export default StudentDashboard;
