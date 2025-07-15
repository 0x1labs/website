import React, { useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

const Cursor = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    const updatePosition = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
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

    // Initial animation from Navbar's 0x1 'x'
    const navbar0x1Link = document.getElementById('navbar-0x1-link');
    if (navbar0x1Link) {
      const rect = navbar0x1Link.getBoundingClientRect();
      // Approximate center of the 'x' in '0x1'
      const startX = rect.left + rect.width / 2;
      const startY = rect.top + rect.height / 2;

      x.set(startX);
      y.set(startY);

      // Animate to current mouse position after a short delay
      const animateToMouse = (e) => {
        x.set(e.clientX);
        y.set(e.clientY);
        setIsInitialLoad(false);
        window.removeEventListener('mousemove', animateToMouse);
      };
      // Use a timeout to ensure the mousemove listener is added after initial render
      setTimeout(() => {
        window.addEventListener('mousemove', animateToMouse);
      }, 100);

    } else {
      setIsInitialLoad(false); // No navbar element, so no initial animation
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      // Clean up initial animation listener if it was added
      window.removeEventListener('mousemove', (e) => {
        x.set(e.clientX);
        y.set(e.clientY);
        setIsInitialLoad(false);
      });
    };
  }, []);

  const cursorVariants = {
    default: {
      width: 24, 
      height: 24, 
      opacity: 1,
      scale: 1,
      transition: { duration: 0.05, ease: "linear" }
    },
    hover: {
      width: 32, 
      height: 32, 
      opacity: 0.8,
      scale: 1.2,
      transition: { duration: 0.05, ease: "linear" }
    },
    click: {
      width: 28, 
      height: 28, 
      opacity: 0.9,
      scale: 0.9,
      transition: { duration: 0.05, ease: "linear" }
    },
  };

  let currentVariant = 'default';
  if (isClicked) {
    currentVariant = 'click';
  } else if (isHovering) {
    currentVariant = 'hover';
  }

  if (isMobile) return null; // Don't render cursor on mobile

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[999]"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      variants={cursorVariants}
      animate={currentVariant}
    >
      <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Outer circle (representing 0) */}
        <circle cx="12" cy="12" r="10" stroke="var(--color-brand)" strokeWidth="1.5" fill={isHovering ? "var(--color-brand)" : "none"} />
        {/* Inner cross (representing 1 and precision) */}
        <line x1="8" y1="8" x2="16" y2="16" stroke="var(--color-brand)" strokeWidth="1.5" />
        <line x1="16" y1="8" x2="8" y2="16" stroke="var(--color-brand)" strokeWidth="1.5" />
      </svg>
    </motion.div>
  );
};

export default Cursor;