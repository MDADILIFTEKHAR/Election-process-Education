import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Target, Flame, BadgeCheck, BookOpen } from 'lucide-react';
import { useUserMemory } from '../../contexts/UserMemoryContext';
import AntigravityCard from '../cards/AntigravityCard';

const GamificationHub = () => {
  const { memory } = useUserMemory();

  const badges = [
    { id: 'first-time', name: 'First-Time Voter', desc: 'Ready for the first democratic journey', icon: <Flame />, color: '#ff6b6b', earned: memory.isFirstTimeVoter },
    { id: 'expert', name: 'Democracy Expert', desc: 'Completed all awareness quizzes', icon: <BadgeCheck />, color: '#4facfe', earned: memory.quizzesTaken >= 5 },
    { id: 'helper', name: 'Civic Companion', desc: 'Shared election info with 5 friends', icon: <Star />, color: '#f9d423', earned: false },
    { id: 'onboarded', name: 'Citizen Ready', desc: 'Completed personalized onboarding', icon: <Trophy />, color: '#00f2fe', earned: memory.onboardingComplete },
  ];

  const quizzes = [
    { title: "Election Basics", difficulty: "Easy", duration: "2 min", xp: 100 },
    { title: "Voter Rights 101", difficulty: "Medium", duration: "5 min", xp: 250 },
    { title: "EVM & VVPAT Guide", difficulty: "Hard", duration: "4 min", xp: 400 },
  ];

  return (
    <div className="gamification-hub section-container">
      <div className="hub-header">
        <h2 className="text-gradient">Democracy Rewards</h2>
        <p>Level up your civic participation and earn exclusive badges.</p>
      </div>

      <div className="hub-layout">
        {/* Streak & XP Area */}
        <div className="hub-top-row">
          <AntigravityCard className="streak-card" glowColor="var(--accent-purple)">
            <div className="streak-content">
              <div className="streak-main">
                <Flame size={48} className={memory.streak > 0 ? "text-accent-pink" : "text-main"} />
                <div className="streak-info">
                  <h3>{memory.streak || 0} Day Streak</h3>
                  <p>Keep the democracy flame alive!</p>
                </div>
              </div>
              <div className="xp-bar-wrapper">
                <div className="xp-labels">
                  <span>Level 1</span>
                  <span>{memory.quizzesTaken * 100} / 1000 XP</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-fill" style={{ width: `${(memory.quizzesTaken * 100 / 1000) * 100}%` }}></div>
                </div>
              </div>
            </div>
          </AntigravityCard>
        </div>

        <div className="hub-grid">
          {/* Badges Section */}
          <div className="badges-section">
            <h3 className="sub-title">Your Badges</h3>
            <div className="badges-list">
              {badges.map((badge) => (
                <AntigravityCard 
                  key={badge.id} 
                  className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}
                  glowColor={badge.earned ? badge.color : 'rgba(255,255,255,0.1)'}
                >
                  <div className="badge-icon-large" style={{ color: badge.earned ? badge.color : '#444' }}>
                    {badge.icon}
                  </div>
                  <h4>{badge.name}</h4>
                  <p>{badge.desc}</p>
                  {!badge.earned && <div className="lock-overlay">Locked</div>}
                </AntigravityCard>
              ))}
            </div>
          </div>

          {/* Quizzes Section */}
          <div className="quizzes-section">
            <h3 className="sub-title">Awareness Quizzes</h3>
            <div className="quizzes-list">
              {quizzes.map((quiz, i) => (
                <AntigravityCard key={i} className="quiz-card" glowColor="var(--secondary-neon)">
                  <div className="quiz-header">
                    <BookOpen size={20} className="text-secondary-neon" />
                    <span>{quiz.duration}</span>
                  </div>
                  <h4>{quiz.title}</h4>
                  <div className="quiz-footer">
                    <span className="difficulty">{quiz.difficulty}</span>
                    <span className="xp-reward">+{quiz.xp} XP</span>
                  </div>
                  <button className="start-quiz-btn">Start Quiz</button>
                </AntigravityCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hub-top-row {
          margin: 24px 0;
        }
        .streak-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .streak-main {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .streak-info h3 {
          font-size: 1.5rem;
          margin-bottom: 4px;
        }
        .xp-bar {
          height: 8px;
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
          overflow: hidden;
          margin-top: 8px;
        }
        .xp-fill {
          height: 100%;
          background: linear-gradient(to right, var(--accent-purple), var(--accent-pink));
          box-shadow: 0 0 10px var(--accent-purple);
        }
        .xp-labels {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-main);
        }
        .hub-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .sub-title {
          font-size: 1.2rem;
          margin-bottom: 16px;
          color: var(--text-light);
        }
        .badges-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          gap: 16px;
        }
        .badge-card {
          text-align: center;
          padding: 20px;
          height: 100%;
        }
        .badge-icon-large {
          margin: 0 auto 12px;
        }
        .badge-icon-large svg {
          width: 40px;
          height: 40px;
        }
        .badge-card h4 {
          font-size: 0.95rem;
          margin-bottom: 8px;
        }
        .badge-card p {
          font-size: 0.75rem;
          line-height: 1.4;
        }
        .badge-card.locked {
          opacity: 0.5;
          filter: grayscale(1);
        }
        .lock-overlay {
          font-size: 0.7rem;
          text-transform: uppercase;
          margin-top: 12px;
          color: var(--text-main);
        }
        .quizzes-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .quiz-card {
          padding: 20px;
        }
        .quiz-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-main);
          margin-bottom: 12px;
        }
        .quiz-footer {
          display: flex;
          justify-content: space-between;
          margin: 12px 0 20px;
        }
        .difficulty {
          font-size: 0.75rem;
          padding: 2px 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 4px;
        }
        .xp-reward {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--secondary-neon);
        }
        .start-quiz-btn {
          width: 100%;
          padding: 10px;
          background: rgba(0, 242, 254, 0.1);
          border: 1px solid var(--secondary-neon);
          border-radius: 8px;
          color: var(--secondary-neon);
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s;
        }
        .start-quiz-btn:hover {
          background: var(--secondary-neon);
          color: #000;
        }
        @media (max-width: 768px) {
          .hub-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default GamificationHub;
