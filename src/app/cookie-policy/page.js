'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/Button";
import Link from 'next/link';
import {
    ShieldCheck,
    Database,
    Settings,
    Activity,
    Fingerprint,
    ArrowRight,
    ShieldAlert,
    Search,
    Zap
} from 'lucide-react';
import ProgressBar from '@/components/ui/ProgressBar';
const cookieModules = [
    {
        icon: Database,
        title: 'Essential Matrix',
        summary: 'Core architecture required for structural stability.',
        content: 'These tracking tokens are vital for infrastructural security, session maintenance, and authentication protocols. Without these, the digital environment cannot function as intended.',
        details: ['Security Tokens', 'Session Integrity', 'Load Calibration'],
        color: '#14b88f'
    },
    {
        icon: Activity,
        title: 'Performance Analytics',
        summary: 'High-fidelity markers for experiential optimization.',
        content: 'We use adaptive markers to synchronize site speed with your technical requirements. These markers allow us to understand engagement patterns and optimize resource allocation.',
        details: ['Latency Tracking', 'Usage Metrics', 'Architecture Tuning'],
        color: '#06b6d4'
    },
    {
        icon: Settings,
        title: 'Preference Sovereignty',
        summary: 'Interface configurations tailored to your workflow.',
        content: 'These tokens stabilize your regional calibrations, interface preferences, and workspace settings across multiple sessions for a seamless industrial-grade experience.',
        details: ['UI Scaling', 'Regional Sync', 'Feature Persistence'],
        color: '#22c55e'
    }
];

const expandedSections = [
    {
        id: 'lifecyle',
        title: 'Token Lifecycle',
        icon: ShieldAlert,
        content: 'Our digital footprints have strictly defined temporal limits. Session-based tokens are erased upon environment termination, while persistent markers remain to ensure configuration continuity.',
    },
    {
        id: 'sovereignty',
        title: 'User Sovereignty',
        icon: Fingerprint,
        content: 'You retain the absolute right to recalibrate your tracking preferences. You can audit, restrict, or erase these tokens through your browser architectural settings at any time.',
    },
    {
        id: 'compliance',
        title: 'Legal Fidelity',
        icon: ShieldCheck,
        content: 'We adhere to the highest standards of digital compliance, including GDPR and global data residency laws, ensuring your digital footprints are treated with technical integrity.',
    }
];

export default function CookiePolicy() {
    return (
        <div className="min-h-screen bg-white selection:bg-[#14b88f]/10">
            {/* Progress Bar */}
            <ProgressBar />

            {/* --- HERO: THE ARCHITECTURAL MARK --- */}
            <section className="relative pt-32 pb-20 lg:pt-56 lg:pb-32 px-6 overflow-hidden bg-gray-50/20">
                {/* Background Large Text (Watermark) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] select-none pointer-events-none text-center lg:block hidden">
                    <h1 className="text-[30vw] font-black tracking-tighter leading-none uppercase">COOKIES</h1>
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
                            <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#14b88f]">Tracking Protocol Hub</span>
                            <div className="w-12 h-px bg-[#14b88f]" />
                        </div>

                        <h1 className="text-7xl lg:text-[10rem] font-light text-gray-900 leading-[0.8] tracking-tighter mb-12">
                            Cookie <br />
                            <span className="font-normal text-[#14b88f]">Architecture.</span>
                        </h1>

                        <p className="text-xl lg:text-2xl text-gray-500 font-light max-w-3xl mx-auto leading-relaxed">
                            Auxinzio utilizes advanced tracking tokens to refine your digital interaction. We prioritize technical transparency and the sovereignty of your data.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- MODULAR BENTO GRID: COOKIE TAXONOMY --- */}
            <section className="py-24 lg:py-40 px-6 lg:pt-0 pt-0">
                <div className="max-w-[1600px] mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {cookieModules.map((module, idx) => (
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

                                {/* Decorative Geometry */}
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

            {/* --- SPLIT ACTION SECTION: TOKEN MANAGEMENT --- */}
            <section className="py-24 lg:py-40 bg-gray-900 text-white overflow-hidden relative">
                <div className="mx-auto max-w-[1600px] px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-start">

                        {/* Left Col: Static Branding */}
                        <div className="lg:col-span-5 lg:sticky lg:top-32">
                            <div className="space-y-12">
                                <div className="flex items-center gap-4">
                                    <Search className="w-6 h-6 text-[#14b88f]" />
                                    <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-[#14b88f]">Audit & Compliance</span>
                                </div>
                                <h2 className="text-5xl lg:text-7xl font-light tracking-tighter leading-none">
                                    Tracking <br />
                                    <span className="italic font-normal text-[#14b88f]">Intelligence.</span>
                                </h2>
                                <p className="text-gray-400 text-xl font-light leading-relaxed max-w-md">
                                    Our environment is audited for tracking hygiene, ensuring that no unnecessary digital footprints are collected during your session.
                                </p>

                                <div className="pt-12 border-t border-white/10 flex flex-col gap-8">
                                    <div className="flex items-center gap-6">
                                        <p className="text-3xl font-light">99.9%</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Token Efficiency</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <p className="text-3xl font-light">Zero</p>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Ad-Tech Intrusions</p>
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
                                                Management Hub <ArrowRight className="w-4 h-4" />
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
                            Control your <br />
                            <span className="text-[#14b88f] italic font-normal">Digital Footprint.</span>
                        </h2>
                        <p className="text-gray-500 text-xl font-light leading-relaxed mb-16">
                            Our technical support team is ready to assist with any queries regarding our tracking architectures and privacy sovereignty.
                        </p>

                        <div className="flex flex-wrap justify-center gap-8">
                            <Link href="/contact">
                                <Button variant="outline" className="rounded-2xl border-gray-100 px-12 py-8 text-base font-bold transition-all">
                                    Consult with Legal
                                </Button>
                            </Link>
                            <Link href="/privacy-policy">
                                <Button className="rounded-2xl px-12 py-8 text-base font-bold bg-gray-900 text-white hover:bg-black transition-all">
                                    View Privacy Policy
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
