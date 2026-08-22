import type { Metadata } from "next";
import ChinaRuntime from "@/components/china-runtime";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neural Drive - Brain-Computer Interface Technology",
  description:
    "Neural Drive translates thought into action. Advanced brain-computer interface technology built for the frontier of human potential.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* China deployment: block third-party frames before the page body is parsed. */}
        <meta httpEquiv="Content-Security-Policy" content="frame-src 'none';" />
      </head>
      <body className="antialiased bg-nd-bg text-nd-ink overflow-x-hidden">
        {children}
        <ChinaRuntime />
      </body>
    </html>
  );
}
