"use client";

import React, { useState } from 'react';

type Plan = {
    name: string;
    description: string;
    price: string;
    features: string[];
    accent: string;
    bgAccent: string;
    popular?: boolean;
};

const Pricing = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const baseCardBorder = "rgba(15, 23, 42, 0.1)";
    const baseCardShadow = "0 14px 34px -20px rgba(15, 23, 42, 0.32), 0 1px 0 rgba(255,255,255,0.9) inset";
    const whatsappNumber = "923706037115";

    const openWhatsApp = (planName: string, planPrice: string) => {
        const message = `Hi Adzzly, I'm interested in your ${planName} package (${planPrice} / month). Please share more details.`;
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const CUSTOM_PACKAGE = "Custom Package";

    const scrollToContact = () => {
        sessionStorage.setItem("contact-package", CUSTOM_PACKAGE);
        window.dispatchEvent(new CustomEvent("contact-package", { detail: CUSTOM_PACKAGE }));
        const contactSection = document.getElementById("contact-form");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const plans: Plan[] = [
        {
            name: 'Basic Package',
            description: 'Ideal for startups and small businesses launching online campaigns.',
            price: '$800',
            features: [
                'Ad account setup and business manager configuration.',
                'Audience and competitor research for focused targeting.',
                'Creation and management of 2 campaigns (traffic or engagement).',
                'Up to 4 ad creatives (images or short videos).',
                'Basic ad copywriting with CTA suggestions.',
                'Monthly performance report with key insights.'
            ],
            accent: 'var(--accent-sage)',
            bgAccent: 'rgba(16, 185, 129, 0.12)'
        },
        {
            name: 'Standard Package',
            description: 'Built for growing businesses aiming for stronger conversions and scale.',
            price: '$1500',
            features: [
                'Everything in Basic Package.',
                'Management of 4-6 campaigns (traffic, engagement, conversion).',
                'Pixel setup and event tracking for optimization.',
                'Retargeting campaigns to re-engage visitors.',
                'A/B testing for creatives and ad copy.',
                'Up to 8 ad creatives each month.',
                'Fortnightly optimization reports and budget guidance.'
            ],
            accent: 'var(--accent-warm)',
            bgAccent: 'rgba(119, 185, 62, 0.12)',
            popular: true
        },
        {
            name: 'Premium Package',
            description: 'For brands that want full-funnel performance and aggressive growth.',
            price: '$2000',
            features: [
                'Everything in Standard Package.',
                'Complete funnel strategy: awareness to conversion.',
                'Dynamic product ads and catalog setup (if applicable).',
                'Custom audience segmentation and lookalike creation.',
                'Advanced copywriting and creative direction.',
                'Weekly reporting with continuous optimization.',
                'Dedicated marketing consultant for strategy support.'
            ],
            accent: 'var(--accent-coral)',
            bgAccent: 'rgba(244, 63, 94, 0.12)'
        }
    ];

    return (
        <section className="relative py-10 lg:py-14 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            {/* Background Ambience */}
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: 'var(--gradient-ambient)' }}
            />

            {/* Floating Geometry for Visual Interest */}
            <div className="absolute top-20 left-[10%] w-64 h-64 animate-float-slow pointer-events-none opacity-20">
                <div
                    className="w-full h-full rounded-full blur-3xl"
                    style={{ background: 'var(--accent-warm)' }}
                />
            </div>
            <div className="absolute bottom-20 right-[5%] w-96 h-96 animate-float-delayed pointer-events-none opacity-10">
                <div
                    className="w-full h-full rotate-45"
                    style={{
                        border: '2px solid var(--accent-coral)',
                        background: 'transparent'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
                {/* Section Header */}
                <div className="max-w-3xl mb-10 lg:mb-14">
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
                            Investment
                        </span>
                    </div>

                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-5"
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-primary)'
                        }}
                    >
                        Select <span style={{ color: 'var(--accent-warm)' }}> Your Package</span>
                    </h2>

                    <p
                        className="text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl"
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-muted)',
                            lineHeight: '1.8'
                        }}
                    >
                        Pick the package that matches your growth stage.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7 items-stretch animate-scale-in">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-6 lg:p-7 transition-all duration-500 rounded-2xl group flex flex-col ${plan.popular ? 'md:col-span-2 xl:col-span-1 xl:-mt-4 xl:mb-4 z-10' : ''}`}
                            style={{
                                background: hoveredIndex === index
                                    ? "var(--bg-card-hover)"
                                    : "var(--bg-card-default)",
                                border: `1px solid ${hoveredIndex === index ? plan.accent : 'var(--border-card)'}`,
                                backdropFilter: 'blur(10px)',
                                boxShadow: hoveredIndex === index
                                    ? `0 24px 45px -18px ${plan.bgAccent}, var(--shadow-card)`
                                    : 'var(--shadow-card)',
                                transform: hoveredIndex === index ? 'translateY(-10px)' : 'translateY(0)'
                            }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {plan.popular && (
                                <div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase shadow-sm"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        background: plan.accent,
                                        color: '#fff'
                                    }}
                                >
                                    Most Popular
                                </div>
                            )}

                            <div
                                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                                style={{ background: `linear-gradient(90deg, ${plan.accent} 0%, transparent 100%)` }}
                            />

                            {/* Plan Name */}
                            <div className="mb-4 mt-2 flex items-center justify-between gap-3">
                                <h3
                                    className="text-xl lg:text-2xl font-bold"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    {plan.name}
                                </h3>
                                <span
                                    className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-widest"
                                    style={{
                                        color: plan.accent,
                                        background: plan.bgAccent,
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                >
                                    Ads
                                </span>
                            </div>

                            {/* Description */}
                            <p
                                className="text-sm mb-6 min-h-12"
                                style={{
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.6'
                                }}
                            >
                                {plan.description}
                            </p>

                            {/* Price */}
                            <div className="mb-6 flex items-baseline gap-1.5 flex-wrap">
                                <span
                                    className="text-3xl lg:text-4xl font-bold"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        color: plan.accent
                                    }}
                                >
                                    {plan.price}
                                </span>
                                <span className="text-xs sm:text-sm text-[var(--text-muted)] font-mono">/month</span>
                            </div>

                            {/* Divider */}
                            <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, var(--border-card), transparent)' }} />

                            {/* Features */}
                            <ul className="space-y-3.5 mb-8 grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                                        <div
                                            className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                            style={{ background: plan.bgAccent }}
                                        >
                                            <svg
                                                className="w-2.5 h-2.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                style={{ color: plan.accent }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span style={{ color: 'var(--text-muted)' }}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <div className="flex flex-col gap-3">
                                <button
                                    type="button"
                                    className="w-full py-3.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 relative overflow-hidden group/btn"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        background: 'transparent',
                                        color: plan.accent,
                                        border: `1px solid ${plan.accent}`,
                                    }}
                                    onClick={() => openWhatsApp(plan.name, plan.price)}
                                >
                                    <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
                                        Choose {plan.name.replace(" Package", "")}
                                    </span>
                                    <div
                                        className="absolute inset-0 h-full w-full origin-left scale-x-0 transition-transform duration-300 group-hover/btn:scale-x-100"
                                        style={{ background: plan.accent }}
                                    />
                                </button>
                                <button
                                    type="button"
                                    className="w-full py-3.5 text-[11px] sm:text-xs tracking-[0.18em] uppercase font-semibold transition-all duration-300 hover:opacity-90"
                                    style={{
                                        fontFamily: 'var(--font-mono)',
                                        background: plan.bgAccent,
                                        color: plan.accent,
                                        border: `1px solid color-mix(in srgb, ${plan.accent} 35%, transparent)`,
                                    }}
                                    onClick={scrollToContact}
                                >
                                    Customize
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
