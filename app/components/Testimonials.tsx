"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

const PANEL_COUNT = 2;

const audioTestimonials = [
    {
        src: "/testimonials/audio/audio1.opus",
        title: "UK Client",
        subtitle: "Hear how we helped grow their online presence and leads.",
        accent: "var(--accent-warm)",
    },
    {
        src: "/testimonials/audio/audio2.opus",
        title: "UK Business Owner",
        subtitle: "Real feedback on working with the AdzoMarketing team.",
        accent: "var(--accent-sage)",
    },
];

const textTestimonials = [
    {
        quote: "AdzoMarketing transformed our online presence completely. Their strategic approach to digital marketing doubled our leads in just three months.",
        author: "Sarah Jenkins",
        role: "Marketing Director",
        company: "TechFlow",
        rating: 5.0,
        accent: "var(--accent-warm)",
    },
    {
        quote: "The website they built for us is not only stunning but also incredibly fast. Our bounce rate dropped by 40% immediately after launch.",
        author: "Michael Chen",
        role: "CEO",
        company: "Vertex Innovations",
        rating: 4.8,
        accent: "var(--accent-sage)",
    },
    {
        quote: "Professional, creative, and data-driven. The team at AdzoMarketing really understands how to connect with audiences in the digital age.",
        author: "Emma Rodriguez",
        role: "Founder",
        company: "Spherule",
        rating: 4.7,
        accent: "var(--accent-coral)",
    },
];

function formatTime(seconds: number) {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

type AudioCardProps = {
    src: string;
    title: string;
    subtitle: string;
    accent: string;
    isPlaying: boolean;
    onToggle: () => void;
    onEnded: () => void;
    registerAudio: (el: HTMLAudioElement | null) => void;
};

function AudioCard({
    src,
    title,
    subtitle,
    accent,
    isPlaying,
    onToggle,
    onEnded,
    registerAudio,
}: AudioCardProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        registerAudio(audioRef.current);
    }, [registerAudio]);

    const onTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        setCurrent(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
    };

    const onLoadedMetadata = () => {
        const audio = audioRef.current;
        if (audio) setDuration(audio.duration);
    };

    const onSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio || !audio.duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
        audio.currentTime = ratio * audio.duration;
        setProgress(ratio * 100);
        setCurrent(audio.currentTime);
    };

    const bars = [0.35, 0.65, 0.45, 0.85, 0.55, 0.75, 0.4, 0.9, 0.5, 0.7, 0.6, 0.8];

    return (
        <article
            className="group relative flex flex-col overflow-hidden rounded-2xl p-6 lg:p-8 transition-all duration-500 hover:-translate-y-1"
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                boxShadow: "var(--shadow-card)",
            }}
        >
            <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20 blur-2xl"
                style={{ background: accent }}
            />

            <div className="mb-5 flex items-center justify-between gap-3">
                <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
                    style={{
                        fontFamily: "var(--font-mono)",
                        color: accent,
                        background: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                    }}
                >
                    <span aria-hidden>🇬🇧</span>
                    Voice testimonial
                </span>
                <span
                    className="text-xs font-medium tabular-nums"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                >
                    {formatTime(current)} / {formatTime(duration)}
                </span>
            </div>

            <h3
                className="mb-2 text-xl font-bold"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
            >
                {title}
            </h3>
            <p
                className="mb-6 text-sm leading-relaxed"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}
            >
                {subtitle}
            </p>

            <div className="mb-5 flex h-12 items-end justify-center gap-1 px-2">
                {bars.map((h, i) => (
                    <span
                        key={i}
                        className="w-1.5 rounded-full transition-all duration-300"
                        style={{
                            height: `${h * 100}%`,
                            background: accent,
                            opacity: isPlaying ? 0.9 : 0.35,
                            animation: isPlaying ? `testimonialAudioBar 0.8s ease-in-out ${i * 0.06}s infinite alternate` : "none",
                        }}
                    />
                ))}
            </div>

            <div className="mt-auto flex items-center gap-4">
                <button
                    type="button"
                    onClick={onToggle}
                    aria-label={isPlaying ? "Pause testimonial" : "Play testimonial"}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-105"
                    style={{ background: accent }}
                >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
                </button>

                <div
                    role="slider"
                    aria-label="Playback progress"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progress)}
                    className="relative h-2 flex-1 cursor-pointer overflow-hidden rounded-full"
                    style={{ background: "var(--border-subtle)" }}
                    onClick={onSeek}
                >
                    <div
                        className="absolute inset-y-0 left-0 rounded-full transition-[width] duration-150"
                        style={{ width: `${progress}%`, background: accent }}
                    />
                </div>
            </div>

            <audio
                ref={audioRef}
                src={src}
                preload="metadata"
                onTimeUpdate={onTimeUpdate}
                onLoadedMetadata={onLoadedMetadata}
                onEnded={onEnded}
                className="sr-only"
            />

            <div
                className="absolute bottom-0 left-0 h-1 w-0 transition-all duration-500 group-hover:w-full"
                style={{ background: accent }}
            />
        </article>
    );
}

