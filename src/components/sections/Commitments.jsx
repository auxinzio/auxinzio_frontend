import { motion } from "framer-motion";
import { Zap, Cpu, ShieldCheck, Leaf, BookOpen, Code } from "lucide-react";


export default function Commitments() {

     const commitments = [
    {
      title: "Innovation at Core",
      description: "We harness AI, cloud, and analytics to future-proof your business with intuitive apps and bold solutions.",
      icon: <Zap className="w-8 h-8 text-white" />,
    },
    {
      title: "Excellence in Execution",
      description: "Rigorous testing and DevOps deliver zero-downtime deployments for confident launches and effortless scaling.",
      icon: <Cpu className="w-8 h-8 text-white" />,
    },
    {
      title: "Transparency & Trust",
      description: "Real-time updates and dashboards keep you in control of every milestone and security measure.",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
    },
    {
      title: "Sustainability First",
      description: "Eco-friendly designs optimize cloud and code, reducing your footprint without sacrificing innovation.",
      icon: <Leaf className="w-8 h-8 text-white" />,
    },
    {
      title: "Continuous Learning",
      description: "Ongoing training in serverless and zero-trust tech keeps your projects cutting-edge and agile.",
      icon: <BookOpen className="w-8 h-8 text-white" />,
    },
    {
      title: "Security by Design",
      description: "Proactive protocols protect apps and cloud from threats, safeguarding your operations.",
      icon: <Code className="w-8 h-8 text-white" />,
    },
  ];

    return(
        <>
            <section className="py-24 bg-background">
                    <div className="container px-4 md:px-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 space-y-4"
                      >
                        {/* Small uppercase label */}
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                          className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-6 font-medium"
                        >
                          Our Values
                        </motion.p>
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-12 tracking-tight">The deeply held commitments that shape our culture</h2>
                        <div className="w-20 h-[3px] bg-[#06b6d4]/20 mx-auto rounded-full" />
                      </motion.div>
            
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {commitments.map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group p-8 border border-border bg-card hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                          >
                            <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500 to-cyan-500 text-white w-fit transition-colors duration-300 opacity-50">
                              {item.icon}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
        </>
    )
}