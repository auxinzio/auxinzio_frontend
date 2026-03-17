'use client';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, Database, Share2, Fingerprint, Globe, Bell, ArrowRight, ShieldAlert, HardDrive, Users, Settings, Mail } from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
const privacyModules = [
  {
    icon: Database,
    title: 'Data Collection',
    summary: 'Understanding the specific digital footprints we analyze.',
    content: 'We collect information you provide directly to us (names, emails, company data) and automated usage metrics through our infrastructure to optimize your experience.',
    details: ['Personal Identifiers', 'Technical Metadata', 'Engagement Patterns'],
    color: '#14b88f'
  },
  {
    icon: Eye,
    title: 'Data Usage',
    summary: 'How your information fuels business intelligence.',
    content: 'Your data is strictly used to provide, maintain, and improve our services, develop new features, and protect Auxinzio and our users from fraudulent activity.',
    details: ['Service Optimization', 'Algorithmic Tuning', 'Security Protocols'],
    color: '#06b6d4'
  },
  {
    icon: Share2,
    title: 'Sharing Protocols',
    summary: 'Our standards for third-party ecosystem integration.',
    content: 'We do not sell your personal data. We only share information with trusted service providers who adhere to our strict privacy standards and legal requirements.',
    details: ['Partner Vetting', 'Encrypted Transfers', 'No Data Selling'],
    color: '#22c55e'
  }
];
const expandedSections = [
  {
    id: 'security',
    title: 'Infrastructural Security',
    icon: ShieldAlert,
    content: 'Auxinzio employs military-grade encryption and architectural-level security measures to protect your data. Our infrastructure is audited regularly to ensure compliance with global security standards.',
  },
  {
    id: 'rights',
    title: 'Constitutional Rights',
    icon: Fingerprint,
    content: 'You retain full sovereignty over your data. This includes the right to access, rectify, or request the erasure of your personal information from our active databases at any time.',
  },
  {
    id: 'cookies',
    title: 'Cookie Taxonomy',
    icon: Settings,
    content: 'We use advanced tracking tokens (cookies) to maintain your session state and understand site interaction. You can manage these preferences through your architectural dashboard.',
  }
];
export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white selection:bg-[#14b88f]/10">
      {/* Progress Bar */}
      <ProgressBar />
      {/* --- HERO: THE DATA MONOLITH --- */}
      <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 px-6 overflow-hidden bg-gray-50/20">
        {/* Background Large Text (Watermark) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] select-none pointer-events-none text-center lg:block hidden">
          <h1 className="text-[30vw] font-black tracking-tighter leading-none">PRIVACY</h1>
        </div>
        <div className="mx-auto max-w-[1600px] relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#14b88f]" />
              <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#14b88f]">Data Protection Protocol</span>
              <div className="w-12 h-px bg-[#14b88f]" />
            </div>
            <h1 className="text-7xl lg:text-[10rem] font-light text-gray-900 leading-[0.8] tracking-tighter mb-12">
              Privacy <br />
              <span className="font-normal text-[#14b88f]">Policy</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              This Privacy Policy explains how Auxinz.io collects, uses, discloses, and safeguards your information when you visit our platform. Please read this policy carefully to understand our views and practices regarding your personal data and how we treat it.
            </p>
          </motion.div>
        </div>
      </section>
      {/* --- MODULAR BENTO GRID: THE CORE PILLARS --- */}
      <section className="py-24 lg:py-40 lg:pt-0 pt-0 px-6">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {privacyModules.map((module, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative bg-white border border-gray-100 p-12 lg:p-16 rounded-[3rem] hover:border-[#14b88f]/30 transition-all duration-700 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center mb-10 group-hover:bg-[#14b88f] group-hover:text-white transition-all duration-500">
                    <module.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#14b88f] mb-6">{module.summary}</h3>
                  <h2 className="text-4xl font-light text-gray-900 mb-8 tracking-tight leading-none">{module.title}</h2>
                  <p className="text-gray-500 text-lg font-light leading-relaxed mb-10">{module.content}</p>
                  <div className="space-y-3">
                    {module.details.map((detail, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-1 h-1 rounded-full bg-[#14b88f]" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Subtle Decorative Geometry */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="100" cy="0" r="80" fill="none" stroke={module.color} strokeWidth="2" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* --- SPLIT ACTION SECTION: DETAILED READING --- */}
      <section className="py-24 lg:py-40 bg-gray-900 text-white overflow-hidden relative">
        <div className="mx-auto max-w-[1600px] px-6">
          <div className="grid lg:grid-cols-12 gap-20 items-start">
            {/* Left Col: Static Branding */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <div className="space-y-12">
                <div className="flex items-center gap-4">
                  <ShieldCheck className="w-6 h-6 text-[#14b88f]" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#14b88f]">Compliance Standard</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-light tracking-tighter leading-none">
                  Regulatory <br />
                  <span className="italic font-normal text-[#14b88f]">Architecture</span>
                </h2>
                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-md">
                  We adhere to GDPR, CCPA, and international data residency laws to ensure your information is treated with highest legal fidelity.
                </p>
                <div className="pt-12 border-t border-white/10 flex flex-col gap-8">
                  <div className="flex items-center gap-6">
                    <p className="text-3xl font-light">100%</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Encrypted End-to-End</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-3xl font-light">Zero</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Third-Party Data Sales</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Col: Expanded Sections */}
            <div className="lg:col-span-7 space-y-32">
              {expandedSections.map((section, idx) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="relative group"
                >
                  <div className="flex items-start gap-8">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-[#14b88f] shrink-0 group-hover:bg-[#14b88f] group-hover:text-white group-hover:border-[#14b88f] transition-all duration-500">
                      <section.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-light mb-8 tracking-tight">{section.title}</h3>
                      <p className="text-gray-400 text-xl font-light leading-relaxed mb-12">
                        {section.content}
                      </p>
                      <button className="flex items-center gap-3 text-[#14b88f] text-xs font-bold uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
                        Technical Specifics <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-20 h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* --- FOOTER CTA: TRUST REINFORCED --- */}
      <section className="py-24 lg:py-40 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-light text-gray-900 mb-12 tracking-tighter">
              Privacy is a <br />
              <span className="text-[#14b88f] italic font-normal">Human Right</span>
            </h2>
            <p className="text-gray-500 text-xl font-light leading-relaxed mb-16">
              If you have any questions regarding these infrastructural protocols, please reach out to our global compliance hub.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Link href="/contact">
                <Button variant="outline" className="rounded-2xl border-gray-100 px-12 py-8 text-base font-bold transition-all cursor-pointer">
                  Speak with Team
                </Button>
              </Link>
              <Link href="/terms-and-conditions">
                <Button variant="gradi" className="rounded-2xl px-12 py-8 text-base font-bold text-white hover:text-black transition-all duration-500 cursor-pointer">
                  View Terms & Conditions
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Decorative Spacer */}
      <div className="h-20 bg-white" />
    </div>
  );
}
