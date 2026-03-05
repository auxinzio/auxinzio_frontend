"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSettings } from '@/app/Context/SettingsContext';
import GetDemoModal from "@/components/sections/GetDemoModal";
import { Zap, Shield, Users, BarChart3, Clock, MessageSquare, TrendingUp, Cloud } from "lucide-react";


export default function App({ params }) {
  const { settings } = useSettings();
  const [product, setProduct] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#14b8a6]"></div>
      </div>
    );
  }

  const descriptionParts = product.description?.split('~').map(part => part.trim()) || [];
  return (
    <>
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
                <span className="text-[#14b8a6]">{product.category_name}</span>
              </h1>
              <div className="w-16 h-[2px] bg-[#14b8a6]"></div>
              <p className="text-[#4b5563] leading-relaxed max-w-sm">
                {descriptionParts[0] || product.description}
              </p>
            </div>
            {/* Divider line */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[1px] bg-[#e5e7eb]"></div>
          </div>
          {/* Right Panel - 70% */}
          <div className="lg:w-[70%] p-8 lg:p-16 lg:px-10 flex items-center justify-center bg-white">
            <div className="max-w-3xl w-full">
              <Image
                src={`${settings.backend_api_url}/${product.image}`}
                alt={product.product_name}
                width={1000}
                height={1000}
                className="w-full h-auto shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
              />
            </div>
          </div>
        </section>
        {/* Section 2 - Key Features (Horizontal Architecture Grid) */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <h2 className="text-3xl font-light text-[#111827] mb-12">Core Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {product.key_feature?.map((feature, index) => {
              const icons = [Zap, Shield, Users, BarChart3];
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="p-8 border-r-0 lg:border-r border-[#e5e7eb] border-b md:border-b-0">
                  <Icon className="w-8 h-8 text-[#14b8a6] mb-6 stroke-[1.5]" />
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
        {/* Section 3 - Business Benefits (Structured Quadrant Layout) */}
        <section className="py-16 lg:py-24 bg-[#f5f7f9]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Top Left - Time Benefits */}
              <div className="p-8 lg:p-12 border-b lg:border-r border-[#e5e7eb] bg-white/50">
                <p className="text-xs tracking-[0.2em] text-[#6b7280] uppercase font-medium mb-4">
                  Time Benefits
                </p>
                <div className="w-12 h-[1px] bg-[#14b8a6] mb-8"></div>
                <div className="space-y-6">
                  {product.benefit?.time_benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#14b8a6] mt-0.5 stroke-[1.5] flex-shrink-0" />
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
                <div className="w-12 h-[1px] bg-[#14b8a6] mb-8"></div>
                <div className="space-y-6">
                  {product.benefit?.cloud_benefits?.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Cloud className="w-5 h-5 text-[#14b8a6] mt-0.5 stroke-[1.5] flex-shrink-0" />
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
        <section className="py-16 lg:py-24 border-t border-b border-[#e5e7eb]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="flex items-center">
              <p className="text-[#4b5563] leading-relaxed text-lg">
                {descriptionParts[2] || descriptionParts[1] || product.description}
              </p>
            </div>
          </div>
        </section>
        {/* Section 6 - FAQ Section */}
        {product.faqs && product.faqs.length > 0 && (
          <section className="py-16 lg:py-24 bg-[#f8fafc]">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-light text-[#111827] mb-12 text-center capitalize">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {product.faqs.map((faq) => (
                  <div key={faq.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-[#111827] mb-4 capitalize">
                      {faq.question}
                    </h3>
                    <p className="text-[#6b7280] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
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
              <button className="px-8 py-3 bg-[#14b8a6] text-white font-medium hover:bg-[#0d9488] transition-colors" onClick={() => setIsOpen(true)}>
                Request Demo
              </button>
              <a href="#" className="text-[#14b8a6] font-medium hover:text-[#0d9488] transition-colors">
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
