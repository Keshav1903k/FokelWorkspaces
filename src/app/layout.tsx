import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { WelcomeModal } from "@/components/modals/WelcomeModal";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Fokel Workspaces | Find Coworking & Managed Offices in India",
  description: "Discover, compare, and lease coworking spaces, managed offices, private suites, and virtual offices across India's top business districts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary/20 selection:text-primary">
        <WelcomeModal />
        <Providers>
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-1 flex flex-col pt-[88px]">
              {children}
            </main>
            <Footer />
          </SmoothScrollProvider>
        </Providers>
      </body>
    </html>
  );
}
