'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, ArrowRight, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';
import { useSettings } from "@/app/Context/SettingsContext";
import ProgressBar from '@/components/ui/ProgressBar';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);
  const [contact, setContact] = useState([]);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^(?=[^@]*[a-zA-Z])[a-zA-Z0-9.]+@[a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formState.name || formState.name.length < 3) newErrors.name = 'Name must be at least 3 characters.';
    if (!formState.email) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formState.phone) {
      newErrors.phone = 'Phone number is required.';
    } else if (!phoneRegex.test(formState.phone)) {
      newErrors.phone = 'Mobile number must start with 6-9 and be 10 digits.';
    }

    if (!formState.title || formState.title.length < 3) newErrors.title = 'Please provide a subject.';
    if (!formState.description || formState.description.length < 10) newErrors.description = 'Please provide a more detailed briefing (min 10 chars).';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    fetch(`${settings.backend_api_url}/api/contacts/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState)
    })
      .then(res => res.json())
      .then(data => {
        setContact(data);
        setIsSubmitted(true);
        setFormState({ name: '', email: '', phone: '', title: '', description: '' });
      })
      .catch(err => {
        setErrors({ submit: 'Transmission failed. Please try again later.' });
      })
      .finally(() => {
        setIsSubmitting(false);
      });

    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Filter for email field: letters, numbers, dot (and @ for functionality)
    if (name === 'phone') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormState({ ...formState, [name]: numericValue });
      }
    } else if (name === 'email') {
      // Allowing only alphanumeric, dots, and the @ symbol
      const emailValue = value.replace(/[^a-zA-Z0-9.@]/g, '');
      setFormState({ ...formState, [name]: emailValue });
    } else if (name === 'name') {
      // Prevent numbers in the name field
      const nameValue = value.replace(/[0-9]/g, '');
      setFormState({ ...formState, [name]: nameValue });
    } else {
      setFormState({ ...formState, [name]: value });
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  return (
    <div className="min-h-screen bg-white selection:bg-[#14b88f]/10">
      {/* Progress Bar */}
      <ProgressBar />
      {/* --- HERO: MINIMALIST OVERTURE --- */}
      <section className="relative pt-40 pb-20 lg:pt-56 lg:pb-20 px-6 overflow-hidden">
        <div className="mx-auto max-w-[1600px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#14b88f] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-gray-400">Expert Consultation Available</span>
            </div>
            <h1 className="text-7xl lg:text-[10rem] font-light text-gray-900 leading-[0.8] tracking-tighter mb-12">
              Contact Our <span className="italic font-normal bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Team.</span>
            </h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
              {`We combine technical expertise with strategic planning to build reliable digital solutions for your business.`}
            </p>
          </motion.div>
        </div>

        {/* Background Decorative Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full opacity-[0.03] select-none pointer-events-none">
          <p className="text-[20vw] font-black tracking-tighter leading-none text-center">RELIABILITY</p>
        </div>
      </section>

      {/* --- MAIN INQUIRY: MODERN FORM EXPERIENCE --- */}
      <section className="py-32 lg:pt-10 lg:pb-10  px-6 bg-gray-50/30">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-12 gap-24 items-start">

            {/* Left: Heading & Process */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-12 tracking-tight">
                Discuss Your <br />
                <span className="italic font-medium bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Project.</span>
              </h2>

              <p className="text-gray-500 mb-16 leading-relaxed">
                Share your project requirements with us. Our technical experts will review your details and provide a comprehensive solution tailored to your business needs.
              </p>

              <div className="space-y-12">
                {[
                  { title: 'Requirements Analysis', desc: 'Initial review of requirements and scope alignment.' },
                  { title: 'Solution Architecture', desc: 'Detailed breakdown of necessary stacks and solutions.' },
                  { title: 'Project Roadmap', desc: 'Comprehensive roadmap and delivery timeline.' }
                ].map((step, i) => (
                  <div key={i} className="flex gap-6">
                    <span className="text-[10px] font-bold text-[#14b88f] w-6 h-6 rounded-full bg-[#14b88f]/10 flex items-center justify-center flex-shrink-0">
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
                  <form onSubmit={handleSubmit} noValidate className="grid md:grid-cols-2 gap-10">
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        pattern="[a-zA-Z]*"
                        value={formState.name}
                        onChange={handleChange}
                        maxLength={50}
                        className={`w-full bg-transparent border-b ${errors.name ? 'border-red-400' : 'border-gray-100'} py-4 text-gray-900 focus:outline-none focus:border-[#14b88f] transition-colors placeholder:text-gray-200 text-lg`}
                        placeholder="Your Full Name"
                        required
                      />
                      {errors.name && <p className="text-[10px] text-red-500 font-bold uppercase mt-2 tracking-widest">{errors.name}</p>}
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${errors.email ? 'border-red-400' : 'border-gray-100'} py-4 text-gray-900 focus:outline-none focus:border-[#14b88f] transition-colors placeholder:text-gray-200 text-lg`}
                        placeholder="Your mail address"
                        required
                      />
                      {errors.email && <p className="text-[10px] text-red-500 font-bold uppercase mt-2 tracking-widest">{errors.email}</p>}
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Phone Number</label>
                      <input
                        type="text"
                        name="phone"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={10}
                        value={formState.phone}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${errors.phone ? 'border-red-400' : 'border-gray-100'} py-4 text-gray-900 focus:outline-none focus:border-[#14b88f] transition-colors placeholder:text-gray-200 text-lg`}
                        placeholder="Your Phone Number"
                        required
                      />
                      {errors.phone && <p className="text-[10px] text-red-500 font-bold uppercase mt-2 tracking-widest">{errors.phone}</p>}
                    </div>
                    <div className="md:col-span-1">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Subject of Enquiry</label>
                      <input
                        type="text"
                        name="title"
                        value={formState.title}
                        onChange={handleChange}
                        className={`w-full bg-transparent border-b ${errors.title ? 'border-red-400' : 'border-gray-100'} py-4 text-gray-900 focus:outline-none focus:border-[#14b88f] transition-colors placeholder:text-gray-200 text-lg`}
                        placeholder="Subject of Enquiry"
                        required
                      />
                      {errors.title && <p className="text-[10px] text-red-500 font-bold uppercase mt-2 tracking-widest">{errors.title}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-4 block">Project Details</label>
                      <textarea
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        rows={6}
                        className={`w-full bg-transparent border-b ${errors.description ? 'border-red-400' : 'border-gray-100'} py-4 text-gray-900 focus:outline-none focus:border-[#14b88f] transition-colors resize-none placeholder:text-gray-200 text-lg`}
                        placeholder="Describe your project vision or specific requirements..."
                        required
                      />
                      {errors.description && <p className="text-[10px] text-red-500 font-bold uppercase mt-2 tracking-widest">{errors.description}</p>}
                    </div>

                    <div className="md:col-span-2 pt-10">
                      {errors.submit && <p className="text-[10px] text-red-500 font-bold uppercase mb-4 tracking-widest">{errors.submit}</p>}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group flex items-center gap-8 ${isSubmitting ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:text-[#14b88f]'} font-medium tracking-tight transition-all`}
                      >
                        <div className={`w-16 h-16 rounded-full border ${errors.submit ? 'border-red-200' : 'border-gray-200'} flex items-center justify-center ${isSubmitting ? 'bg-gray-100' : 'group-hover:border-[#14b88f] group-hover:bg-[#14b88f] group-hover:text-white'} transition-all duration-500`}>
                          <ArrowRight className={`w-6 h-6 ${isSubmitting ? 'animate-pulse' : ''}`} />
                        </div>
                        <span className="text-2xl font-light tracking-tighter decoration-gray-200 underline-offset-[12px] group-hover:decoration-[#14b88f] transition-all">
                          {isSubmitting ? 'Sending...' : 'Send Message'}
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
                    <div className="w-24 h-24 rounded-full bg-[#14b88f]/10 flex items-center justify-center mb-10">
                      <CheckCircle2 className="w-12 h-12 text-[#14b88f]" />
                    </div>
                    <h3 className="text-4xl font-light text-gray-900 mb-6">Message Sent.</h3>
                    <p className="text-gray-400 max-w-sm text-lg">One of our specialists will reach out to your provided coordinates within 24 hours.</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MAP: REFINED ARCHITECTURAL HUB --- */}
      <section className="py-8 lg:py-15 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Map Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] rounded-[3rem] overflow-hidden border border-gray-100 shadow-2xl transition-all duration-700"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2073.9500950048136!2d80.24922138453219!3d12.989753517664264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6202e54fb9%3A0xcf5fc0aac9108c7e!2sTIDEL%20Park%2C%20Rajiv%20Gandhi%20IT%20Expy%2C%20Tharamani%2C%20Chennai%2C%20Tamil%20Nadu%20600113!5e1!3m2!1sen!2sin!4v1771218829977!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>

              {/* Subtle Indicator */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-10 h-10 bg-[#14b88f] rounded-full animate-ping opacity-10" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#14b88f] rounded-full border-2 border-white shadow-xl" />
              </div>
            </motion.div>

            {/* Info Block */}
            <div className="space-y-12 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Office Location</span>
                </div>
                <h2 className="text-5xl lg:text-7xl font-light text-gray-900 tracking-tighter leading-[0.9] mb-8">
                  Our <br />
                  <span className="italic font-normal bg-gradient-to-r from-green-500 to-cyan-600 bg-clip-text text-transparent pe-5">Headquarters.</span>
                </h2>
                <p className="text-xl text-gray-400 font-light leading-relaxed max-w-md">
                  Based in the Tidel Park IT hub, our office serves as the strategic center for our global software development and consulting operations.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
                {[
                  { label: "Email Address", val: settings?.email, icon: Mail },
                  { label: "Phone Number", val: settings?.phone, icon: Phone },
                  { label: "Headquarters", val: settings?.address, icon: MapPin },
                  { label: "Working Hours", val: "Mon - Sat, 09:00 AM - 06:00 PM", icon: Clock }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-8 rounded-[2rem] bg-gray-50/50 border border-gray-100 hover:bg-white hover:border-[#14b88f]/20 hover:shadow-[0_20px_50px_-15px_rgba(20,184,166,0.05)] transition-all duration-500"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#14b88f] group-hover:text-white transition-all duration-500 shadow-sm">
                      <item.icon size={18} className="transition-colors" />
                    </div>
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{item.label}</h4>
                    <p className="text-gray-900 font-medium leading-relaxed group-hover:text-[#14b88f] transition-colors">{item.label === "Email Address" ? <a href={`mailto:${item.val}`}>{item.val}</a> : item.label === "Phone Number" ? <a href={`tel:${item.val}`}>{item.val}</a> : item.val}</p>

                    {/* Architectural Detail */}
                    <div className="mt-4 h-px w-0 bg-[#14b88f]/20 group-hover:w-full transition-all duration-700" />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="pt-8 flex items-center gap-8"
              >
                <div className="h-px flex-1 bg-gray-100" />
                <a
                  href="https://maps.app.goo.gl/sg7CJEzcGQR3QrKaA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-6"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-900 group-hover:text-[#14b88f] transition-colors">Get Directions</span>
                  <div className="w-14 h-14 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-[#14b88f] group-hover:text-white group-hover:border-[#14b88f] transition-all duration-500 shadow-xl shadow-transparent hover:shadow-[#14b88f]/20">
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* --- FINAL DECORATIVE LINE --- */}
      <div className="py-10 pt-0 flex justify-center bg-white">
        <div className="w-px h-24 bg-gradient-to-b from-[#14b88f] to-transparent" />
      </div>

    </div>
  );
}
