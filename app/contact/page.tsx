"use client";

import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import { CONTACT_PHONE, CONTACT_EMAIL, CONTACT_ADDRESS_1, CONTACT_ADDRESS_2 } from "../utils/contact";

export default function Contact() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const contactInfo = [
        {
            icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z",
            title: "Visit Us",
            details: [CONTACT_ADDRESS_1, CONTACT_ADDRESS_2],
        },
        {
            icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
            title: "Email Us",
            details: [CONTACT_EMAIL],
        },
        {
            icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
            title: "Call Us",
            details: [CONTACT_PHONE],
        },
        {
            icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
            title: "Working Hours",
            details: ["24 Hours / 7 Days", "Fast WhatsApp Response"],
        },
    ];

    return (
        <div className="grain-overlay">
            <div className={`transition-all duration-500 ${isLoaded ? "animate-slide-up" : "opacity-0"}`} />

            <section className="relative overflow-hidden pb-16 pt-32" style={{ background: "var(--bg-primary)" }}>
                <div className="absolute inset-0 pointer-events-none" style={{ background: "var(--gradient-ambient)" }} />

                <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                    <div className={`max-w-3xl ${isLoaded ? "animate-slide-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="h-px w-12" style={{ background: "var(--accent-warm)" }} />
                            <span className="text-sm font-semibold uppercase tracking-wide" style={{ fontFamily: "var(--font-display)", color: "var(--accent-warm)" }}>
                                Contact Us
                            </span>
                        </div>

                        <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                            Let&apos;s Start a <span style={{ color: "var(--accent-warm)" }}>Conversation</span>
                        </h1>

                        <p className="text-lg leading-relaxed lg:text-xl" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", lineHeight: "1.8" }}>
                            Have a project in mind? We&apos;d love to hear about it. Get in touch and let&apos;s build something high-impact together.
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-12" style={{ background: "var(--bg-secondary)" }}>
                <div className="mx-auto max-w-7xl px-6 lg:px-12">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {contactInfo.map((info, i) => (
                            <div
                                key={i}
                                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: "var(--bg-card-default)",
                                    border: "1px solid var(--border-subtle)",
                                    boxShadow: "var(--shadow-card)",
                                }}
                            >
                                <div
                                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                                    style={{ background: "linear-gradient(135deg, rgba(212,132,26,0.2), rgba(212,132,26,0.06))" }}
                                >
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: "var(--accent-warm)" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={info.icon} />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                                    {info.title}
                                </h3>
                                {info.details.map((detail, j) => (
                                    <p key={j} className="text-sm" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>
                                        {detail}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ContactForm />

            <section className="py-20" style={{ background: "var(--bg-secondary)" }}>
                <div className="mx-auto max-w-4xl px-6 lg:px-12">
                    <h2 className="mb-12 text-center text-3xl font-bold" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {[
                            { q: "What is your typical project timeline?", a: "Most projects take 2-8 weeks depending on complexity. We provide a detailed timeline after reviewing your requirements." },
                            { q: "Do you offer ongoing support?", a: "Yes. We offer maintenance and performance support for both web and marketing clients." },
                            { q: "What are your payment terms?", a: "Typically 50% upfront and 50% on completion. Custom milestone plans are available for larger projects." },
                            { q: "Can you work with clients remotely?", a: "Absolutely. We work with clients internationally through remote delivery." },
                        ].map((faq, i) => (
                            <div
                                key={i}
                                className="group rounded-2xl p-6 transition-all duration-300 hover:shadow-lg"
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-subtle)",
                                    boxShadow: "var(--shadow-card)"
                                }}
                            >
                                <h3 className="mb-3 text-lg font-bold group-hover:text-[var(--accent-warm)] transition-colors duration-300" style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
                                    {faq.q}
                                </h3>
                                <div className="h-px w-8 mb-4 bg-[var(--accent-warm)] opacity-40" />
                                <p className="text-base" style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)", lineHeight: "1.7" }}>
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
