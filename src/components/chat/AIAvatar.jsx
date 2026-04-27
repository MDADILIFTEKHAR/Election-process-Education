import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles } from 'lucide-react';
import './AIAvatar.css';

const AIAvatar = ({ isSpeaking }) => {
  return (
    <div className={`ai-avatar-container ${isSpeaking ? 'speaking' : ''}`}>
      <div className="avatar-wrapper">
        <AnimatePresence>
          {isSpeaking && (
            <motion.div 
              className="speaking-glow"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4], 
                scale: [1, 1.4, 1],
                filter: ['blur(10px)', 'blur(25px)', 'blur(10px)']
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
        
        {/* Orbiting Rings */}
        {[1, 2, 3].map((i) => (
          <motion.div 
            key={i}
            className={`avatar-ring ring-${i}`}
            animate={{ 
              rotate: i % 2 === 0 ? 360 : -360,
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              rotate: { duration: 10 + i * 5, repeat: Infinity, ease: "linear" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
            }}
          />
        ))}

        <motion.div 
          className="avatar-core glass-panel"
          whileHover={{ scale: 1.1, rotate: 5 }}
          animate={{ 
            y: [0, -10, 0],
            boxShadow: isSpeaking 
              ? ["0 0 20px var(--primary-neon)", "0 0 40px var(--primary-neon)", "0 0 20px var(--primary-neon)"]
              : "0 8px 32px rgba(0,0,0,0.3)"
          }}
          transition={{ 
            y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            boxShadow: { duration: 2, repeat: Infinity }
          }}
        >
          <div className="core-inner">
            <Bot size={32} className="text-primary-neon" />
            <AnimatePresence>
              {isSpeaking && (
                <motion.div 
                  className="sparkle-overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles size={16} className="text-tertiary-neon animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIAvatar;
