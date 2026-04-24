import "./globals.css";

export const metadata = {
  title: "Magen Systems",
  description: "Enterprise Digital Architecture",
};

export default function RootLayout({ children }) {
  return (
    // Add suppressHydrationWarning right here
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}