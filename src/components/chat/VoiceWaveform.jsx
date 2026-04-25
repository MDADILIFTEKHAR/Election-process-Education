import React from 'react';
import './VoiceWaveform.css';

const VoiceWaveform = ({ isSpeaking }) => {
  if (!isSpeaking) return null;

  return (
    <div className="voice-waveform">
      <div className="bar bar-1"></div>
      <div className="bar bar-2"></div>
      <div className="bar bar-3"></div>
      <div className="bar bar-4"></div>
      <div className="bar bar-5"></div>
    </div>
  );
};

export default VoiceWaveform;
