import { useState, useEffect } from 'react';
import { apiFetch } from '../../../services/api';
import { Check, X, AlertCircle, MessageSquare, Clock } from 'lucide-react';

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
    
    if ((status === 'REJECTED' || status === 'CHANGES_REQUESTED') && !comment.trim()) {
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
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-[700px]">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <h3 className="font-medium text-gray-900 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Pending Review
            </h3>
            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-bold">{questions.length}</span>
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
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">{q.question.topic}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                        {q.question.difficulty}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(q.question.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 h-[700px] flex flex-col">
          {selectedQuestion ? (
            <>
              <div className="p-6 border-b border-gray-200 flex-1 overflow-y-auto">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedQuestion.question.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">Topic: {selectedQuestion.question.topic}</p>
                  </div>
                  <span className="px-3 py-1 text-sm font-semibold rounded bg-gray-100 text-gray-800">
                    {selectedQuestion.question.difficulty}
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 border-b pb-1 mb-2">Problem Statement</h4>
                    <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-md font-mono whitespace-pre-wrap">
                      {selectedQuestion.question.problemStatement || selectedQuestion.question.description || 'No description provided.'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Marks</h4>
                      <p className="text-sm text-gray-700">{selectedQuestion.question.marks || '-'}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Time Limit</h4>
                      <p className="text-sm text-gray-700">{selectedQuestion.question.timeLimit ? `${selectedQuestion.question.timeLimit}s` : '-'}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Supported Languages</h4>
                      <div className="flex gap-2">
                        {selectedQuestion.question.supportedLanguages?.map((lang: string) => (
                          <span key={lang} className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">{lang}</span>
                        )) || <span className="text-sm text-gray-500">Not specified</span>}
                      </div>
                    </div>
                  </div>
                  
                  {/* For brevity, we don't render all examples in this list view, but in a real app we would. */}
                </div>
                
                <div className="mt-8 space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Review Comments <span className="text-red-500">* Required for Reject/Changes</span>
                  </label>
                  <textarea
                    rows={4}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm border p-3"
                    placeholder="Add specific feedback for the faculty member..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap justify-end gap-3">
                <button
                  disabled={actionLoading}
                  onClick={() => handleAction('CHANGES_REQUESTED')}
                  className="px-4 py-2 border border-orange-300 shadow-sm text-sm font-medium rounded-md text-orange-700 bg-orange-50 hover:bg-orange-100 disabled:opacity-50"
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
