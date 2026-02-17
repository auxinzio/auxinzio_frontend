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
  Send,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils"; // Assumes standard utility from Shadcn or project

/**
 * GetDemoModal Component
 * 
 * Features:
 * - Framer Motion for smooth scale + fade animations.
 * - Backdrop blur with dark overlay.
 * - Fully responsive grid layout.
 * - Keyboard (ESC) and outside-click close support.
 * - Modern SaaS design with primary gradients: #22c55e, #06b6d4, #14b8a6.
 */
export default function GetDemoModal({ isOpen, onClose }) {
  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent background scrolling when modal is open
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
    const formData = new FormData(e.target);
    // Add your submission logic here (e.g., API call)
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 400 }}
            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[0.5rem] shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Area */}
            <div className="px-8 pt-8 pb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#22c55e] via-[#14b8a6] to-[#06b6d4] text-white shadow-lg shadow-[#14b8a6]/20">
                  <Zap size={24} fill="currentColor" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                    Get Demo
                  </h2>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Schedule your personalized walkthrough
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-200"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-[#14b8a6]/10 focus:border-[#14b8a6] transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-2">
                  <label htmlFor="mobile" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Mobile Number
                  </label>
                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors" />
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      placeholder="Enter your mobile number"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-[#14b8a6]/10 focus:border-[#14b8a6] transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-[#14b8a6]/10 focus:border-[#14b8a6] transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Solution Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="solution" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Select Demo For
                  </label>
                  <div className="relative group">
                    <Box className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors pointer-events-none" />
                    <select
                      id="solution"
                      name="solution"
                      required
                      defaultValue=""
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-[#14b8a6]/10 focus:border-[#14b8a6] transition-all text-slate-700 dark:text-slate-200 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Choose Solution</option>
                      <option value="enterprise">Enterprise Software</option>
                      <option value="cloud">Cloud Migration</option>
                      <option value="ai">AI Implementation</option>
                      <option value="cyber">Cyber Security</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-2">
                  <label htmlFor="date" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                    Demo Date
                  </label>
                  <div className="relative group">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 size-4.5 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors pointer-events-none" />
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-[#14b8a6]/10 focus:border-[#14b8a6] transition-all text-slate-700 dark:text-slate-200 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">
                  Message
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 size-4.5 text-slate-400 group-focus-within:text-[#14b8a6] transition-colors" />
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more about your needs..."
                    rows={3}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl outline-none focus:ring-4 focus:ring-[#14b8a6]/10 focus:border-[#14b8a6] transition-all text-slate-700 dark:text-slate-200 placeholder:text-slate-400 resize-none"
                  />
                </div>
              </div>

              {/* Submit Button - Bottom Right */}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="group relative flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#22c55e] via-[#14b8a6] to-[#06b6d4] text-white font-bold rounded-[1.25rem] shadow-xl shadow-[#14b8a6]/25 hover:shadow-[#14b8a6]/40 hover:scale-[1.03] active:scale-95 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Submit Request
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}