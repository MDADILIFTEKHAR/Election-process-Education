import React from 'react';
import { MapPin } from 'lucide-react';
import MapCard from '../cards/MapCard';
import './Section.css';

const MapSection = () => {
  return (
    <div className="section-container glass-panel">
      <h2 className="section-title">
        <MapPin size={24} className="text-primary-neon" />
        Find Polling Booth
      </h2>
      <p className="section-description">Locate your nearest polling booth and get directions.</p>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MapCard />
      </div>
    </div>
  );
};

export default MapSection;
