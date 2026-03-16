"use client";

import { motion } from "framer-motion";
import { ArrowRight, Layers, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useSettings } from "@/app/Context/SettingsContext";
import Image from "next/image";
import Link from "next/link";
import ProgressBar from "@/components/ui/ProgressBar";
import ServiceSkeleton from "@/components/ui/ServiceSkeleton";

export default function Services() {
   const [service, setService] = useState("");
   const [loading, setLoading] = useState(true);
   const { settings } = useSettings();
   const serviceData = service?.data?.serviceList || [];
   const containerRef = useRef(null);

   useEffect(() => {
      if (!settings?.backend_api_url) return;

      let cancelled = false;

      fetch(`${settings.backend_api_url}/api/services/servicesList`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({})
      })
         .then(res => res.json())
         .then(data => {
            if (!cancelled) {
               setService(data);
               setLoading(false);
            }
         })
         .catch(err => {
            console.error("Error fetching services:", err);
            if (!cancelled) setLoading(false);
         });

      return () => { cancelled = true; };
   }, [settings]);

   // Fallback services if API is empty for design demonstration
   const displayServices = serviceData.length > 0 ? serviceData : [
      {
         title: "Digital Synthesis",
         description: { short_description: "We combine aesthetic excellence with technical precision to create world-class digital ecosystems." },
         features: ["Experience Design", "Identity Systems", "Digital Strategy"],
         main_logo: ""
      },
      {
         title: "Scalable Architecture",
         description: { short_description: "Building the foundation of tomorrow's web with robust, high-performance infrastructure." },
         features: ["Cloud Systems", "Microservices", "Data Intelligence"],
         main_logo: ""
      }
   ];

   return (
      <div className="min-h-screen bg-white selection:bg-[#14b88f]/10 overflow-hidden" ref={containerRef}>
         {/* Progress Bar */}
         <ProgressBar />
         {/* --- HERO: THE ARCHITECTURAL BLUEPRINT --- */}
         <section className="relative pt-40 pb-24 lg:pt-30 lg:pb-12 px-6">
            <div className="mx-auto max-w-[1600px] relative">
               <div className="grid lg:grid-cols-12 gap-12 items-end">
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 1 }}
                     className="lg:col-span-8"
                  >
                     <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-px bg-[#14b88f]" />
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Our Expertise</span>
                     </div>
                     <h1 className="text-6xl lg:text-[11rem] font-light text-gray-900 leading-[0.8] tracking-tighter mb-12">
                        Solutions Built <br />
                        <span className="italic font-medium bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">for Business</span>
                     </h1>
                  </motion.div>

                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 1, delay: 0.3 }}
                     className="lg:col-span-4 pb-4"
                  >
                     <p className="text-xl text-gray-500 leading-relaxed border-l-2 border-gray-100 pl-8 max-w-sm">
                        {`We deliver comprehensive software solutions that align technical excellence with your strategic business goals.`}
                     </p>
                  </motion.div>
               </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-gray-50/50 -z-10 blur-3xl opacity-50" />
         </section>

         {/* --- SERVICES: THE ARCHITECTURAL LEDGER --- */}
         <section className="relative py-24 px-6 overflow-hidden">
            {/* Central Vertical Connector */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 hidden lg:block" />

            <div className="mx-auto max-w-[1600px] relative">
               <div className="space-y-4 lg:space-y-10">
                  {loading ? (
                     <ServiceSkeleton />
                  ) : (
                     displayServices.map((srv, idx) => (
                        <motion.div
                           key={idx}
                           initial={{ opacity: 0, y: 50 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true, margin: "-100px" }}
                           className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-32`}
                        >
                           {/* Visual Block */}
                           <div className="lg:w-1/2 relative">
                              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl group">
                                 {srv.main_logo ? (
                                    <Image
                                       src={`${settings.backend_api_url}/${srv.main_logo}`}
                                       alt={srv.title}
                                       width={500}
                                       height={300}
                                       className="object-cover w-full transition-all duration-1000 group-hover:scale-110"
                                    />
                                 ) : (
                                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                       <Layers className="w-32 h-32 text-gray-200" strokeWidth={0.5} />
                                    </div>
                                 )}

                                 {/* Floating Meta Tag */}
                                 <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-xl">
                                    <p className="text-[10px] font-bold tracking-widest uppercase whitespace-nowrap bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">{srv.title}</p>
                                 </div>
                              </div>

                              {/* Architectural Dot on Connector */}
                              <div className={`absolute top-1/2 ${idx % 2 === 0 ? '-right-[84px]' : '-left-[84px]'} w-4 h-4 rounded-full bg-white border-2 border-[#14b88f] z-10 hidden lg:block`} />
                           </div>

                           {/* Content Block */}
                           <div className="lg:w-1/2 py-8">
                              {/* <span className="text-6xl lg:text-8xl font-black text-[#14b88f]/30 mb-8 block select-none">0{idx + 1}</span> */}
                              <h2 className="text-5xl lg:text-6xl font-light text-gray-900 mb-8 tracking-tighter leading-tight">
                                 {srv.title.split(' ').map((word, i) => (
                                    <span key={i} className={i === 0 ? "font-medium" : "italic bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5"}>
                                       {word}{' '}
                                    </span>
                                 ))}
                              </h2>
                              <p className="text-xl text-gray-500 leading-relaxed mb-12 max-w-lg">
                                 {srv.description?.short_description || srv.description}
                              </p>

                              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                                 {srv.features?.map((feature, fidx) => (
                                    <div key={fidx} className="flex items-center gap-3">
                                       <div className="w-1.5 h-1.5 rounded-full bg-[#14b88f]" />
                                       <span className="text-sm font-bold text-gray-800 uppercase tracking-tight">{feature}</span>
                                    </div>
                                 ))}
                              </div>
                              <Link href={`/services/${srv.slug}`}>
                                 <button className="group flex items-center gap-6 text-gray-900 font-bold hover:text-[#14b88f] transition-all">
                                    <span className="text-lg underline underline-offset-8 decoration-gray-100 group-hover:decoration-[#14b88f]">More Details</span>
                                    <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b88f] group-hover:text-white group-hover:border-[#14b88f] transition-all duration-500">
                                       <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                 </button>
                              </Link>
                           </div>
                        </motion.div>
                     ))
                  )}
               </div>
            </div>
         </section >

         {/* --- CTA: THE SYNTHESIS INVITATION --- */}
         < section className="px-6" >
            <div className="mx-auto max-w-[1200px]">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 rounded-[4rem] p-12 lg:p-24 text-center relative overflow-hidden group shadow-2xl"
               >
                  {/* Background Glow */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#14b88f] rounded-full blur-[120px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500 rounded-full blur-[120px] opacity-10 group-hover:opacity-30 transition-opacity duration-1000" />

                  <div className="relative z-10">
                     <p className="text-[10px] tracking-[0.5em] uppercase font-bold mb-10 bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Expert Consultation</p>
                     <h2 className="text-5xl lg:text-7xl font-light text-white tracking-tighter mb-12">
                        Ready to scale <br />your business technology?
                     </h2>
                     <Link href="/contact">
                        <button className="group cursor-pointer relative px-12 py-6 bg-[#14b88f] rounded-2xl text-white font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#14b88f]/20">
                           <span className="relative group-hover:opacity-0 z-10 flex items-center gap-4 transition-all duration-500">
                              Book a Consultation <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                           </span>
                           <div className="absolute inset-0 bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
                           <span className="absolute inset-0 flex items-center justify-center text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-bold">
                              {`Let's Begin`}
                           </span>
                        </button>
                     </Link>
                  </div>
               </motion.div>
            </div>
         </section >

         {/* --- FOOTER DIVIDER --- */}
         < div className="py-2 pb-6 flex flex-col items-center" >
            <div className="w-px h-32 bg-gray-100 mb-8" />
            <div className="w-2 h-2 rounded-full border-2 border-[#14b88f]" />
         </div >

      </div >
   );
}
