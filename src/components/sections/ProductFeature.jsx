import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Zap, Shield, Cpu, Cloud, Database, LineChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSettings } from '@/app/Context/SettingsContext';
import ProductSkeleton from '@/components/ui/ProductSkeleton';

export function ProductFeature({ products, loading }) {
  const [activeProduct, setActiveProduct] = useState(0);
  const productsList = products?.data?.productsList || [];
  const product = productsList[activeProduct];
  const { settings } = useSettings();

  return (
    <section id="product-feature" className="relative py-24 lg:py-32 px-6 overflow-hidden bg-white">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header with Architectural Tone */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#14b88f]" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b88f]">Proprietary Artifacts</span>
            </div>
            <h2 className="text-5xl lg:text-8xl font-light text-gray-900 leading-[0.9] tracking-tighter">
              Innovation Through <br />
              <span className="italic font-normal text-[#14b88f]">Precision.</span>
            </h2>
          </motion.div>

          {/* Minimal Tab System */}
          <div className="flex flex-wrap gap-4 border-b border-gray-100 pb-2">
            {productsList.map((prod, index) => (
              <button
                key={prod.id}
                onClick={() => setActiveProduct(index)}
                className={`px-4 py-2 text-sm tracking-widest uppercase transition-all duration-300 relative ${activeProduct === index
                  ? 'text-gray-900'
                  : 'text-gray-400 hover:text-gray-600'
                  }`}
              >
                {prod?.product_name}
                {activeProduct === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-[-9px] left-0 right-0 h-px bg-[#14b88f]"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Showcase area */}
        {loading ? (
          <ProductSkeleton />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-12 gap-16 items-center"
            >
              {/* Left side - Architectural Content */}
              <div className="lg:col-span-5 space-y-10">
                <div className="space-y-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    className="h-px bg-[#14b88f]"
                  />
                  <h3 className="text-3xl lg:text-4xl font-light text-gray-900 leading-[0.9] tracking-tighter">
                    {product?.product_name}
                  </h3>
                  <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
                    {product?.tag?.[0]}
                  </p>
                </div>

                {/* Benefits with minimalist icons */}
                <div className="grid gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="mt-1">
                      <Zap className="w-5 h-5 text-[#14b88f]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-gray-900 font-medium tracking-tight block mb-1">
                        {product?.description.split(".")[0]}
                      </span>
                      <div className="w-0 group-hover:w-8 h-px bg-[#22c55e]/30 transition-all duration-300" />
                    </div>
                  </motion.div>
                </div>

                {/* Action */}
                <div className="pt-6">
                  <Link href={`/products/${product?.slug}`}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 text-sm font-medium tracking-[0.2em] uppercase text-gray-900 group"
                    >
                      Explore Experience
                      <ArrowRight className="w-5 h-5 text-[#14b88f] group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </div>

              {/* Right side - Refined Mockup */}
              <div className="lg:col-span-7 relative">
                <div className="absolute -inset-10 bg-gray-50/50 rounded-full blur-3xl opacity-50" />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative bg-white border border-gray-100 p-2 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]"
                >
                  <div className="bg-gray-50 flex items-center justify-between px-4 py-2 border-b border-gray-100">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                    </div>
                    <div className="text-[10px] tracking-widest uppercase text-gray-400 font-medium">
                      Secure Sandbox
                    </div>
                  </div>
                  <div className="relative aspect-video lg:aspect-square overflow-hidden bg-white">
                    {product?.image && (
                      <Image
                        src={`${settings?.backend_api_url}/${product.image}`}
                        width={500}
                        height={300}
                        alt={product.product_name}
                        className="object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    )}
                    {/* Subtle grid overlay on image */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                      style={{
                        backgroundImage: 'radial-gradient(#14b88f 0.5px, transparent 0.5px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Floating Architectural Element */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 border-r border-b border-[#14b88f]/20 hidden lg:block" />
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
