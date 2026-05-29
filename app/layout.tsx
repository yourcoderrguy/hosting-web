import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OP5 Technologies | Custom AI WhatsApp Agents",
  description: "Stop losing sales. We build complete Sales Engines that haggle and close deals on WhatsApp 24/7.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        {/* ADS TRACKING SCRIPT PLACEHOLDER */}
        {/* Replace 'YOUR_TRACKING_ID' with the code your ads person gives you */}
        <Script id="ads-tracker" strategy="afterInteractive">
          {`
            // Your Ads Tracking Code goes here
            console.log('Ads tracker initialized');
          `}
        </Script>
        
        {children}
      </body>
    </html>
  );
}