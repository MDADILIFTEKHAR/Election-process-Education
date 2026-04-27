import React from 'react';
import { motion } from 'framer-motion';
import './Cards.css';

const AntigravityCard = ({ children, className = '', glowColor = 'var(--primary-neon)', ...props }) => {
  return (
    <motion.div
      className={`antigravity-card glass-panel ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 20px ${glowColor}33`
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      {...props}
    >
      <div className="card-glow" style={{ background: `radial-gradient(circle at center, ${glowColor}11, transparent 70%)` }}></div>
      <div className="card-content">
        {children}
      </div>
    </motion.div>
  );
};

export default AntigravityCard;
