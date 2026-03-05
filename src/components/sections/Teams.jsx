"use client";

import Image from "next/image";
import { Linkedin, Mail, Github, ArrowUpRight } from 'lucide-react';
import { useSettings } from "@/app/Context/SettingsContext";
import { motion } from "framer-motion";

export default function Teams({ data }) {
  const teamData = data?.teamsList;
  const { settings } = useSettings();

  return (
    <section id="teams" className="py-15 lg:py-25 lg:pt-5 pt-3 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 lg:mb-32">
           <motion.div 
             initial={{ opacity: 0, x: -30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="lg:col-span-8"
           >
              <div className="flex items-center gap-4 mb-8">
                 <div className="w-12 h-px bg-[#14b8a6]" />
                 <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b8a6]">Human Intellect</span>
              </div>
              <h2 className="text-6xl lg:text-8xl font-light text-gray-900 leading-[0.9] tracking-tighter">
                The Minds <br/>
                <span className="font-medium">Behind the</span><br/>
                <span className="italic font-normal text-[#14b8a6]">Synthesis.</span>
              </h2>
           </motion.div>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="lg:col-span-4 lg:pb-4"
           >
              <p className="text-lg text-gray-500 leading-relaxed font-light border-l-2 border-gray-100 pl-8 max-w-sm">
                Meet the architects, engineers, and visionaries collaborating to build the next generation of digital enterprise infrastructure.
              </p>
           </motion.div>
        </div>

        {teamData && (
          <div className="max-w-[1100px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            {teamData?.map((team, index) => (
              <TeamMemberCard 
                key={index}
                index={index}
                name={team.name}
                role={team.designation}
                image={`${settings?.backend_api_url}/${team.image}`}
                linkedin={team.social_link?.linkedin}
                github={team.social_link?.github}
                email={team.social_link?.email}
                description={team.description}
              />
            ))}
          </div>
          </div>
        )}
      </div>
    </section>
  );
}

function TeamMemberCard({ index, name, role, image, linkedin, github, email, description }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-gray-50 border border-gray-100 shadow-xl group-hover:shadow-2xl transition-all duration-700">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
        />
        
        {/* Hover Content Overlay */}
        <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
           <p className="text-white text-sm font-light leading-relaxed mb-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {description}
           </p>
           <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#14b8a6] transition-colors">
                   <Linkedin size={16} />
                </a>
              )}
              {github && (
                <a href={github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-gray-900 transition-colors">
                   <Github size={16} />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#14b8a6] transition-colors">
                   <Mail size={16} />
                </a>
              )}
           </div>
        </div>
      </div>
      
      {/* Identity Label Block */}
      <div className="mt-8 flex justify-between items-start px-4">
         <div>
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1 group-hover:text-[#14b8a6] transition-colors">{name}</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{role}</p>
         </div>
         <div className="w-10 h-px bg-gray-100 mt-4 group-hover:w-16 group-hover:bg-[#14b8a6] transition-all duration-500" />
      </div>
    </motion.div>
  );
}
