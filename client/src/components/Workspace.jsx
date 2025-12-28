import React, { useState } from 'react';
import Editor from "@monaco-editor/react";
import axios from 'axios';

const Workspace = () => {
  const [code, setCode] = useState("-- Write your SQL query here\nSELECT * FROM customers;");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [hint, setHint] = useState(null); // New State for Hint
  const [loading, setLoading] = useState(false);

  // 1. Run Query Function
  const runQuery = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setHint(null); // Clear previous hints

    try {
      const response = await axios.post('http://localhost:5000/api/execute', { sql: code });
      setResult(response.data.rows);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Server Error");
    } finally {
      setLoading(false);
    }
  };

  // 2. Get Hint Function (New Feature)
  const getHint = async () => {
    setLoading(true);
    setHint(null);
    
    try {
      const response = await axios.post('http://localhost:5000/api/hint', {
        question: "Select All Customers", // In a real app, this comes from the DB
        schema: "customers(id, name, email)",
        sql: code
      });
      setHint(response.data.hint);
    } catch (err) {
      setHint("Could not fetch hint at this time.");
    } finally {
      setLoading(false);
    }
  };
// ... (Keep imports and logic the same) ...

  return (
    <div className="workspace-container">
      {/* Question Panel */}
      <div className="panel question-panel">
        <h2>1. Select All Customers</h2>
        <div className="description">
          <p>Retrieve all columns from the <code>customers</code> table.</p>
          
          <div className="schema-box">
            <h4><i className="icon-table"></i> customers</h4>
            <ul>
              <li>id <span>(INT)</span></li>
              <li>name <span>(VARCHAR)</span></li>
              <li>email <span>(VARCHAR)</span></li>
              <li>joined_date <span>(DATE)</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Editor Panel */}
      <div className="panel editor-panel">
        <div className="editor-wrapper">
          <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{ 
                minimap: { enabled: false }, 
                fontSize: 15,
                padding: { top: 20 },
                fontFamily: 'JetBrains Mono'
            }}
          />
        </div>
        
        <div className="toolbar">
          <button className="btn-run" onClick={runQuery} disabled={loading}>
            {loading ? "Running..." : "▶ Run Query"}
          </button>
          <button className="btn-hint" onClick={getHint} disabled={loading}>
            💡 Get Hint
          </button>
        </div>

        <div className="results-area">
          {/* Enhanced Hint Box */}
          {hint && (
            <div className="hint-box">
              <strong>AI Assistant:</strong> {hint}
            </div>
          )}

          {error && <div style={{color: '#ff6b6b', padding: '10px', background: 'rgba(255,0,0,0.1)'}}>Error: {error}</div>}
          
          {/* Result Table logic remains the same... */}
          {result && result.length > 0 && (
            <table>
              <thead>
                <tr>
                  {Object.keys(result[0]).map((key) => <th key={key}>{key}</th>)}
                </tr>
              </thead>
              <tbody>
                {result.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((val, j) => <td key={j}>{val}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {!result && !error && <div style={{color:'#555', marginTop:'20px'}}>Execute a query to see results here.</div>}
        </div>
      </div>
    </div>
  );
};

export default Workspace;