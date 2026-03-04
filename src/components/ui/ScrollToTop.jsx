"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, backgroundColor: "#14b8a6" }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 left-8 z-[100] p-3 rounded-full bg-gray-950/20 backdrop-blur-md border border-white/10 text-white shadow-2xl transition-colors cursor-pointer group"
          aria-label="Scroll to top"
        >
          <ChevronUp 
            size={24} 
            className="text-white group-hover:animate-bounce" 
            strokeWidth={2.5}
          />
          
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-[#14b8a6] opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
