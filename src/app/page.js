"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { AboutSection } from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
import Commitments from "@/components/sections/Commitments";
import {clients} from "@/data/home.json";
import Teams from "@/components/sections/Teams";
import {teams} from "@/data/teams.json";
import Image from "next/image";
import { TrendingUp, Users, Award, Heart, Phone, Mail, ArrowRight, ChevronRight } from 'lucide-react';
import {StatsOrganic} from "@/components/sections/StatsOrganic";
import ProductsSection from "@/components/sections/ProductsSection";
import CTASection from "@/components/sections/CTASection";
import { useEffect, useState, useContext } from "react";
import { useSettings } from "@/app/Context/SettingsContext";

export default function Home() {

  const [service, setService] = useState("");
  const [product, setProduct] = useState("");
  const [solution, setSolution] = useState("");
  const [team, setTeam] = useState("");
  const {settings} = useSettings();

  useEffect(()=>{
    fetch(`${settings.backend_api_url}/api/services/servicesList`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})})
    .then(res=>res.json())
    .then(data=>setService(data))
  },[settings]);

  useEffect(()=>{
    fetch(`${settings.backend_api_url}/api/products/productsList`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})})
    .then(res=>res.json())
    .then(data=>setProduct(data))
  },[settings]);

  useEffect(()=>{
    fetch(`${settings.backend_api_url}/api/solutions/solutionsList`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})})
    .then(res=>res.json())
    .then(data=>setSolution(data))
  },[settings]);

  useEffect(()=>{
    fetch(`${settings.backend_api_url}/api/teams/teamsList`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({})})
    .then(res=>res.json())
    .then(data=>setTeam(data))
  },[settings]);

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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/video/bgg.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container relative z-20 px-4 md:px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex flex-col items-center space-y-8"
          >
            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl text-white"
            >
              Transforming Technology Into <span className="text-gradi-500">Business Value</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="mx-auto max-w-[800px] text-gray-200 md:text-xl leading-relaxed"
            >
              With expertise, experienced professionals, and a commitment to excellence, we deliver IT solutions and business services that drive success.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="white" className="gap-2 h-12 px-8 text-base hover:scale-105 transition-all duration-500">
                Our Services <ArrowRight size={16} />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values / Commitments Section */}
      <Commitments/>

      {/* About Section */}
      <AboutSection />

      {/* Stats Section */}
      <StatsOrganic/>


      {/* Teams Section */}
      <Teams teams={teams} data={team.data}/>

      {/* Clients / Trust Section */}
      <section className="clients py-24 bg-background border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold mb-4">Trusted by Industry Leaders</h2>
          </div>
          <div className="carousel flex overflow-hidden">
              <div className="flex shrink-0 items-center gap-12 pr-12">
                {[...clients, ...clients].map((client, index) => (
                    <div key={`track1-${index}`} className="w-32 h-16 md:w-40 md:h-20 relative flex items-center justify-center shrink-0">
                        <Image 
                            src={`/assets/img/client/${client}`} 
                            alt="Client Logo" 
                            fill
                            className="object-contain opacity-60 grayscale-100 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    </div>
                ))}
              </div>
              <div className="flex shrink-0 items-center gap-12 pr-12">
                {[...clients, ...clients].map((client, index) => (
                    <div key={`track2-${index}`} className="w-32 h-16 md:w-40 md:h-20 relative flex items-center justify-center shrink-0">
                        <Image 
                            src={`/assets/img/client/${client}`} 
                            alt="Client Logo" 
                            fill
                            className="object-contain opacity-60 grayscale-100 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                        />
                    </div>
                ))}
              </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServiceSection service={service}/>
      
      {/*Products Section*/}
      <ProductsSection product={product?.data?.productsList}/>


      {/* CTA Section */}
      <section>
        {/* <CTASection/> */}
      </section>
    </div>
  );
}
