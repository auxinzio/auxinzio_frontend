"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AboutSection } from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import Commitments from "@/components/sections/Commitments";
import { clients } from "@/data/home.json";
import Teams from "@/components/sections/Teams";
import { teams } from "@/data/teams.json";
import Image from "next/image";
import { TrendingUp, Users, Award, Heart, Phone, Mail, ArrowRight, ChevronRight, Zap, Sparkles, Activity } from 'lucide-react';
import { StatsOrganic } from "@/components/sections/StatsOrganic";
import ProductsSection from "@/components/sections/ProductsSection";
import CTASection from "@/components/sections/CTASection";
import { useEffect, useState, useContext } from "react";
import { useSettings } from "@/app/Context/SettingsContext";
import Link from "next/link";

export default function Home() {

  const [service, setService] = useState("");
  const [product, setProduct] = useState("");
  const [solution, setSolution] = useState("");
  const [team, setTeam] = useState("");
  const { settings } = useSettings();

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/services/servicesList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setService(data))
  }, [settings]);

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/products/productsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [settings]);

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/solutions/solutionsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setSolution(data))
  }, [settings]);

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/teams/teamsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setTeam(data))
  }, [settings]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-[#14b8a6]/10 overflow-hidden">

      {/* --- HERO: THE ARCHITECTURAL MONOLITH --- */}
      <section className="relative h-screen min-h-[800px] flex items-center pt-20 px-6 lg:px-12 bg-gray-50/30">

        {/* Background Large Text (Watermark) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-[0.02] select-none pointer-events-none lg:block hidden">
          <h1 className="text-[30vw] font-black tracking-tighter leading-none">AUXINZIO</h1>
        </div>

        <div className="mx-auto max-w-[1600px] w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left: Text Content */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#14b8a6]" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#14b8a6]">Synthesizing Tomorrow</span>
              </div>
              <h1 className="text-7xl lg:text-[10rem] font-light text-gray-900 leading-[0.8] tracking-tighter">
                Engineering <br />
                <span className="italic font-normal text-[#14b8a6]">Business</span> <br />
                <span className="font-medium">Excellence.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xl space-y-10"
            >
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                {`We translate complex technical infrastructure into high-impact digital value. Elevating enterprise ecosystems through architectural precision.`}
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link href="/services">
                  <button className="group overflow-hidden relative px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl">
                    <span className="relative z-10 flex items-center gap-4">
                      Explore Capabilities <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-[#14b8a6] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl" />
                  </button>
                </Link>

                {/* <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                      <Image src={`/assets/img/teams/team${i}.webp`} alt="User" width={48} height={48} className="object-cover" />
                    </div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-50 flex items-center justify-center text-[10px] font-bold text-gray-400">
                    +500
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>

          {/* Right: The Shaped Video/Image Monolith */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-[4rem] transition-all duration-1000"
              >
                <source src="/assets/video/bgg.mp4" type="video/mp4" />
              </video>

              {/* Floating Meta Overlay */}
              <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Success Metric</p>
                    <p className="text-3xl font-light text-white tracking-tighter">98.4% Retention</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <TrendingUp className="text-[#14b8a6] w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background Shape */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#14b8a6]/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Discovery Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-[#14b8a6] to-transparent" />
        </div>
      </section>

      {/* Hero Marquee Strip */}
      <div className="py-6 border-y border-gray-100 bg-white overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-gray-200 font-bold uppercase tracking-[0.4em] text-[12px] items-center">
          {[...Array(2)].map((_, outerIndex) => (
            <div key={outerIndex} className="flex items-center gap-12">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="flex items-center gap-6">
                  Artificial Intelligence <Zap className="w-3 h-3 text-[#14b8a6]" />
                  Cloud Infrastructure <Zap className="w-3 h-3 text-[#14b8a6]" />
                  Experience Design <Zap className="w-3 h-3 text-[#14b8a6]" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <AboutSection />

      {/* Values / Commitments Section */}
      <Commitments />

      {/* Services Section */}
      <ServiceSection service={service} />

      {/* Stats Section */}
      <StatsOrganic />

      {/* Products Section */}
      <ProductsSection product={product?.data?.productsList} />

      {/* Teams Section */}
      <Teams teams={teams} data={team.data} />

      {/* --- CLIENTS: THE INTERACTIVE CONSTELLATION --- */}
      <section className="relative py-32 lg:py-64 bg-white overflow-hidden group/constellation">
        {/* Panning Background Text */}
        <div className="absolute top-1/4 left-0 w-full opacity-[0.02] select-none pointer-events-none whitespace-nowrap overflow-hidden">
          <motion.h1 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="text-[20vw] font-black tracking-tighter"
          >
            GLOBAL PARTNERSHIPS & ALLIANCES SYNERGY ENGINE
          </motion.h1>
        </div>

        <div className="mx-auto max-w-[1600px] px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-center">
            
            {/* Left: Editorial Header */}
            <div className="lg:col-span-5 relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-[#14b8a6]" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#14b8a6]">Neural Network</span>
                </div>
                <h2 className="text-6xl lg:text-[8rem] font-light text-gray-900 tracking-tighter leading-[0.8] mb-12">
                  Our <br />
                  <span className="italic font-normal text-[#14b8a6]">Global</span> <br />
                  Impact.
                </h2>
                <div className="space-y-6 max-w-sm mb-12">
                  <p className="text-xl text-gray-400 font-light leading-relaxed">
                    We don&apos;t just provide services; we build long-term value for the world&apos;s most ambitious organizations.
                  </p>
                  <p className="text-sm text-gray-400 border-l-2 border-[#14b8a6]/20 pl-6 italic">
                    Scaling enterprises through architectural precision and digital sovereignty.
                  </p>
                </div>
                
                <Link href="/contact">
                  <button className="flex items-center gap-4 text-gray-900 font-bold text-xs uppercase tracking-widest group">
                    Explore Alliances <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b8a6] group-hover:text-white group-hover:border-[#14b8a6] transition-all duration-500"><ArrowRight className="w-4 h-4" /></div>
                  </button>
                </Link>
              </motion.div>
            </div>

            {/* Right: The Constellation Field with SVG Connections */}
            <div className="lg:col-span-7 relative h-[600px] lg:h-[850px] flex items-center justify-center">
              
              {/* Central Neural Core */}
              <div className="relative z-20">
                <div className="w-4 h-4 bg-[#14b8a6] rounded-full shadow-[0_0_40px_rgba(20,184,166,0.6)] animate-pulse" />
                <div className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2 border border-[#14b8a6]/10 rounded-full animate-ping" />
              </div>

              {/* Connecting Lines (SVG) */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
                <defs>
                   <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#14b8a6" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                   </linearGradient>
                </defs>
                {[...Array(8)].map((_, i) => (
                   <motion.line
                     key={i}
                     x1="50%" y1="50%"
                     x2={`${50 + (35 + i*2) * Math.cos((i * 45 * Math.PI) / 180)}%`}
                     y2={`${50 + (35 + i*2) * Math.sin((i * 45 * Math.PI) / 180)}%`}
                     stroke="url(#lineGrad)"
                     strokeWidth="1"
                     initial={{ pathLength: 0 }}
                     whileInView={{ pathLength: 1 }}
                     transition={{ duration: 2, delay: i * 0.1 }}
                   />
                ))}
              </svg>

              <div className="absolute inset-0 w-full h-full">
                {[...clients].map((client, idx) => {
                  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
                  const radii = [32, 42, 34, 46, 32, 42, 34, 46];
                  const sizes = ["w-28", "w-36", "w-24", "w-32", "w-40", "w-28", "w-32", "w-28"];
                  const labels = ["Enterprise", "Banking", "Retail", "Manufacturing", "Tech Giant", "Logistics", "Energy", "Services"];
                  
                  const angle = angles[idx % angles.length];
                  const radius = radii[idx % radii.length];
                  const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                  const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1, 
                        delay: idx * 0.1,
                        type: "spring",
                        damping: 20
                      }}
                      style={{ 
                        left: `${x}%`, 
                        top: `${y}%`,
                        position: 'absolute',
                        transform: 'translate(-50%, -50%)' 
                      }}
                      className="group z-10"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, y: -10 }}
                        className={`relative ${sizes[idx % sizes.length]} aspect-square bg-white rounded-full border border-gray-50 flex flex-col items-center justify-center p-6 shadow-xl transition-all duration-500 hover:border-[#14b8a6]/20 hover:shadow-[0_40px_80px_-20px_rgba(20,184,166,0.2)]`}
                      >
                        <Image
                          src={`/assets/img/client/${client}`}
                          alt="Client"
                          width={140}
                          height={70}
                          className="object-contain opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                        />
                        
                        {/* Hover Pill Labels */}
                        <div className="absolute -top-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                           <span className="bg-gray-900 text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full whitespace-nowrap">
                              {labels[idx % labels.length]}
                           </span>
                        </div>

                        {/* Pulsing Border Effect */}
                        <div className="absolute inset-0 rounded-full border border-[#14b8a6]/5 animate-ping opacity-0 group-hover:opacity-100" />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
