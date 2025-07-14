import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const generateNodes = (count, width, height) => {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.05, // Slower velocity
      vy: (Math.random() - 0.5) * 0.05, // Slower velocity
    });
  }
  return nodes;
};

const HeroBackground = () => {
  const [nodes, setNodes] = useState([]);
  const [clickedNode, setClickedNode] = useState(null);
  const animationFrameId = useRef(null);

  // Function to update node positions
  const updateNodePositions = useCallback(() => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        let newX = node.x + node.vx;
        let newY = node.y + node.vy;

        // Bounce off walls
        if (newX < 0 || newX > 100) node.vx *= -1;
        if (newY < 0 || newY > 100) node.vy *= -1;

        return { ...node, x: newX, y: newY };
      })
    );
    animationFrameId.current = requestAnimationFrame(updateNodePositions);
  }, []);

  useEffect(() => {
    setNodes(generateNodes(30, 100, 100)); // Generate initial nodes
    animationFrameId.current = requestAnimationFrame(updateNodePositions);

    return () => {
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [updateNodePositions]);

  const handleClick = (event) => {
    const svg = event.currentTarget;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const newNode = {
      id: Date.now(),
      x: svgP.x,
      y: svgP.y,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
    };

    setNodes((prevNodes) => [...prevNodes, newNode]); // Add new node to network
    setClickedNode(newNode); // Trigger flash animation for new node
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto z-0" onClick={handleClick}> {/* pointer-events-auto to capture clicks */}
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Connections between nodes */}
        {nodes.map((node1) =>
          nodes.map((node2) => {
            const dist = Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
            if (dist < 20) { // Increased connection distance
              return (
                <motion.line
                  key={`${node1.id}-${node2.id}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke="var(--color-subtle-text)"
                  strokeWidth="0.08" /* Adjusted strokeWidth */
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.15 }} /* Adjusted opacity */
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse" }} /* Slower transition */
                />
              );
            }
            return null;
          })
        )}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.5" /* Adjusted radius */
            fill="var(--color-brand)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }} /* Adjusted opacity */
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "reverse", delay: Math.random() * 4 }} /* Slower transition */
            whileHover={{
              scale: 2,
              opacity: 1,
              transition: { duration: 0.1 }
            }}
            data-interactive
          />
        ))}

        {/* Clicked Node Flash */}
        <AnimatePresence>
          {clickedNode && (
            <motion.circle
              key={clickedNode.id}
              cx={clickedNode.x}
              cy={clickedNode.y}
              r="1" /* Slightly larger for visibility */
              fill="var(--color-brand)" /* Use brand color */
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0, transition: { duration: 1, ease: "easeOut" } }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              data-interactive
            />
          )}
        </AnimatePresence>
      </motion.svg>
    </div>
  );
};

export default HeroBackground;
