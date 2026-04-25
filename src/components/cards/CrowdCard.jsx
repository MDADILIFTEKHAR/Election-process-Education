import React from 'react';
import { Users, Clock } from 'lucide-react';
import './Cards.css';

const CrowdCard = ({ data }) => {
  // Default data if none provided
  const status = data?.status || 'medium'; // 'low', 'medium', 'high'
  const bestTime = data?.bestTime || 'Morning (7 AM - 9 AM)';
  
  const getStatusText = () => {
    switch(status) {
      case 'low': return 'Low Crowd - Good time to go!';
      case 'medium': return 'Moderate Crowd - Expect some waiting.';
      case 'high': return 'High Crowd - Heavy waiting expected.';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="action-card glass-panel">
      <div className="card-header">
        <Users size={18} className="card-icon" />
        <span>Live Crowd Prediction</span>
      </div>
      <div className="card-content">
        <p style={{ fontWeight: 500, color: 'var(--text-light)' }}>
          {getStatusText()}
        </p>
        
        <div className="crowd-meter-container">
          <div className="meter-bar">
            <div className={`meter-fill ${status}`}></div>
          </div>
        </div>
        
        <div className="crowd-info" style={{ marginTop: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Clock size={14} className="card-icon" />
            <span style={{ fontSize: '0.85rem' }}>Suggested Time:</span>
          </div>
          <span className="best-time">{bestTime}</span>
        </div>
      </div>
    </div>
  );
};

export default CrowdCard;
