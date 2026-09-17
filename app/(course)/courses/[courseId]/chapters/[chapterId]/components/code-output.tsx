"use client";

import React from "react";
import * as monaco from "monaco-editor";
import { Terminal as TerminalIcon, Play, RefreshCw } from "lucide-react";

interface EditorOutputProps {
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: string;
  handleSendMessage?: () => Promise<void>;
  languageVersion?: string | null;
  userCode?: string;
  output: string;
}

const EditorOutput: React.FC<EditorOutputProps> = ({
  output,
  language,
}) => {
  const isError =
    output.toLowerCase().includes("error") ||
    output.toLowerCase().includes("exception") ||
    output.toLowerCase().includes("traceback");

  return (
    <div className="bg-[#1E1E1E] border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col shadow-sm">
      {/* Terminal Header */}
      <div className="bg-black/80 px-4 py-2.5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-x-2 text-gray-300 text-xs font-mono font-semibold">
          <TerminalIcon className="w-4 h-4 text-purple-400" />
          <span>Console Output</span>
        </div>
        <span className="text-[10px] font-mono text-gray-500 uppercase px-2 py-0.5 bg-gray-900 rounded">
          {language} stdout
        </span>
      </div>

      {/* Terminal Body / Output Console */}
      <div className="p-4 flex-1 overflow-y-auto font-mono text-xs leading-relaxed">
        {output ? (
          <pre
            className={`whitespace-pre-wrap break-words ${
              isError ? "text-rose-400" : "text-emerald-400"
            }`}
          >
            {output}
          </pre>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-2 select-none py-12">
            <div className="w-8 h-8 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-gray-500 ml-0.5" />
            </div>
            <p className="text-xs">Click &quot;Run Code&quot; to execute your program.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorOutput;
