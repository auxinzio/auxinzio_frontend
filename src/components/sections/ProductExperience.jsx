import { motion } from 'framer-motion';

export function ProductExperience() {
  return (
    <section id="product-experience" className="relative py-8 lg:py-12 lg:pt-0 pt-0 px-6 overflow-hidden bg-white">
      {/* Editorial Background Elements */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#14b88f 1px, transparent 1px), linear-gradient(90deg, #14b88f 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
      
      <div className="relative mx-auto max-w-[1600px]">
        {/* Caption with Editorial Tone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-8 font-medium">
            The User Experience
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight leading-tight">
            Designed for <span className="text-[#06b6d4]">Performance</span>,
            <br />
            Built for <span className="text-[#14b88f]">Growth</span>
          </h2>
          <div className="w-16 h-px bg-[#22c55e] mx-auto mb-8"></div>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Experience enterprise software that feels intuitive and refined. Our interface language is built on the principles of clarity and focus.
          </p>
        </motion.div>

        {/* Floating UI screens showcase — Refined */}
        <div className="relative h-[600px] max-w-6xl mx-auto">
          {/* Architectural Line Background */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-100 -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-100 -translate-x-1/2" />

          {/* Main center screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl z-10 p-4"
          >
            <div className="relative bg-white border border-gray-100 p-3 shadow-[0_64px_128px_-16px_rgba(0,0,0,0.1)]">
              {/* Refined Chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-100 mb-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                  <div className="w-2 h-2 rounded-full bg-gray-200" />
                </div>
                <div className="text-[10px] tracking-widest uppercase text-gray-400 font-medium">
                  Enterprise Dashboard / Production
                </div>
              </div>

              {/* Dashboard content */}
              <div className="space-y-4 p-4">
                <div className="h-10 bg-gray-50 rounded flex items-center px-4 gap-4">
                  <div className="w-24 h-4 bg-gray-200 rounded" />
                  <div className="flex-1" />
                  <div className="w-12 h-4 bg-[#14b88f]/20 rounded" />
                </div>

                <div className="grid grid-cols-4 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-24 border border-gray-100 p-4 flex flex-col justify-end">
                      <div className="h-1 w-8 bg-[#14b88f] mb-2" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                  ))}
                </div>

                <div className="h-32 relative border border-gray-100 p-4 overflow-hidden">
                  <div className="flex items-end justify-between h-full gap-2">
                    {[40, 65, 50, 80, 60, 90, 75, 85, 70, 95, 80, 85].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gray-50 hover:bg-[#14b88f]/10 transition-colors"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Minimal Accent Elements */}
          {/* <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute left-8 top-12 w-48 text-left hidden lg:block"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-[#14b88f] font-semibold mb-4 leading-relaxed">
              Real-time<br />Orchestration
            </div>
            <div className="h-px w-24 bg-gray-200" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="absolute right-8 bottom-12 w-48 text-right hidden lg:block"
          >
            <div className="text-[10px] tracking-[0.3em] uppercase text-gray-400 font-semibold mb-4 leading-relaxed">
              Global Data<br />Compliance
            </div>
            <div className="h-px w-24 bg-gray-200 ml-auto" />
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}
