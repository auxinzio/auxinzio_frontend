import { motion } from 'framer-motion';
import { Check, Zap, Shield, Globe, Users, Cpu, BarChart3 } from 'lucide-react';

export default function AboutSection2() {
  const capabilities = [
    {
      icon: Zap,
      title: 'Enterprise Solutions',
      description: 'Scalable platforms built for global operations'
    },
    {
      icon: Shield,
      title: 'Security First',
      description: 'Enterprise-grade protection and compliance'
    },
    {
      icon: Globe,
      title: 'Global Infrastructure',
      description: 'Reliable service across all continents'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Dedicated teams ensuring your success'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Main About Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 xl:gap-12">
            {/* Left Zone — Vertical Statement Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3 relative"
            >
              <div className="bg-gray-50 px-8 py-16 lg:py-20 lg:min-h-[600px] flex flex-col justify-center">
                {/* Small label */}
                <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-12 font-medium">
                  About the Company
                </p>

                {/* Large stacked typography */}
                <div className="space-y-2">
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight">
                    Technology
                  </h1>
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight">
                    That
                  </h1>
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light leading-[0.95] tracking-tight">
                    <span className="text-[#14b8a6]">Empowers</span>
                  </h1>
                  <h1 className="text-5xl lg:text-6xl xl:text-7xl font-light text-gray-900 leading-[0.95] tracking-tight">
                    Growth
                  </h1>
                </div>

                {/* Subtle accent line */}
                <div className="w-16 h-px bg-[#22c55e] mt-12"></div>
              </div>
            </motion.div>

            {/* Subtle architectural divider */}
            <div className="hidden lg:block lg:col-span-1 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#14b8a6]/15"></div>
            </div>

            {/* Center Zone — Minimal Visual Storytelling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-3 relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-md lg:max-w-none">
                {/* Abstract tech illustration - geometric pattern */}
                <div className="relative aspect-square lg:aspect-[3/4] w-full">
                  {/* Grid pattern background */}
                  <svg
                    viewBox="0 0 400 500"
                    className="w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Subtle grid lines */}
                    <defs>
                      <pattern
                        id="grid"
                        width="40"
                        height="40"
                        patternUnits="userSpaceOnUse"
                      >
                        <path
                          d="M 40 0 L 0 0 0 40"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect width="400" height="500" fill="url(#grid)" />

                    {/* Abstract geometric shapes */}
                    <motion.circle
                      cx="200"
                      cy="150"
                      r="60"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      opacity="0.3"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 0.3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                    <motion.circle
                      cx="200"
                      cy="150"
                      r="80"
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="0.5"
                      opacity="0.2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 0.2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.4 }}
                    />

                    {/* Connection lines */}
                    <motion.line
                      x1="120"
                      y1="250"
                      x2="280"
                      y2="250"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      opacity="0.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />

                    {/* Data nodes */}
                    <motion.rect
                      x="110"
                      y="240"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="1"
                      opacity="0.4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    <motion.rect
                      x="270"
                      y="240"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="1"
                      opacity="0.4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />

                    {/* Vertical lines */}
                    <motion.line
                      x1="200"
                      y1="50"
                      x2="200"
                      y2="400"
                      stroke="#14b8a6"
                      strokeWidth="0.5"
                      opacity="0.15"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                    />

                    {/* Corner elements */}
                    <motion.path
                      d="M 50 450 L 50 400 L 100 400"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                    <motion.path
                      d="M 350 50 L 350 100 L 300 100"
                      fill="none"
                      stroke="#06b6d4"
                      strokeWidth="1"
                      opacity="0.3"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    />
                  </svg>
                </div>

                {/* Floating statistic badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-8 right-0 lg:bottom-12 lg:-right-8"
                >
                  <div className="bg-white border border-gray-200 px-6 py-4 shadow-sm">
                    <div className="text-3xl font-light text-gray-900 mb-1">
                      10<span className="text-[#22c55e]">+</span>
                    </div>
                    <div className="text-xs tracking-[0.15em] uppercase text-gray-500">
                      Years of Experience
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Subtle architectural divider */}
            <div className="hidden lg:block lg:col-span-1 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#14b8a6]/15"></div>
            </div>

            {/* Right Zone — Structured Company Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-4 flex flex-col justify-center"
            >
              {/* Editorial text block */}
              <div className="mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6 leading-tight">
                  Building the Future of Enterprise Technology
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed max-w-2xl">
                  <p className="text-lg">
                    We deliver cutting-edge technology solutions that empower organizations to operate at scale, drive innovation, and achieve sustainable growth in an increasingly complex digital landscape.
                  </p>
                  <p>
                    Our platform serves enterprises worldwide, providing the infrastructure, security, and support needed to transform business operations and unlock new opportunities.
                  </p>
                </div>
              </div>

              {/* Thin divider */}
              <div className="w-12 h-px bg-[#06b6d4]/30 mb-10"></div>

              {/* Capability highlights - two-column grid */}
              <div className="grid sm:grid-cols-2 gap-8">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    {/* Icon */}
                    <div className="flex-shrink-0 mt-1">
                      <capability.icon className="w-5 h-5 text-[#14b8a6]" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-base font-medium text-gray-900 mb-1">
                        {capability.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {capability.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Additional metrics */}
              <div className="mt-12 pt-10 border-t border-gray-200">
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  <div>
                    <div className="text-3xl font-light text-gray-900 mb-1">
                      500<span className="text-[#22c55e]">+</span>
                    </div>
                    <div className="text-xs tracking-[0.15em] uppercase text-gray-500">
                      Enterprise Clients
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-gray-900 mb-1">
                      99.9<span className="text-[#22c55e]">%</span>
                    </div>
                    <div className="text-xs tracking-[0.15em] uppercase text-gray-500">
                      Uptime Guarantee
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-light text-gray-900 mb-1">
                      24<span className="text-[#06b6d4]">/</span>7
                    </div>
                    <div className="text-xs tracking-[0.15em] uppercase text-gray-500">
                      Global Support
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-20 bg-gray-50"></div>
    </div>
  );
}
