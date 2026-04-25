import React, { useState } from 'react';
import { Bot, Map as MapIcon, FileText, Calendar, MessageSquare, AlertTriangle } from 'lucide-react';
import ChatBox from './components/chat/ChatBox';
import MapSection from './components/sections/MapSection';
import DocumentSection from './components/sections/DocumentSection';
import TimelineSection from './components/sections/TimelineSection';
import VoteDayMode from './components/sections/VoteDayMode';
import ProactiveReminder from './components/cards/ProactiveReminder';
import ProgressTracker from './components/cards/ProgressTracker';
import { useUserMemory } from './contexts/UserMemoryContext';
import './index.css';
import './App.css';
function App() {
  const { memory } = useUserMemory();
  const [language, setLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'map', 'docs', 'timeline'
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
      default:
        return <ChatBox language={language} />;
    }
  };

  return (
    <div className="app-container">
      {/* Background decorative elements */}
      <div className="bg-blob blob-1 neon-glow"></div>
      <div className="bg-blob blob-2 neon-glow"></div>

      <header className="app-header glass-panel">
        <div className="header-content">
          <div className="logo-container">
            <Bot size={32} className="text-primary-neon animate-float" />
            <h1 className="app-title">Voting Companion</h1>
          </div>
          
          <div className="header-controls">
            <button 
              className={`lang-btn ${isVoteDay ? 'active' : ''}`}
              onClick={() => setIsVoteDay(!isVoteDay)}
              title="Toggle Vote Day Mode"
            >
              <AlertTriangle size={16} />
            </button>
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
      </header>

      <main className="app-main">
        <div className="content-wrapper">
          {!isVoteDay && <ProactiveReminder memory={memory} />}
          {!isVoteDay && activeTab === 'timeline' && <ProgressTracker memory={memory} />}
          {renderContent()}
        </div>
      </main>

      {/* Bottom Navigation for Mobile / Fixed Navigation */}
      <nav className="bottom-nav glass-panel">
        <button 
          className={`nav-item ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <MessageSquare size={24} />
          <span>Chat</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <MapIcon size={24} />
          <span>Map</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'docs' ? 'active' : ''}`}
          onClick={() => setActiveTab('docs')}
        >
          <FileText size={24} />
          <span>Docs</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          <Calendar size={24} />
          <span>Timeline</span>
        </button>
      </nav>
    </div>
  );
}

export default App;
