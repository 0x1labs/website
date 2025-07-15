import React, { useEffect, useState, useRef, useCallback } from 'react';
import { gsap } from 'gsap';

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
  const animationFrameId = useRef(null);
  const svgRef = useRef(null); // Ref for the main SVG

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
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = event.clientX;
    pt.y = event.clientY;

    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());

    const newNode = {
      id: Date.now(),
      x: svgP.x,
      y: svgP.y,
      vx: (Math.random() - 0.5) * 0.05, // Give new node velocity
      vy: (Math.random() - 0.5) * 0.05, // Give new node velocity
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];

      // Animate the new node (circle) in
      const newCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      newCircle.setAttribute("cx", newNode.x);
      newCircle.setAttribute("cy", newNode.y);
      newCircle.setAttribute("r", "0.5");
      newCircle.setAttribute("fill", "var(--color-brand)");
      newCircle.setAttribute("opacity", "0.3");
      svg.appendChild(newCircle);

      gsap.fromTo(newCircle,
        { opacity: 0, scale: 0 },
        { opacity: 0, scale: 1, duration: 0.2, ease: "back.out(1.7)" }
      );

      // Make new node disappear after some time
      gsap.to(newCircle, { opacity: 0, duration: 5, delay: 10, onComplete: () => newCircle.remove() });

      return updatedNodes;
    });
  };

  useEffect(() => {
    // GSAP animations for initial lines and circles
    gsap.utils.toArray(svgRef.current.querySelectorAll('line')).forEach((line) => {
      gsap.fromTo(line,
        { opacity: 0 },
        { opacity: 0.01, duration: 4, repeat: -1, yoyo: true, ease: "easeInOut" }
      );
    });

    gsap.utils.toArray(svgRef.current.querySelectorAll('circle')).forEach((circle) => {
      gsap.fromTo(circle,
        { opacity: 0 },
        { opacity: 0.02, duration: 4, repeat: -1, yoyo: true, ease: "easeInOut", delay: Math.random() * 4 }
      );

      // Hover effects
      circle.onmouseenter = () => {
        gsap.to(circle, { r: 1, opacity: 0.1, duration: 0.1 });
      };
      circle.onmouseleave = () => {
        gsap.to(circle, { r: 0.5, opacity: 0.02, duration: 0.1 });
      };
    });

  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-auto z-0 min-w-0" onClick={handleClick}>
      <svg
        ref={svgRef}
        className="w-full h-full min-w-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Initial Connections between nodes */}
        {nodes.map((node1) =>
          nodes.map((node2) => {
            const dist = Math.sqrt(Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2));
            if (dist < 20) { // Increased connection distance
              return (
                <line
                  key={`${node1.id}-${node2.id}`}
                  x1={node1.x}
                  y1={node1.y}
                  x2={node2.x}
                  y2={node2.y}
                  stroke="var(--color-subtle-text)"
                  strokeWidth="0.08"
                  opacity="0.15" 
                />
              );
            }
            return null;
          })
        )}

        {/* Initial Nodes */}
        {nodes.map((node) => (
          <circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r="0.5"
            fill="var(--color-brand)"
            opacity="0.65" 
          />
        ))}
      </svg>
    </div>
  );
};

export default HeroBackground;