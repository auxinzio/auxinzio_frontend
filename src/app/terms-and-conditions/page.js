'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { ShieldCheck, Settings, UserCheck, Scale, Bell, HelpCircle, Lock, Globe, Copyright, Download, UserRoundCog } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
import termsData from '@/data/termsandcondition.json';
const iconMap = {
  UserCheck: UserCheck,
  Settings: Settings,
  Copyright: Copyright,
  ShieldCheck: ShieldCheck,
  Lock: Lock,
  Scale: Scale,
  Bell: Bell,
  Globe: Globe,
  Download: Download,
  HelpCircle: HelpCircle,
};
export default function TermsAndConditions() {
  const termsSections = termsData.termsSections;
  const [activeSection, setActiveSection] = useState(termsSections[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1, rootMargin: '-10% 0px -70% 0px' }
    );
    termsSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <div className="min-h-screen bg-white selection:bg-[#14b88f]/10">
      {/* Progress Bar */}
      <ProgressBar />
      {/* --- HERO SECTION: EDITORIAL TYPOGRAPHY --- */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-40 px-6 overflow-hidden bg-white">
        {/* Background Large Text (Watermark) */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-[0.02] select-none pointer-events-none lg:block hidden">
          <h1 className="text-[35vw] font-black tracking-tighter leading-none">LEGAL</h1>
        </div>
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(#14b88f 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="mx-auto max-w-[1600px] relative z-10 text-center">
          <div className="text-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-[#14b88f]" />
                <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#14b88f]">Standard Operating Protocol</span>
              </div>
              <h1 className="text-7xl lg:text-[10rem] font-light text-gray-900 leading-[0.8] tracking-tighter mb-12">
                Terms
                <span className="font-normal text-[#14b88f]"> & Conditions</span>
              </h1>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }} className="flex flex-wrap items-center gap-8 w-full">
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                These Terms of Use (“Terms”) govern your access to and use of the services (“Services”) provided by Auxinz.io, a company incorporated under the Companies Act, 2013, with its registered office at Tidel Park, Module 115-D, North Block, Dotcoworks, First Floor, Cabin No: 1, Rajiv Gandhi Salai, Taramani, Chennai - 600113, India, along with its affiliates, successors, assigns, and subsidiaries (collectively, “Auxinz.io”).
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      {/* --- MAIN CONTENT: ASYMMETRICAL GRID --- */}
      <section className="py-24 lg:py-40 px-6 border-t border-gray-50 lg:pt-0 pt-0">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 relative">
            {/* Left: Sticky Sidebar */}
            <div className="lg:col-span-4 relative">
              <div className="lg:sticky lg:top-32 space-y-12 h-fit">
                <div className="space-y-6">
                  <p className="text-[10px] tracking-[0.4em] uppercase text-gray-300 font-bold">
                    Section Directory
                  </p>
                  <nav className="flex flex-col gap-1">
                    {termsSections.map((section, idx) => (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`group relative flex items-center gap-6 py-4 transition-all duration-500 ${activeSection === section.id ? 'translate-x-4' : 'hover:translate-x-2'
                          }`}
                      >
                        <span className={`text-[10px] font-bold transition-colors duration-500 ${activeSection === section.id ? 'text-[#14b88f]' : 'text-gray-300'
                          }`}>
                          0{idx + 1}
                        </span>
                        <span className={`text-base font-medium tracking-tight transition-all duration-500 ${activeSection === section.id ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'
                          }`}>
                          {section.title}
                        </span>
                        {activeSection === section.id && (
                          <motion.div
                            layoutId="active-nav-line"
                            className="absolute -left-4 w-1 h-1 rounded-full bg-[#14b88f]"
                          />
                        )}
                      </button>
                    ))}
                  </nav>
                </div>
                {/* Glass Card Accessory */}
                <div className="p-10 rounded-[2.5rem] bg-gray-50/50 border border-gray-100 flex flex-col justify-between aspect-square group overflow-hidden relative">
                  <div className="relative z-10">
                    <HelpCircle className="w-10 h-10 text-[#14b88f] mb-8" />
                    <h4 className="text-2xl font-light text-gray-900 mb-4 tracking-tight">Need expert <span className="italic">clarification?</span></h4>
                    <p className="text-sm text-gray-500 leading-relaxed mb-8">Our legal council is available for structured enquiries regarding these protocols.</p>
                  </div>
                  {/* Background Decorative */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#14b88f]/5 rounded-full blur-3xl" />
                </div>
              </div>
            </div>
            {/* Right: Content Feed */}
            <div className="lg:col-span-8 space-y-20 lg:space-y-34">
              {termsSections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="relative"
                >
                  {/* Section Label */}
                  <div className="grid md:grid-cols-12 gap-12">
                    <div className="md:col-span-12 lg:col-span-10">
                      <h2 className="text-4xl lg:text-6xl font-light text-gray-900 mb-12 tracking-tighter leading-none">
                        {section.title}
                      </h2>
                      <div className="space-y-12">
                        <p className="text-2xl text-gray-600 leading-relaxed font-light">
                          {section.content}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {section.subpoints.map((point, i) => (
                            <motion.div
                              key={i}
                              whileHover={{ y: -5 }}
                              className="group flex flex-col p-8 rounded-3xl bg-white border border-gray-100 hover:border-[#14b88f]/20 hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.1)] transition-all duration-500"
                            >
                              <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:bg-[#14b88f]/1 flex-shrink-0">
                                {(() => {
                                  const Icon = iconMap[section.icon] || HelpCircle;
                                  return <Icon className="w-5 h-5 text-gray-400 group-hover:text-[#14b88f] transition-colors" strokeWidth={1.5} />;
                                })()}
                              </div>
                              <span className="text-sm text-gray-800 font-medium leading-relaxed">{point}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {/* Final Footer Monolith */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-gray-900 rounded-[4rem] p-12 lg:p-24 overflow-hidden"
              >
                {/* Background Large Text */}
                <h1 className="absolute -bottom-10 right-10 text-[20vw] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter">
                  AUXINZ
                </h1>
                <div className="relative z-10">
                  <div className="max-w-2xl">
                    <h3 className="text-4xl lg:text-6xl font-light text-white tracking-tighter leading-[0.9] mb-12">
                      Formal Acceptance <br />
                      <span className="text-[#14b88f] italic font-normal">of Protocol</span>
                    </h3>
                    <p className="text-gray-400 text-xl font-light leading-relaxed mb-16">
                      By participating in the Auxinzio ecosystem, you formally acknowledge and accept these regulatory standards in their entirety.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      <Link href="/contact">
                        <Button variant="gradi" size="lg" className="rounded-2xl px-12 py-8 text-lg font-bold border-white/20 text-black hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                          <UserRoundCog className="w-5 h-5 mr-3" />Support Team
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#14b88f]/20 to-transparent blur-[80px]" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      {/* Decorative Spacer */}
      <div className="h-40 bg-white" />
    </div>
  );
}
