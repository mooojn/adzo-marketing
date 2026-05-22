"use client";

import React, { useState } from 'react';
import {
    Check,
    Megaphone,
    Users,
    Image,
    Palette,
    PenLine,
    BarChart3,
    Headset,
    SlidersHorizontal,
    Clapperboard,
    Sparkles,
    Target,
    FlaskConical,
    Search,
    Globe,
    FileText,
    Video,
    Layers,
    Bot,
    WandSparkles,
    UserRoundSearch,
    LayoutDashboard,
    UserStar,
    MonitorSmartphone,
    type LucideIcon
} from 'lucide-react';

type Feature = {
    title: string;
    description: string;
    icon: LucideIcon;
};

type Plan = {
    name: string;
    description: string;
    price: string;
    features: Feature[];
    pills: string[];
    platformLabel: string;
    platformValue: string;
    accent: string;
    bgAccent: string;
    popular?: boolean;
};

const Pricing = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const CUSTOM_PACKAGE = "Custom Package";

    const packageBudgets: Record<string, string> = {
        "Basic Package": "$800 - $1,200",
        "Standard Package": "$1,500 - $1,800",
        "Premium Package": "$2,000 - $2,500",
    };

    const selectContactOptions = (packageName: string, budgetRange?: string) => {
        const packageButton = document.querySelector<HTMLButtonElement>(
            `#contact-form button[data-package="${packageName}"]`
        );
        packageButton?.click();

        if (budgetRange) {
            const budgetButton = document.querySelector<HTMLButtonElement>(
                `#contact-form button[data-budget="${budgetRange}"]`
            );
            budgetButton?.click();
        }
    };

    const scrollToContact = (packageName: string, budgetRange?: string) => {
        sessionStorage.setItem("contact-package", packageName);
        if (budgetRange) {
            sessionStorage.setItem("contact-budget", budgetRange);
        }
        window.dispatchEvent(
            new CustomEvent("contact-selection", {
                detail: { package: packageName, budget: budgetRange },
            })
        );
        const contactSection = document.getElementById("contact-form");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setTimeout(() => selectContactOptions(packageName, budgetRange), 150);
    };

    const scrollToCustom = () => {
        scrollToContact(CUSTOM_PACKAGE);
        window.dispatchEvent(new CustomEvent("contact-package", { detail: CUSTOM_PACKAGE }));
    };

    const plans: Plan[] = [
        {
            name: 'Basic Package',
            description: 'Perfect for startups and small businesses launching their first digital campaigns.',
            price: '$800',
            features: [
                {
                    title: 'Meta Ads Management',
                    description: '2 campaigns (traffic or engagement) · ad account + Business Manager setup from scratch',
                    icon: Megaphone,
                },
                {
                    title: 'Audience & Competitor Research',
                    description: 'Targeted interest & behaviour segmentation · competitor ad intelligence audit',
                    icon: Users,
                },
                {
                    title: '6 Static Ad Creatives',
                    description: 'Professionally designed image ads - feed, stories & reels formats',
                    icon: Image,
                },
                {
                    title: 'Graphic Designing',
                    description: 'Brand-consistent visuals, banners, product ad graphics & social post designs',
                    icon: Palette,
                },
                {
                    title: 'Ad Copywriting',
                    description: 'Persuasive bilingual (Urdu/English) copy with high-converting CTAs',
                    icon: PenLine,
                },
                {
                    title: 'Monthly Performance Report',
                    description: 'Full insights on spend, reach, clicks & actionable next steps',
                    icon: BarChart3,
                },
                {
                    title: 'Dedicated Account Manager',
                    description: 'WhatsApp & email support, 6 days/week · response under 4 hours',
                    icon: Headset,
                },
            ],
            pills: ['Meta Ads', '6 Creatives', 'Graphic Design', 'Monthly Report'],
            platformLabel: 'Platform',
            platformValue: 'Meta Ads - Facebook & Instagram',
            accent: 'var(--accent-sage)',
            bgAccent: 'rgba(16, 185, 129, 0.12)',
        },
        {
            name: 'Standard Package',
            description: 'Built for growing businesses aiming for stronger conversions, retargeting & multi-platform scale.',
            price: '$1,500',
            features: [
                {
                    title: 'Everything in Basic',
                    description: 'Plus all Standard-level upgrades below',
                    icon: Check,
                },
                {
                    title: '4-6 Multi-Objective Campaigns',
                    description: 'Traffic, leads, conversions & engagement running simultaneously',
                    icon: SlidersHorizontal,
                },
                {
                    title: 'Short-Form Video Ads',
                    description: '4 professional reels/video ads edited monthly - scroll-stopping hooks & storytelling',
                    icon: Clapperboard,
                },
                {
                    title: 'AI-Generated Ad Images',
                    description: 'AI visual content for campaigns - product mockups, lifestyle scenes & ad backgrounds',
                    icon: Sparkles,
                },
                {
                    title: 'Pixel Setup & Retargeting Funnels',
                    description: 'Meta Pixel + Google Tag Manager · full event tracking · warm audience retargeting',
                    icon: Target,
                },
                {
                    title: 'A/B Testing',
                    description: 'Creative, copy & audience split tests · bi-weekly optimisation & budget reallocation',
                    icon: FlaskConical,
                },
                {
                    title: 'SEO (On-Site & Off-Site)',
                    description: 'Keyword research, on-page optimisation, backlinks & Google presence setup',
                    icon: Search,
                },
                {
                    title: 'Google Ads (Search & Display)',
                    description: 'Targeted search campaigns, display banners & remarketing on Google network',
                    icon: Globe,
                },
                {
                    title: 'Bi-Weekly Reports',
                    description: 'Detailed PDF + budget reallocation guidance every two weeks',
                    icon: FileText,
                },
            ],
            pills: ['10 Creatives', '4 Video Ads', 'AI Images', 'Pixel + GTM', 'Retargeting', 'SEO'],
            platformLabel: 'Platforms',
            platformValue: 'Meta Ads + Google Ads (Search, Display)',
            accent: 'var(--accent-warm)',
            bgAccent: 'rgba(119, 185, 62, 0.12)',
            popular: true,
        },
        {
            name: 'Premium Package',
            description: 'For brands that want full-funnel dominance, AI automation & aggressive multi-platform growth.',
            price: '$2,000',
            features: [
                {
                    title: 'Everything in Standard',
                    description: 'Plus all Premium-level upgrades below',
                    icon: Check,
                },
                {
                    title: 'AI Video Ads',
                    description: '8 AI-generated & edited video ads/month - UGC-style, product demos, testimonials & reels with motion graphics',
                    icon: Video,
                },
                {
                    title: 'Full-Funnel Strategy',
                    description: 'Awareness -> consideration -> conversion -> retention · dynamic product ads & shopping catalogue setup',
                    icon: Layers,
                },
                {
                    title: 'CRM Automation + AI',
                    description: 'AI chatbots, WhatsApp automation flows (Whatflow), lead nurturing & custom CRM integrations',
                    icon: Bot,
                },
                {
                    title: 'Premium Creative Direction',
                    description: 'Motion graphics, branded video production, UGC-style content & influencer brief packs',
                    icon: WandSparkles,
                },
                {
                    title: 'Advanced Audience Segmentation',
                    description: 'Custom audiences + lookalike (1%, 3%, 5%) · landing page UX & CRO review',
                    icon: UserRoundSearch,
                },
                {
                    title: 'Weekly Reports + Live Dashboard',
                    description: 'Real-time performance dashboard · weekly PDF · continuous optimisation - zero black boxes',
                    icon: LayoutDashboard,
                },
                {
                    title: 'Dedicated Senior Strategist',
                    description: '1-on-1 monthly growth consultation · priority support · strategy reviews every 2 weeks',
                    icon: UserStar,
                },
                {
                    title: 'Web Development Support',
                    description: 'Landing page builds, Shopify store optimisation & conversion-focused web updates',
                    icon: MonitorSmartphone,
                },
            ],
            pills: ['8 AI Video Ads', 'CRM + AI', 'Full Funnel', 'Motion Graphics', 'Live Dashboard', 'Web Dev'],
            platformLabel: 'Platforms',
            platformValue: 'Meta Ads + Google Ads + SEO + CRM + Web',
            accent: 'var(--accent-coral)',
            bgAccent: 'rgba(244, 63, 94, 0.12)',
        },
    ];

    return (
        <section className="relative py-10 lg:py-14 overflow-hidden" style={{ background: 'var(--bg-primary)' }}>
            <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{ background: 'var(--gradient-ambient)' }}
            />

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

                            <p
                                className="text-sm mb-6 min-h-12"
                                style={{
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.6'
                                }}
                            >
                                {plan.description}
                            </p>

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

                            <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(90deg, transparent, var(--border-card), transparent)' }} />

                            <ul className="space-y-3.5 mb-8 grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start gap-3 text-sm">
                                        <div
                                            className="mt-1 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                                            style={{ background: plan.bgAccent }}
                                        >
                                            <feature.icon className="w-2.5 h-2.5" style={{ color: plan.accent }} />
                                        </div>
                                        <div>
                                            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>{feature.title}</p>
                                            <p style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div className="mb-6 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    {plan.pills.map((pill, pillIndex) => (
                                        <span
                                            key={`${pill}-${pillIndex}`}
                                            className="px-3 py-1 rounded-full text-xs"
                                            style={{
                                                fontFamily: 'var(--font-display)',
                                                color: plan.accent,
                                                background: plan.bgAccent
                                            }}
                                        >
                                            {pill}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    className="rounded-md px-3.5 py-3"
                                    style={{
                                        background: `color-mix(in srgb, ${plan.accent} 10%, var(--bg-card-default))`,
                                        border: `1px solid color-mix(in srgb, ${plan.accent} 25%, transparent)`
                                    }}
                                >
                                    <p
                                        className="text-xs uppercase tracking-wider mb-1"
                                        style={{
                                            fontFamily: 'var(--font-mono)',
                                            color: plan.accent
                                        }}
                                    >
                                        {plan.platformLabel}
                                    </p>
                                    <p style={{ color: 'var(--text-primary)' }}>{plan.platformValue}</p>
                                </div>
                            </div>

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
                                    onClick={() => scrollToContact(plan.name, packageBudgets[plan.name])}
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
                                    onClick={scrollToCustom}
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


