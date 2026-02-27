import { motion } from "framer-motion";
import { Zap, Cpu, ShieldCheck, Leaf, BookOpen, Code, Sparkles, ChevronRight } from "lucide-react";

export default function Commitments() {
  const commitments = [
    {
      title: "Innovation at Core",
      description: "We harness AI, cloud, and analytics to future-proof your business with intuitive apps and bold solutions.",
      icon: Zap,
    },
    {
      title: "Excellence in Execution",
      description: "Rigorous testing and DevOps deliver zero-downtime deployments for confident launches and effortless scaling.",
      icon: Cpu,
    },
    {
      title: "Transparency & Trust",
      description: "Real-time updates and dashboards keep you in control of every milestone and security measure.",
      icon: ShieldCheck,
    },
    {
      title: "Sustainability First",
      description: "Eco-friendly designs optimize cloud and code, reducing your footprint without sacrificing innovation.",
      icon: Leaf,
    },
    {
      title: "Continuous Learning",
      description: "Ongoing training in serverless and zero-trust tech keeps your projects cutting-edge and agile.",
      icon: BookOpen,
    },
    {
      title: "Security by Design",
      description: "Proactive protocols protect apps and cloud from threats, safeguarding your operations.",
      icon: Code,
    },
  ];

  return (
    <section className="py-24 lg:py-40 bg-white relative overflow-hidden">
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
                 <div className="w-12 h-px bg-[#14b8a6]" />
                 <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#14b8a6]">Value Framework</span>
              </div>
              
              <h2 className="text-5xl lg:text-7xl font-light text-gray-900 tracking-tighter leading-none mb-12">
                The <br/>
                <span className="italic font-medium text-[#14b8a6]">Principles</span> <br/>
                <span className="font-medium">of Synthesis.</span>
              </h2>
              
              <p className="text-lg text-gray-500 max-w-sm leading-relaxed border-l-2 border-gray-100 pl-8">
                {`Our delivery protocol is governed by a rigorous set of values that ensure every digital artifact we produce is architecturally sound and strategically valuable.`}
              </p>
              
              <div className="pt-8">
                 <button className="group flex items-center gap-4 text-gray-900 font-bold hover:text-[#14b8a6] transition-all">
                    Inquire for Frameworks
                    <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:bg-[#14b8a6] group-hover:text-white group-hover:border-[#14b8a6] transition-all duration-500">
                       <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                 </button>
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
                className={`p-10 rounded-[2.5rem] border border-gray-100 bg-white group hover:border-[#14b8a6]/20 hover:shadow-[0_20px_50px_-20px_rgba(20,184,166,0.1)] transition-all duration-500 relative overflow-hidden ${index % 2 !== 0 ? 'md:translate-y-12' : ''}`}
              >
                {/* Background Number */}
                <span className="absolute top-8 right-10 text-5xl font-black text-gray-50 group-hover:text-[#14b8a6]/5 transition-colors">0{index + 1}</span>
                
                <div className="relative z-10">
                   <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center mb-8 group-hover:bg-[#14b8a6]/10 transition-colors">
                      <item.icon className="w-6 h-6 text-gray-400 group-hover:text-[#14b8a6] transition-colors" strokeWidth={1.5} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">{item.title}</h3>
                   <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
                </div>
                
                {/* Architectural Decor */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#14b8a6]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
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
