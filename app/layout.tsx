import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OP5 Technologies — AI Sales Engine",
  description:
    "Your website can automatically answer your customers, qualify leads, and continue the conversation on WhatsApp — even while you're asleep.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}