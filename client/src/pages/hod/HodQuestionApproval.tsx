import { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { Check, X, AlertCircle, MessageSquare } from 'lucide-react';

const HodQuestionApproval = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);
  const [comment, setComment] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const fetchQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiFetch('/hod/questions/pending');
      setQuestions(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch pending questions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleAction = async (status: string) => {
    if (!selectedQuestion) return;
    
    if (status !== 'APPROVED' && !comment.trim()) {
      alert('Please provide a comment for this action.');
      return;
    }

    setActionLoading(true);
    try {
      await apiFetch(`/hod/questions/approvals/${selectedQuestion.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status, comments: comment }),
      });
      setSelectedQuestion(null);
      setComment('');
      fetchQuestions(); // refresh list
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Question Approvals</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List Section */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[600px]">
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <h3 className="font-medium text-gray-900">Pending Review ({questions.length})</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="p-8 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : questions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No pending questions to review.
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {questions.map((q) => (
                  <li 
                    key={q.id}
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${selectedQuestion?.id === q.id ? 'bg-primary/5 border-l-4 border-primary' : 'border-l-4 border-transparent'}`}
                    onClick={() => { setSelectedQuestion(q); setComment(''); }}
                  >
                    <p className="font-medium text-gray-900 line-clamp-1">{q.question.title}</p>
                    <div className="mt-1 flex justify-between text-xs text-gray-500">
                      <span>{q.question.difficulty}</span>
                      <span>{new Date(q.question.createdAt).toLocaleDateString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 h-[600px] flex flex-col">
          {selectedQuestion ? (
            <>
              <div className="p-6 border-b border-gray-200 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{selectedQuestion.question.title}</h3>
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                    {selectedQuestion.question.difficulty}
                  </span>
                </div>
                
                <div className="prose prose-sm max-w-none text-gray-600 mb-8">
                  <p>In a fully implemented system, the full question description, test cases, and constraints will be displayed here for HOD review.</p>
                </div>
                
                <div className="mt-8 space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Review Comments
                  </label>
                  <textarea
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-3"
                    placeholder="Add feedback for the faculty member..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction('CHANGES_REQUESTED')}
                  className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                  Request Changes
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction('REJECTED')}
                  className="flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Reject
                </button>
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction('APPROVED')}
                  className="flex items-center gap-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
                >
                  <Check className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageSquare className="w-12 h-12 mb-4 text-gray-300" />
              <p>Select a question from the list to review</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HodQuestionApproval;
