"use client";

import { FaPhone, FaWhatsapp } from "react-icons/fa";

const PHONE = "923706037115";

type FloatingCTAProps = {
  href: string;
  ariaLabel: string;
  glowColor: string;
  buttonClassName: string;
  icon: React.ReactNode;
  external?: boolean;
};

function FloatingCTAButton({
  href,
  ariaLabel,
  glowColor,
  buttonClassName,
  icon,
  external = false,
}: FloatingCTAProps) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      aria-label={ariaLabel}
      className="fixed bottom-5 right-5 z-[90] group"
    >
      <span
        className="pointer-events-none absolute inset-0 -z-10 rounded-full opacity-60 blur-md animate-pulse"
        style={{ background: glowColor }}
        aria-hidden="true"
      />
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-300 group-hover:-translate-y-0.5 ${buttonClassName}`}
      >
        {icon}
      </span>
    </a>
  );
}

export function FloatingWhatsApp() {
  return (
    <FloatingCTAButton
      href={`https://wa.me/${PHONE}`}
      ariaLabel="Chat on WhatsApp"
      glowColor="rgba(37, 211, 102, 0.45)"
      buttonClassName="bg-gradient-to-br from-[#25D366] to-[#128C7E] shadow-[0_12px_30px_rgba(18,140,126,0.4)] group-hover:shadow-[0_18px_36px_rgba(18,140,126,0.48)]"
      external
      icon={<FaWhatsapp className="h-5 w-5 shrink-0" />}
    />
  );
}

export function FloatingCall() {
  return (
    <FloatingCTAButton
      href={`tel:+${PHONE}`}
      ariaLabel="Call us"
      glowColor="rgba(59, 130, 246, 0.45)"
      buttonClassName="bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] shadow-[0_12px_30px_rgba(29,78,216,0.4)] group-hover:shadow-[0_18px_36px_rgba(29,78,216,0.48)]"
      icon={<FaPhone className="h-5 w-5 shrink-0" />}
    />
  );
}
