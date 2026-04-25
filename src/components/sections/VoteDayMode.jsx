import React from 'react';
import { Navigation, FileText, CheckSquare, Clock } from 'lucide-react';
import ChecklistCard from '../cards/ChecklistCard';
import './Section.css';
import '../cards/Cards.css';

const VoteDayMode = ({ memory, onAction }) => {
  return (
    <div className="vote-day-mode">
      <div className="urgent-banner neon-glow">
        <h2>It's Election Day!</h2>
        <p>Make your voice heard today.</p>
      </div>

      <div className="quick-actions">
        <button className="primary-action-btn glass-panel neon-glow" onClick={() => onAction('map')}>
          <div className="btn-icon">
            <Navigation size={32} />
          </div>
          <div className="btn-text">
            <h3>Navigate to Booth</h3>
            <p>{memory.location || "Find nearest polling station"}</p>
          </div>
        </button>

        <div className="action-grid">
          <button className="secondary-action-btn glass-panel" onClick={() => onAction('docs')}>
            <FileText size={24} className="text-primary-neon" />
            <span>ID Ready?</span>
          </button>
          
          <button className="secondary-action-btn glass-panel" onClick={() => onAction('chat')}>
            <Clock size={24} className="text-primary-neon" />
            <span>Check Crowd</span>
          </button>
        </div>
      </div>

      <div className="section-container glass-panel mt-4">
        <h2 className="section-title">
          <CheckSquare size={24} className="text-primary-neon" />
          Quick Checklist
        </h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ChecklistCard data={[
            "Approved Photo ID",
            "Voter Slip (Optional)",
            "Water Bottle",
            "Check booth timings (7 AM - 6 PM)"
          ]} />
        </div>
      </div>
    </div>
  );
};

export default VoteDayMode;
