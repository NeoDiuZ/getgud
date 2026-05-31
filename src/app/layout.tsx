import type { Metadata } from "next";
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
        {/* Fontshare — Cabinet Grotesk (display) + Satoshi (body) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800,900&f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-nd-bg text-nd-ink overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
