import { Users, AlertCircle } from 'lucide-react';

const AdminStudents = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Student Management</h2>
        <button className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 transition-colors">
          Import Students
        </button>
      </div>

      <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>This module is foundational. Use the central "Users" tab to manage student accounts today.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-gray-500">
        <Users className="w-12 h-12 mb-4 text-gray-300" />
        <p>Student batch mapping and bulk actions will appear here.</p>
      </div>
    </div>
  );
};

export default AdminStudents;
