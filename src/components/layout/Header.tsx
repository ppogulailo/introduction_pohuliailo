"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Container from "./Container";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "AI Chatbot", path: "/ai-chatbot" },
];

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 section-warm ${
          scrolled
            ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm shadow-foreground/3"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight text-foreground" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}>
            Pavlo Pohuliailo
          </Link>

          <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`link-underline px-4 py-2 text-[13px] font-medium tracking-wide uppercase transition-colors ${pathname === item.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/contact" className="btn-hover ml-4 inline-flex items-center rounded-full border border-foreground bg-foreground px-5 py-2 text-[13px] font-medium text-background transition-colors hover:bg-foreground/90">
              Let&apos;s talk
            </Link>
            <ThemeToggle className="ml-3" />
          </nav>

          <button onClick={() => setMobileOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground sm:hidden" aria-label="Open menu">
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </Container>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-100 flex flex-col bg-background">
          <Container className="flex h-20 items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-foreground"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700 }}
              onClick={() => setMobileOpen(false)}
            >
              Person_Name
            </Link>
            <button onClick={() => setMobileOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground" aria-label="Close menu">
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </Container>
          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {[...navItems, { label: "Contact", path: "/contact" }].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileOpen(false)}
                className={`text-3xl font-semibold transition-colors ${pathname === item.path ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle className="mt-4" />
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
