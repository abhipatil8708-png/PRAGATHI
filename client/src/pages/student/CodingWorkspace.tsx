import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Play, Send, Layout, Terminal } from 'lucide-react';

const CodingWorkspace = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col bg-gray-900 text-gray-300 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-800 rounded transition-colors text-gray-400 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-white">Reverse a Linked List</h1>
            <span className="text-xs text-gray-500">Data Structures • Medium</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="h-6 w-px bg-gray-800 mx-1"></div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors">
            <Play className="w-4 h-4 text-green-400" /> Run Code
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded transition-colors">
            <Send className="w-4 h-4" /> Submit
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Problem Description */}
        <div className="w-1/3 min-w-[300px] border-r border-gray-800 flex flex-col bg-gray-900">
          <div className="p-3 border-b border-gray-800 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-950/50">
            <Layout className="w-4 h-4" /> Problem Description
          </div>
          <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center text-center opacity-50">
            <Layout className="w-16 h-16 text-gray-600 mb-4" />
            <h2 className="text-lg font-bold text-white mb-2">Problem Statement Panel</h2>
            <p className="text-sm max-w-xs">
              This area will display the rich text problem description, examples, and constraints pulled securely from the backend.
            </p>
          </div>
        </div>

        {/* Right Pane: Editor & Output */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Header */}
          <div className="h-10 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-4 shrink-0">
            <div className="flex gap-1 h-full pt-2">
              <div className="px-4 py-1.5 bg-gray-900 border-t border-x border-gray-800 rounded-t-md text-xs font-mono text-gray-300 flex items-center">
                solution.cpp
              </div>
            </div>
            <select className="bg-gray-900 border border-gray-700 text-xs text-white rounded px-2 py-1 outline-none">
              <option>C++</option>
              <option>Java</option>
              <option>Python 3</option>
              <option>C</option>
            </select>
          </div>
          
          {/* Editor Area */}
          <div className="flex-1 bg-[#1e1e1e] p-6 flex flex-col items-center justify-center text-center opacity-50 relative">
            <div className="absolute top-4 left-4 text-xs font-mono text-gray-600 text-left">
              1 | #include &lt;iostream&gt;<br/>
              2 | <br/>
              3 | int main() {'{'}<br/>
              4 | &nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; "Development Phase Phase" &lt;&lt; std::endl;<br/>
              5 | &nbsp;&nbsp;&nbsp;&nbsp;return 0;<br/>
              6 | {'}'}
            </div>
            
            <div className="z-10 bg-gray-900/80 p-6 rounded-xl border border-gray-700 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-2">Monaco Editor Integration Pending</h2>
              <p className="text-sm max-w-sm mx-auto">
                The fully functional code editor and compiler execution environment will be implemented in the next development module.
              </p>
            </div>
          </div>

          {/* Terminal / Output Area */}
          <div className="h-1/3 min-h-[200px] border-t border-gray-800 bg-gray-950 flex flex-col">
            <div className="p-2 border-b border-gray-800 flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              <button className="flex items-center gap-1.5 text-white bg-gray-800 px-3 py-1 rounded">
                <Terminal className="w-3.5 h-3.5" /> Test Results
              </button>
              <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                Console
              </button>
            </div>
            <div className="flex-1 p-4 font-mono text-sm text-gray-500 flex items-center justify-center">
              Run your code to see output here.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingWorkspace;
