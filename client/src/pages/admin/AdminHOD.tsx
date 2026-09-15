import { Shield, AlertCircle } from 'lucide-react';

const AdminHOD = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">HOD Management</h2>
      </div>

      <div className="bg-blue-50 text-blue-700 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>A system can only have exactly ONE active HOD at any time. Use the "Users" tab to reassign HOD roles if needed.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 flex flex-col items-center justify-center text-gray-500">
        <Shield className="w-12 h-12 mb-4 text-gray-300" />
        <p>HOD specific details will appear here.</p>
      </div>
    </div>
  );
};

export default AdminHOD;
