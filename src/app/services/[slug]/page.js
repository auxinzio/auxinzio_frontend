"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Shield, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSettings } from "@/app/Context/SettingsContext";

export default function ServiceDetailPage({ params }) {
    const { slug } = React.use(params);
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {settings} = useSettings();
    
    useEffect(() => {
        const fetchServiceDetail = async () => {
            if (!settings.backend_api_url) return;
            
            try {
                setLoading(true);
                const response = await fetch(`${settings.backend_api_url}/api/services/servicesShow`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug: slug }),
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch service details: ${response.status}`);
                }

                const result = await response.json();
                const serviceData = result.data?.[0] || result.data || result;
                setService(serviceData);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (slug && settings.backend_api_url) {
            fetchServiceDetail();
        }
    }, [slug, settings.backend_api_url]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-muted-foreground animate-pulse">Loading service expertise...</p>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <div className="text-center space-y-6 max-w-md">
                    <div className="p-4 rounded-full bg-destructive/10 text-destructive w-fit mx-auto">
                        <Shield className="w-12 h-12" />
                    </div>
                    <h1 className="text-2xl font-bold">Something went wrong</h1>
                    <p className="text-muted-foreground">
                        {error || "We couldn't find the service you're looking for. It might have been moved or deleted."}
                    </p>
                    <Link href="/services">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Services
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="container px-4 md:px-6">
                    <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all mb-8">
                        <ArrowLeft className="w-4 h-4" /> Back to All Services
                    </Link>
                    
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                <Star className="w-4 h-4 fill-current" />
                                <span>Premium Expertise</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                                {service.title}
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {service.description?.short_description || "Empowering your business with cutting-edge digital solutions tailored to your unique goals."}
                            </p>
                            <div className="flex flex-wrap gap-4 pt-4">
                                <Button size="lg" className="h-12 px-8">Get Started</Button>
                                <Button size="lg" variant="outline" className="h-12 px-8">Consultations</Button>
                            </div>
                        </div>
                        
                        <div className="relative aspect-video lg:aspect-square rounded-3xl overflow-hidden shadow-2xl border border-border bg-muted">
                            {
                                !loading && (
                                    <Image 
                                    src={`${settings.backend_api_url}/${service.service.main_logo}`} 
                                    alt={service.service.title} 
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                )
                            }
                            {/* {service.main_logo ? (
                                <Image 
                                    src={`${API_URL}${service.service.main_logo}`} 
                                    alt={service.title} 
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Shield className="w-24 h-24 text-muted-foreground/20" />
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-24 border-t border-border">
                <div className="container px-4 md:px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="md:col-span-2 space-y-12">
                            <div>
                                <h2 className="text-3xl font-bold mb-6 text-foreground">Overview</h2>
                                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground text-lg leading-relaxed">
                                    <p>{service.description?.long_description || "Our comprehensive approach ensures every aspect of your business needs is addressed with precision and innovation. We leverage the latest technologies to deliver results that exceed expectations."}</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
                                    <div className="p-3 rounded-xl bg-primary/10 w-fit text-primary">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">Fast Turnaround</h3>
                                    <p className="text-muted-foreground">Efficient processes ensuring timely delivery without compromising on quality.</p>
                                </div>
                                <div className="p-6 rounded-2xl bg-muted/30 border border-border space-y-4">
                                    <div className="p-3 rounded-xl bg-primary/10 w-fit text-primary">
                                        <CheckCircle2 className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold">Quality Guaranteed</h3>
                                    <p className="text-muted-foreground">Rigorous testing and best practices followed throughout the development cycle.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="p-8 rounded-3xl bg-primary text-primary-foreground space-y-6">
                                <h3 className="text-2xl font-bold">Ready to Elevate?</h3>
                                <p className="opacity-90">Book a discovery call with our experts to discuss how we can help you achieve your business objectives.</p>
                                <Button variant="secondary" className="w-full h-12 text-primary font-bold">
                                    Book a Call
                                </Button>
                                <p className="text-xs text-center opacity-70">No commitment required for the first session.</p>
                            </div>
                            
                            <div className="p-8 rounded-3xl border border-border bg-muted/20 space-y-4">
                                <h4 className="font-bold">Summary</h4>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        Expert Consultation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        Custom Implementation
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        Ongoing Support
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
