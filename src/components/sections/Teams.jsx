"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Linkedin, Mail, Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSettings } from "@/app/Context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Teams({ data }) {
  const teamData = data?.teamsList;
  const { settings } = useSettings();
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollTo({
            left: scrollLeft + clientWidth * 0.8,
            behavior: 'smooth'
          });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, teamData]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="teams"
      className="py-20 lg:py-32 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 lg:mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-px bg-[#14b88f]" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Human Intellect</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-light text-gray-900 leading-[1.1] tracking-tighter">
              The Minds <span className="font-medium italic bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent">Behind</span> <br />
              <span className="font-medium">the Success</span>
            </h2>
          </motion.div>

          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#14b88f] hover:border-[#14b88f] transition-all duration-300 group"
            >
              <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#14b88f] hover:border-[#14b88f] transition-all duration-300 group"
            >
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {teamData && (
          <div className="relative">
            <div
              ref={scrollRef}
              className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-8 pb-12 -mx-6 px-6"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {teamData?.map((team, index) => (
                <div key={index} className="flex-none w-[300px] md:w-[400px] snap-center">
                  <TeamMemberCard
                    index={index}
                    name={team.name}
                    role={team.designation}
                    image={`${settings?.backend_api_url}/${team.image}`}
                    linkedin={team.social_link?.linkedin}
                    github={team.social_link?.github}
                    email={team.social_link?.email}
                    description={team.description}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

function TeamMemberCard({ index, name, role, image, linkedin, github, email, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group h-[500px] w-full"
    >
      {/* Main Card Container */}
      <div className="relative h-full w-full overflow-hidden rounded-[3rem] bg-gray-50 border border-gray-100 shadow-2xl transition-all duration-700 ease-out group-hover:shadow-[#14b88f]/20">

        {/* Team Member Image */}
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-all duration-1000 ease-in-out ${isHovered ? 'scale-110 grayscale-0' : 'scale-100 grayscale-50'}`}
        />

        {/* Vertical Social Bar - Slides in from the left */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
          <AnimatePresence>
            {isHovered && (
              <>
                {linkedin && (
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    href={linkedin} target="_blank" rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[#14b88f] hover:border-[#14b88f] transition-all duration-300"
                  >
                    <Linkedin size={20} />
                  </motion.a>
                )}
                {github && (
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    href={github} target="_blank" rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-gray-900 hover:border-gray-900 transition-all duration-300"
                  >
                    <Github size={20} />
                  </motion.a>
                )}
                {email && (
                  <motion.a
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    href={`mailto:${email}`}
                    className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-[#14b88f] hover:border-[#14b88f] transition-all duration-300"
                  >
                    <Mail size={20} />
                  </motion.a>
                )}
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Premium Glassmorphic Overlay */}
        <div className={`group absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

        {/* Content Footer */}
        <div className="absolute -bottom-36 group-hover:-bottom-0 left-0 right-0 p-8 z-10 transition-all duration-700 ease-in-out">
          <motion.div
            // animate={{ y: isHovered ? -20 : 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[10px] font-bold text-[#14b88f] uppercase tracking-[0.3em] mb-2 drop-shadow-md">
              {role}
            </p>
            <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
              {name}
            </h3>
          </motion.div>

          {/* Description - Revealed on hover */}
          <AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className=""
            >
              <div className="h-px w-21 bg-[#14b88f] mb-4" />
              <p className="text-white/80 text-sm font-light leading-relaxed line-clamp-4">
                {description}
              </p>
              <div className="mt-6 flex items-center gap-2 group/btn">
                <Link href="/contact">
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">Connect Talent</span>
                </Link>
                <ArrowUpRight size={14} className="text-[#14b88f] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </div>
            </motion.div>

          </AnimatePresence>
        </div>

        {/* Decorative corner glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#14b88f]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      </div>
    </motion.div>
  );
}

