import { motion } from 'framer-motion';
import Image from 'next/image';
import { useSettings } from '@/app/Context/SettingsContext';

export function ProductExperience({ products, loading }) {
  const { settings } = useSettings();
  const productsList = products?.data?.productsList || [];

  // Create duplicates for seamless infinite scrolling
  const scrollItems = [...productsList, ...productsList];

  return (
    <section id="product-experience" className="relative overflow-hidden bg-white">
      {/* Inline styles for infinite scrolling animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes infinite-scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1.5rem)); }
        }
        @keyframes infinite-scroll-right {
          0% { transform: translateX(calc(-50% - 1.5rem)); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: infinite-scroll-left 40s linear infinite;
        }
        .animate-scroll-right {
          animation: infinite-scroll-right 40s linear infinite;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Editorial Background Elements */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#14b88f 1px, transparent 1px), linear-gradient(90deg, #14b88f 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="relative mx-auto max-w-[1600px] z-20">
        {/* Caption with Editorial Tone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-0 lg:mb-16 px-6"
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
      </div>

      {/* Slanted Infinite Ribbon Gallery */}
      <div className="relative h-[600px] lg:h-[800px] w-[120vw] left-1/2 -ml-[60vw] overflow-hidden z-10 -mt-10 lg:mt-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full origin-center -rotate-[8deg] flex flex-col gap-6 lg:gap-12">

          {/* Row 1: Left moving */}
          <div className="flex gap-6 lg:gap-12 w-max animate-scroll-left pause-on-hover">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="w-[300px] lg:w-[500px] aspect-video bg-gray-50 animate-pulse border border-gray-100 shadow-xl rounded-2xl" />
              ))
            ) : (
              scrollItems.map((prod, i) => (
                <div key={`row1-${i}`} className="group relative w-[300px] lg:w-[500px] aspect-video flex-shrink-0 cursor-pointer">
                  <div className="w-full h-full relative overflow-hidden rounded-2xl border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image
                      src={`${settings?.backend_api_url}/${prod.logo}`}
                      alt={prod.product_name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      sizes="(max-width: 1024px) 300px, 500px"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-xl lg:text-3xl font-light mb-2 tracking-tight">
                        {prod.product_name}
                      </h3>
                      <div className="w-8 h-px bg-[#14b88f] transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Row 2: Right moving */}
          <div className="flex gap-6 lg:gap-12 w-max animate-scroll-right pause-on-hover px-12 lg:px-24">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="w-[300px] lg:w-[500px] aspect-video bg-gray-50 animate-pulse border border-gray-100 shadow-xl rounded-2xl" />
              ))
            ) : (
              // Use slice to offset the second row images so it looks less repetitive
              [...scrollItems.slice(Math.floor(productsList.length / 2)), ...scrollItems.slice(0, Math.floor(productsList.length / 2))].map((prod, i) => (
                <div key={`row2-${i}`} className="group relative w-[300px] lg:w-[500px] aspect-video flex-shrink-0 cursor-pointer">
                  <div className="w-full h-full relative overflow-hidden rounded-2xl border border-gray-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-transform duration-500 group-hover:scale-[1.03]">
                    <Image
                      src={`${settings?.backend_api_url}/${prod.logo}`}
                      alt={prod.product_name}
                      fill
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                      sizes="(max-width: 1024px) 300px, 500px"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 p-6 lg:p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white text-xl lg:text-3xl font-light mb-2 tracking-tight">
                        {prod.product_name}
                      </h3>
                      <div className="w-8 h-px bg-[#06b6d4] transition-all duration-500 group-hover:w-16" />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
