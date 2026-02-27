"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Users, Zap, Globe, Activity } from 'lucide-react';

const stats = [
  { id: 1, label: "Success Rate", value: "98.4%", icon: Activity },
  { id: 2, label: "Global Presence", value: "12+", icon: Globe },
  { id: 3, label: "Active Deployments", value: "500+", icon: Zap },
  { id: 4, label: "Client Retention", value: "100%", icon: Users },
];

export function StatsOrganic() {
  return (
    <section className="py-24 lg:py-40 bg-gray-900 border-y border-white/5 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#14b8a6] rounded-full blur-[150px] opacity-10 -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-cyan-500 rounded-full blur-[150px] opacity-5 -z-10" />
      
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 relative">
          
          {/* Vertical Architectural Dividers */}
          <div className="absolute inset-y-0 left-1/4 w-px bg-white/10 hidden lg:block" />
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 hidden lg:block" />
          <div className="absolute inset-y-0 left-3/4 w-px bg-white/10 hidden lg:block" />

          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-8 lg:px-12 group text-center lg:text-left"
            >
              <div className="flex flex-col lg:items-start items-center space-y-6">
                <div className="w-12 h-px bg-[#14b8a6]/40 group-hover:w-20 group-hover:bg-[#14b8a6] transition-all duration-700" />
                
                <div className="space-y-4">
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 group-hover:text-[#14b8a6] transition-colors">{stat.label}</span>
                  <div className="flex items-end gap-3 justify-center lg:justify-start">
                     <h3 className="text-5xl lg:text-8xl font-light text-white tracking-tighter leading-none">
                        {stat.value}
                     </h3>
                     <stat.icon className="w-6 h-6 text-white/10 group-hover:text-[#14b8a6]/40 transition-colors mb-2" strokeWidth={1} />
                  </div>
                </div>
                
                <p className="text-xs text-white/20 font-medium tracking-widest uppercase group-hover:translate-x-2 transition-transform duration-500">Metric 0{stat.id}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Horizontal Scanning Line (Decorative) */}
      <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent top-1/2 -translate-y-1/2 pointer-events-none" />
    </section>
  );
}
