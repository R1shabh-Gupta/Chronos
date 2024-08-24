import clsx from "clsx";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

import { Providers } from "@/app/providers";

import "@/styles/tailwind.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const monaSans = localFont({
  src: "../fonts/Mona-Sans.var.woff2",
  display: "swap",
  variable: "--font-mona-sans",
  weight: "200 900",
});

export const metadata: Metadata = {
  title: "Chronos - Open-source Version Control System for Developers",
  description:
    "Chronos is a powerful, open-source version control system designed for developers. Manage your codebase with ease, track changes, and collaborate efficiently. It's fast, intuitive, and built to enhance your workflow.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx("h-full antialiased", inter.variable, monaSans.variable)}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-white dark:bg-gray-950">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
