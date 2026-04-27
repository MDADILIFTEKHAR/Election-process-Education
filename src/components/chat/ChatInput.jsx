import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, disabled, language }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      
      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInput(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = language === 'hi' ? 'hi-IN' : 'en-US';
        recognitionRef.current.start();
        setIsRecording(true);
      } else {
        alert("Your browser does not support Speech Recognition.");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSendMessage(input);
      setInput('');
      if (isRecording) {
        recognitionRef.current?.stop();
      }
    }
  };

  return (
    <div className="chat-input-wrapper">
      <AnimatePresence>
        {!isRecording && (
          <motion.div 
            className="quick-actions-chips"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <button className="chip glass-panel" onClick={() => setInput("Where is my booth?")}>Booth Location</button>
            <button className="chip glass-panel" onClick={() => setInput("What documents do I need?")}>Documents</button>
            <button className="chip glass-panel" onClick={() => setInput("Check my journey progress")}>Journey</button>
          </motion.div>
        )}
      </AnimatePresence>

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className={`input-container glass-panel ${isRecording ? 'recording-active' : ''}`}>
          <div className="input-prefix">
            <Command size={16} className="text-main opacity-50" />
          </div>
          
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Listening to you..." : "Ask your voting companion..."}
            disabled={disabled && !isRecording}
            className="chat-input"
          />

          <div className="input-actions">
            <button 
              type="button" 
              className={`action-icon-btn mic-btn ${isRecording ? 'active' : ''}`} 
              onClick={toggleRecording}
              disabled={disabled && !isRecording}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
              {isRecording && <span className="mic-pulse"></span>}
            </button>
            
            <button 
              type="submit" 
              className="action-icon-btn send-btn" 
              disabled={!input.trim() || disabled}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
