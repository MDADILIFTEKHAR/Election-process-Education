import React from 'react';
import { TrendingUp, Users, Clock, MapPin, FileCheck, CheckCircle2, ChevronRight, Zap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import AntigravityCard from '../cards/AntigravityCard';
import './Section.css';

const CircularProgress = ({ progress }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="circular-progress-container">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-neon)" />
            <stop offset="100%" stopColor="var(--secondary-neon)" />
          </linearGradient>
        </defs>
        <circle className="circle-bg" cx="50" cy="50" r={radius} />
        <motion.circle 
          className="circle-fill" 
          cx="50" cy="50" r={radius} 
          stroke="url(#progressGradient)"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="progress-content">
        <span className="progress-value">{progress}%</span>
        <span className="progress-label">Ready</span>
      </div>
    </div>
  );
};

const DashboardSection = ({ memory, onAction }) => {
  const stats = [
    { label: 'Turnout', value: '64.2%', icon: <TrendingUp size={18} />, color: 'var(--primary-neon)' },
    { label: 'Wait Time', value: '15 min', icon: <Clock size={18} />, color: 'var(--secondary-neon)' },
    { label: 'Capacity', value: 'Medium', icon: <Users size={18} />, color: 'var(--accent-purple)' },
  ];

  const getNextStep = () => {
    if (memory.voterStatus !== 'registered') return "Register to Vote";
    if (!memory.documentsReady) return "Verify Your Documents";
    if (!memory.votingBooth) return "Find Polling Booth";
    return "Ready for Election Day!";
  };

  return (
    <div className="dashboard-section section-container">
      <div className="dashboard-layout">
        {/* Left Column: Progress & Identity */}
        <div className="dashboard-main">
          <AntigravityCard className="hero-dashboard-card" glowColor="var(--primary-neon)">
            <div className="dashboard-hero-content">
              <div className="hero-text-area">
                <h2 className="text-gradient">Welcome back, {memory.userName || 'Citizen'}</h2>
                <p>{memory.isFirstTimeVoter ? "Making your first vote count!" : "Active participant in democracy."}</p>
                
                <div className="next-step-nudge glass-panel">
                  <div className="nudge-icon-wrapper">
                    <Zap size={20} className="text-primary-neon" />
                  </div>
                  <div className="nudge-text">
                    <span className="nudge-label">Next Action</span>
                    <span className="nudge-value">{getNextStep()}</span>
                  </div>
                  <button className="nudge-action-btn" onClick={() => onAction('chat')}>
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
              <CircularProgress progress={memory.journeyProgress || 10} />
            </div>
          </AntigravityCard>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <AntigravityCard key={index} className="mini-stat-card" glowColor={stat.color}>
                <div className="mini-stat-header">
                  <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
                  <span className="stat-label">{stat.label}</span>
                </div>
                <h3 className="stat-value">{stat.value}</h3>
              </AntigravityCard>
            ))}
          </div>
        </div>

        {/* Right Column: Gamification & Quick Links */}
        <div className="dashboard-side">
          <AntigravityCard className="gamification-summary-card" glowColor="var(--accent-purple)">
            <div className="card-header-with-icon">
              <Trophy size={20} className="text-accent-purple" />
              <h3>Your Achievements</h3>
            </div>
            <div className="badges-preview">
              {memory.badges?.length > 0 ? (
                memory.badges.slice(0, 3).map((badge, i) => (
                  <div key={i} className="badge-mini">{badge}</div>
                ))
              ) : (
                <p className="no-badges-text">Complete tasks to earn badges!</p>
              )}
            </div>
            <button className="view-more-btn" onClick={() => onAction('gamification')}>
              View Journey Hub
            </button>
          </AntigravityCard>

          <AntigravityCard className="quick-info-card" glowColor="var(--secondary-neon)">
            <h3>Election Countdown</h3>
            <div className="countdown-timer">
              <div className="time-unit">
                <span className="time-val">12</span>
                <span className="time-label">Days</span>
              </div>
              <div className="time-sep">:</div>
              <div className="time-unit">
                <span className="time-val">08</span>
                <span className="time-label">Hrs</span>
              </div>
            </div>
            <div className="booth-location-preview">
              <MapPin size={16} />
              <span>{memory.votingBooth?.name || "Booth not set"}</span>
            </div>
          </AntigravityCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;
