"use client";
import { services } from "../data/services";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    const socialLinks = [
        {
            name: "Facebook",
            href: "https://www.facebook.com/profile.php?id=61588141742860",
            icon: FaFacebookF
        },
        {
            name: "Instagram",
            href: "https://www.instagram.com/adzo.marketing?",
            icon: FaInstagram
        },
        {
            name: "WhatsApp",
            href: "https://wa.me/923706037115",
            icon: FaWhatsapp
        }
    ];

    return (
        <footer
            className="relative overflow-hidden border-t border-[var(--border-subtle)] pt-20 pb-8"
            style={{
                background: "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 52%, #eef5fb 100%)",
            }}
        >
            <div
                className="pointer-events-none absolute -top-20 -left-10 h-64 w-64 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(119,185,62,0.18) 0%, transparent 72%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full blur-3xl"
                style={{ background: "radial-gradient(circle, rgba(244,114,182,0.14) 0%, transparent 75%)" }}
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(120deg, rgba(255,255,255,0.55) 0%, transparent 45%, rgba(119,185,62,0.05) 100%)",
                }}
                aria-hidden="true"
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
                    <div className="lg:col-span-1">
                        <a href="/" className="mb-6 inline-flex items-center">
                            <img src="/logo.png" alt="Adzzly Logo" className="h-16 md:h-20 w-auto max-w-[220px] object-contain" />
                        </a>

                        <p
                            className="mb-6 text-base leading-relaxed"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}
                        >
                            Your trusted digital marketing partner. We help businesses grow with creative,
                            result-driven marketing solutions.
                        </p>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-subtle)] bg-white/90 text-[var(--text-muted)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-warm)] hover:bg-[var(--accent-warm)] hover:text-white"
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4
                            className="mb-6 text-lg font-bold"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                        >
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {services.map((item, id) => (
                                <li key={id}>
                                    <a
                                        href="/#services"
                                        className="inline-flex items-center gap-2 text-base text-[var(--text-muted)] transition-all duration-300 hover:translate-x-1.5 hover:text-[var(--accent-warm)]"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {item.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4
                            className="mb-6 text-lg font-bold"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                        >
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", href: "/" },
                                { label: "About", href: "/about" },
                                { label: "Contact", href: "/contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        className="inline-flex items-center text-base text-[var(--text-muted)] transition-all duration-300 hover:translate-x-1.5 hover:text-[var(--accent-warm)]"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4
                            className="mb-6 text-lg font-bold"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                        >
                            Get In Touch
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/85 p-3">
                                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-warm)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>30 N Gould St Ste R, Sheridan, WY 82801</span>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/85 p-3">
                                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-warm)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>info@adzomarketing.com</span>
                            </div>
                            <div className="flex items-start gap-3 rounded-xl border border-[var(--border-subtle)] bg-white/85 p-3">
                                <svg className="mt-1 h-5 w-5 shrink-0 text-[var(--accent-warm)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}>+1 (307) 215-9781</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
