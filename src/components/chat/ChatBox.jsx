import React, { useState, useRef, useEffect } from 'react';
import ChatInput from './ChatInput';
import MessageBubble from './MessageBubble';
import AIAvatar from './AIAvatar';
import VoiceWaveform from './VoiceWaveform';
import { getAIResponse } from '../../services/ai';
import { useUserMemory } from '../../contexts/UserMemoryContext';
import './ChatBox.css';

const ChatBox = ({ language }) => {
  const { memory, updateMemory } = useUserMemory();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: language === 'hi' ? 'Namaste! Main aapka Smart Voting Assistant hoon. Main aapki kaise madad kar sakta hoon?' : 'Hello! I am your Smart Voting Assistant. How can I help you today?',
      action: 'none'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Update welcome message on language change if it's the only message
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{
        id: 1,
        sender: 'bot',
        text: language === 'hi' ? 'Namaste! Main aapka Smart Voting Assistant hoon. Main aapki kaise madad kar sakta hoon?' : `Hello${memory.userName ? ' ' + memory.userName : ''}! I am your Smart Voting Assistant. How can I help you today?`,
        action: 'none'
      }]);
    }
  }, [language, memory.userName]);

  const handleSendMessage = async (text) => {
    // Add user message
    const newUserMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      action: 'none'
    };
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);

    // Fetch AI response
    const aiResponse = await getAIResponse(text, language, memory);
    
    // Process memory updates if any
    if (aiResponse.memoryUpdate) {
      updateMemory(aiResponse.memoryUpdate);
    }

    const newBotMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: aiResponse.text,
      action: aiResponse.action,
      actionData: aiResponse.actionData
    };

    setMessages(prev => [...prev, newBotMessage]);
    setIsLoading(false);

    // Speak the response
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Cancel any ongoing speech
      const utterance = new SpeechSynthesisUtterance(aiResponse.text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-US';
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="chat-box-container">
      <AIAvatar isSpeaking={isSpeaking} />
      <div className="messages-area">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        
        {isLoading && (
          <div className="loading-indicator">
            <div className="dot neon-glow"></div>
            <div className="dot neon-glow" style={{ animationDelay: '0.2s' }}></div>
            <div className="dot neon-glow" style={{ animationDelay: '0.4s' }}></div>
          </div>
        )}
        <VoiceWaveform isSpeaking={isSpeaking} />
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} language={language} />
    </div>
  );
};

export default ChatBox;
