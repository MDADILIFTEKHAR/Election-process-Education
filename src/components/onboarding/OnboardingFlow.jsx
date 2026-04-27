import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useUserMemory } from '../../contexts/UserMemoryContext';
import AntigravityCard from '../cards/AntigravityCard';
import './Onboarding.css';

const OnboardingFlow = () => {
  const { updateMemory } = useUserMemory();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    userName: '',
    age: '',
    location: '',
    isFirstTimeVoter: false
  });

  const [showCelebration, setShowCelebration] = useState(false);

  const nextStep = () => setStep(prev => prev + 1);

  const handleComplete = () => {
    if (formData.isFirstTimeVoter) {
      setShowCelebration(true);
      setTimeout(() => {
        finishOnboarding();
      }, 3000);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    updateMemory({
      ...formData,
      onboardingComplete: true,
      hasSeenWelcome: true,
      journeyProgress: 15,
      badges: formData.isFirstTimeVoter ? ['First-Time Voter 🌟'] : []
    });
  };

  const steps = [
    {
      id: 1,
      title: "Welcome, Citizen",
      subtitle: "Let's personalize your voting journey.",
      content: (
        <div className="onboarding-input-group">
          <label>What should I call you?</label>
          <div className="input-with-icon">
            <User size={20} />
            <input 
              type="text" 
              placeholder="Your Name" 
              value={formData.userName}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
            />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Tell me about you",
      subtitle: "Eligibility is the first step to democracy.",
      content: (
        <div className="onboarding-grid">
          <div className="onboarding-input-group">
            <label>Age</label>
            <input 
              type="number" 
              placeholder="e.g. 18" 
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
            />
          </div>
          <div className="onboarding-input-group">
            <label>Is this your first time?</label>
            <div className="toggle-group">
              <button 
                className={formData.isFirstTimeVoter ? 'active' : ''}
                onClick={() => setFormData({...formData, isFirstTimeVoter: true})}
              >
                Yes, First Time!
              </button>
              <button 
                className={!formData.isFirstTimeVoter ? 'active' : ''}
                onClick={() => setFormData({...formData, isFirstTimeVoter: false})}
              >
                No, I've voted before
              </button>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Where do you vote?",
      subtitle: "I'll find your nearest polling booth.",
      content: (
        <div className="onboarding-input-group">
          <label>Your City/Area</label>
          <div className="input-with-icon">
            <MapPin size={20} />
            <input 
              type="text" 
              placeholder="e.g. New Delhi" 
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>
          <button className="location-detect-btn">
            <Sparkles size={16} />
            Detect my location
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="onboarding-overlay">
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>
      
      <AnimatePresence mode="wait">
        {showCelebration ? (
          <motion.div 
            key="celebration"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="celebration-container"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="celebration-rings"
            >
              <Sparkles size={120} className="text-primary-neon" />
            </motion.div>
            <h2 className="text-gradient">Welcome to Democracy!</h2>
            <p>You're about to make history with your first vote.</p>
          </motion.div>
        ) : (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, y: -20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="onboarding-card-wrapper"
          >
            <AntigravityCard className="onboarding-main-card">
              <div className="step-indicator-dots">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`dot ${step === i ? 'active' : ''} ${step > i ? 'completed' : ''}`} />
                ))}
              </div>
              
              <div className="onboarding-header">
                <h2>{steps[step-1].title}</h2>
                <p>{steps[step-1].subtitle}</p>
              </div>

              <div className="onboarding-content">
                {steps[step-1].content}
              </div>

              <div className="onboarding-footer">
                {step < 3 ? (
                  <button className="btn-primary" onClick={nextStep}>
                    Continue <ArrowRight size={20} />
                  </button>
                ) : (
                  <button className="btn-primary finish-btn" onClick={handleComplete}>
                    Launch Experience <CheckCircle size={20} />
                  </button>
                )}
              </div>
            </AntigravityCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OnboardingFlow;
