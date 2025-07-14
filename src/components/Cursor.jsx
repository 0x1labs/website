
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMovingFast, setIsMovingFast] = useState(false);
  const lastPosition = useRef({ x: 0, y: 0 });
  const lastTime = useRef(Date.now());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const currentTime = Date.now();
      const dx = e.clientX - lastPosition.current.x;
      const dy = e.clientY - lastPosition.current.y;
      const dt = currentTime - lastTime.current;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = distance / dt; // pixels per millisecond

      if (speed > 0.8) { // Threshold for "fast" movement
        setIsMovingFast(true);
      } else {
        setIsMovingFast(false);
      }

      lastPosition.current = { x: e.clientX, y: e.clientY };
      lastTime.current = currentTime;
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    const interactiveElements = document.querySelectorAll('a, button, input, [data-interactive]');
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      x: position.x - 5,
      y: position.y - 5,
      height: 10,
      width: 10,
      backgroundColor: 'var(--color-brand)',
      opacity: 0.8,
      scale: 1,
      boxShadow: '0 0 8px 4px rgba(var(--color-brand-rgb), 0.5)',
      transition: { type: 'spring', stiffness: 500, damping: 30 }
    },
    hover: {
      x: position.x - 10,
      y: position.y - 10,
      height: 20,
      width: 20,
      backgroundColor: 'var(--color-brand)',
      opacity: 1,
      scale: 1.2,
      boxShadow: '0 0 12px 6px rgba(var(--color-brand-rgb), 0.7)',
      transition: { type: 'spring', stiffness: 400, damping: 20 }
    },
    click: {
      x: position.x - 7.5,
      y: position.y - 7.5,
      height: 15,
      width: 15,
      backgroundColor: 'var(--color-brand)',
      opacity: 1,
      scale: 0.8,
      boxShadow: '0 0 6px 3px rgba(var(--color-brand-rgb), 0.9)',
      transition: { type: 'spring', stiffness: 600, damping: 10 }
    },
    fastMove: {
      x: position.x - 7.5,
      y: position.y - 7.5,
      height: 15,
      width: 15,
      backgroundColor: 'var(--color-brand)',
      opacity: 0.6,
      scale: 1.5,
      boxShadow: '0 0 10px 5px rgba(var(--color-brand-rgb), 0.4)',
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    }
  };

  let currentVariant = 'default';
  if (isClicked) {
    currentVariant = 'click';
  } else if (isHovering) {
    currentVariant = 'hover';
  } else if (isMovingFast) {
    currentVariant = 'fastMove';
  }

  if (isMobile) return null; // Don't render cursor on mobile

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[999]"
      variants={cursorVariants}
      animate={currentVariant}
    />
  );
};

export default Cursor;
