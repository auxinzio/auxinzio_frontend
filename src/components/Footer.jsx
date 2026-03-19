"use client";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Linkedin, Instagram, Facebook, ArrowUpRight, Github, MapPin, Mail, Phone } from "lucide-react";
import { useSettings } from "@/app/Context/SettingsContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function Footer() {
  const { settings } = useSettings();
  const [service, setService] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/services/servicesList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => setService(data))
  }, [settings]);

  useEffect(() => {
    if (!settings?.backend_api_url) return;
    fetch(`${settings.backend_api_url}/api/products/productsList`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [settings]);

  const socialLinks = [
    // { icon: Twitter, href: settings?.twitter_url },
    { icon: Linkedin, href: settings?.linkedin_url },
    { icon: Instagram, href: settings?.instagram_url },
    // { icon: Facebook, href: settings?.facebook_url },
  ];

  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [subscribeStatus, setSubscribeStatus] = useState(null);

  const validateEmail = (val, isSubmit = false) => {
    const emailRegex = /^(?=[^@]*[a-zA-Z])[a-zA-Z0-9.]+@[a-zA-Z.-]+\.[a-zA-Z]{2,3}$/;
    if (!isSubmit && (!val || val.trim().length === 0)) return null;
    if (!val) return "Email address is required.";
    if (!emailRegex.test(val)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();

    const error = validateEmail(email, true);
    if (error) {
      setSubscribeStatus({ success: false, message: error });
      setTimeout(() => setSubscribeStatus(null), 5000);
      return;
    }

    setSubscribing(true);
    setSubscribeStatus(null);

    if (!settings?.backend_api_url) {
      setSubscribeStatus({ success: false, message: "API configuration missing." });
      setSubscribing(false);
      return;
    }

    try {
      const response = await fetch(`${settings.backend_api_url}/api/subscribers/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email }),
      });

      const data = await response.json();

      if (data.status === 'ok' || data.success) {
        setSubscribeStatus({ success: true, message: "Subscription confirmed successfully." });
        setEmail("");
      } else {
        setSubscribeStatus({ success: false, message: data.message || "Subscription error. Try again." });
      }
    } catch (err) {
      setSubscribeStatus({ success: false, message: "Network connection failure." });
    } finally {
      setSubscribing(false);
      setTimeout(() => setSubscribeStatus(null), 5000);
    }
  };

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden pt-14 pb-8">
      {/* Background Architectural Mark */}
      <div className="absolute -bottom-20 -left-20 pointer-events-none opacity-[0.03] select-none">
        <h1 className="text-[30vw] font-black leading-none tracking-tighter">AUXINZ</h1>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-5">

          {/* Brand & Manifesto */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/assets/img/logo.png"
                alt="Auxinz Logo"
                width={140}
                height={70}
                className="h-10 w-auto"
              />
            </Link>
            <div className="space-y-4 max-w-md">
              <p className="text-gray-400 text-lg font-light leading-relaxed">
                We are a trusted IT solutions partner providing secure, scalable technology and customizable enterprise products to support digital transformation.{/*  Our expertise covers software development, cybersecurity, and consulting to improve workflows, boost efficiency, and support long-term business growth. */}
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href || "#"}
                    className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#14b88f] hover:border-[#14b88f] hover:text-white transition-all duration-500 group"
                  >
                    <social.icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                  </Link>
                ))}
              </div>

              {/* 01 Newsletter subscription */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-3">
                  {/* <span className="text-[10px] font-bold text-[#14b88f] tracking-tighter">01</span> */}
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.3em] text-white">Subscribe to our Newsletter</h3>
                </div>
                <form onSubmit={handleSubscribe} noValidate className="relative max-w-sm group">
                  <input
                    type="email"
                    required
                    placeholder="Enter Email Address"
                    className={`w-full bg-white/5 border ${subscribeStatus && !subscribeStatus.success ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-[#14b88f] transition-all placeholder:text-gray-600 font-light`}
                    value={email}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^a-zA-Z0-9.@]/g, '');
                      setEmail(val);
                      const error = validateEmail(val, false);
                      if (error) {
                        setSubscribeStatus({ success: false, message: error });
                      } else {
                        setSubscribeStatus(null);
                      }
                    }}
                  />
                  <button
                    type="submit"
                    disabled={subscribing}
                    className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-green-500 to-cyan-600 text-transparent pe-5 text-white rounded-lg transition-all flex items-center justify-center group/btn disabled:opacity-50 "
                  >
                    <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform " />
                  </button>
                </form>
                {subscribeStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-[12px] font-bold uppercase tracking-widest ${subscribeStatus.success ? 'text-[#14b88f]' : 'text-red-400'}`}
                  >
                    {subscribeStatus.message}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-5 md:mt-0 mt-10 row-gap-10">

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.3em] text-white">Company</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Careers", href: "/careers" },
                    { name: "Contact", href: "/contact" }
                  ].map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-base font-light text-gray-400 hover:text-[#14b88f] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {link.name} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-[12px] font-bold uppercase tracking-[0.3em] text-white">Products</h3>
                </div>
                <ul className="space-y-4">
                  {product?.data?.productsList?.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link href={`/products/${item.slug}`} className="text-base font-light text-gray-400 hover:text-[#14b88f] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {item.product_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.3em] text-white">Services</h3>
                </div>
                <ul className="space-y-4 ">
                  {service?.data?.serviceList?.slice(0, 4).map((item) => (
                    <li key={item.id}>
                      <Link href={`/services/${item.slug}`} className="text-base font-light text-gray-400 hover:text-[#14b88f] hover:translate-x-1 transition-all flex items-center gap-1 group">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 space-y-8 md:ml-[30px] ml-0">
                <div className="flex items-center gap-3">
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.3em] text-white">Address</h3>
                </div>
                <ul className="space-y-4">
                  <li className="text-base font-light text-gray-400 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#14b88f] shrink-0 mt-0.5" />
                    <span>{settings?.address || 'Loading address...'}</span>
                  </li>
                  <li>
                    <a href={`mailto:${settings?.email}`} className="text-base font-light text-gray-400 hover:text-[#14b88f] transition-all break-all flex items-center gap-3 group">
                      <Mail className="w-4 h-4 text-[#14b88f] shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{settings?.email}</span>
                    </a>
                  </li>
                  <li>
                    <a href={`tel:${settings?.phone}`} className="text-base font-light text-gray-400 hover:text-[#14b88f] transition-all flex items-center gap-3 group">
                      <Phone className="w-4 h-4 text-[#14b88f] shrink-0 group-hover:scale-110 transition-transform" />
                      <span>{settings?.phone}</span>
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        {/* Global Footer Bottom */}
        <div className="mt-5 pt-7 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.4em]">
            © {new Date().getFullYear()} {settings?.footer_company_name} All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.4em] hover:text-[#14b88f] transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.4em] hover:text-[#14b88f] transition-colors">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="text-gray-500 text-[10px] uppercase font-bold tracking-[0.4em] hover:text-[#14b88f] transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