type TextCardProps = {
    quote: string;
    author: string;
    role: string;
    company: string;
    rating: number;
    accent: string;
    isHovered: boolean;
    onEnter: () => void;
    onLeave: () => void;
};

function TextTestimonialCard({
    quote,
    author,
    role,
    company,
    rating,
    accent,
    isHovered,
    onEnter,
    onLeave,
}: TextCardProps) {
    return (
        <div
            className="group relative min-w-0 overflow-hidden rounded-2xl p-6 transition-all duration-500 md:p-8"
            style={{
                background: "var(--bg-card)",
                border: "1px solid var(--border-subtle)",
                boxShadow: isHovered ? "var(--shadow-card)" : "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
                transform: isHovered ? "translateY(-5px)" : "translateY(0)",
            }}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <div className="mb-8">
                <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ color: accent, opacity: 0.3 }}
                >
                    <path
                        d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <p
                className="mb-8 break-words text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}
            >
                &ldquo;{quote}&rdquo;
            </p>

            <div className="mb-8 flex items-center justify-between">
                <Stars rating={rating} />
                <span
                    className="text-sm font-semibold"
                    style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
                >
                    {rating.toFixed(1)}/5
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: accent }}
                >
                    {author.charAt(0)}
                </div>
                <div>
                    <h4
                        className="text-sm font-bold"
                        style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                    >
                        {author}
                    </h4>
                    <p
                        className="text-xs"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    >
                        {role}, {company}
                    </p>
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out"
                style={{ width: isHovered ? "100%" : "0%", background: accent }}
            />
        </div>
    );
}

function Stars({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
            {[...Array(fullStars)].map((_, i) => (
                <span key={`full-${i}`} className="text-base leading-none" style={{ color: "#F59E0B" }}>
                    ★
                </span>
            ))}
            {hasHalfStar && (
                <span key="half" className="text-base leading-none" style={{ color: "#F59E0B", opacity: 0.6 }}>
                    ★
                </span>
            )}
            {[...Array(emptyStars)].map((_, i) => (
                <span key={`empty-${i}`} className="text-base leading-none" style={{ color: "var(--border-subtle)" }}>
                    ★
                </span>
            ))}
        </div>
    );
}

