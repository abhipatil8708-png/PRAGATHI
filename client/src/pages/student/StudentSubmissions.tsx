import { TerminalSquare } from 'lucide-react';

const StudentSubmissions = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Submission History</h2>
          <p className="text-gray-500 text-sm mt-1">Review your past code submissions and results.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-16 flex flex-col items-center justify-center text-center">
          <div className="bg-gray-50 p-6 rounded-full mb-4">
            <TerminalSquare className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No Submissions Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Code execution and submission tracking will be available in the next module. Once you start solving problems, your history will appear here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentSubmissions;
