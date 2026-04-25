import React from 'react';
import { Bot } from 'lucide-react';
import './AIAvatar.css';

const AIAvatar = ({ isSpeaking }) => {
  return (
    <div className={`ai-avatar-container ${isSpeaking ? 'speaking' : ''}`}>
      <div className="avatar-ring ring-1"></div>
      <div className="avatar-ring ring-2"></div>
      <div className="avatar-ring ring-3"></div>
      <div className="avatar-core glass-panel">
        <Bot size={28} className="text-primary-neon" />
      </div>
    </div>
  );
};

export default AIAvatar;
