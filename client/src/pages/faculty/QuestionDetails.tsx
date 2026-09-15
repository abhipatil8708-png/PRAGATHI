import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../services/api';
import { ArrowLeft, Edit3, Send, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

const QuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State (cloned from question when editing)
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await apiFetch(`/faculty/questions/${id}`);
        setQuestion(data);
        setFormData({ ...data }); // init form
      } catch (err: any) {
        setError(err.message || 'Failed to load question details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: name === 'timeLimit' || name === 'marks' ? parseFloat(value) : value
    }));
  };

  const handleExampleChange = (index: number, field: string, value: string) => {
    setFormData((prev: any) => {
      const updatedExamples = [...prev.examples];
      updatedExamples[index] = { ...updatedExamples[index], [field]: value };
      return { ...prev, examples: updatedExamples };
    });
  };

  const handleSaveAndResubmit = async () => {
    setIsSubmitting(true);
    try {
      // First update the question
      await apiFetch(`/faculty/questions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      // Then resubmit
      await apiFetch(`/faculty/questions/${id}/resubmit`, {
        method: 'POST'
      });
      alert('Question resubmitted successfully!');
      navigate('/faculty/questions');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-md flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
        <p>{error || 'Question not found'}</p>
      </div>
    );
  }

  const latestApproval = question.approvals?.[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold tracking-tight">Question Details</h2>
        </div>
        
        <div className="flex gap-3">
          {question.status === 'CHANGES_REQUESTED' && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded shadow-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" /> Edit Details
            </button>
          )}
          {isEditing && (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-medium rounded shadow-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAndResubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-primary text-white text-sm font-medium rounded shadow-sm hover:bg-primary/90 flex items-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" /> Save & Resubmit
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {isEditing ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  className="w-full text-xl font-bold border-gray-300 border p-2 rounded focus:ring-primary focus:border-primary"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <textarea
                  name="problemStatement"
                  rows={6}
                  className="w-full border-gray-300 border p-2 rounded font-mono text-sm focus:ring-primary focus:border-primary"
                  value={formData.problemStatement}
                  onChange={handleInputChange}
                />
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h3>
                <div className="prose prose-sm max-w-none text-gray-700 font-mono bg-gray-50 p-4 rounded-md whitespace-pre-wrap">
                  {question.problemStatement}
                </div>
              </>
            )}
            
            <div className="mt-8 space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 border-b pb-2 mb-3">Input Description</h4>
                {isEditing ? (
                  <textarea name="inputDescription" className="w-full border p-2 rounded text-sm" value={formData.inputDescription} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm text-gray-700">{question.inputDescription || 'None provided.'}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 border-b pb-2 mb-3">Output Description</h4>
                {isEditing ? (
                  <textarea name="outputDescription" className="w-full border p-2 rounded text-sm" value={formData.outputDescription} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm text-gray-700">{question.outputDescription || 'None provided.'}</p>
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 border-b pb-2 mb-3">Constraints</h4>
                {isEditing ? (
                  <textarea name="constraints" className="w-full border p-2 rounded font-mono text-sm" value={formData.constraints} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm text-gray-700 font-mono bg-gray-100 inline-block p-2 rounded">{question.constraints || 'None'}</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 border-b pb-2 mb-4">Examples</h4>
              <div className="space-y-4">
                {(isEditing ? formData.examples : question.examples).map((ex: any, idx: number) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 p-4 rounded-md">
                    <h5 className="text-sm font-bold text-gray-700 mb-2">Example {idx + 1}</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Input</span>
                        {isEditing ? (
                          <textarea className="w-full border p-2 mt-1 rounded font-mono text-sm" value={ex.input} onChange={(e) => handleExampleChange(idx, 'input', e.target.value)} />
                        ) : (
                          <pre className="mt-1 p-2 bg-white border rounded text-sm text-gray-800">{ex.input}</pre>
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase">Output</span>
                        {isEditing ? (
                          <textarea className="w-full border p-2 mt-1 rounded font-mono text-sm" value={ex.output} onChange={(e) => handleExampleChange(idx, 'output', e.target.value)} />
                        ) : (
                          <pre className="mt-1 p-2 bg-white border rounded text-sm text-gray-800">{ex.output}</pre>
                        )}
                      </div>
                    </div>
                    {ex.explanation && !isEditing && (
                      <div className="mt-3">
                        <span className="text-xs font-semibold text-gray-500 uppercase">Explanation</span>
                        <p className="mt-1 text-sm text-gray-600">{ex.explanation}</p>
                      </div>
                    )}
                    {isEditing && (
                      <div className="mt-3">
                         <span className="text-xs font-semibold text-gray-500 uppercase">Explanation</span>
                         <textarea className="w-full border p-2 mt-1 rounded text-sm" value={ex.explanation} onChange={(e) => handleExampleChange(idx, 'explanation', e.target.value)} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Status & HOD Feedback</h3>
            
            <div className="mb-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full flex items-center w-fit gap-2 ${
                question.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                question.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                question.status === 'CHANGES_REQUESTED' ? 'bg-orange-100 text-orange-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {question.status === 'APPROVED' ? <CheckCircle className="w-4 h-4" /> : 
                 question.status === 'REJECTED' ? <XCircle className="w-4 h-4" /> : 
                 question.status === 'CHANGES_REQUESTED' ? <AlertCircle className="w-4 h-4" /> : 
                 <Clock className="w-4 h-4" />}
                {question.status.replace('_', ' ')}
              </span>
            </div>

            {latestApproval?.comments && (
              <div className="bg-gray-50 p-3 rounded border border-gray-200">
                <p className="text-xs font-semibold text-gray-500 mb-1">HOD Comments:</p>
                <p className="text-sm text-gray-700 italic">"{latestApproval.comments}"</p>
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {new Date(latestApproval.reviewedAt).toLocaleDateString()}
                </p>
              </div>
            )}
            
            {question.status === 'CHANGES_REQUESTED' && !isEditing && (
              <div className="mt-4 bg-orange-50 border border-orange-200 p-3 rounded text-sm text-orange-800">
                You need to edit this question and address the HOD's feedback before it can be used.
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Metadata</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">Topic</span>
                <span className="font-medium text-gray-900">{question.topic}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Difficulty</span>
                <span className="font-medium text-gray-900">{question.difficulty}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Marks</span>
                <span className="font-medium text-gray-900">{question.marks}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">Time Limit</span>
                <span className="font-medium text-gray-900">{question.timeLimit}s</span>
              </li>
              <li className="flex flex-col gap-1 mt-2">
                <span className="text-gray-500">Languages</span>
                <div className="flex flex-wrap gap-1">
                  {question.supportedLanguages.map((lang: string) => (
                    <span key={lang} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                      {lang}
                    </span>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetails;
