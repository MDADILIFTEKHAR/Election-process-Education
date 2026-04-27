import React from 'react';
import { Award, Star, Zap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import './Cards.css';

const BadgeCard = ({ badges = [] }) => {
  if (badges.length === 0) return null;

  return (
    <div className="badge-card glass-panel">
      <h3 className="text-gradient">Achievements Earned</h3>
      <div className="badges-grid">
        {badges.map((badge, index) => (
          <motion.div 
            key={badge.id}
            className="badge-item"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, delay: index * 0.15 }}
          >
            <div className={`badge-icon-wrapper ${badge.type}`}>
              {badge.type === 'gold' && <Award size={32} />}
              {badge.type === 'silver' && <Star size={32} />}
              {badge.type === 'speed' && <Zap size={32} />}
              {badge.type === 'security' && <Shield size={32} />}
            </div>
            <p className="badge-name">{badge.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadgeCard;
