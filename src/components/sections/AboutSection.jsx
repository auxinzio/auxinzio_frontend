"use client";

import { motion } from "framer-motion";
import about from "@/data/about.json";
import { ArrowUpRight, Target, Zap, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function AboutSection() {
   const tacticalStats = [
      { icon: Zap, label: "On-Time Delivery", value: "99.9%" },
      { icon: Target, label: "Quality Assurance", value: "100%" },
      { icon: Shield, label: "Enterprise Security", value: "Robust" }
   ];

   return (
      <section className="py-14 lg:py-25 lg:pb-40 bg-white relative overflow-hidden">
         <div className="max-w-[1600px] mx-auto px-6">

            {/* Header: Editorial Scale */}
            <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 lg:mb-20">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-8"
               >
                  <div className="flex items-center gap-4 mb-8">
                     <div className="w-12 h-px bg-[#14b88f]" />
                     <span className="text-[10px] font-bold tracking-[0.4em] uppercase bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">{about.tag}</span>
                  </div>
                  <h2 className="text-5xl lg:text-[9rem] font-light text-gray-900 leading-[0.85] tracking-tighter">
                     Building <br />
                     <span className="italic font-medium bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Digital</span> <br />
                     <span className="font-medium">Solutions</span>
                  </h2>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="lg:col-span-4 lg:pb-8"
               >
                  <p className="text-xl text-gray-500 leading-relaxed font-light border-l-2 border-gray-100 pl-8 max-w-sm">
                     {`We empower brands with practical strategies, scalable software, and reliable IT support for long-term business success.`}
                  </p>
               </motion.div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 items-center justify-center mb-15">
               {tacticalStats.map((stat, idx) => (
                  <motion.div
                     key={idx}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="flex items-center justify-center gap-10 group"
                  >
                     <div className="w-12 h-px bg-gray-100 group-hover:bg-[#14b88f] group-hover:w-20 transition-all duration-700" />
                     <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-widest bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5 uppercase whitespace-nowrap">{stat.label}</p>
                        <p className="text-4xl font-light text-gray-900 tracking-tight leading-none transition-all">{stat.value}</p>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Feature Block: Cinematic Split */}
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-32 items-center">

               {/* Left: Tactical Stats & Content */}
               <div className="lg:col-span-5 order-2 lg:order-1">
                  <div className="space-y-16">
                     <div className="">
                        <p className="text-gray-500 leading-relaxed mb-12 text-lg lg:text-xl">
                           {`"${about.description}"`}
                        </p>
                        <Link href="/about" className="inline-flex items-center gap-6 group">
                           <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900 group-hover:text-[#14b88f] transition-colors">About Our Company</span>
                           <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b88f] group-hover:text-white group-hover:border-[#14b88f] transition-all duration-500">
                              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                           </div>
                        </Link>
                     </div>
                  </div>
               </div>

               {/* Right: The Collage Monolith */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="lg:col-span-7 order-1 lg:order-2"
               >
                  <div className="relative">
                     <div className="aspect-[16/10] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group relative">
                        <Image
                           src={about.images[0].src}
                           alt={about.images[0].alt}
                           fill
                           className="object-cover transition-all duration-1000 group-hover:scale-105"
                        />

                        {/* Floating Info Pod */}
                        <div className="absolute top-12 right-12 bg-white/90 backdrop-blur-xl px-10 py-8 rounded-[2.5rem] shadow-2xl border border-white/20 hidden lg:block translate-x-12 translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 z-10">
                           <p className="text-4xl font-black text-gray-900 tracking-tighter mb-1">{about.experience.split(' ')[0]}</p>
                           <p className="text-[10px] font-bold text-[#14b88f] tracking-widest uppercase">Years Experience</p>
                        </div>
                     </div>

                     {/* Secondary Image Inset */}
                     <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="absolute -bottom-16 -left-16 w-1/3 aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl hidden lg:block"
                     >
                        <Image
                           src={about.images[1].src}
                           alt={about.images[1].alt}
                           fill
                           className="object-cover"
                        />
                     </motion.div>
                  </div>
               </motion.div>
            </div>

         </div>

         {/* Background Decor */}
         <div className="absolute left-0 bottom-0 w-1/2 h-full bg-gray-50/30 -z-10 blur-[120px] opacity-50" />
      </section>
   );
}
