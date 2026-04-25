import React, { useState } from 'react';
import { FileText, Check } from 'lucide-react';
import './Cards.css';

const ChecklistCard = ({ data }) => {
  // If data is not provided or not an array, use a default list
  const defaultItems = ["Voter ID Card (EPIC)", "Aadhar Card", "PAN Card", "Passport", "Driving License"];
  const items = Array.isArray(data) && data.length > 0 ? data : defaultItems;
  
  const [checkedItems, setCheckedItems] = useState({});

  const toggleItem = (index) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="action-card glass-panel">
      <div className="card-header">
        <FileText size={18} className="card-icon" />
        <span>Document Checklist</span>
      </div>
      <div className="card-content">
        <p style={{ fontSize: '0.85rem', marginBottom: '15px', color: 'var(--text-main)' }}>
          Carry ANY ONE of the following original documents:
        </p>
        
        <div className="checklist-items">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`checklist-item ${checkedItems[index] ? 'checked' : ''}`}
              onClick={() => toggleItem(index)}
            >
              <div className="checkbox-custom">
                {checkedItems[index] && <Check size={14} />}
              </div>
              <span className="item-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChecklistCard;
