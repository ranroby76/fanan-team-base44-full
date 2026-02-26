import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export default function PullToRefresh({ onRefresh, children }) {
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [pullRatio, setPullRatio] = useState(0);

  const threshold = 80;

  const handleTouchStart = (e) => {
    if (window.scrollY === 0) {
      setStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (startY === 0) return;
    const y = e.touches[0].clientY;
    if (y > startY) {
      const distance = y - startY;
      // Limit the visual pull distance
      const visualDistance = Math.min(distance * 0.5, threshold + 20);
      setCurrentY(visualDistance);
      setPullRatio(Math.min(visualDistance / threshold, 1));
      
      // Only prevent default if we're actively pulling to avoid blocking normal scroll
      if (distance > 10 && e.cancelable) {
        e.preventDefault();
      }
    }
  };

  const handleTouchEnd = async () => {
    if (currentY >= threshold && !refreshing) {
      setRefreshing(true);
      if (onRefresh) {
        await onRefresh();
      }
      setRefreshing(false);
    }
    setStartY(0);
    setCurrentY(0);
    setPullRatio(0);
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative min-h-full w-full"
    >
      <div 
        className="absolute top-0 left-0 right-0 flex justify-center items-center overflow-hidden transition-all duration-200 z-50 pointer-events-none"
        style={{ height: currentY > 0 ? `${Math.min(currentY, 100)}px` : '0px' }}
      >
        {refreshing ? (
          <div className="bg-background rounded-full p-2 shadow-md">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div 
            className="rounded-full bg-background shadow-md p-2 flex items-center justify-center transition-transform"
            style={{ 
              transform: `rotate(${pullRatio * 360}deg)`, 
              opacity: pullRatio,
              scale: pullRatio
            }}
          >
            <Loader2 className="w-5 h-5 text-muted-foreground" />
          </div>
        )}
      </div>
      <div 
        className="transition-transform duration-200"
        style={{ transform: `translateY(${refreshing ? 50 : Math.min(currentY, threshold)}px)` }}
      >
        {children}
      </div>
    </div>
  );
}