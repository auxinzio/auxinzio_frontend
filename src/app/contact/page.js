'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Twitter,
  Linkedin,
  Github,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Globe,
  Zap,
  MessageSquare,
  Sparkles,
  Link2
} from 'lucide-react';
import Image from 'next/image';
import { useSettings } from "@/app/Context/SettingsContext";

export default function Contact() {
  const { settings } = useSettings();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    title: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [contact, setContact] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${settings.backend_api_url}/api/contact/submit`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formState) })
      .then(res => res.json())
      .then(data => setContact(data))
      .catch(err => console.log(err))
      .finally(() => {
        setIsSubmitted(true);
      });
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', phone: '', title: '', description: '' });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#14b8a6]/10">

      {/* --- HERO: MINIMALIST OVERTURE --- */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-32 px-6 overflow-hidden">
        <div className="mx-auto max-w-[1600px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">Syncing with our team (24/7)</span>
            </div>
            <h1 className="text-7xl lg:text-[10rem] font-light text-gray-900 leading-[0.8] tracking-tighter mb-12">
              Get in <span className="italic font-normal text-[#14b8a6]">Touch.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
              {`Synthesize your vision with our technical expertise. We're ready to explore new digital frontiers together.`}
            </p>
          </motion.div>
        </div>

        {/* Background Decorative Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] select-none pointer-events-none">
          <p className="text-[20vw] font-black tracking-tighter leading-none text-center">SYNTHESIS</p>
        </div>
      </section>

      {/* --- CHANNELS: HORIZONTAL CONNECTIVITY BAR --- */}
      <section className="py-6 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-wrap justify-center lg:justify-between items-center gap-12 lg:gap-8">
            {[
              { label: 'Electronic Mail', value: settings?.email, icon: Mail },
              { label: 'Voice Communication', value: settings?.phone, icon: Phone },
              { label: 'Digital Network', value: settings?.social_links?.twitter, icon: Globe },
              { label: 'Current Location', value: settings?.address, icon: MapPin }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#14b8a6] group-hover:border-[#14b8a6] transition-all">
                  <item.icon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-400 font-bold mb-0.5">{item.label}</p>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#14b8a6] transition-colors">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MAIN INQUIRY: MODERN FORM EXPERIENCE --- */}
      <section className="py-32 px-6 bg-gray-50/30">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-24 items-start">

            {/* Left: Heading & Process */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-12 tracking-tight">
                Start our <br />
                <span className="italic font-medium text-[#14b8a6]">Inquiry Protocol.</span>
              </h2>

              <p className="text-gray-500 mb-16 leading-relaxed">
                Provide the essential details of your project or inquiry. Our strategy team will review and respond with potential next steps.
              </p>

              <div className="space-y-12">
                {[
                  { title: 'Project Discovery', desc: 'Initial review of requirements and scope alignment.' },
                  { title: 'Technical Audit', desc: 'Detailed breakdown of necessary stacks and solutions.' },
                  { title: 'Strategic Proposal', desc: 'Comprehensive roadmap and delivery timeline.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-[10px] font-bold text-[#14b8a6] w-6 h-6 rounded-full bg-[#14b8a6]/10 flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-tight">{step.title}</h4>
                      <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: The Form Card (Preserving logic as requested) */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-[3rem] p-8 lg:p-20 shadow-2xl relative overflow-hidden"
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[4rem] -mr-8 -mt-8 flex items-center justify-center">
                  <Send className="w-8 h-8 text-gray-200" />
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Full Identity</label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-100 py-4 text-gray-900 focus:outline-none focus:border-[#14b8a6] transition-colors placeholder:text-gray-200 text-lg"
                        placeholder="Ex: Alexander Wright"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Electronic Mail</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-100 py-4 text-gray-900 focus:outline-none focus:border-[#14b8a6] transition-colors placeholder:text-gray-200 text-lg"
                        placeholder="alex@studio.com"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-100 py-4 text-gray-900 focus:outline-none focus:border-[#14b8a6] transition-colors placeholder:text-gray-200 text-lg"
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Subject of Inquiry</label>
                      <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b border-gray-100 py-4 text-gray-900 focus:outline-none focus:border-[#14b8a6] transition-colors placeholder:text-gray-200 text-lg"
                        placeholder="Ex: Enterprise Partnership"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Detailed Briefing</label>
                      <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        rows={6}
                        className="w-full bg-transparent border-b border-gray-100 py-4 text-gray-900 focus:outline-none focus:border-[#14b8a6] transition-colors resize-none placeholder:text-gray-200 text-lg"
                        placeholder="Describe your vision or specific system requirements..."
                        required
                      />
                    </div>

                    <div className="md:col-span-2 pt-10">
                      <button
                        type="submit"
                        className="group flex items-center gap-8 text-gray-900 font-medium tracking-tight hover:text-[#14b8a6] transition-all"
                      >
                        <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[#14b8a6] group-hover:bg-[#14b8a6] group-hover:text-white transition-all duration-500">
                          <ArrowRight className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-light tracking-tighter decoration-gray-200 underline-offset-[12px] group-hover:decoration-[#14b8a6] transition-all">
                          Transmit Message
                        </span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-24 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-[#14b8a6]/10 flex items-center justify-center mb-10">
                      <CheckCircle2 className="w-12 h-12 text-[#14b8a6]" />
                    </div>
                    <h3 className="text-4xl font-light text-gray-900 mb-6">Inquiry Dispatched.</h3>
                    <p className="text-gray-400 max-w-sm text-lg">One of our specialists will reach out to your provided coordinates within 24 hours.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAP: ARCHITECTURAL FOOTPRINT --- */}
      <section className="bg-white">
        <div className="h-[600px] w-full relative grayscale hover:grayscale-0 transition-all duration-1000">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2073.9500950048136!2d80.24922138453219!3d12.989753517664264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6202e54fb9%3A0xcf5fc0aac9108c7e!2sTIDEL%20Park%2C%20Rajiv%20Gandhi%20IT%20Expy%2C%20Tharamani%2C%20Chennai%2C%20Tamil%20Nadu%20600113!5e1!3m2!1sen!2sin!4v1771218829977!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* Floating Badge on Map */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-8 h-8 bg-[#14b8a6] rounded-full animate-ping opacity-20" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#14b8a6] rounded-full border-2 border-white shadow-xl" />
          </div>
        </div>
      </section>

      {/* --- FINAL DECORATIVE LINE --- */}
      <div className="py-20 flex justify-center bg-white">
        <div className="w-px h-24 bg-gradient-to-b from-[#14b8a6] to-transparent" />
      </div>

    </div>
  );
}
