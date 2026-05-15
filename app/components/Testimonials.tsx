"use client";

import React, { useState } from 'react';

const Testimonials = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const renderStars = (rating: number) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
                {[...Array(fullStars)].map((_, i) => (
                    <span key={`full-${i}`} className="text-base leading-none" style={{ color: '#F59E0B' }}>★</span>
                ))}
                {hasHalfStar && (
                    <span key="half" className="text-base leading-none" style={{ color: '#F59E0B', opacity: 0.6 }}>★</span>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <span key={`empty-${i}`} className="text-base leading-none" style={{ color: 'var(--border-subtle)' }}>★</span>
                ))}
            </div>
        );
    };

    const testimonials = [
        {
            quote: "AdzoMarketing transformed our online presence completely. Their strategic approach to digital marketing doubled our leads in just three months.",
            author: "Sarah Jenkins",
            role: "Marketing Director",
            company: "TechFlow",
            rating: 5.0,
            accent: "var(--accent-warm)" // Indigo
        },
        {
            quote: "The website they built for us is not only stunning but also incredibly fast. Our bounce rate dropped by 40% immediately after launch.",
            author: "Michael Chen",
            role: "CEO",
            company: "Vertex Innovations",
            rating: 4.8,
            accent: "var(--accent-sage)" // Emerald
        },
        {
            quote: "Professional, creative, and data-driven. The team at AdzoMarketing really understands how to connect with audiences in the digital age.",
            author: "Emma Rodriguez",
            role: "Founder",
            company: "Spherule",
            rating: 4.7,
            accent: "var(--accent-coral)" // Rose
        }
    ];

    return (
        <section className="relative py-8 lg:py-10 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>

            {/* Background Decor */}
            <div
                className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 100% 50%, var(--accent-warm), transparent 70%)`
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

                {/* Section Header */}
                <div className="max-w-3xl mb-16">
                    <div className="flex items-center gap-4 mb-6">
                        <div
                            className="h-px w-12"
                            style={{ background: 'var(--accent-warm)' }}
                        />
                        <span
                            className="text-sm font-semibold tracking-wide uppercase"
                            style={{
                                fontFamily: 'var(--font-display)',
                                color: 'var(--accent-warm)'
                            }}
                        >
                            Testimonials
                        </span>
                    </div>

                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6"
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        What Our Clients <span style={{ color: 'var(--accent-warm)' }}>Say</span>
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative p-8 lg:p-10 rounded-2xl transition-all duration-500"
                            style={{
                                background: 'var(--bg-card)',
                                border: '1px solid var(--border-subtle)',
                                boxShadow: hoveredIndex === index
                                    ? 'var(--shadow-card)'
                                    : '0 4px 6px -1px rgba(0, 0, 0, 0.02)',
                                transform: hoveredIndex === index ? 'translateY(-5px)' : 'translateY(0)'
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Quote Icon */}
                            <div className="mb-8">
                                <svg
                                    width="40"
                                    height="40"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{ color: testimonial.accent, opacity: 0.3 }}
                                >
                                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" fill="currentColor" />
                                </svg>
                            </div>

                            {/* Quote Text */}
                            <p
                                className="text-lg leading-relaxed mb-8"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--text-muted)'
                                }}
                            >
                                "{testimonial.quote}"
                            </p>

                            {/* Rating */}
                            <div className="flex items-center justify-between mb-8">
                                {renderStars(testimonial.rating)}
                                <span
                                    className="text-sm font-semibold"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {testimonial.rating.toFixed(1)}/5
                                </span>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                                    style={{ background: testimonial.accent }}
                                >
                                    {testimonial.author.charAt(0)}
                                </div>
                                <div>
                                    <h4
                                        className="font-bold text-sm"
                                        style={{
                                            fontFamily: 'var(--font-display)',
                                            color: 'var(--text-primary)'
                                        }}
                                    >
                                        {testimonial.author}
                                    </h4>
                                    <p
                                        className="text-xs"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: 'var(--text-muted)'
                                        }}
                                    >
                                        {testimonial.role}, {testimonial.company}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Line */}
                            <div
                                className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out"
                                style={{
                                    width: hoveredIndex === index ? '100%' : '0%',
                                    background: testimonial.accent
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
