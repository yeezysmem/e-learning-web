"use client";
import { useSession } from "next-auth/react";
import * as monaco from 'monaco-editor';

interface EditorOutputProps {
  editorRef: React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: string;
  handleSendMessage: () => Promise<void>;
  languageVersion: string | null;
  userCode: string | undefined;
  output: string;
}

const EditorOutput: React.FC<EditorOutputProps> = ({
  output,
  editorRef,
  language,
  handleSendMessage,
  languageVersion,
  userCode,
}) => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="bg-[#1E1E1E] rounded-md h-full">
      <div className="bg-black p-2 rounded-t-md">
        <span className="p-2 pl-4 text-white text-md">Terminal</span>
      </div>
      <div className="p-4 h-80 overflow-y-auto">
        {output ? (
          <pre className="text-white text-sm">{output}</pre>
        ) : (
          <div className="text-white text-sm">
            <pre>Upload your solution</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorOutput;
