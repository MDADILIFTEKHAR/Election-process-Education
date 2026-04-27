import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ShieldAlert, Search, RefreshCcw, Info } from 'lucide-react';
import AntigravityCard from '../cards/AntigravityCard';

const FakeNewsDetector = () => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeNews = () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const results = [
        { status: 'verified', label: 'Verified Information', icon: <ShieldCheck className="text-success-color" />, color: 'var(--success-color)', desc: "This message aligns with official election guidelines and verified data." },
        { status: 'misinfo', label: 'Potential Misinformation', icon: <ShieldAlert className="text-error-color" />, color: 'var(--error-color)', desc: "Caution: This message contains claims that are currently unverified or contradict official sources." },
        { status: 'inconclusive', label: 'Inconclusive', icon: <Info className="text-warning-color" />, color: 'var(--warning-color)', desc: "The AI could not find enough data to verify this claim. Please cross-check with official sources." }
      ];
      
      // Randomly pick for demo, but in real app would call an API
      setResult(results[Math.floor(Math.random() * results.length)]);
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="fake-news-section section-container">
      <div className="section-header">
        <h2 className="text-gradient">AI Fake News Detector</h2>
        <p>Paste any election-related message to verify its authenticity.</p>
      </div>

      <div className="fake-news-layout">
        <AntigravityCard className="detector-card" glowColor="var(--secondary-neon)">
          <div className="input-area">
            <textarea 
              placeholder="Paste message here (e.g., 'Holiday declared on voting day...')"
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isAnalyzing}
            />
            <div className="input-footer">
              <span className="char-count">{text.length} characters</span>
              <button 
                className="btn-primary analyze-btn" 
                onClick={analyzeNews}
                disabled={isAnalyzing || !text.trim()}
              >
                {isAnalyzing ? <RefreshCcw className="animate-spin" size={18} /> : <Search size={18} />}
                <span>{isAnalyzing ? "Analyzing..." : "Check Authenticity"}</span>
              </button>
            </div>
          </div>
        </AntigravityCard>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <AntigravityCard className="result-card" glowColor={result.color}>
                <div className="result-header">
                  <div className="result-icon-bg" style={{ backgroundColor: `${result.color}22` }}>
                    {result.icon}
                  </div>
                  <div className="result-title">
                    <h3 style={{ color: result.color }}>{result.label}</h3>
                    <p>{result.desc}</p>
                  </div>
                </div>
                <div className="result-actions">
                  <button className="view-source-btn">View Official Sources</button>
                  <button className="reset-btn" onClick={() => {setResult(null); setText('');}}>Check Another</button>
                </div>
              </AntigravityCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .fake-news-layout {
          display: flex;
          flex-direction: column;
          gap: 24px;
          margin-top: 24px;
        }
        .detector-card .input-area textarea {
          width: 100%;
          height: 150px;
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          padding: 16px;
          color: var(--text-light);
          font-family: inherit;
          font-size: 1rem;
          resize: none;
          outline: none;
        }
        .detector-card .input-area textarea:focus {
          border-color: var(--secondary-neon);
        }
        .input-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }
        .char-count {
          font-size: 0.8rem;
          color: var(--text-main);
        }
        .analyze-btn {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .result-header {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .result-icon-bg {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .result-title h3 {
          margin-bottom: 4px;
        }
        .result-title p {
          font-size: 0.9rem;
          line-height: 1.5;
        }
        .result-actions {
          display: flex;
          gap: 12px;
          margin-top: 20px;
        }
        .view-source-btn {
          flex: 1;
          padding: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-light);
          cursor: pointer;
        }
        .reset-btn {
          padding: 10px 20px;
          background: transparent;
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-main);
          cursor: pointer;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default FakeNewsDetector;
