import { useState } from 'react';
import { apiFetch } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

const CreateQuestion = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    problemStatement: '',
    topic: '',
    difficulty: 'Medium',
    inputDescription: '',
    outputDescription: '',
    constraints: '',
    timeLimit: 2.0,
    marks: 10,
    supportedLanguages: ['C', 'C++', 'Java', 'Python'],
  });

  const [examples, setExamples] = useState([
    { input: '', output: '', explanation: '' }
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'timeLimit' || name === 'marks' ? parseFloat(value) : value
    }));
  };

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => {
      const langs = prev.supportedLanguages.includes(lang)
        ? prev.supportedLanguages.filter(l => l !== lang)
        : [...prev.supportedLanguages, lang];
      return { ...prev, supportedLanguages: langs };
    });
  };

  const addExample = () => {
    setExamples(prev => [...prev, { input: '', output: '', explanation: '' }]);
  };

  const removeExample = (index: number) => {
    if (examples.length > 1) {
      setExamples(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleExampleChange = (index: number, field: string, value: string) => {
    setExamples(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (formData.supportedLanguages.length === 0) {
        throw new Error('Please select at least one supported language.');
      }

      await apiFetch('/faculty/questions', {
        method: 'POST',
        body: JSON.stringify({ ...formData, examples })
      });

      alert('Question submitted successfully for HOD approval.');
      navigate('/faculty/questions');
    } catch (err: any) {
      setError(err.message || 'Failed to submit question');
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold tracking-tight">Create Programming Question</h2>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Title *</label>
              <input
                type="text"
                name="title"
                required
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Reverse a Linked List"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic *</label>
              <input
                type="text"
                name="topic"
                required
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary"
                value={formData.topic}
                onChange={handleInputChange}
                placeholder="e.g. Data Structures"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty *</label>
              <select
                name="difficulty"
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary"
                value={formData.difficulty}
                onChange={handleInputChange}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Problem Statement *</label>
              <textarea
                name="problemStatement"
                required
                rows={5}
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary font-mono text-sm"
                value={formData.problemStatement}
                onChange={handleInputChange}
                placeholder="Clearly describe the problem..."
              />
            </div>
          </div>
        </div>

        {/* I/O and Constraints */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Input / Output & Constraints</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Input Description</label>
              <textarea
                name="inputDescription"
                rows={2}
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary text-sm"
                value={formData.inputDescription}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Output Description</label>
              <textarea
                name="outputDescription"
                rows={2}
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary text-sm"
                value={formData.outputDescription}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Constraints</label>
              <textarea
                name="constraints"
                rows={2}
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary font-mono text-sm"
                value={formData.constraints}
                onChange={handleInputChange}
                placeholder="e.g. 1 <= N <= 10^5"
              />
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="flex justify-between items-center border-b pb-2">
            <h3 className="text-lg font-medium text-gray-900">Examples *</h3>
            <button
              type="button"
              onClick={addExample}
              className="text-sm text-primary flex items-center gap-1 hover:underline"
            >
              <Plus className="w-4 h-4" /> Add Example
            </button>
          </div>
          
          <div className="space-y-6">
            {examples.map((ex, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-md bg-gray-50 relative">
                <div className="absolute top-2 right-2">
                  <button
                    type="button"
                    onClick={() => removeExample(index)}
                    disabled={examples.length === 1}
                    className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Example {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Input *</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full rounded-md border-gray-300 border p-2 font-mono text-sm focus:ring-primary focus:border-primary"
                      value={ex.input}
                      onChange={(e) => handleExampleChange(index, 'input', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Output *</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full rounded-md border-gray-300 border p-2 font-mono text-sm focus:ring-primary focus:border-primary"
                      value={ex.output}
                      onChange={(e) => handleExampleChange(index, 'output', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Explanation</label>
                    <textarea
                      rows={1}
                      className="w-full rounded-md border-gray-300 border p-2 text-sm focus:ring-primary focus:border-primary"
                      value={ex.explanation}
                      onChange={(e) => handleExampleChange(index, 'explanation', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-6">
          <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Assessment Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Marks *</label>
              <input
                type="number"
                name="marks"
                min="1"
                required
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary"
                value={formData.marks}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Limit (Seconds) *</label>
              <input
                type="number"
                name="timeLimit"
                min="0.1"
                step="0.1"
                required
                className="w-full rounded-md border-gray-300 border p-2 focus:ring-primary focus:border-primary"
                value={formData.timeLimit}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supported Languages *</label>
              <div className="flex flex-wrap gap-2">
                {['C', 'C++', 'Java', 'Python'].map(lang => (
                  <label key={lang} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary focus:ring-primary"
                      checked={formData.supportedLanguages.includes(lang)}
                      onChange={() => handleLanguageToggle(lang)}
                    />
                    <span className="ml-2 text-sm text-gray-700">{lang}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/faculty/questions')}
            className="px-6 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit to HOD'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestion;
