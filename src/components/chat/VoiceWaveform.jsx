import React from 'react';
import { motion } from 'framer-motion';
import './VoiceWaveform.css';

const VoiceWaveform = ({ isSpeaking }) => {
  if (!isSpeaking) return null;

  return (
    <div className="voice-waveform">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <motion.div
          key={i}
          className="bar"
          animate={{
            height: [10, Math.random() * 40 + 20, 10],
            backgroundColor: [
              'var(--primary-neon)',
              'var(--secondary-neon)',
              'var(--tertiary-neon)',
              'var(--primary-neon)'
            ]
          }}
          transition={{
            height: {
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1
            },
            backgroundColor: {
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        />
      ))}
    </div>
  );
};

export default VoiceWaveform;
