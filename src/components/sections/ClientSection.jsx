import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSettings } from "@/app/Context/SettingsContext";

export default function ClientSection({ clients }) {
  const { settings } = useSettings();
  return (
    <>
      <section className="relative py-10 lg:py-20 lg:pt-0 pt-0 bg-white overflow-hidden">
        {/* Background Panning Text */}
        {/* <div className="absolute top-1/2 left-0 w-full opacity-[0.02] select-none pointer-events-none -translate-y-1/2">
                      <motion.h1
                        animate={{ x: [0, -1200] }}
                        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                        className="text-[25vw] font-black tracking-tighter whitespace-nowrap"
                      >
                        STRATEGIC PARTNERSHIPS & GLOBAL ALLIANCES SYNERGY
                      </motion.h1>
                    </div> */}

        <div className="mx-auto max-w-[1600px] px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left: Editorial Content */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="lg:sticky lg:top-32"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-px bg-[#14b88f]" />
                  <span className="text-[10px] font-bold tracking-[0.5em] uppercase bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Global Synergy</span>
                </div>
                <h2 className="text-5xl lg:text-[7rem] font-light text-gray-900 tracking-tighter leading-[0.8] mb-12">
                  Our <br />
                  <span className="italic font-normal bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Elite</span> <br />
                  Network
                </h2>
                <div className="space-y-8 max-w-sm">
                  <p className="text-xl text-gray-400 font-light leading-relaxed">
                    We collaborate with industry leaders and disruptive innovators to architect the future of digital commerce.
                  </p>
                  <p className="text-base text-gray-600 border-l-2 border-[#14b88f]/20 pl-6 italic">
                    Driving global impact through architectural precision and high-fidelity technological integration.
                  </p>

                  <div className="pt-8">
                    <Link href="/contact">
                      <button className="group flex items-center gap-6">
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 group-hover:text-[#14b88f] transition-colors">Initiate Partnership</span>
                        <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b88f] group-hover:text-white group-hover:border-[#14b88f] transition-all duration-500">
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Responsive Logo Matrix */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                {clients?.map((client, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.05 }}
                    className="group"
                  >
                    <div className="relative aspect-[4/3] bg-gray-50/50 rounded-[2rem] border border-gray-100 flex items-center justify-center p-8 lg:p-12 hover:bg-white hover:border-[#14b88f]/20 hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.1)] transition-all duration-700">
                      <div className="relative w-full h-full">
                        <Image
                          src={`${settings?.backend_api_url}/${client.image}`}
                          alt={`${client.name}`}
                          fill
                          className="object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-90 group-hover:scale-110"
                        />
                      </div>

                      {/* Interactive Architectural Accent */}
                      <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-gray-100 group-hover:bg-[#14b88f] group-hover:scale-150 transition-all duration-500" />
                      <div className="absolute bottom-6 left-6 w-8 h-px bg-gray-100 group-hover:bg-[#14b88f] group-hover:w-16 transition-all duration-700" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}