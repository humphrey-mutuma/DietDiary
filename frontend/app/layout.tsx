import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diet Diary",
  description: "Track  your dairy meals!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-serif">{children}</body>
    </html>
  );
}
