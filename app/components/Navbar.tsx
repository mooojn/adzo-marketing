"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll(); // Check initial scroll position
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/#services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const isActive = (item: { name: string; href: string }) => {
        if (item.name === "Home") return pathname === "/";
        if (item.name === "Services") return false;
        return (
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href) && item.href !== "/#services")
        );
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${isScrolled ? "py-3" : "py-5"
                }`}
        >
            {/* Glass Background Layer */}
            <div
                className={`absolute inset-0 transition-all duration-300 ease-in-out ${isScrolled || isMobileMenuOpen
                    ? "bg-[var(--bg-navbar)] backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border-b border-[var(--border-light)]"
                    : "bg-transparent"
                    }`}
            />

            <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex flex-shrink-0 items-center gap-2 transition-transform duration-300 hover:scale-105 select-none"
                    >
                        <img
                            src="/logo.png"
                            alt="Adzzly Logo"
                            className="h-14 md:h-16 w-auto object-contain transition-all duration-300 dark:brightness-110"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-center space-x-1 lg:space-x-2">
                        {navItems.map((item) => {
                            const active = isActive(item);
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`relative px-5 py-2.5 text-[0.95rem] font-medium rounded-full transition-all duration-300 group
                                        ${active ? "text-[var(--accent-warm)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"}
                                    `}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    {/* Hover / Active Background */}
                                    <span
                                        className={`absolute inset-0 rounded-full bg-[var(--bg-secondary)] scale-50 opacity-0 transition-all duration-300 origin-center
                                            group-hover:scale-100 group-hover:opacity-100
                                            ${active ? "bg-[var(--accent-warm)]/10 scale-100 opacity-100" : ""}
                                        `}
                                    />
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <ThemeToggle />
                        <Link target="_blank" href="https://wa.me/+13072159781" className="group relative">
                            <span className="absolute inset-0 rounded-full bg-[var(--accent-warm)] blur-md opacity-30 transition-opacity duration-300 group-hover:opacity-60"></span>
                            <button className="relative px-7 py-3 bg-[var(--accent-warm)] text-white text-sm font-semibold rounded-full shadow-sm transition-transform duration-300 transform group-hover:-translate-y-0.5 group-active:translate-y-0 group-hover:shadow-md">
                                Let's Talk
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu & Toggle Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            className="relative z-50 p-2 text-[var(--text-primary)] focus:outline-none transition-transform duration-300 active:scale-95"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <div className="relative w-6 h-6 flex items-center justify-center">
                                <div className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                                    <Menu className="w-6 h-6" />
                                </div>
                                <div className={`absolute transition-all duration-300 ${isMobileMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
                                    <X className="w-6 h-6" />
                                </div>
                            </div>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`absolute top-full left-0 right-0 bg-[var(--bg-navbar)] backdrop-blur-xl border-b border-[var(--border-light)] shadow-xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden
                    ${isMobileMenuOpen ? "max-h-[100vh] opacity-100 pb-8" : "max-h-0 opacity-0"}
                `}
            >
                <div className="flex flex-col px-6 pt-6 space-y-3">
                    {navItems.map((item, index) => {
                        const active = isActive(item);
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-xl font-medium py-3 px-4 rounded-2xl transition-all duration-300 flex items-center
                                    ${active ? "text-[var(--accent-warm)] bg-[var(--accent-warm)]/10" : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}
                                    ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                                `}
                                style={{ transitionDelay: `${index * 50}ms` }}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        );
                    })}

                    <div
                        className={`pt-6 pb-2 transition-all duration-500 delay-200
                            ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                        `}
                    >
                        <Link target="_blank" href="https://wa.me/+13072159781" onClick={() => setIsMobileMenuOpen(false)}>
                            <button className="w-full py-4 text-center rounded-2xl bg-[var(--accent-warm)] text-white font-semibold text-lg shadow-[0_8px_20px_0_rgba(119,185,62,0.3)] transition-transform active:scale-95">
                                Let's Talk
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
