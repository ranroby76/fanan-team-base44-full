import React, { useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

export default function PullToRefresh({ onRefresh, children }) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(0);

  const onTouchStart = (e) => {
    if (window.scrollY <= 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const onTouchMove = (e) => {
    if (!isPulling) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    if (diff > 0) {
      // Prevent default to stop scrolling the body
      if (e.cancelable) e.preventDefault();
      setPullProgress(Math.min(diff * 0.4, 80));
    }
  };

  const onTouchEnd = async () => {
    if (pullProgress > 60 && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
    setIsPulling(false);
    setPullProgress(0);
  };

  return (
    <div 
      onTouchStart={onTouchStart} 
      onTouchMove={onTouchMove} 
      onTouchEnd={onTouchEnd}
      className="relative w-full h-full"
    >
      <div 
        className="absolute top-0 left-0 w-full flex justify-center items-center overflow-hidden transition-all duration-300 z-10"
        style={{ 
          height: isRefreshing ? '60px' : `${pullProgress}px`,
          opacity: pullProgress > 10 || isRefreshing ? 1 : 0
        }}
      >
        <Loader2 className={`w-6 h-6 text-primary ${isRefreshing ? 'animate-spin' : ''}`} 
          style={{ transform: isRefreshing ? 'none' : `rotate(${pullProgress * 5}deg)` }} 
        />
      </div>
      <div 
        className="transition-transform duration-300 h-full w-full"
        style={{ transform: `translateY(${isRefreshing ? 60 : pullProgress}px)` }}
      >
        {children}
      </div>
    </div>
  );
}