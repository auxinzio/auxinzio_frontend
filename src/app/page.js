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
                Engineering <br/>
                <span className="italic font-normal text-[#14b8a6]">Business</span> <br/>
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
                  className="w-full h-full object-cover transition-all duration-1000"
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
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-gray-200 font-bold uppercase tracking-[0.4em] text-[9px] items-center">
          {[...Array(15)].map((_, i) => (
            <span key={i} className="flex items-center gap-6">
              Artificial Intelligence <Zap className="w-3 h-3 text-[#14b8a6]" />
              Cloud Infrastructure <Zap className="w-3 h-3 text-[#14b8a6]" />
              Experience Design <Zap className="w-3 h-3 text-[#14b8a6]" />
            </span>
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
      <ProductsSection product={product?.data?.productsList}/>

      {/* Teams Section */}
      <Teams teams={teams} data={team.data} />

      {/* --- CLIENTS: THE TRUST ARCHITECTURE --- */}
      <section className="py-24 lg:py-40 bg-white border-t border-gray-100 px-6">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-12 gap-12 items-end mb-20">
             <div className="lg:col-span-8">
                <div className="flex items-center gap-4 mb-8">
                   <div className="w-12 h-px bg-[#14b8a6]" />
                   <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b8a6]">Global Ecosystem</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-light text-gray-900 tracking-tighter leading-none">
                  Trusted by <span className="italic font-medium text-[#14b8a6]">Industry</span> <br/>Leaders.
                </h2>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 border-l border-t border-gray-50">
             {[...clients].map((client, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="aspect-video relative group border-r border-b border-gray-50 flex items-center justify-center p-12 hover:bg-gray-50/50 transition-colors"
                >
                   <Image
                     src={`/assets/img/client/${client}`}
                     alt="Client Logo"
                     width={160}
                     height={80}
                     className="object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                   />
                   
                   {/* Hover Corner Accent */}
                   <div className="absolute top-0 right-0 w-0 h-0 border-t-2 border-r-2 border-[#14b8a6] opacity-0 group-hover:opacity-100 group-hover:w-4 group-hover:h-4 transition-all duration-500" />
                </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
