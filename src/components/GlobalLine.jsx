
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const GlobalLine = () => {
  const { scrollYProgress } = useScroll({
    target: undefined, // Target the window/document directly
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute top-0 left-0 w-full h-[3000px] overflow-hidden pointer-events-none border-2 border-blue-500"> {/* Added fixed height for debugging */}
      <motion.svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Main Vertical Line - simplified for debugging */}
        <motion.path
          d="M 50 0 V 100" // Simple vertical line from top center to bottom center
          stroke="red" // Highly visible color for debugging
          strokeWidth="5" // Very thick for debugging
          style={{ pathLength }}
        />
      </motion.svg>
    </div>
  );
};

export default GlobalLine;
