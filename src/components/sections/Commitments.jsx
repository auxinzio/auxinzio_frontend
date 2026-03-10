import { motion } from "framer-motion";
import { Zap, Cpu, ShieldCheck, Leaf, BookOpen, Code, Sparkles, ChevronRight } from "lucide-react";
import homeData from "@/data/home.json";
import Link from "next/link";

export default function Commitments() {
  const iconMap = {
    Zap,
    Cpu,
    ShieldCheck,
    Leaf,
    BookOpen,
    Code,
    Sparkles
  };

  const commitments = homeData.commitment.map(item => ({
    ...item,
    icon: iconMap[item.icon] || Zap
  }));

  return (
    <section className="py-14 lg:py-22 lg:pt-0 pt-0 bg-white relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          {/* Left Column: Vertical Identity */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-[#14b88f]" />
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b88f]">Value Framework</span>
              </div>

              <h2 className="text-5xl lg:text-7xl font-light text-gray-900 tracking-tighter leading-none mb-12">
                The <br />
                <span className="italic font-medium text-[#14b88f]">Principles</span> <br />
                <span className="font-medium">of Synthesis.</span>
              </h2>

              <p className="text-lg text-gray-500 max-w-sm leading-relaxed border-l-2 border-gray-100 pl-8">
                {`integrate technology and strategy to build scalable, efficient, and future-ready business solutions.`}
              </p>

              <div className="pt-8">
                <Link href="/contact" className="group inline-flex items-center gap-4 text-gray-900 font-bold hover:text-[#14b88f] transition-all">
                    Inquire for Frameworks
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#14b88f] group-hover:text-white group-hover:border-[#14b88f] transition-all duration-500">
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: The Staggered Grid */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-6">
            {commitments.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-10 rounded-[2.5rem] border border-gray-100 bg-white group hover:border-[#14b88f]/20 hover:shadow-[0_20px_50px_-20px_rgba(20,184,166,0.1)] transition-all duration-500 relative overflow-hidden ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}
              >
                {/* Background Number */}
                <span className="absolute top-8 right-10 text-5xl font-black text-gray-50 group-hover:text-[#14b88f]/40 transition-colors">0{index + 1}</span>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#14b88f]/10 transition-colors">
                    <item.icon className="w-6 h-6 text-gray-400 group-hover:text-[#14b88f] transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>

                {/* Architectural Decor */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#14b88f]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-50 -z-10 hidden lg:block" />
    </section>
  );
}
