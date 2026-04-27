import React from 'react';
import { FileText, Shield, CreditCard, User, Landmark, Globe } from 'lucide-react';
import AntigravityCard from '../cards/AntigravityCard';
import './Section.css';

const DocumentSection = () => {
  const documents = [
    { name: "Voter ID Card (EPIC)", icon: <Shield className="text-primary-neon" />, status: "Must Have" },
    { name: "Aadhar Card", icon: <User className="text-secondary-neon" />, status: "Accepted" },
    { name: "Passport", icon: <Globe className="text-accent-purple" />, status: "Accepted" },
    { name: "Driving License", icon: <CreditCard className="text-accent-pink" />, status: "Accepted" },
    { name: "Bank Passbook", icon: <Landmark className="text-tertiary-neon" />, status: "Accepted" },
  ];

  return (
    <div className="section-container">
      <div className="vault-header">
        <h2 className="text-gradient">Identity Vault</h2>
        <p>Your secure checklist for a smooth voting experience.</p>
      </div>
      
      <div className="vault-grid">
        {documents.map((doc, i) => (
          <AntigravityCard key={i} className="vault-card" glowColor="rgba(255,255,255,0.1)">
            <div className="vault-icon-wrapper">
              {doc.icon}
            </div>
            <div className="vault-info">
              <h4>{doc.name}</h4>
              <span className="doc-status">{doc.status}</span>
            </div>
            <div className="vault-checkbox">
              <input type="checkbox" id={`doc-${i}`} />
              <label htmlFor={`doc-${i}`}></label>
            </div>
          </AntigravityCard>
        ))}
      </div>

      <div className="vault-footer glass-panel">
        <p>Don't have these? Your mobile Aadhar is also accepted in some areas.</p>
        <button className="btn-primary">View Full Guide</button>
      </div>
    </div>
  );
};

export default DocumentSection;
