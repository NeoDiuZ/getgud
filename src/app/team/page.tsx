"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import TeamShowcase, { type TeamMember } from "@/components/ui/team-showcase";

/* ================================================================
   EASE — shared curve, matches the rest of the site
================================================================ */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

const DEMO_MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=mo@neuraldrive.tech&su=Neural%20Drive%20-%20Book%20a%20Demo";
const INVESTOR_MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=mo@neuraldrive.tech&su=Neural%20Drive%20-%20Investor%20%26%20Partnership%20Inquiry";

/* ================================================================
   TEAM ROSTER
   `bio` is a short prose paragraph. `linkedin` is the full profile
   URL — leave "" to hide the "Connect on LinkedIn" link.
================================================================ */
interface Member {
  name: string;
  role: string;
  bio: string;
  photo: string;
  alt: string;
  /** object-position for the portrait crop */
  focus: string;
  /** full LinkedIn (or other) URL — "" hides the link */
  linkedin: string;
}

const TEAM: Member[] = [
  {
    name: "Mohammed HK",
    role: "Chief Executive Officer",
    bio: "Mohammed leads Neural Drive's vision and clinical strategy. He spent two years as an ambulance medic before founding and exiting a HealthTech company, and has won 42 global tech competitions along the way.",
    photo: "/Mo.png",
    alt: "Portrait of Mohammed HK, Chief Executive Officer of Neural Drive",
    focus: "object-center",
    linkedin: "https://www.linkedin.com/in/mhk64/",
  },
  {
    name: "Raymond Loong Ng",
    role: "Chief AI Officer",
    bio: "Raymond heads the AI behind Neural Drive's blink decoding. A two-time AI founder and Director of Singapore Youth AI, he has taken home 26 global tech competition wins.",
    photo: "/Raymond.jpg",
    alt: "Portrait of Raymond Loong Ng, Chief AI Officer of Neural Drive",
    focus: "object-center",
    linkedin: "https://www.linkedin.com/in/raymond-loong-ng/",
  },
  {
    name: "Kaushik Manian",
    role: "Ex-Apple",
    bio: "Kaushik owns the hardware. He spent three years as an engineer at Apple and built a 3D-printing company to a seven-figure exit, bringing deep hardware and IoT systems expertise to the device.",
    photo: "/Kaushik.png",
    alt: "Portrait of Kaushik Manian, Chief Technology Officer of Neural Drive",
    focus: "object-top",
    linkedin: "https://www.linkedin.com/in/kaushik-manian/",
  },
  {
    name: "Nyan Lin Htun",
    role: "Founding Engineer",
    bio: "Nyan keeps Neural Drive running day to day. A full-stack developer with more than 16 hackathon wins, he is the glue between the hardware and the software, owning the integrations that make the two work as one.",
    photo: "/nyan.png",
    alt: "Portrait of Nyan Lin Htun, Chief Operations Officer of Neural Drive",
    focus: "object-center",
    linkedin: "https://www.linkedin.com/in/nyanlinhtun/",
  },
];

/* ================================================================
   REVEAL — scroll-triggered fade-up, matches site motion
================================================================ */
function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   NAV — floating glass pill, cross-page links back to the homepage
================================================================ */
function TeamNav() {
  const links = [
    { label: "How it works", href: "/#process" },
    { label: "Technology",   href: "/#technology" },
    { label: "Compare",      href: "/#compare" },
  ];

  return (
    <nav
      className="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-nd-border bg-nd-surface/[0.92] px-2.5 py-2 backdrop-blur-2xl"
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="flex items-center gap-2 whitespace-nowrap px-3 py-1 font-display text-[0.9375rem] font-extrabold tracking-tight text-nd-ink"
        aria-label="Neural Drive home"
      >
        Neural Drive
      </Link>

      <ul className="hidden items-center gap-0.5 md:flex" role="list">
        {links.map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              className="block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-nd-muted transition-all duration-200 hover:bg-nd-ink/[0.06] hover:text-nd-ink"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <a
        href={DEMO_MAIL}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1.5 whitespace-nowrap rounded-full bg-nd-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95"
      >
        Book a demo
      </a>
    </nav>
  );
}

/* ================================================================
   PAGE HEADER
================================================================ */
function TeamHeader() {
  return (
    <header className="relative overflow-hidden">
      {/* soft radial glow, same motif as the homepage CTA */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[440px] w-[760px] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse, rgba(11,110,66,0.10) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1080px] px-5 pb-12 pt-32 sm:px-8 sm:pt-40 md:pb-16">
        <Reveal>
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-nd-muted transition-colors hover:text-nd-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Neural Drive
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <span className="mb-5 block text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary">
            The team
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1
            className="font-display font-extrabold tracking-tighter text-nd-ink text-balance"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.75rem)", lineHeight: 1.04, letterSpacing: "-0.03em" }}
          >
            The people behind the voice
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p
            className="mt-6 max-w-[58ch] leading-relaxed text-nd-muted text-pretty"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.125rem)" }}
          >
            Four founders who have built and sold companies, shipped hardware at
            Apple, and won on the world stage, now focused on one thing: giving
            communication back to the people who have lost it.
          </p>
        </Reveal>
      </div>
    </header>
  );
}

