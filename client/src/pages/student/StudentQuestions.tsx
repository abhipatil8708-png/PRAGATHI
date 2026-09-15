import { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { Link } from 'react-router-dom';
import { Search, Code2, AlertCircle } from 'lucide-react';

const StudentQuestions = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [difficultyFilter, setDifficultyFilter] = useState('');
  const [topicFilter, setTopicFilter] = useState('');
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      if (difficultyFilter) queryParams.append('difficulty', difficultyFilter);
      if (topicFilter) queryParams.append('topic', topicFilter);

      const data = await apiFetch(`/student/questions?${queryParams.toString()}`);
      setQuestions(data.questions);
      setTotal(data.total);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch questions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, difficultyFilter, topicFilter]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Question Bank</h2>
          <p className="text-gray-500 text-sm mt-1">Browse and solve approved programming challenges.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filters */}
        <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by topic..."
              value={topicFilter}
              onChange={(e) => { setTopicFilter(e.target.value); setPage(1); }}
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-shadow"
            />
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              className="block w-full sm:w-auto pl-3 pr-10 py-2.5 text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary rounded-lg bg-white transition-shadow"
              value={difficultyFilter}
              onChange={(e) => { setDifficultyFilter(e.target.value); setPage(1); }}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Problem</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Marks</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Languages</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </td>
                </tr>
              ) : questions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center flex flex-col items-center">
                    <div className="bg-gray-50 p-4 rounded-full mb-3">
                      <Code2 className="w-8 h-8 text-gray-300" />
                    </div>
                    <span className="text-gray-900 font-medium text-base">No questions found</span>
                    <span className="text-gray-500 text-sm mt-1">Try adjusting your filters or search terms.</span>
                  </td>
                </tr>
              ) : (
                questions.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <Link to={`/student/questions/${q.id}`} className="block">
                        <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{q.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{q.topic}</p>
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs font-bold rounded-full ${
                        q.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border border-green-200' :
                        q.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                        'bg-red-50 text-red-700 border border-red-200'
                      }`}>
                        {q.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                      {q.marks || '-'}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {q.supportedLanguages.map((lang: string) => (
                          <span key={lang} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Link 
                        to={`/student/questions/${q.id}`} 
                        className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold rounded shadow-sm text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none transition-colors"
                      >
                        Solve
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium text-gray-900">{(page - 1) * 10 + (questions.length > 0 ? 1 : 0)}</span> to <span className="font-medium text-gray-900">{(page - 1) * 10 + questions.length}</span> of <span className="font-medium text-gray-900">{total}</span>
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Previous
                </button>
                <button 
                  onClick={() => setPage(p => p + 1)}
                  disabled={questions.length < 10}
                  className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentQuestions;
