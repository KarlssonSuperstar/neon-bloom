import type { Metadata } from "next";
import { Space_Grotesk, Unbounded, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["500", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Neon Bloom — Deliver the signal. Defy the Crown.",
  description: "A fictional open-world cyberpunk action-adventure concept.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${unbounded.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
    >
      <body className="font-sans min-h-screen bg-ink-0 text-paper overflow-x-hidden w-full max-w-[100vw] selection:bg-bloom selection:text-ink-0">
        {children}
      </body>
    </html>
  );
}
