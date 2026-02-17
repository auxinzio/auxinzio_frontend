import { motion } from 'framer-motion';

export function ProductExperience() {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      {/* Light background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-50 to-cyan-50/30" />
      
      {/* Gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute left-0 top-1/2 w-96 h-96 bg-gradient-to-br from-[#06b6d4]/30 to-[#14b8a6]/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute right-0 bottom-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#14b8a6]/30 to-[#22c55e]/30 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
            Designed for Performance,
            <br />
            Built for Growth
          </h2>
          <p className="text-slate-600 text-xl max-w-3xl mx-auto">
            Experience enterprise software that feels delightful to use
          </p>
        </motion.div>

        {/* Floating UI screens showcase */}
        <div className="relative h-[600px] max-w-5xl mx-auto">
          {/* Main center screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            animate={{ y: [0, -15, 0] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-10"
          >
            <div className="absolute -inset-8 bg-gradient-to-r from-[#06b6d4]/20 to-[#14b8a6]/20 rounded-3xl blur-3xl" />
            <div className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* Dashboard content */}
              <div className="space-y-3">
                {/* Header */}
                <div className="h-12 bg-gradient-to-r from-slate-100 to-slate-50 rounded-lg flex items-center px-4 gap-3">
                  <div className="w-20 h-6 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6] rounded" />
                  <div className="flex-1" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#14b8a6]" />
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-4 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-20 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg p-3 border border-slate-200">
                      <div className="h-2 w-12 bg-slate-300 rounded mb-2" />
                      <div className="h-6 w-10 bg-gradient-to-r from-[#06b6d4] to-[#14b8a6] rounded" />
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="h-48 bg-gradient-to-br from-slate-50 to-slate-100/30 rounded-lg p-4 border border-slate-200">
                  <div className="flex items-end justify-between h-full gap-1">
                    {[40, 65, 50, 80, 60, 90, 75, 85, 70, 95, 80, 85].map((height, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${height}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className="flex-1 bg-gradient-to-t from-[#06b6d4] via-[#14b8a6] to-[#22c55e] rounded-t"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating accent panel - top left */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
            className="absolute left-0 top-12 w-64 hidden lg:block"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xl">
              <div className="h-3 w-20 bg-[#22c55e]/30 rounded mb-3" />
              <div className="space-y-2">
                <div className="h-2 w-full bg-slate-200 rounded" />
                <div className="h-2 w-3/4 bg-slate-200 rounded" />
              </div>
              <div className="mt-3 h-16 bg-gradient-to-br from-[#22c55e]/10 to-[#14b8a6]/10 rounded-lg border border-[#22c55e]/20" />
            </div>
          </motion.div>

          {/* Floating accent panel - top right */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: -50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            animate={{ y: [0, 10, 0], rotate: [2, -2, 2] }}
            className="absolute right-0 top-20 w-56 hidden lg:block"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#06b6d4] to-[#14b8a6]" />
                <div>
                  <div className="h-2 w-16 bg-slate-200 rounded mb-1" />
                  <div className="h-2 w-12 bg-slate-200 rounded" />
                </div>
              </div>
              <div className="h-12 bg-gradient-to-r from-[#06b6d4]/10 to-[#14b8a6]/10 rounded-lg border border-[#06b6d4]/20" />
            </div>
          </motion.div>

          {/* Floating accent panel - bottom left */}
          <motion.div
            initial={{ opacity: 0, x: -50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            animate={{ y: [0, 15, 0] }}
            className="absolute left-12 bottom-16 w-48 hidden lg:block"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xl">
              <div className="flex items-end gap-1 h-16">
                {[60, 40, 70, 50, 80].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-[#22c55e] to-[#14b8a6] rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating accent panel - bottom right */}
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            animate={{ y: [0, -12, 0] }}
            className="absolute right-16 bottom-12 w-52 hidden lg:block"
          >
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xl">
              <div className="h-3 w-16 bg-[#14b8a6]/30 rounded mb-2" />
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 bg-gradient-to-br from-[#14b8a6]/10 to-[#06b6d4]/10 rounded border border-[#14b8a6]/20" />
                <div className="h-12 bg-gradient-to-br from-[#14b8a6]/10 to-[#06b6d4]/10 rounded border border-[#14b8a6]/20" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
