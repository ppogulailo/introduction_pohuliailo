import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import ReCaptchaWrapper from "@/components/ReCaptchaWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pavlo Pohuliailo",
  description: "Pavlo Pohuliailo, introducing myself, my work, and how to contact me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReCaptchaWrapper>
          <ThemeProvider>
            <ReactQueryProvider>
              {children}
              <Toaster richColors closeButton position="top-right" />
            </ReactQueryProvider>
          </ThemeProvider>
        </ReCaptchaWrapper>
      </body>
    </html>
  );
}
