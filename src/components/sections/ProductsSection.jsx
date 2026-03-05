"use client";

import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, Layers, ShieldCheck, Activity, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useSettings } from "@/app/Context/SettingsContext";
import productsData from "@/data/products.json";

export default function ProductsSection({ product }) {
  const { settings } = useSettings();
  const products = (product && product.length > 0) ? product : (productsData.products || []);

  return (
    <>
      {products.length > 0 && (
        <section id="products" className="py-14 lg:py-25 bg-white relative overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6">

            {/* Header: Editorial Scale */}
            <div className="grid lg:grid-cols-12 gap-12 items-end mb-24 lg:mb-32">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="lg:col-span-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-[#14b8a6]" />
                  <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b8a6]">Proprietary Artifacts</span>
                </div>
                <h2 className="text-6xl lg:text-9xl font-light text-gray-900 leading-[0.8] tracking-tighter">
                  Built for the <br />
                  <span className="italic font-medium text-[#14b8a6]">Intelligent</span> <br />
                  <span className="font-medium text-gray-200">Enterprise.</span>
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-4 lg:pb-8"
              >
                <p className="text-xl text-gray-500 leading-relaxed font-light border-l-2 border-gray-100 pl-8 max-w-sm">
                  Our specialized platforms bridge the gap between technical complexity and intuitive business operation.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {products.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative flex flex-col ${index % 2 !== 0 ? 'lg:translate-y-24' : ''}`}
                >
                  <div className="relative aspect-[16/10] lg:aspect-[4/3] rounded-[3.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-50 group">
                    <Image
                      src={`${settings.backend_api_url}/${item.image}`}
                      alt={`${item.product_name} image`}
                      width={300}
                      height={200}
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                    />

                    {/* Floating Tactical Tag */}
                    <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-xl group-hover:bg-[#14b8a6] group-hover:text-white transition-all duration-500">
                      <p className="text-[10px] font-black tracking-widest uppercase">{item.category_name}</p>
                    </div>

                    {/* Architectural Overlay on Hover */}
                    <div className="absolute inset-x-8 bottom-8 bg-white/10 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/20 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 hidden lg:block">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-4">
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                            <Activity className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                        </div>
                        <button className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-widest">
                          System Specs <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 space-y-6 px-4">
                    <div className="flex items-center gap-6">
                      <span className="text-4xl font-light text-gray-200 group-hover:text-[#14b8a6] transition-colors duration-500">0{index + 1}</span>
                      <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none group-hover:italic transition-all">{item.product_name}</h3>
                    </div>
                    <p className="text-lg text-gray-500 leading-relaxed max-w-lg italic">
                      {`"${item.description.split('~')[0]}"`}
                    </p>
                    <button className="flex items-center gap-6 group/btn">
                      <span className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900 group-hover:text-[#14b8a6] transition-colors underline underline-offset-8 decoration-gray-100 group-hover:decoration-[#14b8a6]">Enquire Architecture</span>
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b8a6] group-hover:text-white group-hover:border-[#14b8a6] transition-all duration-500">
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Background Decorative Element */}
          <div className="absolute right-0 top-1/4 w-1/4 h-full bg-[#14b8a6]/5 rounded-full blur-[120px] -z-10" />
        </section>
      )}
    </>
  );
}
