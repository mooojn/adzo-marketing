import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";
import Navbar from "./components/Navbar";
import { FloatingCall } from "./components/FloatingCTA";
import { ThemeProvider } from "./components/ThemeProvider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AdzoMarketing | Digital Marketing Agency",
  description: "AdzoMarketing is a marketing agency that helps businesses grow their online presence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${plexMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <FloatingCall />
        </ThemeProvider>
      </body>
    </html>
  );
}
