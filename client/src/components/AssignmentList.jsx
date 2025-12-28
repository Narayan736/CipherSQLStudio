import React from 'react';
import { useNavigate } from 'react-router-dom';

const AssignmentList = () => {
  const navigate = useNavigate();

  const assignments = [
    { id: 1, title: "Select All Customers", difficulty: "Easy", description: "Retrieve all columns from the customers table to view the full client list." },
    { id: 2, title: "High Value Orders", difficulty: "Medium", description: "Filter the orders table to find transactions worth more than $500." },
    { id: 3, title: "Customer Join Dates", difficulty: "Hard", description: "Calculate the exact duration (in days) since each customer joined the platform." },
    { id: 4, title: "Active Users", difficulty: "Easy", description: "Identify users who have logged in within the last 7 days." },
  ];

  return (
    <div className="assignment-container">
      <h1 className="page-title">Assignment Library</h1>
      <div className="assignment-grid">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="assignment-card">
            <div className="meta-row">
              <span className={`badge ${assignment.difficulty.toLowerCase()}`}>
                {assignment.difficulty}
              </span>
              <span style={{color:'#555', fontSize:'0.8rem'}}>#SQL-0{assignment.id}</span>
            </div>
            
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            
            <button className="start-btn" onClick={() => navigate('/workspace')}>
              Open Workspace &rarr;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentList;