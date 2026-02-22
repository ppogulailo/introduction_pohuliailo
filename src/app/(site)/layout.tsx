import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageTransition from "@/components/PageTransition";
import AiChatWidget from "@/components/chat/AiChatWidget";
import { ChatStateProvider } from "@/components/chat/chat-state-context";
import { ChatProvider } from "@/hooks/useChatContext";
import CookieConsentGate from "@/components/CookieConsentGate";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <ChatProvider>
      <ChatStateProvider>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <AiChatWidget />
          <CookieConsentGate />
        </div>
      </ChatStateProvider>
    </ChatProvider>
  );
}
