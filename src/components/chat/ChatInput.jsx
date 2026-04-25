import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import './ChatInput.css';

const ChatInput = ({ onSendMessage, disabled, language }) => {
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition
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
        // We do not auto-send here to allow the user to review the text
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
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
        setIsRecording(false);
      }
    }
  };

  return (
    <div className="chat-input-wrapper">
      {!isRecording && (
        <div className="quick-actions-chips">
          <button className="chip" onClick={() => setInput("Where is my booth?")}>Booth Location</button>
          <button className="chip" onClick={() => setInput("What documents do I need?")}>Documents</button>
          <button className="chip" onClick={() => setInput("Is it crowded now?")}>Check Crowd</button>
        </div>
      )}
      <form className="chat-input-form" onSubmit={handleSubmit}>
        {isRecording && (
          <div className="voice-wave-container">
            <div className="voice-wave">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <span className="recording-text">Listening...</span>
          </div>
        )}
        
        <div className={`input-container glass-panel ${isRecording ? 'recording-active' : ''}`}>
          <button 
            type="button" 
            className={`icon-btn mic-btn floating-mic ${isRecording ? 'active' : ''}`} 
            onClick={toggleRecording}
            disabled={disabled && !isRecording}
          >
            {isRecording ? <MicOff size={22} /> : <Mic size={22} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isRecording ? "Speak now..." : "Ask me anything..."}
            disabled={disabled && !isRecording}
            className="chat-input"
          />
          <button type="submit" className="icon-btn send-btn" disabled={!input.trim() || disabled}>
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
