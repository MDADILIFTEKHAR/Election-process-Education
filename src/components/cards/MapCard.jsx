import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Loader2, Info, Clock, Users } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { motion, AnimatePresence } from 'framer-motion';
import './Cards.css';

const MapInnerContent = ({ userLocation, boothPosition, setBoothPosition, setBoothInfo }) => {
  const map = useMap();
  const placesLibrary = useMapsLibrary('places');
  const [hasFound, setHasFound] = useState(false);

  useEffect(() => {
    if (!placesLibrary || !map || !userLocation || hasFound) return;

    const service = new google.maps.places.PlacesService(map);
    const request = {
      location: userLocation,
      radius: '3000',
      type: ['school', 'local_government_office', 'library', 'stadium']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
        const place = results[0];
        const pos = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        };
        setBoothPosition(pos);
        setBoothInfo({
          name: place.name,
          address: place.vicinity || "Nearby Location",
          waitTime: "15 min",
          crowd: "Medium"
        });
        setHasFound(true);
      }
    });
  }, [placesLibrary, map, userLocation, hasFound, setBoothPosition, setBoothInfo]);

  useEffect(() => {
    if (!userLocation || hasFound) return;
    
    const timeout = setTimeout(() => {
      if (!hasFound) {
        const pos = {
          lat: userLocation.lat + 0.008,
          lng: userLocation.lng + 0.008
        };
        setBoothPosition(pos);
        setBoothInfo({
          name: "Central Polling Station (Smart Fallback)",
          address: "Sector 4, Main Road",
          waitTime: "10 min",
          crowd: "Low"
        });
        setHasFound(true);
      }
    }, 4000);
    
    return () => clearTimeout(timeout);
  }, [userLocation, hasFound, setBoothPosition, setBoothInfo]);

  return (
    <>
      {boothPosition && <AdvancedMarker position={boothPosition} title="Polling Booth" />}
      {userLocation && (
        <AdvancedMarker position={userLocation} title="Your Location">
          <div className="user-marker neon-glow"></div>
        </AdvancedMarker>
      )}
    </>
  );
};

const MapCard = ({ data }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [userLocation, setUserLocation] = useState(null);
  const [boothPosition, setBoothPosition] = useState({ lat: 28.6139, lng: 77.2090 });
  const [boothInfo, setBoothInfo] = useState({
    name: data?.booth?.name || "Finding nearest booth...",
    address: data?.booth?.address || "Scanning your area...",
    waitTime: "...",
    crowd: "..."
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(loc);
          setBoothPosition(loc); 
          setIsLoading(false);
        },
        () => setIsLoading(false),
        { enableHighAccuracy: true }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleNavigate = () => {
    const destination = `${boothPosition.lat},${boothPosition.lng}`;
    const origin = userLocation ? `${userLocation.lat},${userLocation.lng}` : '';
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}${origin ? `&origin=${origin}` : ''}`, '_blank');
  };

  return (
    <div className="map-card action-card glass-panel">
      <div className="card-header">
        <MapPin size={18} className="card-icon" />
        <span className="text-gradient">Polling Assistant</span>
      </div>
      
      <div className="card-content">
        <div className="map-container" style={{ height: '180px', borderRadius: '16px', overflow: 'hidden', background: '#1a1a2e' }}>
          {isLoading ? (
            <div className="map-placeholder">
              <Loader2 size={32} className="card-icon animate-spin" />
              <p>Locating...</p>
            </div>
          ) : apiKey ? (
            <APIProvider apiKey={apiKey}>
              <Map 
                defaultCenter={userLocation || boothPosition} 
                defaultZoom={14}
                mapId="DEMO_MAP_ID"
                disableDefaultUI={true}
              >
                <MapInnerContent 
                  userLocation={userLocation} 
                  boothPosition={boothPosition}
                  setBoothPosition={setBoothPosition}
                  setBoothInfo={setBoothInfo}
                />
              </Map>
            </APIProvider>
          ) : (
            <div className="map-placeholder">
              <MapPin size={32} className="card-icon neon-glow" />
              <p>Preview Mode (No API Key)</p>
            </div>
          )}
        </div>

        <div className="booth-info" style={{ marginTop: '15px' }}>
          <h4 className="booth-name" style={{ color: 'var(--text-light)', fontWeight: 600 }}>{boothInfo.name}</h4>
          <p className="booth-address" style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{boothInfo.address}</p>
          
          <div className="booth-stats-row" style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
            <div className="mini-stat" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--primary-neon)' }}>
              <Clock size={14} />
              <span>{boothInfo.waitTime} wait</span>
            </div>
            <div className="mini-stat" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--success-color)' }}>
              <Users size={14} />
              <span>{boothInfo.crowd} crowd</span>
            </div>
          </div>
        </div>

        <div className="card-actions" style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn-primary" onClick={handleNavigate} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <Navigation size={16} />
            Navigate
          </button>
          
          <button 
            className="details-toggle-btn" 
            onClick={() => setShowDetails(!showDetails)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-main)', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
          >
            <Info size={14} />
            {showDetails ? 'Hide details' : 'More info'}
          </button>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', fontSize: '0.8rem', color: 'var(--text-main)', paddingTop: '10px' }}
            >
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <p>• Accessibility: Ramp available</p>
                <p>• Queue Status: Moving fast</p>
                <p>• Amenities: Drinking water, seating</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MapCard;
