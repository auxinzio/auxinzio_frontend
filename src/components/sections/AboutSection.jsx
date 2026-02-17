"use client";

import { motion } from "framer-motion";
import about from "@/data/about.json";

const ProgressBar = ({ label, percentage }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-sm font-bold text-foreground">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="h-1.5 w-full bg-primary/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${percentage}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
      />
    </div>
  </div>
);

export function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Background Decorative Element */}
      <div className="absolute right-0 bottom-0 w-1/3 h-full opacity-10 pointer-events-none select-none -z-10 bg-[url('/assets/img/home-bg-2.svg')] bg-no-repeat bg-right-bottom" />
      
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Images */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="flex gap-4 md:gap-6 items-center">
                {/* Left image with top-left rounding */}
                <div className="w-1/2 aspect-[3/4] rounded-[50px] rounded-br-none overflow-hidden shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={about.images[0].src} 
                        alt={about.images[0].alt} 
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Right image with bottom-right rounding */}
                <div className="w-1/2 aspect-[3/4] rounded-[50px] rounded-tl-none overflow-hidden shadow-2xl mt-12 md:mt-20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                        src={about.images[1].src} 
                        alt={about.images[1].alt} 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute bottom-4 left-1/4 md:left-1/3 p-4 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-green-300 to-cyan-300 shadow-xl border border-white/20 backdrop-blur-sm z-20 min-w-[140px] md:min-w-[180px]"
            >
                <div className="text-3xl md:text-5xl font-black text-foreground mb-1">3 +</div>
                <div className="text-[10px] md:text-xs font-bold text-foreground/80 tracking-widest uppercase">Years of Experience</div>
            </motion.div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
               <span className="inline-block px-4 py-1.5 rounded-full bg-cyan-100 text-cyan-600 text-xs font-bold uppercase tracking-wider">
                  {about.tag}
               </span>
               <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Technology That <br /> 
                  <span className="text-gradi-500">Empowers Growth</span>
               </h2>
               <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl">
                  {about.description}
               </p>
            </div>

            {/* Skill Bars */}
            <div className="space-y-5 max-w-xl">
               {about.skills.map((skill, index) => (
                 <ProgressBar key={index} label={skill.label} percentage={skill.percentage} />
               ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
