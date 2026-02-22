"use client";

import CookieConsentModal, { useCookieConsent } from "@/components/CookieConsentModal";

export default function CookieConsentGate() {
  const { open, setOpen, accept, reject } = useCookieConsent();

  return (
    <CookieConsentModal
      open={open}
      onOpenChange={setOpen}
      onAccept={accept}
      onReject={reject}
    />
  );
}
