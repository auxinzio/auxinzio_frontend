import { ArrowLeft, ArrowRight, Menu, X, CheckCircle2, ShieldCheck, Users, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { useSettings } from "@/app/Context/SettingsContext";

export default function ProductsSection({product}) {
    const {settings} = useSettings();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const payrollImage = "/assets/img/products/attendx.jpeg";
    const recruitmentImage = "/assets/img/products/Asset.jpeg";
    const attendXImage = "/assets/img/products/Hospital.jpeg";

    const nextSlide = () => {
        if (!product?.length) return;
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % product.length);
    };

    const prevSlide = () => {
        if (!product?.length) return;
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + product.length) % product.length);
    };

    const currentProduct = product?.[currentIndex];

    console.log(product);

    const variants = {
        enter: (number) => ({
        x: number > 0 ? 50 : -50,
        opacity: 0,
        }),
        center: {
        x: 0,
        opacity: 1,
        },
        exit: (number) => ({
        x: number < 0 ? 50 : -50,
        opacity: 0,
        }),
    };


    return (
        <>
        {product?.length > 0 && (
            <section className="relative">
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 relative">
                    <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-start space-y-8 relative z-10">
                        <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            variants={variants}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="space-y-6 w-full"
                        >
                            <div className="flex flex-col items-start gap-4">
                            <div className="flex items-center gap-4 flex-wrap">
                                <motion.h1 
                                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                >
                                {currentProduct?.product_name}
                                </motion.h1>
                                <span className={cn(
                                "px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase",
                                currentProduct?.accentColor
                                )}>
                                {currentProduct?.category_name}
                                </span>
                            </div>

                            <motion.p 
                                className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {currentProduct?.description}
                            </motion.p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all flex items-center justify-center gap-2"
                            >
                                More Info
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-3.5 bg-white text-slate-700 font-semibold rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                            >
                                Schedule Demo
                            </motion.button>
                            </div>
                        </motion.div>
                        </AnimatePresence>

                        {/* Slider Controls */}
                        <div className="flex items-center gap-4 mt-8 pt-4 border-t border-slate-100 w-full">
                        <button 
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label="Previous Product"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        
                        <div className="flex gap-2">
                            {product?.map((_, idx) => (
                            <div 
                                key={idx} 
                                className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                idx === currentIndex ? "w-8 bg-blue-600" : "bg-slate-300"
                                )}
                            />
                            ))}
                        </div>

                        <button 
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-600 hover:bg-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            aria-label="Next Product"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                        </div>
                    </div>

                    {/* Right Column: Illustration/Card */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-[600px] w-full flex items-center justify-center">
                        {/* Background Decorative Elements */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-emerald-100/50 rounded-3xl transform rotate-3 scale-95 opacity-60 blur-xl transition-all duration-500" />
                        
                        <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 100 : -100, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: direction < 0 ? 100 : -100, scale: 0.95 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100, damping: 20 }}
                            className="relative z-10 w-full h-full"
                        >
                            <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border-4 border-white bg-white group">
                            <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                                <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                                <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                                <div className="w-3 h-3 rounded-full bg-green-400/80" />
                                </div>
                                <div className="px-3 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-500 shadow-sm">
                                {currentProduct?.product_name} Dashboard
                                </div>
                            </div>
                            
                            <Image 
                                src={`${settings.backend_api_url}/${currentProduct?.image}`} 
                                alt={`${currentProduct?.product_name} Illustration`} 
                                width={1000}
                                height={1000}
                                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Overlay Gradient for Text Contrast (Optional) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Floating Elements (Decorative) */}
                            <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 hidden md:flex items-center gap-3 z-30"
                            >
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">System Status</p>
                                <p className="text-sm font-bold text-slate-800">100% Secure</p>
                            </div>
                            </motion.div>

                        </motion.div>
                        </AnimatePresence>
                    </div>

                    </div>
                </div>
                
                {/* Background Shapes */}
                {/* <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-b from-blue-50/50 to-transparent -z-0 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-emerald-50/30 to-transparent -z-0 pointer-events-none rounded-full blur-3xl" />        */}
            </section>     
                )
            }
        </>
    );
}