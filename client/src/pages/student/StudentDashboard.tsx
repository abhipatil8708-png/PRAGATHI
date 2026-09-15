import { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { useAuth } from '../../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Target, TrendingUp, PlayCircle } from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiFetch('/student/dashboard');
        setData(response);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const stats = data?.stats || { total: 0, completed: 0, pending: 0, accuracy: 0, streak: 0 };
  const todayQuestion = data?.todayQuestion;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, {user?.name.split(' ')[0]} 👋</h2>
        <p className="text-gray-500 mt-2 text-lg">Keep building your programming skills. You're doing great!</p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-50 rounded-lg p-3">
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Overall Progress</dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-50 rounded-lg p-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Questions Completed</dt>
                <dd className="text-2xl font-bold text-gray-900">
                  {stats.completed} <span className="text-sm font-normal text-gray-400">/ {stats.total}</span>
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-50 rounded-lg p-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Average Accuracy</dt>
                <dd className="text-2xl font-bold text-gray-900">{stats.accuracy}%</dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-orange-50 rounded-lg p-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Current Streak</dt>
                <dd className="text-2xl font-bold text-gray-900">{stats.streak} Days</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Question & Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900">Today's Featured Challenge</h3>
            </div>
            
            {todayQuestion ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">{todayQuestion.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">Topic: {todayQuestion.topic}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    todayQuestion.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    todayQuestion.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {todayQuestion.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mb-8 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">Marks:</span> {todayQuestion.marks}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">Time Limit:</span> {todayQuestion.timeLimit}s
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-gray-900">Languages:</span> 
                    {todayQuestion.supportedLanguages.join(', ')}
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/student/questions/${todayQuestion.id}`)}
                  className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-5 h-5" />
                  Start Challenge
                </button>
              </div>
            ) : (
              <div className="p-10 text-center flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-gray-300 mb-3" />
                <h4 className="text-lg font-medium text-gray-900">You're all caught up!</h4>
                <p className="text-gray-500 mt-1">There are no approved questions available right now.</p>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-lg font-bold text-primary mb-2">Explore the Question Bank</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Browse through the complete list of approved programming challenges, filter by topic or difficulty, and practice at your own pace.
              </p>
            </div>
            <Link 
              to="/student/questions" 
              className="w-full px-4 py-2 bg-white text-primary text-sm font-medium rounded-lg border border-primary/30 hover:bg-primary/5 transition-colors text-center shadow-sm"
            >
              Browse All Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
