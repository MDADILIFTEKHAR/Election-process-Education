import React from 'react';
import { MapPin, Navigation, Info, Search } from 'lucide-react';
import MapCard from '../cards/MapCard';
import AntigravityCard from '../cards/AntigravityCard';
import { motion } from 'framer-motion';
import './Section.css';

const MapSection = () => {
  return (
    <motion.div 
      className="map-section-immersive"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="map-search-overlay">
        <div className="search-bar-mini glass-panel">
          <Search size={16} />
          <input type="text" placeholder="Search for another area..." />
        </div>
      </div>

      <div className="map-content-wrapper">
        <MapCard />
      </div>

      <div className="map-info-floating">
        <AntigravityCard className="route-info-card" glowColor="var(--primary-neon)">
          <div className="route-header">
            <Navigation size={20} className="text-primary-neon" />
            <span>Fastest Route: 12 min walk</span>
          </div>
          <div className="booth-status-indicator">
            <div className="status-dot green"></div>
            <span>Booth Status: Low Crowd</span>
          </div>
          <button className="btn-primary start-nav-btn">
            Start Navigation
          </button>
        </AntigravityCard>
      </div>

      <div className="map-legend glass-panel">
        <div className="legend-item">
          <div className="dot pulse-blue"></div>
          <span>You</span>
        </div>
        <div className="legend-item">
          <MapPin size={14} className="text-primary-neon" />
          <span>Booth</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MapSection;
