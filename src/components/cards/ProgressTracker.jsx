import React from 'react';
import { Check } from 'lucide-react';
import './Cards.css';

const ProgressTracker = ({ memory }) => {
  const steps = [
    { id: 'registered', label: 'Registered', completed: memory.voterStatus === 'registered' || memory.voterStatus === 'voted' },
    { id: 'documents', label: 'Documents Ready', completed: memory.documentsReady },
    { id: 'voted', label: 'Voted', completed: memory.voterStatus === 'voted' }
  ];

  return (
    <div className="progress-tracker glass-panel">
      <h3 className="progress-title">Your Voting Journey</h3>
      <div className="progress-steps">
        {steps.map((step, index) => (
          <div key={step.id} className={`progress-step ${step.completed ? 'completed' : ''}`}>
            <div className="step-indicator">
              {step.completed ? <Check size={16} /> : <span>{index + 1}</span>}
            </div>
            <div className="step-label">{step.label}</div>
            {index < steps.length - 1 && <div className={`step-line ${step.completed ? 'completed' : ''}`} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
