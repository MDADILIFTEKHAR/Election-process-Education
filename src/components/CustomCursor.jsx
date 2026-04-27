import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.glass-panel')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ 
          transform: `translate(${position.x - 6}px, ${position.y - 6}px) scale(${isHovering ? 1.5 : 1})` 
        }} 
      />
      <div 
        className="cursor-follower" 
        style={{ 
          transform: `translate(${position.x - 20}px, ${position.y - 20}px) scale(${isHovering ? 2 : 1})`,
          borderColor: isHovering ? 'var(--secondary-neon)' : 'var(--primary-neon)'
        }} 
      />
    </>
  );
};

export default CustomCursor;
