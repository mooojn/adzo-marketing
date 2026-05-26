"use client";

import { useEffect, useState } from "react";
import { Eye, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";

type Value = {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
};

export default function About() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const values: Value[] = [
        {
            title: "Innovation",
            description: "We experiment fast and deploy modern growth systems before competitors catch up.",
            icon: Sparkles,
        },
        {
            title: "Quality",
            description: "From strategy to creatives, every deliverable follows a high-performance standard.",
            icon: ShieldCheck,
        },
        {
            title: "Transparency",
            description: "Clear reporting, clear communication, and decisions backed by real campaign data.",
            icon: Eye,
        },
        {
            title: "Results",
            description: "We focus on leads, revenue, and ROI instead of vanity metrics.",
            icon: TrendingUp,
        },
    ];

    return (
        <div className="grain-overlay">
            <div className={`transition-all duration-500 ${isLoaded ? "animate-slide-up" : "opacity-0"}`} />

            <section className="relative overflow-hidden pb-20 pt-32" style={{ background: "var(--bg-primary)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-ambient)" }} />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                    <div className={`max-w-3xl ${isLoaded ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px w-12" style={{ background: "var(--accent-warm)" }} />
                            <span className="text-sm font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--accent-warm)" }}>
                                About Us
                            </span>
                        </div>

                        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                            We&apos;re a Team of <span style={{ color: "var(--accent-warm)" }}>Digital Experts</span>
                        </h1>

                        <p className="text-lg leading-relaxed lg:text-xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", lineHeight: "1.8" }}>
                            We help businesses transform their digital presence and unlock measurable growth.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold lg:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                                Our Story
                            </h2>
                            <div className="space-y-4" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", lineHeight: "1.8" }}>
                                <p>
                                    AdzoMarketing started with one mission: help businesses globally compete and win online.
                                </p>
                                <p>
                                    What began as a focused growth team became a full-service digital partner for brands across the region and beyond.
                                </p>
                                <p>
                                    We have helped over <span style={{ color: "var(--accent-warm)", fontWeight: 600 }}>150+ businesses</span> scale through performance marketing and design-driven execution.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { number: "150+", label: "Projects Completed" },
                                { number: "100+", label: "Happy Clients" },
                                { number: "20+", label: "Years Experience" },
                                { number: "12", label: "Team Members" },
                            ].map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-2xl p-6 text-center"
                                    style={{
                                        background: "var(--bg-card)",
                                        border: "1px solid var(--border-subtle)",
                                        boxShadow: "var(--shadow-card)",
                                    }}
                                >
                                    <div className="mb-2 text-3xl font-bold lg:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--accent-warm)" }}>
                                        {stat.number}
                                    </div>
                                    <div className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20" style={{ background: "var(--bg-primary)" }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <h2 className="mb-4 text-3xl font-bold lg:text-4xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                            Our Core Values
                        </h2>
                        <p style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>
                            Principles that shape every campaign, every design, and every client partnership.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value, i) => {
                            const Icon = value.icon;
                            return (
                                <div
                                    key={i}
                                    className="group rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                                    style={{
                                        background: "var(--bg-card-default)",
                                        border: "1px solid var(--border-subtle)",
                                        boxShadow: "var(--shadow-card)",
                                    }}
                                >
                                    <div
                                        className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                                        style={{ background: "linear-gradient(135deg, rgba(212,132,26,0.2), rgba(212,132,26,0.06))" }}
                                    >
                                        <Icon className="h-6 w-6 text-[var(--accent-warm)]" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                                        {value.title}
                                    </h3>
                                    <p className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", lineHeight: "1.7" }}>
                                        {value.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <ContactForm />

            <Footer />
        </div>
    );
}
