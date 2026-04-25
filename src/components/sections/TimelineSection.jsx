import React from 'react';
import { Calendar, MapPin, FileText, CheckCircle } from 'lucide-react';
import './Section.css';

const TimelineSection = () => {
  return (
    <div className="section-container glass-panel">
      <h2 className="section-title">
        <Calendar size={24} className="text-primary-neon" />
        Election Timeline
      </h2>
      <p className="section-description">Key dates and deadlines for the upcoming elections.</p>
      
      <div className="timeline">
        <div className="timeline-item completed">
          <div className="timeline-marker"><CheckCircle size={16} /></div>
          <div className="timeline-content">
            <h3>Voter Registration Ends</h3>
            <p>October 15, 2026</p>
          </div>
        </div>
        <div className="timeline-item active">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>Candidate Nominations</h3>
            <p>November 1 - 10, 2026</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>Election Day</h3>
            <p>December 5, 2026</p>
          </div>
        </div>
        <div className="timeline-item">
          <div className="timeline-marker"></div>
          <div className="timeline-content">
            <h3>Results Declaration</h3>
            <p>December 10, 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;