const Testimonials = () => {
    const [panel, setPanel] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);
    const audioElements = useRef<(HTMLAudioElement | null)[]>([]);
    const carouselRef = useRef<HTMLDivElement | null>(null);
    const wheelLock = useRef(false);

    const goToPanel = useCallback((next: number) => {
        setPanel(((next % PANEL_COUNT) + PANEL_COUNT) % PANEL_COUNT);
        audioElements.current.forEach((audio) => audio?.pause());
        setPlayingIndex(null);
    }, []);

    const goNext = useCallback(() => goToPanel(panel + 1), [goToPanel, panel]);
    const goPrev = useCallback(() => goToPanel(panel - 1), [goToPanel, panel]);

    const pauseAll = useCallback(() => {
        audioElements.current.forEach((audio) => audio?.pause());
        setPlayingIndex(null);
    }, []);

    const toggleAudio = useCallback(
        (index: number) => {
            const audio = audioElements.current[index];
            if (!audio) return;

            if (playingIndex === index) {
                audio.pause();
                setPlayingIndex(null);
                return;
            }

            audioElements.current.forEach((el, i) => {
                if (i !== index) el?.pause();
            });
            void audio.play();
            setPlayingIndex(index);
        },
        [playingIndex]
    );

    const registerAudio = useCallback((index: number, el: HTMLAudioElement | null) => {
        audioElements.current[index] = el;
    }, []);

    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") goNext();
            if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [goNext, goPrev]);

    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 24) return;
            e.preventDefault();
            if (wheelLock.current) return;
            wheelLock.current = true;
            if (e.deltaY > 0) goNext();
            else goPrev();
            window.setTimeout(() => {
                wheelLock.current = false;
            }, 750);
        };

        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, [goNext, goPrev]);

    const panelLabels = ["Voice testimonials", "Written reviews"];

    return (
        <section className="relative overflow-hidden py-8 lg:py-10" style={{ background: "var(--bg-secondary)" }}>
            <div
                className="pointer-events-none absolute top-0 right-0 h-full w-1/3 opacity-5"
                style={{
                    background: "radial-gradient(circle at 100% 50%, var(--accent-warm), transparent 70%)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
                <div className="mb-10 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-3xl">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="h-px w-12" style={{ background: "var(--accent-warm)" }} />
                            <span
                                className="text-sm font-semibold uppercase tracking-wide"
                                style={{ fontFamily: "var(--font-display)", color: "var(--accent-warm)" }}
                            >
                                Testimonials
                            </span>
                        </div>

                        <h2
                            className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-primary)" }}
                        >
                            What Our Clients <span style={{ color: "var(--accent-warm)" }}>Say</span>
                        </h2>
                        <p
                            className="mt-4 max-w-xl text-base"
                            style={{ fontFamily: "var(--font-display)", color: "var(--text-muted)" }}
                        >
                            Listen to UK clients in their own words, or scroll through written reviews.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={goPrev}
                            aria-label="Previous testimonials"
                            className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: "var(--bg-card)",
                                border: "1px solid var(--border-subtle)",
                                color: "var(--text-primary)",
                            }}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            type="button"
                            onClick={goNext}
                            aria-label="Next testimonials"
                            className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:scale-105"
                            style={{
                                background: "var(--accent-warm)",
                                color: "#fff",
                                boxShadow: "0 8px 24px color-mix(in srgb, var(--accent-warm) 35%, transparent)",
                            }}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
                <div ref={carouselRef} className="w-full overflow-hidden rounded-3xl" onMouseLeave={pauseAll}>
                    <div
                        className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                            width: `${PANEL_COUNT * 100}%`,
                            transform: `translateX(-${(panel * 100) / PANEL_COUNT}%)`,
                        }}
                    >
                        <div
                            className="min-w-0 shrink-0 overflow-hidden px-0.5"
                            style={{ width: `${100 / PANEL_COUNT}%` }}
                        >
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                                {audioTestimonials.map((item, index) => (
                                    <AudioCard
                                        key={item.src}
                                        {...item}
                                        isPlaying={playingIndex === index}
                                        onToggle={() => toggleAudio(index)}
                                        onEnded={() => setPlayingIndex(null)}
                                        registerAudio={(el) => registerAudio(index, el)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div
                            className="min-w-0 shrink-0 overflow-hidden px-0.5"
                            style={{ width: `${100 / PANEL_COUNT}%` }}
                        >
                            <div className="grid min-w-0 grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
                                {textTestimonials.map((testimonial, index) => (
                                    <TextTestimonialCard
                                        key={testimonial.author}
                                        {...testimonial}
                                        isHovered={hoveredIndex === index}
                                        onEnter={() => setHoveredIndex(index)}
                                        onLeave={() => setHoveredIndex(null)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                    <div className="flex items-center gap-2">
                        {panelLabels.map((label, index) => (
                            <button
                                key={label}
                                type="button"
                                onClick={() => goToPanel(index)}
                                aria-label={`Go to ${label}`}
                                aria-current={panel === index ? "true" : undefined}
                                className="h-2.5 rounded-full transition-all duration-300"
                                style={{
                                    width: panel === index ? "2rem" : "0.625rem",
                                    background:
                                        panel === index
                                            ? "var(--accent-warm)"
                                            : "color-mix(in srgb, var(--text-muted) 35%, transparent)",
                                }}
                            />
                        ))}
                    </div>
                    <p
                        className="text-xs font-medium uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}
                    >
                        {panelLabels[panel]} · scroll to explore
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;

