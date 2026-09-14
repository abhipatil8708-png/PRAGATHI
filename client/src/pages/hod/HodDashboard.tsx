
import { Clock, AlertTriangle } from 'lucide-react';

const HodDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">HOD Overview</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Pending Approvals</dt>
                <dd className="text-lg font-semibold text-gray-900">12</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Student Violations</dt>
                <dd className="text-lg font-semibold text-gray-900">4</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Question Approval Queue (Placeholder)</h3>
        <p className="text-gray-500 text-sm">Table showing questions awaiting HOD approval will be here.</p>
      </div>
    </div>
  );
};

export default HodDashboard;
