"use client";

import React, { useState } from 'react';
import { services } from '../data/services';

const DetailedServices = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const baseCardBorder = "rgba(15, 23, 42, 0.1)";
    const baseCardShadow = "0 14px 34px -20px rgba(15, 23, 42, 0.32), 0 1px 0 rgba(255,255,255,0.9) inset";

    const scrollToContactForm = () => {
        const contactSection = document.getElementById('contact-form');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <section
            className="relative py-8 lg:py-10 overflow-hidden"
            style={{ background: 'var(--bg-primary)' }}
            id="services"
        >
            {/* Background Ambience - Same as Pricing */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: 'var(--gradient-ambient)' }}
            />

            {/* Floating Geometry for Visual Interest - Repositioned to be behind header */}
            <div className="absolute top-10 left-[-10%] md:top-20 md:left-[10%] w-48 h-48 md:w-64 md:h-64 animate-float-slow pointer-events-none opacity-20">
                <div
                    className="w-full h-full rounded-full blur-3xl"
                    style={{ background: 'var(--accent-warm)' }}
                />
            </div>
            <div className="absolute top-48 right-[-20%] md:top-20 md:right-[10%] w-64 h-64 md:w-96 md:h-96 animate-float-delayed pointer-events-none opacity-10">
                <div
                    className="w-full h-full rotate-45"
                    style={{
                        border: '2px solid var(--accent-warm)',
                        background: 'transparent'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12" style={{ background: 'var(--accent-warm)' }} />
                            <span
                                className="text-sm font-semibold tracking-wide uppercase"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--accent-warm)'
                                }}
                            >
                                Capabilities
                            </span>
                        </div>
                        <h2
                            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--text-primary)'
                            }}
                        >
                            Our 360&deg; <span style={{ color: 'var(--accent-warm)' }}>Marketing Services</span>
                        </h2>
                        <p
                            className="text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl"
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--text-muted)',
                                lineHeight: '1.8'
                            }}
                        >
                            Beyond packages, we offer specialized engineering and design capabilities to tackle your most complex challenges.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((item, index) => (
                        <div
                            key={index}
                            className="group relative p-8 transition-all duration-500 rounded-2xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                            style={{
                                background: hoveredIndex === index
                                    ? "var(--bg-card-hover)"
                                    : "var(--bg-card-default)",
                                border: `1px solid ${hoveredIndex === index ? item.accent : 'var(--border-card)'}`,
                                backdropFilter: 'blur(10px)',
                                boxShadow: hoveredIndex === index
                                    ? `0 24px 45px -18px ${item.bgAccent}, var(--shadow-card)`
                                    : 'var(--shadow-card)',
                                transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)'
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            onClick={scrollToContactForm}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    scrollToContactForm();
                                }
                            }}
                            role="button"
                            tabIndex={0}
                        >
                            <div
                                className="w-12 h-12 mb-6 rounded-lg flex items-center justify-center transition-colors duration-300"
                                style={{
                                    background: item.bgAccent,
                                    color: item.accent
                                }}
                            >
                                {item.icon}
                            </div>

                            <h3
                                className="text-xl font-bold mb-3"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                {item.title}
                            </h3>

                            <p
                                className="text-sm leading-relaxed mb-6 min-h-[60px]"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                {item.description}
                            </p>

                            {/* Arrow Link - Similar to other sections but styled like Pricing */}
                            <button
                                type="button"
                                className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
                                style={{
                                    fontFamily: 'var(--font-mono)',
                                    color: item.accent,
                                    opacity: hoveredIndex === index ? 1 : 0.7,
                                    background: 'transparent'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    scrollToContactForm();
                                }}
                            >
                                Get Service
                                <svg
                                    className="w-4 h-4 transition-transform duration-300"
                                    style={{ transform: hoveredIndex === index ? 'translateX(4px)' : 'translateX(0)' }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetailedServices;
