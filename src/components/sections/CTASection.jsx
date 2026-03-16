"use client";

import { Phone, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSettings } from '@/app/Context/SettingsContext';

export default function CTASection() {

    const { settings } = useSettings();

    return (
        <section className="relative py-14 lg:py-25 bg-gray-900 border-t border-white/5 overflow-hidden">
            {/* Background Architectural Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_#14b88f10_0%,_transparent_50%)] blur-[100px]" />

                {/* Vertical Scanning Line */}
                <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-[#14b88f20] to-transparent z-10"
                />
            </div>

            <div className="relative z-10 max-w-[1600px] mx-auto px-6">
                <div className="grid lg:grid-cols-12 gap-16 items-center">

                    {/* Left: Headline & Purpose */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-12 h-px bg-[#14b88f]" />
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Want to work with us?</span>
                            </div>

                            <h2 className="text-6xl lg:text-[10rem] font-light text-white leading-[0.8] tracking-tighter mb-12">
                                Ready to <br />
                                <span className="italic font-medium bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-8">Grow?</span>
                            </h2>

                            <p className="text-xl lg:text-2xl text-white/40 font-light leading-relaxed">
                                Digitally transforming your business is key to staying competitive in today's fast-paced world. With our expertise, we help you leverage the latest technologies to streamline operations, enhance customer experiences, and boost growth. Partner with us to drive your business forward through innovative digital solutions.
                            </p>
                        </motion.div>
                    </div>

                    {/* Right: Interaction Nexus */}
                    <div className="lg:col-span-4 lg:pl-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="bg-white/5 backdrop-blur-3xl p-10 lg:p-16 rounded-[4rem] border border-white/10 shadow-2xl relative group overflow-hidden"
                        >
                            {/* Inner Glow */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#14b88f]/20 rounded-full blur-[60px] group-hover:bg-[#14b88f]/40 transition-all duration-700" />

                            <div className="relative z-10 space-y-12">
                                <div className="space-y-4">
                                    <h4 className="text-white text-sm font-bold uppercase tracking-[0.4em]">Contact</h4>
                                    <div className="flex items-center justify-between">
                                        <a href={`mailto:${settings.email}`} className="group/link flex items-center gap-4 text-2xl lg:text-3xl font-light text-white hover:text-[#14b88f] transition-colors">
                                            Hello <Mail className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                        </a>
                                        <a href={`tel:${settings.phone}`} className="group/link flex items-center gap-4 text-2xl lg:text-3xl font-light text-white hover:text-[#14b88f] transition-colors">
                                            Voice <Phone className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Mesh */}
            <div className="absolute inset-0 -z-10 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </section>
    );
}
