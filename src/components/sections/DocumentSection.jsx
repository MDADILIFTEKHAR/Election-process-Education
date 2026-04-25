import React from 'react';
import { FileText } from 'lucide-react';
import ChecklistCard from '../cards/ChecklistCard';
import './Section.css';

const DocumentSection = () => {
  return (
    <div className="section-container glass-panel">
      <h2 className="section-title">
        <FileText size={24} className="text-primary-neon" />
        Required Documents
      </h2>
      <p className="section-description">Ensure you have the necessary identification before heading to the polling booth.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ChecklistCard data={["Voter ID Card (EPIC)", "Aadhar Card", "PAN Card", "Passport", "Driving License", "MGNREGA Job Card", "Passbook with Photograph"]} />
      </div>
    </div>
  );
};

export default DocumentSection;
