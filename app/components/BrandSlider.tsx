"use client";

import React from 'react';

const BrandSlider = () => {
    const brands = [
        "tideimmigration.com",
        "hvok.co.uk",
        "everskilleducation.co.uk",
        "puresparkcleaners.com",
        "ukbusinessloanexpert.com",
        "smartmoveimmigration.co.uk",
        "acjaccountants.com",
        "bagsvilla.pk",
        "fashacosmetics.com",
        "digitalbazzar.shop",
        "bookkeepingsavvy.co",
        "amw-fm.com",
        "eurosportskit.com",
        "estimatespro.com",
        "smokerslane1.com",
        "simplydivines.com",
        "adzzly.com",
        "tinytotcares.com",
        "gulerang.us",
    ];

    const brandColors = ["#0EA5E9", "#2DD4BF", "#4F46E5", "#F43F5E", "#10B981", "#EF4444", "#EC4899", "#F59E0B"];

    return (
        <section className="relative w-full overflow-hidden py-6 border-y border-[var(--border-subtle)]" style={{ background: 'var(--bg-primary)' }}>
            <div className="relative z-20 px-6 md:px-10 pb-4">
                <div className="flex items-center gap-4">
                    <span className="h-px flex-1 bg-[var(--border-subtle)]" />
                    <h3
                        className="text-base md:text-lg font-bold tracking-[0.1em] uppercase px-3 py-1 rounded-full"
                        style={{
                            fontFamily: 'var(--font-display)',
                            color: 'var(--text-primary)',
                            background: 'linear-gradient(135deg, rgba(212, 132, 26, 0.14), rgba(212, 132, 26, 0.05))',
                            border: '1px solid var(--border-subtle)'
                        }}
                    >
                        Our Clients
                    </h3>
                    <span className="h-px flex-1 bg-[var(--border-subtle)]" />
                </div>
            </div>

            {/* Gradient Masks for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-[var(--bg-primary)] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-[var(--bg-primary)] to-transparent" />

            <div className="flex w-max animate-scroll hover:[animation-play-state:paused]">
                {brands.map((brand, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-center mx-8 md:mx-12 group transition-all duration-300 hover:scale-110 cursor-pointer"
                    >
                        {/* Logo Placeholder */}
                        <div className="flex items-center gap-3 opacity-95 transition-all duration-500 group-hover:opacity-100">
                            <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-sm saturate-150"
                                style={{ backgroundColor: brandColors[index % brandColors.length] }}
                            >
                                {brand.charAt(0).toUpperCase()}
                            </div>
                            <span
                                className="text-lg font-bold tracking-tight"
                                style={{
                                    fontFamily: 'var(--font-display)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                {brand}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BrandSlider;
