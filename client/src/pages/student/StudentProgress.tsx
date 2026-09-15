import { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Award, Clock, BookOpen, AlertCircle } from 'lucide-react';

const mockTopicData = [
  { name: 'Arrays', score: 85 },
  { name: 'Strings', score: 92 },
  { name: 'Linked Lists', score: 45 },
  { name: 'Trees', score: 60 },
  { name: 'Dynamic Prog', score: 30 },
];

const mockActivityData = [
  { name: 'Mon', problems: 2 },
  { name: 'Tue', problems: 5 },
  { name: 'Wed', problems: 3 },
  { name: 'Thu', problems: 0 },
  { name: 'Fri', problems: 7 },
  { name: 'Sat', problems: 4 },
  { name: 'Sun', problems: 1 },
];

const mockDifficultyData = [
  { name: 'Easy', value: 45, color: '#10B981' }, // emerald-500
  { name: 'Medium', value: 30, color: '#F59E0B' }, // amber-500
  { name: 'Hard', value: 10, color: '#EF4444' }, // red-500
];

const StudentProgress = () => {
  // In a real implementation, this would fetch from /api/student/progress
  const [hasRealData, setHasRealData] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Performance Analytics</h2>
          <p className="text-gray-500 text-sm mt-1">Track your growth and identify areas for improvement.</p>
        </div>
      </div>

      {!hasRealData && (
        <div className="bg-blue-50 text-blue-700 p-4 rounded-xl flex items-start gap-3 border border-blue-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
          <div>
            <p className="font-semibold text-sm">Development Preview Mode</p>
            <p className="text-sm mt-1 opacity-90">
              The charts below currently display placeholder data since the code submission engine is planned for the next development phase. Once active, these charts will render your actual academic performance.
            </p>
          </div>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg"><Award className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Global Rank</p>
            <p className="text-xl font-bold text-gray-900">#42</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg"><TrendingUp className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Score</p>
            <p className="text-xl font-bold text-gray-900">1,250</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-lg"><Clock className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Hours Coded</p>
            <p className="text-xl font-bold text-gray-900">48h</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg"><BookOpen className="w-6 h-6" /></div>
          <div>
            <p className="text-sm font-medium text-gray-500">Topics Mastered</p>
            <p className="text-xl font-bold text-gray-900">4 / 12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Topic Mastery Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Topic Mastery (%)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockTopicData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} domain={[0, 100]} />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Problems Solved (Past 7 Days)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockActivityData} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="problems" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 6, fill: '#0ea5e9', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Difficulty Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-900 w-full text-left mb-2">Difficulty Distribution</h3>
          <div className="h-64 w-full relative flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockDifficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {mockDifficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend inside absolute div for precise control */}
            <div className="absolute flex flex-col gap-2 pointer-events-none mt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500"></div><span className="text-sm font-medium">Easy (45)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500"></div><span className="text-sm font-medium">Medium (30)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div><span className="text-sm font-medium">Hard (10)</span></div>
            </div>
          </div>
        </div>

        {/* Recent Achievements - Placeholder list */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Insights</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="p-2 bg-white rounded shadow-sm text-amber-500"><TrendingUp className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">String Manipulation Strength</h4>
                <p className="text-sm text-gray-600 mt-1">Your accuracy in String problems is 92%. You're performing better than 80% of your peers in this area.</p>
              </div>
            </li>
            <li className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 border border-gray-100">
              <div className="p-2 bg-white rounded shadow-sm text-blue-500"><AlertCircle className="w-5 h-5" /></div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Focus Area: Dynamic Programming</h4>
                <p className="text-sm text-gray-600 mt-1">You've skipped the last 3 DP problems. Try starting with "Easy" DP questions to build confidence.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProgress;
