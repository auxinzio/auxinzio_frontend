'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Calendar
} from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ fullName: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#06b6d4] to-[#14b8a6] py-24 px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 left-1/4 h-96 w-96 rounded-full bg-[#14b8a6] opacity-20 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/4 h-96 w-96 rounded-full bg-[#06b6d4] opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-5xl md:text-6xl font-bold text-white tracking-tight"
          >
            {`Let's Start a Conversation`}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            {`We're here to answer your questions and help you achieve your goals.`}
          </motion.p>
        </div>
      </section>

      {/* Main Contact Area */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Details Panel - Left */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-8"
            >
              <div className="rounded-3xl bg-white/60 backdrop-blur-sm p-8 shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>
                
                {/* Office Address */}
                <div className="space-y-6">
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#06b6d4]/5 hover:to-[#14b8a6]/5 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#14b8a6] flex items-center justify-center shadow-lg">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Office Address</h3>
                        <p className="text-gray-600 leading-relaxed">
                          123 Innovation Drive<br />
                          Tech Park, Suite 500<br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Phone */}
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#06b6d4]/5 hover:to-[#14b8a6]/5 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#14b8a6] flex items-center justify-center shadow-lg">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Phone Number</h3>
                        <p className="text-gray-600">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Email */}
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#06b6d4]/5 hover:to-[#14b8a6]/5 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#14b8a6] flex items-center justify-center shadow-lg">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email Address</h3>
                        <p className="text-gray-600">contact@yourcompany.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Working Hours */}
                  <div className="group">
                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#06b6d4]/5 hover:to-[#14b8a6]/5 transition-all duration-300">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#14b8a6] flex items-center justify-center shadow-lg">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Working Hours</h3>
                        <p className="text-gray-600">
                          Monday - Friday: 9:00 AM - 6:00 PM<br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Social Media */}
                  <div className="pt-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Follow Us</h3>
                    <div className="flex gap-3">
                      {[
                        { icon: Twitter, label: 'Twitter' },
                        { icon: Linkedin, label: 'LinkedIn' },
                        { icon: Github, label: 'GitHub' }
                      ].map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#14b8a6] flex items-center justify-center text-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                          aria-label={label}
                        >
                          <Icon className="w-5 h-5" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form - Right */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="relative rounded-[24px] bg-white p-8 md:p-12 shadow-2xl border border-gray-100 overflow-hidden">
                {/* Gradient Border Glow Effect */}
                <div className="absolute inset-0 rounded-[24px] p-[1px] bg-gradient-to-br from-[#14b8a6]/30 via-[#06b6d4]/30 to-[#14b8a6]/30 -z-10"></div>
                <div className="absolute inset-0 bg-white rounded-[24px]"></div>

                <div className="relative z-10">
                  {!isSubmitted ? (
                    <>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                      <p className="text-gray-600 mb-8">{`Fill out the form below and we'll get back to you within 24 hours.`}</p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formState.fullName}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none ${
                              focusedField === 'fullName'
                                ? 'border-[#06b6d4] shadow-lg shadow-[#06b6d4]/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="John Doe"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none ${
                              focusedField === 'email'
                                ? 'border-[#06b6d4] shadow-lg shadow-[#06b6d4]/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="john@example.com"
                          />
                        </div>

                        {/* Subject */}
                        <div>
                          <label htmlFor="subject" className="block text-sm font-semibold text-gray-900 mb-2">
                            Subject
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => setFocusedField(null)}
                            required
                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none ${
                              focusedField === 'subject'
                                ? 'border-[#06b6d4] shadow-lg shadow-[#06b6d4]/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="How can we help you?"
                          />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-semibold text-gray-900 mb-2">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formState.message}
                            onChange={handleChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            required
                            rows={6}
                            className={`w-full px-4 py-3.5 rounded-xl border-2 transition-all duration-300 outline-none resize-none ${
                              focusedField === 'message'
                                ? 'border-[#06b6d4] shadow-lg shadow-[#06b6d4]/20'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            placeholder="Tell us more about your project or inquiry..."
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          className="group relative flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#22c55e] via-[#14b8a6] to-[#06b6d4] text-white font-bold rounded-[1.25rem] shadow-xl shadow-[#14b8a6]/25 hover:shadow-[#14b8a6]/40 hover:scale-[1.03] active:scale-95 transition-all duration-300 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            Submit Request
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                          </span>
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </form>
                    </>
                  ) : (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="py-12 text-center"
                    >
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#22c55e] to-[#14b8a6] flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <CheckCircle2 className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        {`Thank you for reaching out. We've received your message and will get back to you within 24 hours.`}
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Office Location Map Section */}
      <section className="py-20 px-6 bg-white">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {`Drop by for a coffee and let's discuss how we can help transform your business.`}
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-transparent bg-gradient-to-br from-[#14b8a6]/20 to-[#06b6d4]/20 p-[2px]">
              <div className="relative h-[500px] rounded-3xl overflow-hidden bg-white">
                {/* Map iframe */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2073.9500950048136!2d80.24922138453219!3d12.989753517664264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d6202e54fb9%3A0xcf5fc0aac9108c7e!2sTIDEL%20Park%2C%20Rajiv%20Gandhi%20IT%20Expy%2C%20Tharamani%2C%20Chennai%2C%20Tamil%20Nadu%20600113!5e1!3m2!1sen!2sin!4v1771218829977!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
                {/* Floating Info Badge */}
                <div className="absolute bottom-8 left-8 bg-white rounded-2xl shadow-2xl p-6 max-w-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#22c55e] to-[#14b8a6] flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">Office Location</h3>
                      <p className="text-sm text-gray-600">
                        123 Innovation Drive, Tech Park<br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
