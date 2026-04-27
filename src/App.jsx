import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Map as MapIcon, FileText, Calendar, MessageSquare, AlertTriangle, LayoutDashboard, Sparkles, Zap } from 'lucide-react';
import ChatBox from './components/chat/ChatBox';
import MapSection from './components/sections/MapSection';
import DocumentSection from './components/sections/DocumentSection';
import TimelineSection from './components/sections/TimelineSection';
import VoteDayMode from './components/sections/VoteDayMode';
import DashboardSection from './components/sections/DashboardSection';
import JourneySimulator from './components/sections/JourneySimulator';
import FakeNewsDetector from './components/sections/FakeNewsDetector';
import GamificationHub from './components/sections/GamificationHub';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import AIBehaviorEngine from './components/AIBehaviorEngine';
import CustomCursor from './components/CustomCursor';
import { useUserMemory } from './contexts/UserMemoryContext';
import './index.css';
import './App.css';

function App() {
  const { memory } = useUserMemory();
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'map', 'docs', 'timeline', 'dashboard'
  const [isVoteDay, setIsVoteDay] = useState(false);

  const renderContent = () => {
    if (isVoteDay) {
      return <VoteDayMode memory={memory} onAction={(tab) => {
        setIsVoteDay(false);
        setActiveTab(tab);
      }} />;
    }

    switch (activeTab) {
      case 'chat':
        return <ChatBox language={language} />;
      case 'map':
        return <MapSection />;
      case 'docs':
        return <DocumentSection />;
      case 'timeline':
        return <TimelineSection />;
      case 'dashboard':
        return <DashboardSection memory={memory} onAction={(tab) => setActiveTab(tab)} />;
      case 'simulator':
        return <JourneySimulator />;
      case 'fakenews':
        return <FakeNewsDetector />;
      case 'gamification':
        return <GamificationHub />;
      default:
        return <ChatBox language={language} />;
    }
  };

  return (
    <div className="app-container">
      <CustomCursor />
      {!memory.onboardingComplete && <OnboardingFlow />}
      
      <AIBehaviorEngine onSuggest={(text) => {
        setActiveTab('chat');
        // We can pass the suggestion to ChatBox via a ref or context if needed
      }} />

      {/* Background decorative elements */}
      <div className="bg-blob blob-1 neon-glow"></div>
      <div className="bg-blob blob-2 neon-glow"></div>
      <div className="bg-blob blob-3"></div>

      <header className="app-header glass-panel">
        <div className="header-content">
          <div className="logo-container">
            <Bot size={32} className="text-primary-neon animate-float" />
            <h1 className="app-title text-gradient">Smart Voting Assistant</h1>
          </div>
          
          <div className="header-controls">
            <div className="user-indicator glass-panel">
              <span className="user-name">{memory.userName || 'Citizen'}</span>
              <div className="streak-badge">
                <Sparkles size={14} />
                <span>{memory.streak || 0}</span>
              </div>
            </div>
            
            <div className="lang-switcher glass-panel">
              <button 
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => setLanguage('en')}
              >
                EN
              </button>
              <button 
                className={`lang-btn ${language === 'hi' ? 'active' : ''}`}
                onClick={() => setLanguage('hi')}
              >
                HI
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (isVoteDay ? 'voteday' : 'normal')}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.02, y: -10 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <nav className="bottom-nav glass-panel">
        <button 
          className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={22} />
          <span>Hub</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={22} />
          <span>AI Assist</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'simulator' ? 'active' : ''}`}
          onClick={() => setActiveTab('simulator')}
        >
          <Zap size={22} />
          <span>Journey</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapIcon size={22} />
          <span>Booths</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'fakenews' ? 'active' : ''}`}
          onClick={() => setActiveTab('fakenews')}
        >
          <AlertTriangle size={22} />
          <span>Verify</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
