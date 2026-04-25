import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import './Cards.css';

const ProactiveReminder = ({ memory }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  let reminderMessage = null;
  let reminderType = 'info'; // 'info', 'warning', 'urgent'

  if (memory.voterStatus === 'unregistered') {
    reminderMessage = "You haven't completed your voter registration. The deadline is approaching!";
    reminderType = 'warning';
  } else if (memory.voterStatus === 'registered' && !memory.documentsReady) {
    reminderMessage = "You are registered, but haven't confirmed your documents are ready. Make sure you have your ID!";
    reminderType = 'info';
  } else if (memory.voterStatus === 'registered' && memory.documentsReady) {
    // Just a sample date for the reminder
    reminderMessage = "Voting is soon! You are all set. Make sure to check your polling booth location.";
    reminderType = 'info';
  }

  if (!reminderMessage) return null;

  return (
    <div className={`proactive-reminder glass-panel reminder-${reminderType}`}>
      <div className="reminder-icon">
        <AlertCircle size={20} />
      </div>
      <div className="reminder-content">
        <p>{reminderMessage}</p>
      </div>
      <button className="reminder-close" onClick={() => setDismissed(true)}>
        <X size={16} />
      </button>
    </div>
  );
};

export default ProactiveReminder;
