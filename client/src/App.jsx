import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AssignmentList from './components/AssignmentList';
import Workspace from './components/Workspace';

function App() {
  return (
    <Router>
      <div className="app-layout">
        {/* Modern Sticky Header */}
        <header className="app-header">
          <Link to="/" className="logo">
            Cipher<span>SQL</span>
          </Link>
          <div className="user-profile">
            {/* Placeholder for future user login */}
            <span style={{color: '#94a3b8', fontSize: '0.9rem'}}>Student Mode</span>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<AssignmentList />} />
            <Route path="/workspace" element={<Workspace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;