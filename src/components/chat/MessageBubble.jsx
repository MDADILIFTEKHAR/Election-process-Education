import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import './MessageBubble.css';
import MapCard from '../cards/MapCard';
import ChecklistCard from '../cards/ChecklistCard';
import CrowdCard from '../cards/CrowdCard';
import JourneyCard from '../cards/JourneyCard';
import BadgeCard from '../cards/BadgeCard';

const MessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  const renderActionCard = () => {
    if (!message.action || message.action === 'none') return null;

    switch (message.action) {
      case 'map':
        return <MapCard data={message.actionData} />;
      case 'checklist':
        return <ChecklistCard data={message.actionData} />;
      case 'crowd':
        return <CrowdCard data={message.actionData} />;
      case 'journey':
        return <JourneyCard progress={message.actionData?.progress} completedSteps={message.actionData?.completedSteps} />;
      case 'badge':
        return <BadgeCard badges={message.actionData?.badges} />;
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`message-wrapper ${isUser ? 'user-wrapper' : 'bot-wrapper'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="avatar bot-avatar">
          <Bot size={18} />
        </div>
      )}
      
      <div className="message-content">
        <div className={`bubble ${isUser ? 'user-bubble' : 'bot-bubble glass-panel'}`}>
          <p className="message-text">{message.text}</p>
        </div>
        
        {renderActionCard()}
      </div>

      {isUser && (
        <div className="avatar user-avatar">
          <User size={18} />
        </div>
      )}
    </motion.div>
  );
};

export default MessageBubble;
