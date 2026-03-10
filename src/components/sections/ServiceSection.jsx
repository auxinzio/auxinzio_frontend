"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/app/Context/SettingsContext";
import servicesData from "@/data/services.json";
import GeometricIllustration from "@/components/ui/GeometricIllustration";


export default function ServiceSection({ service }) {
   const { settings } = useSettings();
   const serviceData = service?.data?.serviceList || servicesData.services || [];
   return (
      <>
         {serviceData.length > 0 && (
            <section id="services" className="py-14 lg:py-20 bg-gray-50/50 relative overflow-hidden">
               <div className="max-w-[1600px] mx-auto px-6">
                  {/* Header: Focused Scale */}
                  <div className="grid lg:grid-cols-12 gap-12 items-center mb-24 lg:mb-32">
                     <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8"
                     >
                        <div className="flex items-center gap-4 mb-8">
                           <div className="w-12 h-px bg-[#14b88f]" />
                           <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b88f]">Synthesized Delivery</span>
                        </div>
                        <h2 className="text-5xl lg:text-8xl font-light text-gray-900 leading-[0.9] tracking-tighter">
                           Transformative <br />
                           <span className="font-medium text-gray-200">Digital</span><br />
                           <span className="italic font-normal text-[#14b88f]">Ecosystems.</span>
                        </h2>
                     </motion.div>
                     
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-4 hidden lg:flex items-center justify-center relative"
                     >
                        <GeometricIllustration />
                     </motion.div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-[3rem] overflow-hidden shadow-2xl">
                     {serviceData?.map((srv, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0 }}
                           whileInView={{ opacity: 1 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className="group relative bg-white p-12 lg:p-16 hover:bg-gray-50 transition-colors duration-500 min-h-[450px] flex flex-col"
                        >
                           {/* Service Index */}
                           <span className="absolute top-12 right-12 text-6xl font-black text-gray-50 group-hover:text-[#14b88f]/40 transition-colors select-none">0{index + 1}</span>
                           <div className="relative z-10 flex-grow">
                              <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-10 group-hover:bg-[#14b88f]/10 transition-colors">
                                 <Layers className="w-6 h-6 text-gray-400 group-hover:text-[#14b88f]" />
                              </div>
                              <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight group-hover:text-[#14b88f] transition-colors leading-tight">
                                 {srv.title}
                              </h3>
                              <p className="text-gray-500 leading-relaxed max-w-[280px]">
                                 {srv.description.short_description}
                              </p>
                           </div>
                           <Link href={`/services/${srv.slug}`}>
                              <div className="pt-10 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-900 group-hover:text-[#14b88f] transition-colors group/btn">
                                 Structural Details
                                 <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                              </div>
                           </Link>
                           {/* Hover Architectural Accent */}
                           <div className="absolute top-0 left-0 w-1 h-0 bg-[#14b88f] group-hover:h-full transition-all duration-700" />
                        </motion.div>
                     ))}
                  </div>
               </div>
               {/* Background Decorative Grid */}
               <div className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
                  style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </section>
         )}
      </>
   );
}
