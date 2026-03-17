"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSettings } from '@/app/Context/SettingsContext';
import GetDemoModal from "@/components/sections/GetDemoModal";
import { Zap, Shield, Users, BarChart3, Clock, MessageSquare, TrendingUp, Cloud } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { motion } from "framer-motion";

export default function App({ params }) {
  const { settings } = useSettings();
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(null);
  const { slug } = React.use(params);

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/products/productsShow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: slug })
    })
      .then(res => res.json())
      .then(data => setProduct(data.data.product))
  }, [settings, slug]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b88f]"></div>
      </div>
    );
  }

  const descriptionParts = product.description?.split('~').map(part => part.trim()) || [];
  return (
    <>
      {/* Progress Bar */}
      <ProgressBar />
      <div className="min-h-screen bg-white mt-20">
        {/* Section 1 - Vertical Product Introduction Panel */}
        <section className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Panel - 30% */}
          <div className="lg:w-[30%] bg-[#f5f7f9] p-8 lg:p-12 flex flex-col justify-center relative">
            <div className="space-y-6">
              <p className="text-xs tracking-[0.2em] text-[#6b7280] uppercase font-medium">
                Product
              </p>
              <h1 className="text-4xl lg:text-5xl font-light leading-tight text-[#111827]">
                {product.product_name}
                <br />
                <span className="text-[#14b88f]">{product.category_name}</span>
              </h1>
              <div className="w-16 h-[2px] bg-[#14b88f]"></div>
              <p className="text-[#4b5563] leading-relaxed max-w-sm">
                {descriptionParts[0] || product.description}
              </p>
            </div>
            {/* Divider line */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[#e5e7eb]"></div>
          </div>
          {/* Right Panel - 70% */}
          <div className="lg:w-[70%] p-8 lg:p-16 lg:px-10 flex items-center justify-center bg-white relative overflow-hidden group/panel">
            {/* Background elements */}
            <div className="absolute inset-0 bg-radial-[at_50%_50%] from-white via-white to-gray-50/50"></div>
            <ParticlesBackground />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: [0, -20, 0],
              }}
              transition={{
                opacity: { duration: 0.8 },
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              className="max-w-3xl w-full relative z-10"
            >
              <div className="relative group/image">
                {/* Decorative glow behind image */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#14b88f]/20 to-[#06b6d4]/20 blur-2xl opacity-0 group-hover/image:opacity-100 transition-opacity duration-700"></div>

                <Image
                  src={`${settings.backend_api_url}/${product.image}`}
                  alt={product.product_name}
                  width={1000}
                  height={1000}
                  className="w-full h-auto shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-2xl relative z-10 border border-white/20 backdrop-blur-[2px]"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>
        {/* Section 2 - Key Features (Horizontal Architecture Grid) */}
        {product.key_feature?.length > 0 && (
          <section className="py-16 lg:py-24 px-6 lg:px-12">
            <h2 className="text-3xl font-light text-[#111827] mb-12">Core Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
              {product.key_feature?.map((feature, index) => {
                const icons = [Zap, Shield, Users, BarChart3];
                const Icon = icons[index % icons.length];
                return (
                  <div key={index} className="p-8 border-r-0 lg:border-r border-[#e5e7eb] border-b md:border-b-0">
                    <Icon className="w-8 h-8 text-[#14b88f] mb-6 stroke-[1.5]" />
                    {/* <h3 className="text-lg font-semibold text-[#111827] mb-3">
                    {feature.split(' ').slice(0, 2).join(' ')}
                  </h3> */}
                    <p className="text-[#6b7280] leading-relaxed text-sm">
                      {feature}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
        {/* Section 3 - Business Benefits (Structured Quadrant Layout) */}
        <section className="py-16 lg:py-24 bg-[#f5f7f9]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Top Left - Time Benefits */}
              <div className="p-8 lg:p-12 border-b lg:border-r border-[#e5e7eb] bg-white/50">
                <p className="text-xs tracking-[0.2em] text-[#6b7280] uppercase font-medium mb-4">
                  Time Benefits
                </p>
                <div className="w-12 h-[1px] bg-[#14b88f] mb-8"></div>
                <div className="space-y-6">
                  {product.benefit?.time_benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#14b88f] mt-0.5 stroke-[1.5] flex-shrink-0" />
                      <p className="text-[#4b5563] leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Top Right - Communication Benefits */}
              <div className="p-8 lg:p-12 border-b border-[#e5e7eb] bg-white/50">
                <p className="text-xs tracking-[0.2em] text-[#6b7280] uppercase font-medium mb-4">
                  Communication Benefits
                </p>
                <div className="w-12 h-[1px] bg-[#06b6d4] mb-8"></div>
                <div className="space-y-6">
                  {product.benefit?.communication_benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <MessageSquare className="w-5 h-5 text-[#06b6d4] mt-0.5 stroke-[1.5] flex-shrink-0" />
                      <p className="text-[#4b5563] leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom Left - Growth Benefits */}
              <div className="p-8 lg:p-12 lg:border-r border-[#e5e7eb] bg-white/50">
                <p className="text-xs tracking-[0.2em] text-[#6b7280] uppercase font-medium mb-4">
                  Growth Benefits
                </p>
                <div className="w-12 h-[1px] bg-[#22c55e] mb-8"></div>
                <div className="space-y-6">
                  {product.benefit?.growth_benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-[#22c55e] mt-0.5 stroke-[1.5] flex-shrink-0" />
                      <p className="text-[#4b5563] leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Bottom Right - Cloud Benefits */}
              <div className="p-8 lg:p-12 bg-white/50">
                <p className="text-xs tracking-[0.2em] text-[#6b7280] uppercase font-medium mb-4">
                  Cloud Benefits
                </p>
                <div className="w-12 h-[1px] bg-[#14b88f] mb-8"></div>
                <div className="space-y-6">
                  {product.benefit?.cloud_benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Cloud className="w-5 h-5 text-[#14b88f] mt-0.5 stroke-[1.5] flex-shrink-0" />
                      <p className="text-[#4b5563] leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Section 4 - Editorial Highlight Section */}
        {/* <section className="py-20 lg:py-28 border-t border-b border-[#e5e7eb] bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl lg:text-4xl font-light text-[#111827] mb-12 text-center capitalize tracking-tight">
              {product.category_name}
            </h2>
            <div className="flex flex-col items-center space-y-8">
              {product.description.split('~').map((part, index) => {
                if(index>0){
                  const trimmedPart = part.trim();
                if (!trimmedPart) return null;
                return (
                  <motion.p 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-[#4b5563] leading-[1.8] text-lg lg:text-xl text-center font-light max-w-2xl"
                  >
                    {trimmedPart}
                  </motion.p>
                );
                }
              })}
            </div>
          </div>
        </section> */}
        {/* Section 6 - FAQ Section */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="py-16 lg:py-24 bg-[#f8fafc]">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-light text-[#111827] mb-12 text-center capitalize">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {product.faqs.map((faq) => {
                  const isExpanded = openFaqId === faq.id;
                  return (
                    <div key={faq.id} className={`bg-white rounded-lg border transition-all duration-300 ${isExpanded ? 'border-[#14b88f] shadow-md' : 'border-gray-100 shadow-sm'}`}>
                      <button
                        onClick={() => setOpenFaqId(isExpanded ? null : faq.id)}
                        className="w-full text-left py-6 px-6 md:px-8 flex items-center justify-between focus:outline-none group"
                      >
                        <h3 className={`text-lg font-semibold capitalize pr-4 transition-colors ${isExpanded ? 'text-[#14b88f]' : 'text-[#111827] group-hover:text-[#14b88f]'}`}>
                          {faq.question}
                        </h3>
                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isExpanded ? 'bg-[#14b88f] text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-[#14b88f]/10 group-hover:text-[#14b88f]'}`}>
                          <svg
                            className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none" viewBox="0 0 24 24" stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100 pb-6 px-6 md:px-8' : 'max-h-0 opacity-0'}`}>
                        <p className="text-[#6b7280] leading-relaxed pt-2 border-t border-gray-100">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        {/* Section 5 - Final CTA Strip */}
        <section className="py-20 lg:py-28 bg-white border-t border-[#e5e7eb]">
          <div className="max-w-2xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-light text-[#111827] mb-4">
              Ready to get started with {product.product_name}?
            </h2>
            <p className="text-[#6b7280] mb-8 text-lg">
              Experience the future of {product.category_name} today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="px-8 py-3 bg-[#14b88f] text-white font-medium hover:bg-[#0d9488] transition-colors" onClick={() => setIsOpen(true)}>
                Request Demo
              </button>
              <a href="#" className="text-[#14b88f] font-medium hover:text-[#0d9488] transition-colors">
                View Documentation →
              </a>
            </div>
          </div>
        </section>
      </div>
      <GetDemoModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
