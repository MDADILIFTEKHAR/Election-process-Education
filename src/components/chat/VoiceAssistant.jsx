import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const VoiceAssistant = ({ onResult, language = 'en' }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = language === 'hi' ? 'hi-IN' : 'en-US';

      recognizer.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onResult(transcript);
        setIsListening(false);
      };

      recognizer.onerror = () => setIsListening(false);
      recognizer.onend = () => setIsListening(false);

      setRecognition(recognizer);
    }
  }, [language, onResult]);

  const toggleListening = () => {
    if (isListening) {
      recognition?.stop();
    } else {
      recognition?.start();
      setIsListening(true);
    }
  };

  return (
    <motion.button
      className={`voice-assist-btn ${isListening ? 'active' : ''}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleListening}
      title={isListening ? "Stop listening" : "Start voice assistant"}
    >
      {isListening ? (
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <Mic className="text-primary-neon" size={24} />
        </motion.div>
      ) : (
        <MicOff size={24} />
      )}
      <style>{`
        .voice-assist-btn {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-main);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .voice-assist-btn.active {
          background: rgba(0, 242, 254, 0.1);
          border-color: var(--primary-neon);
          box-shadow: 0 0 20px rgba(0, 242, 254, 0.3);
        }
      `}</style>
    </motion.button>
  );
};

export default VoiceAssistant;
