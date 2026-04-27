import React from 'react';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import './Cards.css';

const journeySteps = [
  { id: 'register', label: 'Register to Vote', description: 'Ensure your name is in the electoral roll' },
  { id: 'docs', label: 'Verify Documents', description: 'Aadhar, Voter ID or other valid IDs' },
  { id: 'booth', label: 'Find Your Booth', description: 'Locate your assigned polling station' },
  { id: 'vote', label: 'Cast Your Vote', description: 'Go to the booth on election day' }
];

const JourneyCard = ({ progress, completedSteps = [] }) => {
  return (
    <div className="journey-card glass-panel">
      <div className="card-header">
        <h3 className="text-gradient">Your Voting Journey</h3>
        <div className="progress-badge">{progress}%</div>
      </div>
      
      <div className="journey-steps">
        {journeySteps.map((step, index) => {
          const isCompleted = completedSteps.includes(step.id);
          const isCurrent = !isCompleted && (index === 0 || completedSteps.includes(journeySteps[index-1].id));
          
          return (
            <motion.div 
              key={step.id} 
              className={`step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="step-icon">
                {isCompleted ? <CheckCircle2 size={20} className="text-success" /> : <Circle size={20} />}
              </div>
              <div className="step-info">
                <p className="step-label">{step.label}</p>
                <p className="step-desc">{step.description}</p>
              </div>
              {isCurrent && <ArrowRight size={16} className="text-primary-neon animate-pulse" />}
            </motion.div>
          );
        })}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default JourneyCard;
