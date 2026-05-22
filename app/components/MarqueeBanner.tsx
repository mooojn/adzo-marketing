"use client";

import React from "react";
import { BarChart3, BadgeCheck, Eye, Boxes } from "lucide-react";

const MarqueeBanner = () => {
    const topText = "* Why Choose ADZO ";
    const bottomText = "* As Your Digital Marketing Agency? ";

    const repeatedTop = Array(12).fill(topText).join("");
    const repeatedBottom = Array(8).fill(bottomText).join("");

    const reasons = [
        {
            title: "Data-Driven Strategy",
            desc: "Every campaign is backed by deep analytics, A/B testing, and real-time optimization to maximize your ROI.",
            icon: <BarChart3 className="w-5 h-5" strokeWidth={2} />,
        },
        {
            title: "Certified Experts",
            desc: "Google & Meta certified professionals with 5+ years of hands-on experience scaling brands globally.",
            icon: <BadgeCheck className="w-5 h-5" strokeWidth={2} />,
        },
        {
            title: "Transparent Reporting",
            desc: "Weekly reports, live dashboards, and complete visibility into your spend and results - no black boxes.",
            icon: <Eye className="w-5 h-5" strokeWidth={2} />,
        },
        {
            title: "End-to-End Solutions",
            desc: "From strategy to execution - web development, ads, SEO, content, and social media all under one roof.",
            icon: <Boxes className="w-5 h-5" strokeWidth={2} />,
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

            <div className="relative overflow-hidden py-4">
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

            <section className="py-10 lg:py-16" style={{ background: "var(--bg-secondary)" }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <p
                        className="text-center text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12"
                        style={{
                            fontFamily: "var(--font-display)",
                            color: "var(--text-muted)",
                        }}
                    >
                        We don&apos;t just run campaigns - we build growth engines. Here&apos;s why
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
                                        background: "color-mix(in srgb, var(--accent-warm) 18%, transparent)",
                                        color: "var(--accent-warm)",
                                        border: "1px solid color-mix(in srgb, var(--accent-warm) 28%, transparent)",
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
