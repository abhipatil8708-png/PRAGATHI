import { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { FileQuestion, Clock, CheckCircle, XCircle, AlertCircle, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';

const FacultyDashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await apiFetch('/faculty/questions/stats');
        setStats(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load dashboard stats');
      } finally {
        setIsLoading(false);
      }
    };
    loadStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Faculty Overview</h2>
        <Link 
          to="/faculty/questions/create" 
          className="px-4 py-2 bg-primary text-white text-sm font-medium rounded hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
        >
          <FileQuestion className="w-4 h-4" />
          Create Question
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-md text-blue-600">
            <FileQuestion className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Questions</p>
            <p className="text-xl font-bold text-gray-900">{stats?.total || 0}</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-md text-yellow-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending</p>
            <p className="text-xl font-bold text-gray-900">{stats?.pending || 0}</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-md text-green-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Approved</p>
            <p className="text-xl font-bold text-gray-900">{stats?.approved || 0}</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-md text-red-600">
            <XCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Rejected</p>
            <p className="text-xl font-bold text-gray-900">{stats?.rejected || 0}</p>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-4 flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-md text-orange-600">
            <Edit3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Changes Req.</p>
            <p className="text-xl font-bold text-gray-900">{stats?.changesRequested || 0}</p>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-medium text-gray-900">Recent Questions</h3>
          <Link to="/faculty/questions" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="p-0">
          {stats?.recent && stats.recent.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {stats.recent.map((q: any) => (
                <li key={q.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div>
                    <Link to={`/faculty/questions/${q.id}`} className="font-medium text-primary hover:underline">
                      {q.title}
                    </Link>
                    <p className="text-xs text-gray-500 mt-1">Updated: {new Date(q.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    q.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                    q.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                    q.status === 'CHANGES_REQUESTED' ? 'bg-orange-100 text-orange-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {q.status.replace('_', ' ')}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              You haven't created any questions yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
