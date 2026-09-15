import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../../services/api';
import { ArrowLeft, PlayCircle, AlertCircle, Clock, BookOpen, Code2 } from 'lucide-react';

const StudentQuestionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const data = await apiFetch(`/student/questions/${id}`);
        setQuestion(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load question details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuestion();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="max-w-4xl mx-auto mt-8 bg-red-50 text-red-600 p-6 rounded-xl flex flex-col items-center justify-center text-center border border-red-100">
        <AlertCircle className="w-12 h-12 mb-4 text-red-400" />
        <h3 className="text-lg font-bold mb-2">Access Denied or Question Not Found</h3>
        <p className="max-w-md mx-auto">{error || 'This question may not be approved for student access yet.'}</p>
        <button 
          onClick={() => navigate('/student/questions')}
          className="mt-6 px-4 py-2 bg-white text-red-600 font-medium rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
        >
          Return to Question Bank
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/student/questions')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Problem Overview</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Problem Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
              <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 font-serif leading-relaxed">
                {question.problemStatement}
              </div>
            </div>
            
            <div className="space-y-8">
              {question.inputDescription && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Input Format
                  </h3>
                  <p className="text-gray-700 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                    {question.inputDescription}
                  </p>
                </div>
              )}
              
              {question.outputDescription && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                    Output Format
                  </h3>
                  <p className="text-gray-700 bg-gray-50/50 p-4 rounded-lg border border-gray-100">
                    {question.outputDescription}
                  </p>
                </div>
              )}
              
              {question.constraints && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Constraints</h3>
                  <div className="bg-gray-50/50 p-4 rounded-lg border border-gray-100 font-mono text-sm text-gray-700">
                    {question.constraints}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Examples</h3>
              <div className="space-y-6">
                {question.examples?.map((ex: any, idx: number) => (
                  <div key={idx} className="bg-gray-50/80 border border-gray-100 p-5 rounded-xl">
                    <h5 className="text-sm font-bold text-gray-900 mb-3">Example {idx + 1}</h5>
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Input</span>
                        <pre className="mt-1.5 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 font-mono overflow-x-auto">
                          {ex.input}
                        </pre>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Output</span>
                        <pre className="mt-1.5 p-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-800 font-mono overflow-x-auto">
                          {ex.output}
                        </pre>
                      </div>
                      {ex.explanation && (
                        <div>
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Explanation</span>
                          <p className="mt-1.5 text-sm text-gray-700 leading-relaxed bg-white p-3 rounded-lg border border-gray-100">
                            {ex.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Action Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
              <Code2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Ready to solve?</h3>
            <p className="text-sm text-gray-500 mb-6">
              Write, test, and submit your code in our interactive programming environment.
            </p>
            <button
              onClick={() => navigate(`/student/workspace/${question.id}`)}
              className="w-full px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              Start Coding
            </button>
          </div>

          {/* Metadata Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Problem Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Topic</span>
                <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">{question.topic}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Difficulty</span>
                <span className={`font-bold px-2 py-1 rounded-full text-xs ${
                  question.difficulty === 'Easy' ? 'bg-green-50 text-green-700' :
                  question.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-red-50 text-red-700'
                }`}>{question.difficulty}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500">Marks</span>
                <span className="font-bold text-gray-900">{question.marks}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-gray-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Time Limit</span>
                <span className="font-bold text-gray-900">{question.timeLimit}s</span>
              </li>
              <li className="flex flex-col gap-2 mt-4 pt-4 border-t border-gray-100">
                <span className="text-gray-500">Supported Languages</span>
                <div className="flex flex-wrap gap-2">
                  {question.supportedLanguages.map((lang: string) => (
                    <span key={lang} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-bold border border-blue-100">
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

export default StudentQuestionDetails;
