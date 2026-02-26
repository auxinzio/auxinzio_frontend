"use client";
import Link from "next/link";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { useSettings } from "@/app/Context/SettingsContext";
import { useState, useEffect } from "react";

export function Footer() {
  const { settings } = useSettings();
  const [service, setService] = useState("");
  const [product, setProduct] = useState("");

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/services/servicesList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setService(data))
  }, [settings]);

  useEffect(() => {
    fetch(`${settings.backend_api_url}/api/products/productsList`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) })
      .then(res => res.json())
      .then(data => setProduct(data))
  }, [settings]);

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="container mx-auto px-4 py-16 pb-[25px]">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12">
          {/* Brand */}
          <div className="space-y-4 col-span-2">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/img/logo.png"
                alt="Auxinz Logo"
                className="h-8 w-auto object-contain brightness-100 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We are a trusted IT solutions partner providing secure, scalable technology and customizable enterprise products to support digital transformation. Our expertise covers software development, cybersecurity, and consulting to improve workflows, boost efficiency, and support long-term business growth.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          {/* Links */}
          <div>
            <h3 className="font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {service?.data?.serviceList?.map((item) => (
                <li key={item.id}>
                  <Link href={`/services/${item.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6">Products</h3>
            <ul className="space-y-3">
              {product?.data?.productsList?.map((item) => (
                <li key={item.id}>
                  <Link href={`/products/${item.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {item.product_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6">Legal</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-16 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Auxinz. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
