import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, Zap, Shield, Cpu, Cloud, Database, LineChart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Auxinz Analytics Pro',
    tagline: 'Transform data into actionable insights with AI-powered analytics',
    benefits: [
      { icon: LineChart, text: 'Real-time data visualization' },
      { icon: Cpu, text: 'AI-driven predictions' },
      { icon: Cloud, text: 'Cloud-native infrastructure' },
    ],
    img:"/assets/img/products/Enterprise.jpeg"
  },
  {
    id: 2,
    name: 'Auxinz Secure Cloud',
    tagline: 'Enterprise-grade cloud infrastructure with military-level security',
    benefits: [
      { icon: Shield, text: 'End-to-end encryption' },
      { icon: Database, text: 'Automated backups' },
      { icon: Zap, text: '99.99% uptime SLA' },
    ],
    img:"/assets/img/products/attendx.jpeg"
  },
  {
    id: 3,
    name: 'Auxinz Workflow Engine',
    tagline: 'Automate complex business processes with intelligent orchestration',
    benefits: [
      { icon: Zap, text: 'No-code automation' },
      { icon: Cloud, text: 'Seamless integrations' },
      { icon: Cpu, text: 'Smart routing logic' },
    ],
    img:"/assets/img/products/Hospital.jpeg"
  },
];

export function ProductFeature() {
  const [activeProduct, setActiveProduct] = useState(0);
  const product = products[activeProduct];

  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Light background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Featured Products
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Explore our flagship solutions designed to accelerate your digital transformation
          </p>
        </motion.div>

        {/* Product tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {products.map((prod, index) => (
            <button
              key={prod.id}
              onClick={() => setActiveProduct(index)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeProduct === index
                  ? `bg-gradient-to-r from-[#22c55e]/60 to-[#06b6d4]/60  text-white shadow-lg`
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {prod.name.split(' ')[1]} {prod.name.split(' ')[2]}
            </button>
          ))}
        </div>

        {/* Showcase area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProduct}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left side - Content */}
            <div className="space-y-8">
              <div>
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#22c55e]/60 to-[#06b6d4]/60  bg-clip-text text-transparent`}
                >
                  {product.name}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-slate-700 leading-relaxed"
                >
                  {product.tagline}
                </motion.p>
              </div>

              {/* Benefits */}
              <div className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e]/60 to-[#06b6d4]/60  bg-opacity-10 flex items-center justify-center`}>
                      <benefit.icon className="w-6 h-6 text-white"/>
                    </div>
                    <span className="text-slate-800 font-medium">{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <Link href={`/products/${product.slug}`}>
                <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group px-8 py-4 bg-gradient-to-r from-[#22c55e]/60 to-[#06b6d4]/60  text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2`}
              >
                View Details
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              </Link>
            </div>

            {/* Right side - Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-8 bg-gradient-to-br from-[#22c55e]/60 to-[#06b6d4]/60  opacity-10 blur-3xl rounded-full`} />
              
              {/* Dashboard mockup */}
              <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-600">Live Preview</span>
                  </div>
                </div>

                {/* Content */}
                <Image src={product.img} alt={product.name} width={500} height={500} className="w-full h-auto relative rounded-xl"/>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
