import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hendrickson APAC POC",
  description: "Hendrickson customer portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-brand-gray text-brand-black">
        {children}
      </body>
    </html>
  );
}
