"use client";

const EditorOutput = ({
  output,
}) => {
  return (
    <div>
      <div className="grid">
        <div className="bg-[#222] grid ">
          <span className="p-2 pl-4 text-white text-md bg-black rounded-t-md">
            Output
          </span>
          {output ? (
            <pre className="text-white text-sm p-4 pl-4 h-80 overflow-y-auto">
              {output}
            </pre>
          ) : (
            <div className="p-4 text-white text-sm h-[520px]">
              <pre>Upload your sollution</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorOutput;
