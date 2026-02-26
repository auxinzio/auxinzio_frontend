"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

import GetDemoModal from "@/components/sections/GetDemoModal";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Careers", href: "/careers" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <>
    <nav
      className="group fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/100 backdrop-blur-md border-border/40 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="/assets/img/logo.png" 
            alt="Auxinz Logo" 
            className="h-10 w-auto object-contain"
          />
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-md font-light hover:text-green-500 transition-colors text-muted-foreground"
            >
              {link.name}
            </Link>
          ))}
          <Button variant="gradi" size="md" onClick={() => setIsModalOpen(true)} className="font-light text-base">Get Demo</Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 shadow-lg animate-in slide-in-from-top-4 fade-in">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-light py-2 border-b border-border/50 last:border-0"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Button className="w-full mt-4 text-lg font-light" variant="gradi" size="md" onClick={() => setIsOpen(false)}>
              Get Demo
            </Button>
          </div>
        </div>
      )}
    </nav>
    {/* The Modal */}
      <GetDemoModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      </>
  );
}
