"use client";

import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Code, Cpu, Globe, Layout, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Services() {
  const services = [
    {
      title: "Web & Mobile App Development",
      description: "Custom, high-performance websites and mobile applications tailored to your needs. We build scalable solutions that grow with your business.",
      icon: <Globe className="w-12 h-12 text-primary" />,
      features: ["Custom Web Apps", "iOS & Android Development", "PWA (Progressive Web Apps)", "E-commerce Solutions"],
    },
    {
      title: "Custom Software Development",
      description: "Scalable software solutions designed to streamline your business operations. We turn complex requirements into intuitive software.",
      icon: <Code className="w-12 h-12 text-primary" />,
      features: ["Enterprise Software", "API Integration", "Cloud Solutions", "Legacy System Modernization"],
    },
    {
      title: "Cybersecurity Solutions",
      description: "Comprehensive security strategies to protect your digital assets and data. Safeguard your business against evolving cyber threats.",
      icon: <ShieldCheck className="w-12 h-12 text-primary" />,
      features: ["Security Audits", "Penetration Testing", "Compliance Management", "Incident Response"],
    },
    {
      title: "IT Consulting & Support",
      description: "Expert guidance and support to optimize your IT infrastructure and strategy. Leverage our expertise to make informed technology decisions.",
      icon: <Cpu className="w-12 h-12 text-primary" />,
      features: ["IT Strategy", "Infrastructure Planning", "Cloud Migration", "24/7 Support"],
    },
    {
      title: "UI/UX Design",
      description: "User-centric designs that ensure engaging and intuitive digital experiences. We create interfaces that users love to interact with.",
      icon: <Layout className="w-12 h-12 text-primary" />,
      features: ["User Research", "Wireframing & Prototyping", "Visual Design", "Usability Testing"],
    },
    {
      title: "Marketing & Growth",
      description: "Data-driven marketing strategies to increase your reach and drive growth. Reach your target audience effectively.",
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      features: ["SEO & SEM", "Social Media Marketing", "Content Strategy", "Analytics & Reporting"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto space-y-6"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions tailored to your unique business needs. From development to design, we have you covered.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24">
        <div className="container px-4 md:px-6 space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-12 items-center`}
            >
              <div className="flex-1 space-y-6">
                <div className="p-4 rounded-xl bg-primary/10 w-fit text-primary mb-4">
                  {service.icon}
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{service.title}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {service.description}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="gap-2 mt-4" size="lg">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 w-full relative h-[300px] md:h-[400px] bg-muted/40 rounded-3xl border border-border flex items-center justify-center p-8 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative text-muted-foreground/20 group-hover:text-primary/20 transition-colors duration-500">
                      {/* Abstract placeholder visual */}
                      <service.icon.type size={180} strokeWidth={0.5} />
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We understand that every business is unique. Contact us today to discuss your specific requirements.
          </p>
          <Button size="lg" className="px-8">Get in Touch</Button>
        </div>
      </section>
    </div>
  );
}
