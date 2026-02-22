"use client";

import Link from "next/link";
import Container from "./Container";

const Footer = () => {
  const openCookieSettings = () => {
    window.dispatchEvent(new Event("open-cookie-settings"));
  };

  return (
    <footer className="border-t border-border py-16">
      <Container>
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}>
              Pavlo Pohuliailo
            </p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">Crafting thoughtful digital experiences with clarity and precision.</p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">Navigate</p>
              <Link href="/about" className="block text-muted-foreground transition-colors hover:text-foreground">About</Link>
              <Link href="/projects" className="block text-muted-foreground transition-colors hover:text-foreground">Projects</Link>
              <Link href="/services" className="block text-muted-foreground transition-colors hover:text-foreground">Services</Link>
            </div>
            <div className="space-y-3">
              <p className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground/60">Connect</p>
              <Link href="/contact" className="block text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground transition-colors hover:text-foreground">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="block text-muted-foreground transition-colors hover:text-foreground">GitHub</a>
              <Link href="/privacy" className="block text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
              <button type="button" onClick={openCookieSettings} className="block text-muted-foreground transition-colors hover:text-foreground">
                Cookie settings
              </button>
            </div>
          </div>
        </div>
        <div className="section-divider mt-12 mb-6" />
        <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Pavlo Pohuliailo. All rights reserved.</p>
          <p>Built for showcasing work and contacting.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
