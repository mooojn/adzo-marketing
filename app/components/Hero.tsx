"use client";

import { useEffect, useState } from "react";

interface FormData {
  phone: string;
  name: string;
  site: string;
}

interface Stat {
  number: string;
  label: string;
}

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ phone: "", name: "", site: "" });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const nextErrors: Partial<FormData> = {};
    const phone = formData.phone.trim();

    if (!phone) {
      nextErrors.phone = "Phone is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "hero",
          source: "Hero Form",
          phone: formData.phone.trim(),
          name: formData.name.trim(),
          site: formData.site.trim(),
        }),
      });

      if (!response.ok) {
        const errorPayload = (await response.json().catch(() => null)) as
          | { error?: string; details?: string }
          | null;
        const detail = errorPayload?.details ? ` ${errorPayload.details}` : "";
        throw new Error(errorPayload?.error ? `${errorPayload.error}.${detail}` : "Failed to submit.");
      }

      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error && err.message
          ? err.message
          : "Could not submit right now. Please try again in a moment."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const stats: Stat[] = [
    { number: "150+", label: "Brands Scaled" },
    { number: "1M+", label: "Traffic Generated" },
    { number: "100+", label: "Campaigns Scaled" },
    { number: "4.9/5", label: "Client Rating" },
  ];

  // const proofItems: string[] = ["No long-term contracts", "Weekly performance reporting"];

  const platforms = [
    { name: "Google", key: "google" },
    { name: "Trustpilot", key: "trustpilot" },
    { name: "Clutch", key: "clutch" },
  ] as const;

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[var(--bg-primary)]"
      aria-label="Hero section"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "var(--gradient-ambient)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-55deg, transparent, transparent 80px, rgba(119,185,62,0.035) 80px, rgba(119,185,62,0.035) 81px)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -top-32 right-0 h-[560px] w-[560px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-warm) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-80 w-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-sage) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-20 pb-28 lg:flex-row lg:items-center lg:gap-16 lg:px-12 lg:pb-24 xl:px-16">
        <div
          className={`flex flex-col items-start transition-all duration-700 lg:flex-1 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
        >
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--accent-warm)]/10 px-4 py-1.5"
            style={{ transitionDelay: "0.1s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent-warm)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent-warm)]" />
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-widest text-[var(--accent-warm)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Performance Marketing Partner
            </span>
          </div>

          <h1
            className="mb-5 text-[clamp(2rem,3.8vw,3.35rem)] font-extrabold leading-[1.08] tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="text-[var(--accent-warm)]">Performance marketing</span> that turns clicks into revenue.
          </h1>

          <p
            className="mb-7 max-w-xl text-base leading-[1.75] text-[var(--text-muted)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We launch and optimize campaigns that bring qualified leads, lower acquisition costs,
            and prove ROI weekly. <span className="font-semibold text-[var(--text-primary)]">Get your free growth plan in 48 hours.</span>
          </p>

          {/* <ul className="mb-8 grid w-full max-w-xl gap-2.5 sm:grid-cols-2">
            {proofItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                <span
                  className="mt-[2px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-warm)]/20 text-[10px] font-bold text-[var(--accent-warm)]"
                  aria-hidden="true"
                >
                  v
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul> */}

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 text-[var(--accent-gold)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-[var(--text-primary)]">{stats[3].number}/5</span>
              <span className="text-xs text-[var(--text-muted)]">from clients</span>
            </div>

            <div className="hidden h-4 w-px bg-[var(--border-subtle)] sm:block" aria-hidden="true" />

            <p className="text-sm text-[var(--text-muted)]">
              <span className="font-bold text-[var(--text-primary)]">{stats[0].number}</span> brands scaled
            </p>

            <a
              href="#case-studies"
              className="group relative shrink-0 overflow-hidden rounded-full border border-[var(--accent-warm)]/35 bg-[var(--bg-card)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--text-primary)] shadow-[0_8px_24px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent-warm)] hover:shadow-[0_14px_30px_rgba(119,185,62,0.25)]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <span
                className="absolute inset-0 bg-gradient-to-r from-[var(--accent-warm)]/0 via-[var(--accent-warm)]/10 to-[var(--accent-sage)]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="relative flex items-center gap-1.5">
                See case studies
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M5 12h14m0 0l-4-4m4 4l-4 4" />
                </svg>
              </span>
            </a>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2.5">
            {platforms.map((platform) => (
              <span
                key={platform.key}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-1.5 shadow-sm"
                aria-label={`${platform.name} reviews`}
              >
                {platform.key === "google" && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21.35 12.24c0-.72-.06-1.24-.2-1.78H12v3.37h5.37c-.11.84-.7 2.1-2.01 2.95l-.02.11 2.92 2.22.2.02c1.83-1.65 2.89-4.09 2.89-6.89Z" fill="#4285F4" />
                    <path d="M12 21.5c2.63 0 4.84-.84 6.46-2.27l-3.08-2.35c-.82.56-1.92.95-3.38.95-2.58 0-4.77-1.67-5.55-3.99l-.11.01-3.04 2.3-.04.1C5 19.4 8.25 21.5 12 21.5Z" fill="#34A853" />
                    <path d="M6.45 13.84A5.83 5.83 0 0 1 6.13 12c0-.64.12-1.26.31-1.84l-.01-.12-3.07-2.34-.1.05A9.38 9.38 0 0 0 2.2 12c0 1.52.37 2.96 1.06 4.25l3.19-2.41Z" fill="#FBBC05" />
                    <path d="M12 6.18c1.83 0 3.07.77 3.77 1.42l2.75-2.63C16.84 3.45 14.63 2.5 12 2.5c-3.75 0-7 2.1-8.74 5.25l3.18 2.41c.79-2.32 2.98-3.98 5.56-3.98Z" fill="#EA4335" />
                  </svg>
                )}
                {platform.key === "trustpilot" && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="#00B67A" d="M12 2.5l2.77 5.62 6.2.9-4.48 4.36 1.06 6.18L12 16.76 6.45 19.56l1.06-6.18L3.03 9.02l6.2-.9L12 2.5Z" />
                  </svg>
                )}
                {platform.key === "clutch" && (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8.5" fill="none" stroke="#0F172A" strokeWidth="3" />
                    <circle cx="16.6" cy="7.4" r="2.4" fill="#EF4444" />
                  </svg>
                )}
                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)]"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {platform.name}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div
          className={`mt-12 w-full transition-all duration-700 lg:mt-0 lg:w-[420px] xl:w-[460px] ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          style={{ transitionDelay: "0.25s" }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-card)]/70 p-8 shadow-2xl backdrop-blur-xl"
            style={{ boxShadow: "0 32px 80px rgba(119,185,62,0.12), 0 8px 24px rgba(0,0,0,0.06)" }}
          >
            <div
              className="absolute left-0 top-0 h-1 w-full rounded-t-2xl"
              style={{ background: "linear-gradient(90deg, var(--accent-warm), var(--accent-sage))" }}
              aria-hidden="true"
            />

            {!submitted ? (
              <>
                <div className="mb-6">
                  <h2
                    className="text-[clamp(1.45rem,2.8vw,2rem)] font-extrabold leading-tight text-[var(--text-primary)]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Get <span className="text-[var(--accent-warm)]">Free 1 Week Service</span> of Ads
                  </h2>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] px-3 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--text-primary)]">Meta + Google</p>
                      <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Dual-platform launch</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--border-subtle)] bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] px-3 py-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--text-primary)]">Daily Tuning</p>
                      <p className="mt-0.5 text-[10px] text-[var(--text-muted)]">Lower cost, better leads</p>
                    </div>
                    <div className="rounded-2xl border border-[var(--accent-warm)]/35 bg-gradient-to-br from-[var(--accent-warm)]/12 to-[var(--bg-card)] px-3 py-2.5 shadow-[0_10px_24px_rgba(212,132,26,0.16)]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--accent-warm)]">7 Free Days</p>
                      <p className="mt-0.5 text-[10px] text-[var(--text-primary)]">No service fee in week 1</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} noValidate aria-label="Lead capture form">
                  <div className="mb-4">
                    <label
                      htmlFor="hero-phone"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Phone
                    </label>
                    <input
                      id="hero-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.phone)}
                      required
                      aria-required="true"
                      className={`
                        w-full rounded-xl border bg-[var(--bg-secondary)] px-4 py-3.5 text-sm text-[var(--text-primary)]
                        placeholder:text-[var(--text-muted)] outline-none transition-all duration-200
                        ${errors.phone
                          ? "border-red-400 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(248,113,113,0.2)]"
                          : "border-[var(--border-subtle)] focus:border-[var(--accent-warm)] focus:shadow-[0_0_0_3px_rgba(119,185,62,0.18)] hover:border-[var(--accent-warm)]/50"
                        }
                      `}
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                    {errors.phone ? <p className="mt-1 text-xs text-red-500">{errors.phone}</p> : null}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="hero-name"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Name (optional)
                    </label>
                    <input
                      id="hero-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Tony Stark"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 hover:border-[var(--accent-warm)]/50 focus:border-[var(--accent-warm)] focus:shadow-[0_0_0_3px_rgba(119,185,62,0.18)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="hero-site"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Site (optional)
                    </label>
                    <input
                      id="hero-site"
                      name="site"
                      type="text"
                      autoComplete="url"
                      placeholder="xyz.com"
                      value={formData.site}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] px-4 py-3.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none transition-all duration-200 hover:border-[var(--accent-warm)]/50 focus:border-[var(--accent-warm)] focus:shadow-[0_0_0_3px_rgba(119,185,62,0.18)]"
                      style={{ fontFamily: "var(--font-display)" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="
                      group relative w-full overflow-hidden rounded-xl px-6 py-4
                      text-sm font-bold uppercase tracking-[0.15em] text-white
                      transition-all duration-300
                      hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(119,185,62,0.45)]
                      active:translate-y-0 active:shadow-none
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-warm)] focus-visible:ring-offset-2
                    "
                    style={{
                      background: "linear-gradient(135deg, var(--accent-warm) 0%, var(--accent-sage) 100%)",
                      fontFamily: "var(--font-mono)",
                    }}
                    aria-label="Claim your free 1 week ads service"
                    disabled={isSubmitting}
                  >
                    <span
                      className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-500 group-hover:translate-x-full"
                      aria-hidden="true"
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? "Sending..." : "Claim My Free Service"}
                      <svg
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                  {submitError ? <p className="mt-2 text-xs text-red-500">{submitError}</p> : null}
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center py-8 text-center" role="status" aria-live="polite">
                <div
                  className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: "rgba(119,185,62,0.12)" }}
                >
                  <svg
                    className="h-8 w-8 text-[var(--accent-warm)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-display)" }}>
                  Your free 1 week ads service is reserved
                </h3>
                <p className="text-sm text-[var(--text-muted)]">
                  Check your inbox. Our team will contact you within <span className="font-semibold text-[var(--accent-warm)]">24 hours</span> to launch.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      <div
        className={`relative z-20 w-full transition-all duration-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        style={{
          transitionDelay: "0.55s",
          background: "linear-gradient(90deg, var(--accent-warm) 0%, var(--accent-sage) 100%)",
        }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center py-6 text-center md:py-7">
              <span
                className="text-2xl font-bold text-white sm:text-3xl md:text-[2rem]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.number}
              </span>
              <span
                className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/80 sm:text-xs"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
