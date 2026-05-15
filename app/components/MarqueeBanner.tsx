"use client";

import React from "react";

const MarqueeBanner = () => {
    const topText = "✦ Why Choose ADZO ";
    const bottomText = "✦ As Your Digital Marketing Agency? ";

    const repeatedTop = Array(12).fill(topText).join("");
    const repeatedBottom = Array(8).fill(bottomText).join("");

    const reasons = [
        {
            title: "Data-Driven Strategy",
            desc: "Every campaign is backed by deep analytics, A/B testing, and real-time optimization to maximize your ROI.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            title: "Certified Experts",
            desc: "Google & Meta certified professionals with 5+ years of hands-on experience scaling brands globally.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
        },
        {
            title: "Transparent Reporting",
            desc: "Weekly reports, live dashboards, and complete visibility into your spend and results — no black boxes.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
            ),
        },
        {
            title: "End-to-End Solutions",
            desc: "From strategy to execution — web development, ads, SEO, content, and social media all under one roof.",
            icon: (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <style jsx global>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>

            {/* Marquee Strips */}
            <div className="relative overflow-hidden py-4">
                {/* First Strip - Indigo (primary accent) */}
                <div
                    className="relative overflow-hidden py-5"
                    style={{
                        background: "var(--accent-warm)",
                        transform: "rotate(-2deg) scale(1.05)",
                    }}
                >
                    <div
                        className="flex whitespace-nowrap"
                        style={{ animation: "marquee-left 30s linear infinite" }}
                    >
                        <span
                            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide px-2"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {repeatedTop}
                        </span>
                        <span
                            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide px-2"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {repeatedTop}
                        </span>
                    </div>
                </div>

                {/* Second Strip - Rose (coral accent) */}
                <div
                    className="relative overflow-hidden py-5 -mt-2"
                    style={{
                        background: "black",
                        transform: "rotate(2deg) scale(1.05)",
                    }}
                >
                    <div
                        className="flex whitespace-nowrap"
                        style={{ animation: "marquee-right 30s linear infinite" }}
                    >
                        <span
                            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide px-2"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {repeatedBottom}
                        </span>
                        <span
                            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide px-2"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {repeatedBottom}
                        </span>
                    </div>
                </div>
            </div>

            {/* Why Choose Us - Reasons */}
            <section className="py-10 lg:py-16" style={{ background: "var(--bg-secondary)" }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <p
                        className="text-center text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--text-muted)",
                        }}
                    >
                        We don&apos;t just run campaigns — we build growth engines. Here&apos;s why
                        <span style={{ color: "var(--accent-warm)", fontWeight: 700 }}> 150+ brands </span>
                        trust ADZO to fuel their digital success.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {reasons.map((reason, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-xl transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border-subtle)",
                                    boxShadow: "var(--shadow-card)",
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                                    style={{
                                        background: "var(--accent-warm-light)",
                                        opacity: 0.2,
                                        color: "var(--accent-warm)",
                                    }}
                                >
                                    {reason.icon}
                                </div>
                                <h4
                                    className="text-lg font-bold mb-2"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--text-primary)",
                                    }}
                                >
                                    {reason.title}
                                </h4>
                                <p
                                    className="text-sm leading-relaxed"
                                    style={{
                                        fontFamily: "var(--font-display)",
                                        color: "var(--text-muted)",
                                    }}
                                >
                                    {reason.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default MarqueeBanner;
