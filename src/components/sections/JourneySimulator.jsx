import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, MapPin, UserCheck, Smartphone, Send, AlertTriangle } from 'lucide-react';
import AntigravityCard from '../cards/AntigravityCard';
import './Simulator.css';

const JourneySimulator = () => {
  const [step, setStep] = useState(1);
  const [isCasting, setIsCasting] = useState(false);
  const [voted, setVoted] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Step 1: Registration",
      icon: <UserCheck size={32} />,
      content: "Ensure your name is in the electoral roll. Use the National Voter's Service Portal (NVSP) to register or update details.",
      actionLabel: "Verify Registration"
    },
    {
      id: 2,
      title: "Step 2: Verification",
      icon: <CheckCircle size={32} />,
      content: "On election day, officers will verify your ID (Voter ID, Aadhaar, etc.) and apply indelible ink to your finger.",
      actionLabel: "Simulate Verification"
    },
    {
      id: 3,
      title: "Step 3: Polling Booth",
      icon: <MapPin size={32} />,
      content: "Enter the private voting compartment. No cameras or phones allowed. You are now face-to-face with the EVM.",
      actionLabel: "Enter Booth"
    },
    {
      id: 4,
      title: "Step 4: Casting Your Vote",
      icon: <Smartphone size={32} />,
      content: "Press the blue button next to your chosen candidate's symbol. Wait for the beep and check the VVPAT slip.",
      actionLabel: "Interactive EVM Demo"
    }
  ];

  const handleEVMPress = () => {
    setIsCasting(true);
    setTimeout(() => {
      setIsCasting(false);
      setVoted(true);
    }, 2000);
  };

  return (
    <div className="simulator-container">
      <div className="simulator-header">
        <h2 className="text-gradient">Election Journey Simulator</h2>
        <p>Experience the voting process before the big day.</p>
      </div>

      <div className="simulator-body">
        <div className="simulator-nav">
          {steps.map((s) => (
            <div 
              key={s.id} 
              className={`sim-nav-item ${step === s.id ? 'active' : ''} ${step > s.id ? 'completed' : ''}`}
              onClick={() => setStep(s.id)}
            >
              <div className="sim-nav-icon">{s.id}</div>
              <span>{s.title.split(': ')[1]}</span>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="sim-content-wrapper"
          >
            <AntigravityCard className="sim-main-card">
              <div className="sim-card-header">
                <div className="sim-icon-bg">{steps[step-1].icon}</div>
                <h3>{steps[step-1].title}</h3>
              </div>
              <p className="sim-text">{steps[step-1].content}</p>

              {step === 4 ? (
                <div className="evm-demo-area">
                  {!voted ? (
                    <div className="evm-machine glass-panel">
                      <div className="evm-header">ELECTRONIC VOTING MACHINE</div>
                      <div className="evm-row">
                        <div className="candidate-info">
                          <div className="candidate-num">1</div>
                          <div className="candidate-symbol">⚡</div>
                          <div className="candidate-name">PROGRESS PARTY</div>
                        </div>
                        <button 
                          className={`evm-button ${isCasting ? 'pressing' : ''}`}
                          onClick={handleEVMPress}
                          disabled={isCasting}
                        >
                          <div className="button-inner"></div>
                        </button>
                      </div>
                      {isCasting && (
                        <div className="evm-beep-indicator animate-pulse">
                          <span>RECORDING VOTE...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div 
                      className="vote-success-message"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                    >
                      <CheckCircle size={64} className="text-success-color" />
                      <h4>Vote Cast Successfully!</h4>
                      <p>The VVPAT slip was displayed for 7 seconds. You've completed the simulation.</p>
                      <button className="btn-primary" onClick={() => {setStep(1); setVoted(false);}}>Restart Simulation</button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <button className="btn-primary sim-next-btn" onClick={() => setStep(prev => Math.min(4, prev + 1))}>
                  {steps[step-1].actionLabel}
                </button>
              )}
            </AntigravityCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JourneySimulator;
