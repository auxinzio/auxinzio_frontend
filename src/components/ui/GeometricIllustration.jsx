"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const GeometricIllustration = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Simplified static placeholder for SSR */}
        <div className="w-full h-full max-w-[400px] bg-transparent" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-[300px] lg:h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background soft glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#14b88f]/5 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full max-w-[400px]"
        initial="initial"
        animate="animate"
      >
        <defs>
          <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#14b88f" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
          </linearGradient>
          <filter id="svgGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Isometric Base Grid Layer */}
        <motion.g opacity={0.15}>
          {[...Array(8)].map((_, i) => (
             <motion.path
               key={`grid-h-${i}`}
               d={`M0 ${50 + i * 40} L400 ${50 + i * 40}`}
               stroke="#14b88f"
               strokeWidth="0.5"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 2, delay: i * 0.1 }}
             />
          ))}
          {[...Array(8)].map((_, i) => (
             <motion.path
               key={`grid-v-${i}`}
               d={`M${50 + i * 40} 0 L${50 + i * 40} 400`}
               stroke="#14b88f"
               strokeWidth="0.5"
               initial={{ pathLength: 0 }}
               animate={{ pathLength: 1 }}
               transition={{ duration: 2, delay: i * 0.1 }}
             />
          ))}
        </motion.g>

        {/* Main Isometric Structure */}
        <motion.g
          animate={{
            y: [0, -10, 0],
            rotate: [-1, 1, -1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Central Layered Hexagon/Cube Concept */}
          {[200, 215, 230].map((yCent, i) => (
            <motion.path
              key={`hex-${i}`}
              d="M200 120 L270 160 L270 240 L200 280 L130 240 L130 160 Z"
              fill="none"
              stroke="#14b88f"
              strokeWidth="1"
              strokeOpacity={0.6 - i * 0.2}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: i * 15 }}
              transition={{ duration: 1.5, delay: i * 0.2 }}
            />
          ))}

          {/* Glowing Connection Nodes */}
          {[
            { x: 200, y: 120 }, { x: 270, y: 160 }, { x: 270, y: 240 },
            { x: 200, y: 280 }, { x: 130, y: 240 }, { x: 130, y: 160 }
          ].map((node, i) => (
            <motion.circle
              key={`node-${i}`}
              cx={node.x} cy={node.y} r="3"
              fill="#14b88f"
              filter="url(#svgGlow)"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}

          {/* Internal Data Pathways */}
          <motion.path
            d="M200 120 L200 280 M130 160 L270 240 M270 160 L130 240"
            stroke="#14b88f"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeDasharray="4 8"
            animate={{
              strokeDashoffset: [0, -24]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Pulsing Core */}
          <motion.circle
            cx="200" cy="200" r="15"
            fill="url(#glowGradient)"
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.g>

        {/* Small Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.circle
            key={`p-${i}`}
            r={Math.random() * 2 + 1}
            fill="#06b6d4"
            opacity={0.4}
            initial={{ 
              x: Math.random() * 400, 
              y: Math.random() * 400 
            }}
            animate={{ 
              y: [null, Math.random() * 400],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
};

export default GeometricIllustration;
