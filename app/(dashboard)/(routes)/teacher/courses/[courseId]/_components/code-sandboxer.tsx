// // components/CodeSandboxEmbed.js

// import React from 'react';

// const CodeSandboxEmbed = () => {
//   return (
//     <div>
//       <h2>Embedded CodeSandbox:</h2>
//       <iframe
//         src="https://codesandbox.io/p/sandbox/react-new?layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clseqomru00063b5vzb8n4een%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clseqomru00023b5vw7jhweko%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clseqomru00033b5vxvhoscqh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clseqomru00053b5v7h8ocxnd%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B50%252C50%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clseqomru00023b5vw7jhweko%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clseqomru00013b5v5o4kuape%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fsrc%252Findex.js%2522%257D%255D%252C%2522id%2522%253A%2522clseqomru00023b5vw7jhweko%2522%252C%2522activeTabId%2522%253A%2522clseqomru00013b5v5o4kuape%2522%257D%252C%2522clseqomru00053b5v7h8ocxnd%2522%253A%257B%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clseqomru00043b5v3r2zx5fk%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A0%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522id%2522%253A%2522clseqomru00053b5v7h8ocxnd%2522%252C%2522activeTabId%2522%253A%2522clseqomru00043b5v3r2zx5fk%2522%257D%252C%2522clseqomru00033b5vxvhoscqh%2522%253A%257B%2522tabs%2522%253A%255B%255D%252C%2522id%2522%253A%2522clseqomru00033b5vxvhoscqh%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D"
//         style={{ width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
//         title="Your CodeSandbox Sandbox"
//         sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
//       ></iframe>
//     </div>
//   );
// };

// export default CodeSandboxEmbed;
// // 

import MonacoEditor from 'react-monaco-editor';

import { lint } from 'eslint';

const CodeEditor = () => {
  const handleEditorChange = (newValue) => {
    const results = lint(newValue); // Run ESLint on the provided code
    console.log('Linting results:', results);
    // You can process linting results here and provide feedback to the user
  };

  return (
    <MonacoEditor
      width="800"
      height="600"
      language="javascript"
      theme="vs-dark"
      defaultValue="// Write your code here"
      onChange={handleEditorChange}
      options={{
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;