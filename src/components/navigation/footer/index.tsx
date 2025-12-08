"use client";

import Link from "next/link";
import Image from "next/image";
import { useFooterViewModel } from "./useViewModel";
import logo from "@/assets/images/home-n-drive-logo.png";

export const Footer = () => {
    const { currentYear, legalLinks, servicesLinks, companyLinks } = useFooterViewModel();

    return (
        <footer className="w-full bg-[var(--color-bg)] border-t border-[var(--color-border)]">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Image src={logo} alt="HomeNDrive Logo" width={40} height={40} />
                            <span className="text-lg font-bold text-[var(--color-foreground)]">HomeNDrive</span>
                        </div>
                        <p className="text-sm text-[var(--color-muted-foreground)] leading-relaxed">
                            Your trusted platform for buying and selling properties and vehicles. Connect with verified sellers and find your perfect
                            match.
                        </p>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-4">Legal</h3>
                        <ul className="flex flex-col gap-3">
                            {legalLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-brand)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-4">Services</h3>
                        <ul className="flex flex-col gap-3">
                            {servicesLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-brand)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-base font-semibold text-[var(--color-foreground)] mb-4">Company</h3>
                        <ul className="flex flex-col gap-3">
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[var(--color-muted-foreground)] hover:text-[var(--color-brand)] transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[var(--color-border)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-[var(--color-muted-foreground)]">© {currentYear} HomeNDrive. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};
