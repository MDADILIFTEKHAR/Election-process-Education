import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { useUserMemory } from '../contexts/UserMemoryContext';

const AIBehaviorEngine = ({ onSuggest }) => {
  const { memory } = useUserMemory();
  const [activeSuggestion, setActiveSuggestion] = useState(null);
  const lastInteractionRef = useRef(Date.now());

  useEffect(() => {
    const checkBehavior = setInterval(() => {
      const idleTime = Date.now() - lastInteractionRef.current;

      // Logic for proactive suggestions
      if (idleTime > 30000 && !activeSuggestion) { // 30 seconds idle
        if (!memory.onboardingComplete) {
          triggerSuggestion("Hey! Need help getting started with your personalized dashboard?");
        } else if (memory.isFirstTimeVoter && memory.journeyProgress < 30) {
          triggerSuggestion("Exciting times! Want a quick 30-sec guide on what happens at the booth?");
        } else if (memory.journeyProgress < 50) {
          triggerSuggestion("You're halfway there! Want to see the nearest polling booth?");
        }
      }
    }, 10000);

    const handleInteraction = () => {
      lastInteractionRef.current = Date.now();
      if (activeSuggestion) setActiveSuggestion(null);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      clearInterval(checkBehavior);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [memory, activeSuggestion]);

  const triggerSuggestion = (text) => {
    setActiveSuggestion(text);
    // Auto-hide after 10 seconds
    setTimeout(() => setActiveSuggestion(null), 10000);
  };

  return (
    <AnimatePresence>
      {activeSuggestion && (
        <motion.div
          className="proactive-nudge glass-panel"
          initial={{ opacity: 0, x: 100, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => onSuggest(activeSuggestion)}
        >
          <div className="nudge-icon">
            <Sparkles size={18} className="text-primary-neon" />
          </div>
          <div className="nudge-content">
            <p>{activeSuggestion}</p>
            <span className="nudge-action">Click to ask me!</span>
          </div>
          <div className="nudge-close" onClick={(e) => {
            e.stopPropagation();
            setActiveSuggestion(null);
          }}>
            &times;
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIBehaviorEngine;
