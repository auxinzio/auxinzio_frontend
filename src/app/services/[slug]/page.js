"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    ShieldCheck,
    Zap,
    ArrowUpRight,
    Github,
    Globe,
    Activity,
    Layers,
    Cpu,
    Fingerprint
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/app/Context/SettingsContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ServiceDetailPage({ params }) {
    const { slug } = React.use(params);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { settings } = useSettings();

    useEffect(() => {
        const fetchServiceDetail = async () => {
            if (!settings.backend_api_url) return;

            try {
                setLoading(true);
                const response = await fetch(`${settings.backend_api_url}/api/services/servicesShow`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug: slug }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch service details: ${response.status}`);
                }

                const result = await response.json();
                setService(result.data.service);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug && settings.backend_api_url) {
            fetchServiceDetail();
        }
    }, [slug, settings.backend_api_url]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="relative">
                    <div className="w-24 h-24 border border-[#14b8a6]/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-[#14b8a6] rounded-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white p-6">
                <div className="max-w-md w-full text-center space-y-12">
                    <h1 className="text-8xl font-black text-gray-100 select-none">404</h1>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-light tracking-tight">Sync Error</h2>
                        <p className="text-gray-400 font-light">The requested node could not be synchronized or no longer exists in our architecture.</p>
                    </div>
                    <Link href="/services" className="inline-block">
                        <Button variant="outline" className="rounded-2xl px-8 h-12 gap-3 group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Return to Repository
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white selection:bg-[#14b8a6] selection:text-white">
            {/* MONOLITH HERO */}
            <section className="relative pt-28 pb-20 lg:pb-32 overflow-hidden border-b border-gray-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] select-none pointer-events-none">
                    <h1 className="text-[40vw] font-black leading-none tracking-tighter">SERVICE</h1>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-end">
                        <div className="lg:col-span-7 space-y-8 lg:space-y-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-8 h-8 rounded-full bg-[#14b8a6]/10 flex items-center justify-center">
                                    <Zap size={14} className="text-[#14b8a6]" fill="currentColor" />
                                </div>
                                <span className="text-[10px] font-bold tracking-[0.6em] uppercase text-[#14b8a6]">Node Type: {service.description?.short_description_title || "Enterprise"}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="text-6xl md:text-8xl lg:text-[120px] font-light tracking-tighter leading-[0.9] text-gray-900"
                            >
                                {service.title}<span className="text-[#14b8a6]">.</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl lg:text-2xl font-light text-gray-500 leading-relaxed max-w-2xl"
                            >
                                {service.description?.short_description}
                            </motion.p>
                        </div>

                        <div className="lg:col-span-5 relative">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] group bg-gray-50"
                            >
                                {service.main_logo ? (
                                    <Image
                                        src={`${settings.backend_api_url}/${service.main_logo}`}
                                        alt={service.title}
                                        fill
                                        className="object-cover transition-all duration-[2000ms] group-hover:scale-110"
                                        priority
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Layers className="w-24 h-24 text-gray-200" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>

                            {/* Floating Architecture Badge */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-2xl border border-gray-50 hidden lg:block"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Activity size={16} className="text-[#14b8a6]" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Sync Status</span>
                                    </div>
                                    <p className="text-sm font-bold flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
                                        Operational 100%
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTENT ARCHITECTURE */}
            <section className="py-24 lg:py-40 relative">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

                        {/* LEFT COLUMN: DESCRIPTION */}
                        <div className="lg:col-span-7 space-y-32">

                            {/* 01 Overview */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold text-[#14b8a6]">01</span>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Architectural Overview</h3>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-light tracking-tight text-gray-900 leading-tight">
                                    {service.description?.long_description_title || "Strategic Infrastructure"}
                                </h2>
                                <div className="space-y-8 max-w-2xl">
                                    {(service.description?.long_description || "").split('~').map((part, i) => (
                                        <p key={i} className="text-lg lg:text-xl font-light text-gray-500 leading-relaxed">
                                            {part.trim()}
                                        </p>
                                    ))}
                                </div>
                            </motion.div>

                            {/* 02 Specialized Nodes */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="space-y-12"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-bold text-[#14b8a6]">02</span>
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Specialized Nodes</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    {(service.service_item && service.service_item.length > 0 ? service.service_item : ["Expert Consultation", "Custom Implementation", "Ongoing Support"]).map((item, i) => (
                                        <div key={i} className="p-8 rounded-[2.5rem] bg-gray-50 border border-gray-100 group hover:bg-[#14b8a6] transition-all duration-500">
                                            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                                {i % 3 === 0 ? <Fingerprint size={20} /> : i % 3 === 1 ? <Cpu size={20} /> : <Layers size={20} />}
                                            </div>
                                            <h4 className="text-xl font-bold mb-4 group-hover:text-white transition-colors">{item}</h4>
                                            <p className="text-gray-400 text-sm font-light group-hover:text-white/80 transition-colors">Implemented via high-end synchronization protocols for maximum enterprise efficiency.</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                        </div>

                        {/* RIGHT COLUMN: STICKY CALL TO ACTION */}
                        <div className="lg:col-span-1" />
                        <div className="lg:col-span-4 relative">
                            <div className="lg:sticky lg:top-40 space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="p-12 rounded-[3.5rem] bg-gray-900 text-white relative overflow-hidden group shadow-[0_50px_80px_-20px_rgba(0,0,0,0.3)]"
                                >
                                    <div className="absolute top-0 right-0 p-8 opacity-10">
                                        <Zap size={80} strokeWidth={1} />
                                    </div>

                                    <div className="relative z-10 space-y-8">
                                        <h3 className="text-3xl font-light tracking-tighter leading-tight">
                                            Ready to <br />
                                            <span className="italic text-[#14b8a6]">Synchronize?</span>
                                        </h3>
                                        <p className="text-gray-400 font-light leading-relaxed">
                                            Initiate a deep-dive session with our lead architects to integrate this node into your ecosystem.
                                        </p>
                                        <Link href={`/contact`} className="block">
                                            <Button variant="gradi" className="w-full h-16 rounded-[1.5rem] font-bold text-sm tracking-widest uppercase group">
                                                Get Started <ArrowUpRight size={18} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </Button>
                                        </Link>
                                        <div className="flex items-center justify-center gap-6 pt-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-2"><Globe size={12} /> Global Support</span>
                                            <span className="flex items-center gap-2"><ShieldCheck size={12} /> Secure Protocol</span>
                                        </div>
                                    </div>
                                </motion.div>

                                <div className="p-8 border border-gray-100 rounded-[2.5rem] space-y-6">
                                    <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">Communication Node</h4>
                                    <div className="space-y-4">
                                        <p className="text-sm font-medium text-gray-900">Direct Protocol: {settings.phone}</p>
                                        <p className="text-sm font-medium text-gray-900">Encrypted Mail: info@auxinzio.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
