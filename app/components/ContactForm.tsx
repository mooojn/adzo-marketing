"use client";

import { useEffect, useState } from "react";

const PACKAGE_BUDGETS: Record<string, string> = {
    "Basic Package": "$800 - $1,200",
    "Standard Package": "$1,500 - $1,800",
    "Premium Package": "$2,000 - $2,500",
};

export default function ContactForm() {
    const [fullName, setFullName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
    const [budget, setBudget] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [submitError, setSubmitError] = useState<string>("");
    const [packageToast, setPackageToast] = useState<string>("");

    const packages = [
        "Basic Package",
        "Standard Package",
        "Premium Package",
        "Custom Package",
    ];

    const budgetRanges = [
        "< $500",
        "$800 - $1,200",
        "$1,500 - $1,800",
        "$2,000 - $2,500",
    ];

    useEffect(() => {
        const storedPackage = sessionStorage.getItem("contact-package");
        if (storedPackage && packages.includes(storedPackage)) {
            setSelectedPackage(storedPackage);
            sessionStorage.removeItem("contact-package");
        }

        const storedBudget = sessionStorage.getItem("contact-budget");
        if (storedBudget && budgetRanges.includes(storedBudget)) {
            setBudget(storedBudget);
            sessionStorage.removeItem("contact-budget");
        }

        const handlePackageEvent = (event: Event) => {
            const customEvent = event as CustomEvent<string>;
            if (customEvent.detail && packages.includes(customEvent.detail)) {
                setSelectedPackage(customEvent.detail);
            }
        };

        const handleSelectionEvent = (event: Event) => {
            const customEvent = event as CustomEvent<{ package?: string; budget?: string }>;
            if (customEvent.detail?.package && packages.includes(customEvent.detail.package)) {
                setSelectedPackage(customEvent.detail.package);
            }
            if (customEvent.detail?.budget && budgetRanges.includes(customEvent.detail.budget)) {
                setBudget(customEvent.detail.budget);
            }
        };

        window.addEventListener("contact-package", handlePackageEvent);
        window.addEventListener("contact-selection", handleSelectionEvent);
        return () => {
            window.removeEventListener("contact-package", handlePackageEvent);
            window.removeEventListener("contact-selection", handleSelectionEvent);
        };
    }, []);

    useEffect(() => {
        if (!selectedPackage) return;

        const mappedBudget = PACKAGE_BUDGETS[selectedPackage];
        if (mappedBudget) {
            setBudget(mappedBudget);
        }

        setPackageToast(`${selectedPackage} selected`);
        const toastTimer = window.setTimeout(() => setPackageToast(""), 2200);
        return () => window.clearTimeout(toastTimer);
    }, [selectedPackage]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (!fullName.trim() || !phoneNumber.trim()) {
            setSubmitError("Please enter your full name and phone number.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    formType: "contact",
                    source: "Contact Form",
                    fullName: fullName.trim(),
                    phoneNumber: phoneNumber.trim(),
                    selectedPackage: selectedPackage ?? "Not selected",
                    budget: budget || "Not selected",
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to submit");
            }

            setSubmitted(true);
            setFullName("");
            setPhoneNumber("");
            setSelectedPackage(null);
            setBudget("");
        } catch {
            setSubmitError("Could not submit right now. Please try again in a moment.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact-form" className="relative py-8 lg:py-10 overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
            {/* Background Gradients */}
            <div
                className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.08), transparent 40%),
                                 radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08), transparent 40%)`
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Side: Copy */}
                    <div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px w-12" style={{ background: 'var(--accent-warm)' }} />
                            <span
                                className="text-sm font-semibold tracking-wide uppercase"
                                style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-warm)' }}
                            >
                                Get Started
                            </span>
                        </div>

                        <h2
                            className="text-4xl lg:text-5xl font-bold leading-tight mb-6"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                        >
                            Let's Build Something <br />
                            <span style={{ color: 'var(--accent-warm)' }}>Extraordinary</span>
                        </h2>

                        <p
                            className="text-lg leading-relaxed mb-10"
                            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)' }}
                        >
                            Ready to transform your digital presence? Fill out the form, and let's discuss how we can help you achieve your goals with our expert marketing solutions.
                        </p>

                        {/* Contact Highlights */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(79, 70, 229, 0.1)' }}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent-warm)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Call Us Directly</p>
                                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>+1 (307) 215-9781</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(79, 70, 229, 0.1)' }}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent-warm)' }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Email Us</p>
                                    <p className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>info@adzomarketing.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form */}
                    <div
                        className="relative p-8 lg:p-10 rounded-3xl"
                        style={{
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            boxShadow: 'var(--shadow-card)'
                        }}
                    >
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            {packageToast ? (
                                <div className="flex justify-center">
                                    <div
                                        className="px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold"
                                        style={{
                                            background: "var(--bg-input)",
                                            color: "var(--accent-warm)",
                                            border: "1px solid var(--border-subtle)",
                                        }}
                                    >
                                        {packageToast}
                                    </div>
                                </div>
                            ) : null}
                            {/* Personal Info */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-[var(--text-primary)]">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Tony Stark"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        required
                                        className="w-full px-4 py-4 rounded-xl text-base outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] border border-[var(--border-subtle)] focus:border-transparent focus:ring-2"
                                        style={{
                                            background: 'var(--bg-input)',
                                            color: 'var(--text-primary)',
                                            '--tw-ring-color': 'var(--accent-warm)'
                                        } as React.CSSProperties}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2 uppercase tracking-wide text-[var(--text-primary)]">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="+1 (555) 123-4567"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                        className="w-full px-4 py-4 rounded-xl text-base outline-none transition-all duration-300 placeholder:text-[var(--text-muted)] border border-[var(--border-subtle)] focus:border-transparent focus:ring-2"
                                        style={{
                                            background: 'var(--bg-input)',
                                            color: 'var(--text-primary)',
                                            '--tw-ring-color': 'var(--accent-warm)'
                                        } as React.CSSProperties}
                                    />
                                </div>
                            </div>

                            {/* Package Selection */}
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide text-[var(--text-primary)]">Select Package</label>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    {packages.map((pkg) => (
                                        <button
                                            key={pkg}
                                            type="button"
                                            data-package={pkg}
                                            onClick={() => setSelectedPackage(pkg)}
                                            className="px-4 py-3 rounded-lg text-sm text-center transition-all duration-300 border font-medium"
                                            style={{
                                                background: selectedPackage === pkg ? 'var(--accent-warm)' : 'var(--bg-input)',
                                                borderColor: selectedPackage === pkg ? 'var(--accent-warm)' : 'var(--border-subtle)',
                                                color: selectedPackage === pkg ? '#FFFFFF' : 'var(--text-muted)'
                                            }}
                                        >
                                            {pkg}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Budget Selection */}
                            <div>
                                <label className="block text-sm font-bold mb-3 uppercase tracking-wide text-[var(--text-primary)]">Estimated Budget</label>
                                <div className="flex flex-wrap gap-3">
                                    {budgetRanges.map((range) => (
                                        <button
                                            key={range}
                                            type="button"
                                            data-budget={range}
                                            onClick={() => setBudget(range)}
                                            className="px-2 py-2 rounded-full text-sm font-medium transition-all duration-300 border"
                                            style={{
                                                background: budget === range ? 'rgba(119, 185, 62, 0.1)' : 'var(--bg-input)',
                                                borderColor: budget === range ? 'var(--accent-warm)' : 'var(--border-subtle)',
                                                color: budget === range ? 'var(--accent-warm)' : 'var(--text-muted)'
                                            }}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full py-5 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden relative group"
                                style={{
                                    background: 'var(--accent-warm)',
                                    color: '#FFFFFF'
                                }}
                                disabled={isSubmitting}
                            >
                                <span className="relative z-10">{isSubmitting ? "Sending..." : "Get Your Free Quote"}</span>
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: 'linear-gradient(45deg, var(--accent-warm), var(--accent-coral))' }}
                                />
                            </button>
                            {submitError ? (
                                <p className="text-sm text-red-500">{submitError}</p>
                            ) : null}
                            {submitted ? (
                                <p className="text-sm font-semibold" style={{ color: 'var(--accent-warm)' }}>
                                    Submission received. We will contact you shortly.
                                </p>
                            ) : null}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