/* ================================================================
   CLOSING CTA
================================================================ */
function TeamCTA() {
  return (
    <section className="relative overflow-hidden border-t border-nd-border-dim py-24 md:py-32" aria-labelledby="team-cta">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[440px] w-[720px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(ellipse, rgba(11,110,66,0.12) 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto max-w-[1080px] px-5 text-center sm:px-8">
        <Reveal>
          <h2
            id="team-cta"
            className="mx-auto font-display font-extrabold tracking-tighter text-nd-ink text-balance"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)", lineHeight: 1.08, maxWidth: "16ch" }}
          >
            Want to build this with us?
          </h2>
          <p className="mx-auto mt-5 max-w-[46ch] leading-relaxed text-nd-muted" style={{ fontSize: "1.0625rem" }}>
            We're a small team looking for clinical partners, investors, and
            people who care about giving others a voice.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={DEMO_MAIL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-nd-primary px-9 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95"
            >
              Book a demo
            </a>
            <a
              href={INVESTOR_MAIL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-nd-border px-8 py-4 text-base font-semibold text-nd-ink transition-all duration-200 hover:border-nd-primary/50 hover:bg-nd-ink/[0.03] active:scale-95"
            >
              For investors &amp; partners
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER — compact, consistent with the homepage footer
================================================================ */
function TeamFooter() {
  return (
    <footer className="border-t border-nd-border-dim bg-nd-surface/40" aria-label="Site footer">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Neural Drive home">
          <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-nd-primary text-[0.5625rem] font-black text-white">
            ND
          </span>
          <span className="font-display text-[1.0625rem] font-extrabold tracking-tight text-nd-ink">
            Neural Drive
          </span>
        </Link>

        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem] text-nd-muted" role="list">
          <li><a href="mailto:mo@neuraldrive.tech" className="transition-colors hover:text-nd-ink">mo@neuraldrive.tech</a></li>
          <li><Link href="/privacy" className="transition-colors hover:text-nd-ink">Privacy</Link></li>
          <li><Link href="/terms" className="transition-colors hover:text-nd-ink">Terms</Link></li>
          <li><Link href="/medical-disclaimer" className="transition-colors hover:text-nd-ink">Medical Disclaimer</Link></li>
        </ul>
      </div>
      <div className="border-t border-nd-border-dim">
        <p className="mx-auto max-w-[1080px] px-5 py-5 text-[0.75rem] text-nd-muted sm:px-8">
          © 2026 Neural Drive. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

/* ================================================================
   PAGE ROOT
================================================================ */
export default function TeamPage() {
  return (
    <main className="min-h-screen bg-nd-bg">
      <TeamNav />
      <TeamHeader />

      <section className="mx-auto max-w-[1080px] px-5 pb-24 sm:px-8 md:pb-32" aria-label="Team members">
        <Reveal>
          <TeamShowcase
            members={TEAM.map<TeamMember>((m) => ({
              id: m.name,
              name: m.name,
              role: m.role,
              image: m.photo,
              focus: m.focus,
              social: m.linkedin ? { linkedin: m.linkedin } : undefined,
            }))}
          />
        </Reveal>
      </section>

      <TeamCTA />
      <TeamFooter />
    </main>
  );
}
