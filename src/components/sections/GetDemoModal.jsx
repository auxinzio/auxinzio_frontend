"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  Box, 
  Calendar, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Globe,
  Zap,
  Activity
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export default function GetDemoModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 lg:p-12">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-950/80 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="relative w-full max-w-6xl bg-white rounded-[2rem] lg:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row max-h-[90vh] lg:min-h-[700px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* --- LEFT: ARCHITECTURAL BRANDING (SIMPLIFIED ON MOBILE) --- */}
            <div className="lg:w-2/5 bg-gray-900 relative overflow-hidden p-8 lg:p-20 flex flex-col justify-between text-white shrink-0">
              {/* Background Large Text (Watermark) - Hidden on Mobile */}
              <div className="absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none origin-left -rotate-90 hidden lg:block">
                <h1 className="text-[25vw] font-black tracking-tighter leading-none">DEMO</h1>
              </div>

              {/* Decorative SVG Grid */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                   style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8 lg:mb-16">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#14b8a6] flex items-center justify-center">
                    <Zap size={16} className="text-white lg:size-5" fill="currentColor" />
                  </div>
                  <span className="text-[8px] lg:text-[10px] font-bold tracking-[0.4em] lg:tracking-[0.6em] uppercase text-[#14b8a6]">Protocol Initiation</span>
                </div>

                <h2 className="text-3xl lg:text-7xl font-light tracking-tighter leading-[0.9] mb-4 lg:mb-8">
                  Request <br />
                  <span className="italic font-normal text-[#14b8a6]">Access.</span>
                </h2>
                <p className="text-gray-400 text-sm lg:text-lg font-light leading-relaxed mb-6 lg:mb-12 max-w-xs hidden md:block">
                  Connect with our architectural engineers for a deep-dive synchronization session.
                </p>

                <div className="space-y-4 lg:space-y-6 hidden lg:block">
                  {[
                    { icon: ShieldCheck, text: "Zero-Trust Infrastructure walk-through" },
                    { icon: Globe, text: "Global scale deployment strategy" },
                    { icon: Activity, text: "Real-time analytics synchronization" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-xs font-medium text-gray-300">
                      <item.icon size={16} className="text-[#14b8a6]" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status Indicator - Small on Mobile */}
              <div className="relative z-10 pt-6 lg:pt-16 border-t border-white/5 flex items-center gap-4 lg:gap-6">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#14b8a6] animate-pulse" />
                 <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500">Nodes Active: Online</span>
              </div>
            </div>

            {/* --- RIGHT: THE INTERFACE (FORM) --- */}
            <div className="lg:w-3/5 bg-white p-8 lg:p-20 relative overflow-y-auto">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 lg:top-12 lg:right-12 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-all group z-20"
              >
                <X size={20} className="text-gray-400 group-hover:text-gray-900" />
              </button>

              <form onSubmit={handleSubmit} className="space-y-8 lg:space-y-12 h-full flex flex-col justify-center">
                {/* Section 01: Identification */}
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-[#14b8a6]">01</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Identification</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="relative group border-b border-gray-100 focus-within:border-[#14b8a6] transition-all pb-1">
                      <input 
                        type="text" 
                        required 
                        placeholder="Organization Name"
                        className="w-full bg-transparent py-3 lg:py-4 outline-none placeholder:text-gray-300 font-light text-base lg:text-xl pr-6"
                      />
                      <Box className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200 group-focus-within:text-[#14b8a6] transition-colors" />
                    </div>
                    <div className="relative group border-b border-gray-100 focus-within:border-[#14b8a6] transition-all pb-1">
                      <input 
                        type="text" 
                        required 
                        placeholder="Representative"
                        className="w-full bg-transparent py-3 lg:py-4 outline-none placeholder:text-gray-300 font-light text-base lg:text-xl pr-6"
                      />
                      <User className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200 group-focus-within:text-[#14b8a6] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Section 02: Synchronization */}
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-[#14b8a6]">02</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Communication</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    <div className="relative group border-b border-gray-100 focus-within:border-[#14b8a6] transition-all pb-1">
                      <input 
                        type="email" 
                        required 
                        placeholder="Digital Mail"
                        className="w-full bg-transparent py-3 lg:py-4 outline-none placeholder:text-gray-300 font-light text-base lg:text-xl pr-6"
                      />
                      <Mail className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200 group-focus-within:text-[#14b8a6] transition-colors" />
                    </div>
                    <div className="relative group border-b border-gray-100 focus-within:border-[#14b8a6] transition-all pb-1">
                      <input 
                        type="tel" 
                        required 
                        placeholder="Mobile Link"
                        className="w-full bg-transparent py-3 lg:py-4 outline-none placeholder:text-gray-300 font-light text-base lg:text-xl pr-6"
                      />
                      <Phone className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-200 group-focus-within:text-[#14b8a6] transition-colors" />
                    </div>
                  </div>
                </div>

                {/* Section 03: Protocol Needs */}
                <div className="space-y-6 lg:space-y-8">
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-[#14b8a6]">03</span>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Objective</h3>
                  </div>
                  
                  <div className="relative group border-b border-gray-100 focus-within:border-[#14b8a6] transition-all pb-1">
                    <textarea 
                      placeholder="Briefly describe your infrastructural goals..."
                      rows={1}
                      className="w-full bg-transparent py-3 lg:py-4 outline-none placeholder:text-gray-300 font-light text-base lg:text-xl resize-none pr-6"
                    />
                    <MessageSquare className="absolute right-0 top-6 w-4 h-4 text-gray-200 group-focus-within:text-[#14b8a6] transition-colors" />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 lg:pt-12 flex flex-col sm:flex-row items-center justify-between gap-6 lg:gap-8">
                  <p className="text-[8px] lg:text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-[200px] text-center sm:text-left">
                    By initiating, you agree to our regulatory protocols.
                  </p>
                  
                  <Button 
                    variant="gradi" 
                    className="w-full sm:w-auto rounded-xl lg:rounded-2xl px-8 lg:px-12 py-6 lg:py-8 text-xs lg:text-sm font-bold shadow-2xl shadow-[#14b8a6]/20 flex items-center justify-center gap-4 hover:scale-[1.02] transition-transform active:scale-95 group"
                  >
                    Initiate Synchronization <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
