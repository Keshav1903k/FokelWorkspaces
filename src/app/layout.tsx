import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { Providers } from "@/components/providers/Providers";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { WelcomeModal } from "@/components/modals/WelcomeModal";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fokel | The Premium AI Aggregator Platform",
  description: "Discover, compare, and leverage the best AI tools on the market. The ultimate AI aggregator for Series A startups and enterprises.",
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
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
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
