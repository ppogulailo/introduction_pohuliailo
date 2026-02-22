"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";
const OPEN_SETTINGS_EVENT = "open-cookie-settings";

export function useCookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setOpen(true);
  }, []);

  useEffect(() => {
    const onOpenSettings = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, onOpenSettings);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setOpen(false);
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setOpen(false);
  };

  return { open, setOpen, accept, reject };
}

export default function CookieConsentModal({
  open,
  onAccept,
  onReject,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAccept: () => void;
  onReject: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 w-full max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="rounded-lg border border-border bg-background p-5 shadow-lg">
        <h3 className="text-sm font-semibold text-foreground">We use cookies</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We use cookies to improve your experience, analyze traffic, and personalize content.
          You can accept cookies to help us deliver the best experience.
        </p>
        <div className="mt-4 flex items-center justify-between">
          <Link
            href="/privacy"
            className="text-sm text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Learn more
          </Link>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onReject}
              className="rounded-md border border-border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={onAccept}
              className="rounded-md bg-foreground px-3 py-1.5 text-sm text-background transition-opacity hover:opacity-90"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
