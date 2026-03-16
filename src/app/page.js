"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AboutSection } from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import Commitments from "@/components/sections/Commitments";
import { TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { StatsOrganic } from "@/components/sections/StatsOrganic";
import ProductsSection from "@/components/sections/ProductsSection";
import CTASection from "@/components/sections/CTASection";
import { useEffect, useState } from "react";
import { useSettings } from "@/app/Context/SettingsContext";
import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";
import ClientSection from "@/components/sections/ClientSection";

export default function Home() {

  const [service, setService] = useState("");
  const [product, setProduct] = useState("");
  const [solution, setSolution] = useState("");
  const [client, setClient] = useState("");
  const [team, setTeam] = useState("");
  const { settings } = useSettings();
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const rotatingWords = [
    "Growth",
    "Innovation",
    "Digital Excellence",
    "Smart Solutions",
    "Success",
    "Future-Ready Solutions",
    "Intelligent Business Solutions",
    "Business Value"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/services/servicesList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setService(data))
  }, [settings]);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/products/productsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [settings]);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/solutions/solutionsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setSolution(data))
  }, [settings]);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/teams/teamsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setTeam(data))
  }, [settings]);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/clients/clientsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setClient(data))
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
    <div className="flex flex-col min-h-screen bg-white selection:bg-[#14b88f]/10 overflow-hidden">
      {/* Progress Bar */}
      <ProgressBar />
      {/* --- HERO: THE ARCHITECTURAL MONOLITH --- */}
      <section className="relative h-screen lg:min-h-[850px] min-h-[1000px] flex items-center lg:pt-30 md:pt-20 sm:pt-0 px-6 lg:px-12 bg-gray-50/30">

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
                <div className="w-12 h-px bg-[#14b88f]" />
                <span className="text-[10px] font-bold tracking-[0.5em] uppercase bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Your Growth Catalyst</span>
              </div>
              <h1 className="text-6xl/8 sm:text-6xl lg:text-[7rem] font-light text-gray-900 leading-[0.8] tracking-tighter leading-[120px]">
                Transforming Technology Into <br />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentTextIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-7xl bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5 inline-block"
                  >
                    {rotatingWords[currentTextIndex]}
                  </motion.span>
                </AnimatePresence>
                <br />
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="max-w-xl space-y-10"
            >
              <p className="text-xl text-gray-500 leading-relaxed font-light">
                {`With expertise, experienced professionals, and a commitment to excellence, we deliver IT solutions and business services that drive success.`}
              </p>

              <div className="flex flex-wrap items-center gap-8">
                <Link href="/services">
                  <button className="group overflow-hidden relative px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 shadow-2xl">
                    <span className="relative z-10 flex items-center gap-4">
                      Explore Our Services <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-[#14b88f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 rounded-2xl" />
                  </button>
                </Link>

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
            <div className="relative lg:aspect-[4/5] w-full rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white group">
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
              <div className="absolute lg:bottom-8 lg:left-8 lg:right-8 bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl lg:p-8 p-4 rounded-[2.5rem] border border-white/20">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Success Metric</p>
                    <p className="lg:text-3xl text-2xl font-light text-white tracking-tighter">98.4% Retention</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <TrendingUp className="text-green-500 w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Background Shape */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#14b88f]/10 rounded-full blur-[80px] -z-10" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <div className="w-px h-16 bg-gradient-to-b from-[#14b88f] to-transparent" />
        </div>
      </section>

      {/* Hero Marquee Strip */}
      <div className="py-6 border-y border-gray-100 bg-white overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-gray-200 font-bold uppercase tracking-[0.1em] text-[12px] items-center">
          {console.log(service)}
          {[...Array(6)].map((_, outerIndex) => (
            <div key={outerIndex} className="flex items-center gap-12">
              {(service?.data?.serviceList)?.map((item, index) => (
                <span className="flex items-center gap-6" key={index}>
                  {item.title} <Zap className="w-3 h-3 text-[#14b88f]" />
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
      {/* <Teams data={team.data} /> */}

      {/* --- CLIENTS: THE GLOBAL SYNERGY GRID --- */}
      <ClientSection clients={client?.data?.clientsList} />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
