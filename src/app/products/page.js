"use client";
import { ProductExperience } from '@/components/sections/ProductExperience';
import { ProductFeature } from '@/components/sections/ProductFeature';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useSettings } from '@/app/Context/SettingsContext';
import { useState, useEffect } from 'react';

export default function Products() {
    const { settings } = useSettings();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`${settings.backend_api_url}/api/products/productsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [settings]);
    return (
        <>
            {/* Product Hero Section — Matching AboutSection2 Tone */}
            <section className="relative py-24 lg:py-32 px-6 overflow-hidden bg-white">
                <div className="mx-auto max-w-[1600px]">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12">
                        {/* Left Zone — Vertical Product Statement */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="lg:col-span-3 relative"
                        >
                            <div className="bg-gray-50 px-8 py-16 lg:py-20 lg:min-h-[600px] flex flex-col justify-center">
                                <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12 font-medium">
                                    Our Products
                                </p>
                                <div className="space-y-2">
                                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight">
                                        Digital
                                    </h1>
                                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight">
                                        Solutions
                                    </h1>
                                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-[0.95] tracking-tight">
                                        <span className="text-[#14b8a6]">Engineered</span>
                                    </h1>
                                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight">
                                        to Scale
                                    </h1>
                                </div>
                                <div className="w-16 h-px bg-[#22c55e] mt-12"></div>
                            </div>
                        </motion.div>

                        {/* Architectural Divider */}
                        <div className="hidden lg:block lg:col-span-1 relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#14b8a6]/15"></div>
                        </div>

                        {/* Center Zone — Geometric Visual Storytelling */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:col-span-3 relative flex items-center justify-center"
                        >
                            <div className="relative w-full max-w-md lg:max-w-none">
                                <div className="relative aspect-square lg:aspect-[3/4] w-full">
                                    <svg viewBox="0 0 400 500" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id="grid-products" width="40" height="40" patternUnits="userSpaceOnUse">
                                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
                                            </pattern>
                                        </defs>
                                        <rect width="400" height="500" fill="url(#grid-products)" />

                                        {/* Abstract tech nodes matching products theme */}
                                        <motion.path
                                            d="M 100 100 L 300 100 L 300 400 L 100 400 Z"
                                            fill="none"
                                            stroke="#06b6d4"
                                            strokeWidth="0.5"
                                            opacity="0.2"
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5 }}
                                        />
                                        <motion.circle
                                            cx="200" cy="250" r="100"
                                            fill="none" stroke="#14b8a6" strokeWidth="1" opacity="0.1"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                        />
                                        {/* Animated dots representing product data */}
                                        {[
                                            { x: 100, y: 100, color: "#14b8a6" },
                                            { x: 300, y: 100, color: "#06b6d4" },
                                            { x: 300, y: 400, color: "#22c55e" },
                                            { x: 100, y: 400, color: "#14b8a6" },
                                            { x: 200, y: 250, color: "#06b6d4" }
                                        ].map((node, i) => (
                                            <motion.circle
                                                key={i}
                                                cx={node.x} cy={node.y} r="4"
                                                fill={node.color}
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 0.6 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.8 + i * 0.1 }}
                                            />
                                        ))}
                                    </svg>
                                </div>

                                {/* Floating badge for product count */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 1 }}
                                    className="absolute bottom-8 right-0 lg:bottom-12 lg:-right-8"
                                >
                                    <div className="bg-white border border-gray-200 px-6 py-4 shadow-sm">
                                        <div className="text-3xl font-light text-gray-900 mb-1">
                                            {product.length > 0 ? product.length : '12'}<span className="text-[#22c55e]">+</span>
                                        </div>
                                        <div className="text-xs tracking-[0.15em] uppercase text-gray-500">
                                            Global Platforms
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Architectural Divider */}
                        <div className="hidden lg:block lg:col-span-1 relative">
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#14b8a6]/15"></div>
                        </div>

                        {/* Right Zone — Product Narrative */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="lg:col-span-4 flex flex-col justify-center"
                        >
                            <div className="mb-12">
                                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 leading-tight">
                                    Powering the Next Generation of Enterprise Intelligence
                                </h2>
                                <div className="space-y-4 text-gray-600 leading-relaxed max-w-2xl">
                                    <p className="text-lg">
                                        Our suite of digital products is designed to bridge the gap between complex data and actionable intelligence. We build for performance, security, and effortless scale.
                                    </p>
                                    <p>
                                        From AI-driven analytics to robust cloud infrastructure, each solution is crafted with a focus on user experience and enterprise-grade reliability.
                                    </p>
                                </div>
                            </div>

                            <div className="w-12 h-px bg-[#06b6d4]/30 mb-8"></div>

                            {/* CTAs matching tone */}
                            <div className="flex flex-wrap gap-4 mb-12">
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-gray-900 group"
                                >
                                    Explore Catalog
                                    <ArrowRight className="w-4 h-4 text-[#14b8a6] group-hover:translate-x-1 transition-transform" />
                                </motion.button>
                                <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block"></div>
                                <motion.button
                                    whileHover={{ x: 5 }}
                                    className="flex items-center gap-3 text-sm font-medium tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors group"
                                >
                                    Watch Intro
                                    <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                                </motion.button>
                            </div>

                            {/* Quick Stats Grid */}
                            <div className="pt-10 border-t border-gray-100">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <div className="text-2xl font-light text-gray-900 mb-1">99.99%</div>
                                        <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">Reliability Rate</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-light text-gray-900 mb-1">256-bit</div>
                                        <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400">AES Encryption</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Product Features Section */}
            <ProductFeature products={product} />

            {/* Product Experience Section */}
            <ProductExperience />
        </>
    );
}
