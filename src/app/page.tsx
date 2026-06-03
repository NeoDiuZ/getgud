"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";
import { Droplet, UtensilsCrossed, Bell, Bath, MapPin, Tv2, Volume2 } from "lucide-react";

/* ================================================================
   EASE CURVE — shared across all motion
================================================================ */
const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

/* ================================================================
   CONTACT LINKS — two intents: book a demo, or investor/partner
================================================================ */
const DEMO_MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=mo@neuraldrive.tech&su=Neural%20Drive%20%E2%80%94%20Book%20a%20Demo";
const INVESTOR_MAIL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=mo@neuraldrive.tech&su=Neural%20Drive%20%E2%80%94%20Investor%20%26%20Partnership%20Inquiry";

/* ================================================================
   REVEAL — scroll-triggered fade-up wrapper
================================================================ */
function Reveal({
  children,
  delay = 0,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   NAVIGATION — floating glass pill + mobile hamburger
================================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY > 120) setMenuOpen(false);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Try it",       href: "#try" },
    { label: "How it works", href: "#process" },
    { label: "Technology",   href: "#technology" },
    { label: "Team",         href: "/team" },
    { label: "Compare",      href: "/compare" },
  ];

  return (
    <>
      <nav
        className={`fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border px-2.5 py-2 backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? "border-nd-border bg-nd-surface/[0.92]"
            : "border-nd-border-dim bg-nd-surface/75"
        }`}
        aria-label="Main navigation"
      >
        <a
          href="/"
          className="flex items-center gap-2 whitespace-nowrap px-3 py-1 font-display text-[0.9375rem] font-extrabold tracking-tight text-nd-ink"
          aria-label="Neural Drive home"
        >
          Neural Drive
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-0.5 md:flex" role="list">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="block whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-medium text-nd-muted transition-all duration-200 hover:bg-nd-ink/[0.06] hover:text-nd-ink"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href={DEMO_MAIL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1.5 hidden whitespace-nowrap rounded-full bg-nd-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95 md:inline-flex"
        >
          Book a demo
        </a>

        {/* Mobile hamburger */}
        <button
          className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full text-nd-muted transition-colors hover:bg-nd-ink/[0.06] hover:text-nd-ink md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            {menuOpen ? (
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            ) : (
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed top-[4.25rem] left-1/2 z-40 w-[min(88vw,320px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-nd-border-dim bg-nd-surface/95 shadow-xl shadow-black/10 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <ul className="flex flex-col p-2" role="list">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-4 py-3 text-sm font-medium text-nd-muted transition-colors hover:bg-nd-ink/[0.05] hover:text-nd-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="border-t border-nd-border-dim p-2">
              <a
                href={DEMO_MAIL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-nd-primary px-4 py-3 text-center text-sm font-semibold text-white transition-all hover:bg-nd-primary-hover"
              >
                Book a demo
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================
   HERO — ContainerScroll (replaces Three.js canvas hero)
================================================================ */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-nd-bg" aria-labelledby="hero-heading">
      <ContainerScroll
        titleComponent={
          <div className="px-4 pb-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            >
              <h1
                id="hero-heading"
                className="mb-6 font-body font-bold text-nd-ink"
                style={{
                  fontSize: "clamp(2.75rem, 5.5vw, 5.25rem)",
                  lineHeight: 1.04,
                  letterSpacing: "-0.025em",
                }}
              >
                Restoring voices
                <br />
                <span style={{ fontSize: "clamp(3rem, 6.5vw, 5.75rem)", lineHeight: 1 }}>
                  in 10 seconds
                </span>
              </h1>

              <p
                className="mx-auto mb-9 text-nd-muted"
                style={{
                  maxWidth: "46ch",
                  fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                  lineHeight: 1.7,
                }}
              >
                Stroke and paralysis can take away speech. Neural Drive gives it
                back — two deliberate blinks speak essential needs aloud, set up
                in 10 seconds, with no surgery and no gel.
              </p>

              {/* Hero CTAs — primary action + tangible proof */}
              <div className="mx-auto mb-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={DEMO_MAIL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-nd-primary px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95"
                >
                  Book a demo
                </a>
                <a
                  href="#try"
                  className="inline-flex items-center gap-1.5 rounded-full border border-nd-border px-7 py-3.5 text-sm font-semibold text-nd-ink transition-all duration-200 hover:border-nd-primary/50 hover:bg-nd-ink/[0.03] active:scale-95"
                >
                  Hear it work
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                    <path d="M6.5 2v9M2 6.5l4.5 4.5L11 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>

              {/* Hero stats strip */}
              <div className="mx-auto mb-2 grid grid-cols-3 overflow-hidden rounded-2xl border border-nd-border-dim bg-nd-border-dim gap-px w-full max-w-[520px]">
                {[
                  { value: "10s",  label: "Setup time" },
                  { value: "2",    label: "Blinks to speak" },
                  { value: "HSA",  label: "Class A · Q1 2026" },
                ].map(({ value, label }) => (
                  <div
                    key={value}
                    className="flex flex-col items-center bg-nd-surface px-3 py-4 sm:px-6 sm:py-5"
                  >
                    <span className="font-display text-[1.5rem] sm:text-[2rem] font-black tracking-tighter text-nd-primary leading-none">
                      {value}
                    </span>
                    <span className="mt-1.5 text-[0.6875rem] sm:text-[0.8125rem] text-nd-muted text-center leading-snug">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        }
      >
        {/*
          Hero card image: dark BCI visualization.
          picsum.photos seed is deterministic — always returns the same image.
        */}
        <Image
          src="/Interface.png"
          alt="Neural Drive brain-computer interface data visualization dashboard"
          height={720}
          width={1400}
          className="mx-auto h-full w-full rounded-2xl object-cover object-center"
          draggable={false}
          priority
        />
      </ContainerScroll>
    </section>
  );
}

/* ================================================================
   TRY IT — interactive command tiles that speak aloud
   Makes the core promise tangible: blink → a need is voiced.
================================================================ */
const COMMANDS = [
  { label: "Water",      file: "water.mp3",      Icon: Droplet },
  { label: "Food",       file: "food.mp3",       Icon: UtensilsCrossed },
  { label: "Help",       file: "help.mp3",       Icon: Bell },
  { label: "Washroom",   file: "washroom.mp3",   Icon: Bath },
  { label: "Outing",     file: "outing.mp3",     Icon: MapPin },
  { label: "Television", file: "television.mp3", Icon: Tv2 },
] as const;

function TrySection() {
  const [active, setActive] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (file: string, label: string) => {
    if (typeof window === "undefined") return;
    if (audioRef.current) audioRef.current.pause();
    const audio = new Audio(`/sounds/${file}`);
    audioRef.current = audio;
    setActive(label);
    audio.onended = () => setActive((cur) => (cur === label ? null : cur));
    audio.play().catch(() => setActive(null));
  };

  return (
    <section
      id="try"
      className="border-t border-nd-border-dim py-20 md:py-36"
      aria-labelledby="try-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal className="mb-10 md:mb-14">
          <span className="mb-5 block text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary">
            Try it
          </span>
          <h2
            id="try-heading"
            className="font-display font-extrabold tracking-tighter text-nd-ink"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.125rem)", lineHeight: 1.1, maxWidth: "18ch" }}
          >
            Hear what it gives back
          </h2>
          <p className="mt-4 max-w-[52ch] leading-relaxed text-nd-muted" style={{ fontSize: "0.9375rem" }}>
            Two deliberate blinks select a tile, and Neural Drive speaks the need
            aloud. Tap any tile to hear the actual voice prompts our users rely on
            every day.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-5">
          {COMMANDS.map(({ label, file, Icon }, i) => {
            const isActive = active === label;
            return (
              <Reveal key={label} delay={i * 0.06}>
                <button
                  onClick={() => play(file, label)}
                  aria-label={`Play the "${label}" voice prompt`}
                  className={`group flex w-full flex-col items-center justify-center gap-4 rounded-[1.25rem] border bg-nd-surface px-6 py-10 transition-all duration-300 active:scale-[0.98] ${
                    isActive
                      ? "border-nd-primary shadow-lg shadow-nd-primary/15"
                      : "border-nd-border-dim hover:border-nd-primary/50 hover:shadow-lg hover:shadow-nd-primary/10"
                  }`}
                >
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-nd-primary/10 text-nd-primary">
                    {isActive && (
                      <span
                        className="absolute inset-0 animate-pulse-out rounded-full border border-nd-primary"
                        aria-hidden="true"
                      />
                    )}
                    <Icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-display text-lg font-extrabold tracking-tight text-nd-ink">
                    {label}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[0.75rem] font-medium transition-colors ${
                      isActive ? "text-nd-primary" : "text-nd-muted"
                    }`}
                  >
                    <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
                    {isActive ? "Speaking…" : "Tap to hear"}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MARQUEE
================================================================ */
const MARQUEE_LOGOS = [
  { src: "/khooteckpuat.png",   alt: "Khoo Teck Puat Hospital" },
  { src: "/tantockseng.png",    alt: "Tan Tock Seng Hospital" },
  { src: "/nhg_logo.png",       alt: "National Healthcare Group" },
];

function MarqueeSection() {
  return (
    <div
      className="border-b border-t border-nd-border-dim"
      aria-label="Research and clinical partners"
    >
      <p className="pt-5 pb-3 text-center text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-muted">
        Research &amp; Clinical Partners
      </p>
      <div className="group overflow-hidden py-5">
      <div className="flex w-max items-center animate-marquee group-hover:[animation-play-state:paused]">
        {[...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS, ...MARQUEE_LOGOS].map((logo, i) => (
          <div key={i} className="flex items-center px-8 sm:px-14">
            <Image
              src={logo.src}
              alt={logo.alt}
              height={44}
              width={180}
              className="h-11 w-auto object-contain grayscale opacity-70 transition-all duration-200 hover:opacity-100 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}

/* ================================================================
   TRACTION STRIP — consolidated credibility (funding, clinical, regulatory)
================================================================ */
const TRACTION = [
  "SGD $275K secured",
  "Tan Tock Seng Hospital collaboration",
  "HSA Class A pathway · Q1 2026",
];

function TractionStrip() {
  return (
    <div aria-label="Traction and milestones">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-3 px-4 py-6 sm:px-8">
        {TRACTION.map((item) => (
          <span
            key={item}
            className="inline-flex items-center gap-2 text-[0.8125rem] font-medium text-nd-muted"
          >
            <span
              className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-nd-primary/15"
              aria-hidden="true"
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M1.5 4l1.75 1.75L6.5 2.5" stroke="#0B6E42" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   STATS
================================================================ */
const STATS = [
  { value: "10s",  label: "Setup time" },
  { value: "2",    label: "Blinks to speak" },
  { value: "368",  label: "People tested" },
  { value: "98%",  label: "Command accuracy" },
];

function StatsSection() {
  return (
    <div
      className="border-t border-nd-border-dim"
      aria-label="Key metrics"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-x divide-y divide-nd-border-dim px-4 md:grid-cols-4 md:divide-y-0 sm:px-8">
        {STATS.map(({ value, label }, i) => (
          <Reveal
            key={value}
            delay={i * 0.08}
            className="flex flex-col items-center px-4 py-8 text-center sm:px-8 sm:py-12"
          >
            <span
              className="mb-2 font-display font-black tracking-tighter text-nd-primary"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 3.75rem)", lineHeight: 1 }}
            >
              {value}
            </span>
            <span
              className="text-nd-muted"
              style={{ fontSize: "0.9375rem", lineHeight: 1.5, maxWidth: "14ch" }}
            >
              {label}
            </span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   FEATURES — BENTO GRID with interactive card flip
================================================================ */
interface FeatureCard {
  label: string;
  title: string;
  body: string;
  backBody: string;
  backSpecs: string[];
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    label: "Core Engine",
    title: "Blink-to-Speech Engine",
    body: "Two deliberate blinks select a message and Neural Drive speaks it aloud — reliably, in real time, with no implant, no gel, and no calibration ritual.",
    backBody: "A lightweight signal pipeline tuned for real-world communication, not the lab bench.",
    backSpecs: [
      "Reads deliberate blinks from a non-invasive forehead sensor",
      "Speaks essential needs aloud in real time",
      "No surgery, no gel electrodes, no technician on site",
      "Ready within 10 seconds of placement",
      "Runs on a compact, low-cost wearable device",
    ],
  },
  {
    label: "Setup",
    title: "Ready in 10 Seconds",
    body: "Place it on the forehead and go. No gel, no electrode positioning, no 30-minute calibration before the first word.",
    backBody: "Designed so a caregiver can set it up in seconds — every single time.",
    backSpecs: [
      "10-second setup vs 30+ minutes for traditional BCIs",
      "Single forehead placement — nothing to implant",
      "Dry sensor — no conductive gel required",
      "No clinician needed at the bedside",
      "A consistent routine a family member can repeat daily",
    ],
  },
  {
    label: "Intelligence",
    title: "Adaptive Calibration",
    body: "The system tunes to each person's blink pattern over a few sessions, so recognition keeps getting more reliable the more it's used.",
    backBody: "A model that learns the individual, so accuracy improves with everyday use.",
    backSpecs: [
      "Tunes to each person's natural blink rhythm",
      "Recognition improves session over session",
      "Adjusts automatically as signal conditions change",
      "98% command accuracy in testing to date",
      "Personal calibration stays on the device",
    ],
  },
];

function CardFlipModal({
  card,
  onClose,
}: {
  card: FeatureCard;
  onClose: () => void;
}) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setFlipped(true), 350);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-nd-bg/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
    >
      <motion.div
        className="relative w-[min(90vw,560px)]"
        style={{ perspective: "1200px" }}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          style={{ transformStyle: "preserve-3d", position: "relative", minHeight: "min(360px, 80vh)" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.65, ease: EASE }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-[1.25rem] border border-nd-border bg-nd-surface p-6 sm:p-10"
            style={{ backfaceVisibility: "hidden" }}
          >
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-nd-muted">
              {card.label}
            </p>
            <h3 className="mb-4 font-display font-extrabold tracking-tighter text-nd-ink" style={{ fontSize: "1.5rem" }}>
              {card.title}
            </h3>
            <p className="leading-relaxed text-nd-muted" style={{ fontSize: "0.9375rem" }}>
              {card.body}
            </p>
            <p className="mt-6 text-xs text-nd-muted opacity-60">Flipping…</p>
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 flex flex-col overflow-y-auto rounded-[1.25rem] border border-nd-primary/30 bg-nd-surface p-6 sm:p-10"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-nd-border-dim text-nd-muted transition-colors hover:bg-nd-border hover:text-nd-ink"
              aria-label="Close"
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-nd-primary">
              {card.label}
            </p>
            <h3 className="mb-3 font-display font-extrabold tracking-tighter text-nd-ink" style={{ fontSize: "1.375rem" }}>
              {card.title}
            </h3>
            <p className="mb-6 leading-relaxed text-nd-muted" style={{ fontSize: "0.875rem" }}>
              {card.backBody}
            </p>
            <ul className="flex flex-col gap-2.5" role="list">
              {card.backSpecs.map((spec) => (
                <li key={spec} className="flex items-start gap-2.5">
                  <span className="mt-[3px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-nd-primary/15" aria-hidden="true">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l1.75 1.75L6.5 2.5" stroke="#0B6E42" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-[0.8125rem] leading-snug text-nd-muted">{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function FeaturesSection() {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      if (v > 0.92) setSelectedCard(null);
    });
  }, [scrollYProgress]);

  return (
    <section
      id="technology"
      ref={sectionRef}
      className="border-t border-nd-border-dim py-20 md:py-36"
      aria-labelledby="features-heading"
    >
      <AnimatePresence>
        {selectedCard !== null && (
          <CardFlipModal
            key={selectedCard}
            card={FEATURE_CARDS[selectedCard]}
            onClose={() => setSelectedCard(null)}
          />
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">

        <Reveal className="mb-10 md:mb-14">
          <span className="mb-5 block text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary">
            Technology
          </span>
          <h2
            id="features-heading"
            className="font-display font-extrabold tracking-tighter text-nd-ink"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.125rem)", lineHeight: 1.1, maxWidth: "18ch" }}
          >
            Built for precision
            <br />
            at every layer
          </h2>
          <p className="mt-3 text-[0.8125rem] text-nd-muted">Click any card to explore details.</p>
        </Reveal>

        <div className="grid grid-cols-12 gap-5">

          {/* Card 1: col-span-7 row-span-2 */}
          <Reveal
            delay={0}
            className="col-span-12 flex min-h-[280px] cursor-pointer flex-col overflow-hidden rounded-[1.25rem] border border-nd-border-dim bg-nd-surface p-6 transition-all duration-300 hover:border-nd-primary/50 hover:shadow-lg hover:shadow-nd-primary/10 active:scale-[0.99] sm:p-10 lg:col-span-7 lg:row-span-2 lg:min-h-[420px]"
            onClick={() => setSelectedCard(0)}
          >
            <div>
              <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-nd-muted">
                Core Engine
              </p>
              <h3
                className="mb-3 font-display font-extrabold tracking-tighter text-nd-ink"
                style={{ fontSize: "clamp(1.125rem, 1.7vw, 1.5rem)", lineHeight: 1.2 }}
              >
                Blink-to-Speech Engine
              </h3>
              <p className="max-w-[44ch] leading-relaxed text-nd-muted" style={{ fontSize: "0.9375rem" }}>
                Two deliberate blinks select a message and Neural Drive speaks it
                aloud — reliably, in real time, with no implant, no gel, and no
                calibration ritual.
              </p>
            </div>
            <div className="mt-auto pt-6">
              <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-nd-primary">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M4.5 6h3M6 4.5l1.5 1.5L6 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Tap to explore
              </span>
            </div>

            {/* EEG-style animated waveform */}
            <div className="mt-6 flex flex-1 items-end overflow-hidden rounded-lg" aria-hidden="true">
              <div className="flex w-[200%] animate-waveform-drift">
                {[0, 1].map((n) => (
                  <svg key={n} className="h-[90px] w-full flex-shrink-0" viewBox="0 0 700 90" preserveAspectRatio="none">
                    <polyline
                      points="0,45 18,45 26,9 34,81 42,40 50,50 62,45 70,12 78,78 86,42 94,48 106,45 114,7 122,83 130,38 138,52 150,45 158,16 166,74 174,40 182,50 194,45 202,9 210,81 218,40 226,50 238,45 246,20 254,70 262,41 270,49 282,45 290,11 298,79 306,37 314,53 326,45 334,14 342,76 350,39 358,51 370,45 378,8 386,82 394,41 402,49 414,45 422,18 430,72 438,40 446,50 458,45 466,10 474,80 482,38 490,52 502,45 510,7 518,83 526,39 534,51 546,45 554,21 562,69 570,42 578,48 590,45 598,13 606,77 614,40 622,50 634,45 642,9 650,81 658,38 666,52 678,45 686,16 694,74 700,45"
                      stroke="#0B6E42"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.65"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Card 2: col-span-5 row-span-1 */}
          <Reveal
            delay={0.08}
            className="col-span-12 cursor-pointer rounded-[1.25rem] border border-nd-border-dim bg-nd-surface p-6 transition-all duration-300 hover:border-nd-primary/50 hover:shadow-lg hover:shadow-nd-primary/10 active:scale-[0.99] sm:p-9 md:col-span-6 lg:col-span-5"
            onClick={() => setSelectedCard(1)}
          >
            <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-nd-muted">
              Setup
            </p>
            <div
              className="mb-1.5 font-display font-black leading-none tracking-tight text-nd-primary"
              style={{ fontSize: "clamp(2.75rem, 4.5vw, 4rem)" }}
              aria-label="Ten seconds"
            >
              10s
            </div>
            <p className="mb-4 text-sm font-medium text-nd-muted">From off to first word</p>
            <p className="leading-relaxed text-nd-muted" style={{ fontSize: "0.875rem" }}>
              Place it on the forehead and go. No gel, no electrode positioning,
              no 30-minute calibration before the first word.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-nd-primary">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4.5 6h3M6 4.5l1.5 1.5L6 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tap to explore
            </span>
          </Reveal>

          {/* Card 3: col-span-5 row-span-1 */}
          <Reveal
            delay={0.14}
            className="col-span-12 cursor-pointer rounded-[1.25rem] border border-nd-border-dim bg-nd-surface p-6 transition-all duration-300 hover:border-nd-primary/50 hover:shadow-lg hover:shadow-nd-primary/10 active:scale-[0.99] sm:p-9 md:col-span-6 lg:col-span-5"
            onClick={() => setSelectedCard(2)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-nd-muted">
                  Intelligence
                </p>
                <h3
                  className="mb-4 font-display font-extrabold leading-[1.2] tracking-tighter text-nd-ink"
                  style={{ fontSize: "clamp(1.125rem, 1.7vw, 1.5rem)" }}
                >
                  Adaptive
                  <br />
                  Calibration
                </h3>
              </div>

              <div className="relative h-14 w-14 flex-shrink-0" aria-hidden="true">
                <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-nd-accent" />
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute inset-0 animate-pulse-out rounded-full border border-nd-accent"
                    style={{ animationDelay: `${i * 0.867}s` }}
                  />
                ))}
              </div>
            </div>

            <p className="leading-relaxed text-nd-muted" style={{ fontSize: "0.9375rem" }}>
              The system tunes to each person's blink pattern over a few sessions,
              so recognition keeps getting more reliable the more it's used.
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-nd-primary">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M4.5 6h3M6 4.5l1.5 1.5L6 7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tap to explore
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PROCESS — sticky left + animated step cards
================================================================ */
const STEPS = [
  {
    num: "STEP 01",
    title: "10-Second Setup",
    body: "While traditional BCIs take 30+ minutes to calibrate, Neural Drive activates instantly through simple forehead placement.",
    metric: "30 minutes vs 10 seconds",
  },
  {
    num: "STEP 02",
    title: "Blink-to-Action",
    body: "Two deliberate blinks select a message and trigger it immediately — no complex training, no calibration ritual, and no gel electrodes to position.",
    metric: "2 blinks · No gel · No training",
  },
  {
    num: "STEP 03",
    title: "Life-Critical Messages",
    body: "Each command speaks a real need aloud — water, food, help, washroom — so caregivers understand instantly instead of guessing.",
    metric: "98% command accuracy · Improves with use",
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: EASE, delay: index * 0.1 }}
      className="rounded-[1rem] border border-nd-border-dim bg-nd-surface p-9 transition-colors duration-300 hover:border-nd-border"
      role="listitem"
    >
      <p className="mb-3.5 font-mono text-[0.6875rem] font-semibold tracking-[0.18em] text-nd-primary">
        {step.num}
      </p>
      <h3
        className="mb-2.5 font-display font-extrabold tracking-tighter text-nd-ink"
        style={{ fontSize: "1.375rem" }}
      >
        {step.title}
      </h3>
      <p className="leading-relaxed text-nd-muted" style={{ fontSize: "0.9375rem" }}>
        {step.body}
      </p>
      <p
        className="mt-5 font-mono text-nd-accent"
        style={{ fontSize: "0.75rem", letterSpacing: "0.05em" }}
      >
        {step.metric}
      </p>
    </motion.article>
  );
}

function ProcessSection() {
  return (
    <section
      id="process"
      className="border-t border-nd-border-dim py-20 md:py-36"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">

          {/* Sticky left heading */}
          <div className="lg:sticky lg:top-[38vh]">
            <Reveal>
              <h2
                id="process-heading"
                className="mb-5 font-display font-extrabold tracking-tighter text-nd-ink"
                style={{
                  fontSize: "clamp(1.75rem, 2.75vw, 2.625rem)",
                  lineHeight: 1.12,
                  maxWidth: "15ch",
                }}
              >
                From thought to action, in three steps
              </h2>
              <p className="max-w-[34ch] leading-relaxed text-nd-muted">
                Neural Drive's pipeline operates at the speed of intention.
                Each stage is built to minimize latency while maximizing signal fidelity.
              </p>
            </Reveal>
          </div>

          {/* Scrolling step cards */}
          <div
            className="flex flex-col gap-6 pt-0 lg:pt-12"
            role="list"
            aria-label="Process steps"
          >
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   DEMO — YouTube embed
================================================================ */
function DemoSection() {
  return (
    <section
      id="demo"
      className="border-t border-nd-border-dim py-20 md:py-36"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal className="mb-10 md:mb-14">
          <span className="mb-5 block text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary">
            Demo
          </span>
          <h2
            id="demo-heading"
            className="font-display font-extrabold tracking-tighter text-nd-ink"
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3.125rem)",
              lineHeight: 1.1,
              maxWidth: "18ch",
            }}
          >
            See it in action
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-hidden rounded-[1.25rem] border border-nd-border-dim bg-nd-surface shadow-xl shadow-black/30">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/CLR19Y1oNJ4"
                title="Neural Drive demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   VISION — scroll-scrub word reveal via Framer Motion
================================================================ */
const VISION_WORDS =
  "Losing speech does not mean losing thought. Behind every silence is a person still trying to be heard. Neural Drive exists to close that gap today — not with surgery or science fiction, but with a device a family can use in seconds to give a voice back to the people who lost theirs.".split(
    " "
  );

function VisionWord({
  word,
  index,
  total,
  progress,
}: {
  word: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = Math.min((index + 2) / total, 1);
  const opacity = useTransform(progress, [start, end], [0.12, 1]);

  return (
    <motion.span
      style={{ opacity }}
      className="mr-[0.28em] inline-block text-nd-ink"
    >
      {word}
    </motion.span>
  );
}

function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.25"],
  });

  return (
    <section
      id="vision"
      className="border-t border-nd-border-dim py-20 md:py-36"
      aria-labelledby="vision-label"
    >
      <div className="mx-auto max-w-[960px] px-4 sm:px-8" ref={containerRef}>
        <Reveal className="mb-12">
          <span
            id="vision-label"
            className="text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary"
          >
            Our Thesis
          </span>
        </Reveal>

        <p
          className="font-display font-bold leading-[1.4] tracking-tighter"
          style={{ fontSize: "clamp(1.375rem, 2.75vw, 2.375rem)" }}
          aria-label="Neural Drive mission statement"
        >
          {VISION_WORDS.map((word, i) => (
            <VisionWord
              key={i}
              word={word}
              index={i}
              total={VISION_WORDS.length}
              progress={scrollYProgress}
            />
          ))}
        </p>
      </div>
    </section>
  );
}

/* ================================================================
   CTA SECTION
================================================================ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="contact"
      className="relative overflow-hidden py-24 md:py-44"
      aria-labelledby="cta-heading"
    >
      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse, rgba(11,110,66,0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, ease: EASE }}
          className="text-center"
        >
          <h2
            id="cta-heading"
            className="mb-5 font-display font-extrabold tracking-tighter text-nd-ink"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 4.25rem)", lineHeight: 1.06 }}
          >
            Give someone
            <br />
            their voice back
          </h2>
          <p className="mx-auto mb-11 text-nd-muted" style={{ fontSize: "clamp(0.9375rem, 1.5vw, 1.0625rem)", lineHeight: 1.65, maxWidth: "46ch" }}>
            Clinician, family, partner, or investor — let's bring fast, non-invasive
            communication to the people who need it most.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={DEMO_MAIL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-nd-primary px-9 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95"
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
          <a
            href="/compare"
            className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-nd-muted transition-colors duration-200 hover:text-nd-ink"
          >
            See how we compare against every BCI in Singapore
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================
   TESTIMONIALS — parallax floating cards
================================================================ */
interface Testimonial {
  quote: string;
  author: string;
  role: string;
  size: "sm" | "md" | "lg";
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "He couldn't really form proper words, and we relied on his grunts to understand what he needed. It was really challenging. The device is compact and a lot less expensive than other gadgets in the market",
    author: "Nick Tyi Ki Kyaw",
    role: "NUS Computer Science · Nephew of stroke survivor (67, Myanmar)",
    size: "md",
  },
  {
    quote: "We were worried that learning a new device would be difficult, but the experience was much smoother than expected. It gave my father a reliable way to communicate and participate in conversations again.",
    author: "Rachel Tan",
    role: "Daughter of a stroke survivor",
    size: "md",
  },
  {
    quote: "Before this, we relied on guessing what my father wanted. Simple things like asking for water or assistance became difficult. Neural Drive gave him a way to communicate clearly again and reduced a lot of frustration for our family.",
    author: "Jason Lim",
    role: "Son of stroke survivor",
    size: "md",
  },
  {
    quote: "Seeing my husband communicate his thoughts again was something I never expected. The ability to understand his needs without constantly guessing has made everyday life much easier.",
    author: "Michelle Lee",
    role: "Wife of stroke survivor",
    size: "lg",
  },
  {
    quote: "We were surprised by how quickly my grandfather adapted to the system. It restored a level of independence that had been missing since his stroke and improved his confidence significantly.",
    author: "John Chen",
    role: "Grandson of stroke survivor",
    size: "lg",
  },
];

const SIZE_CLASSES = {
  sm: "w-[230px]",
  md: "w-[260px]",
  lg: "w-[290px]",
} as const;

function TestimonialCard({ quote, author, role, size }: Testimonial) {
  return (
    <div
      className={`${SIZE_CLASSES[size]} cursor-default rounded-2xl border border-nd-border-dim bg-white/85 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-nd-primary/40 hover:shadow-md`}
    >
      {/* Opening quote mark */}
      <span
        className="mb-1.5 block font-display text-2xl font-black leading-none text-nd-primary"
        aria-hidden="true"
      >
        &ldquo;
      </span>
      <p className="text-[0.8125rem] leading-relaxed text-nd-muted">{quote}&rdquo;</p>
      <div className="mt-3.5 border-t border-nd-border-dim pt-3">
        <p className="font-display text-[0.8125rem] font-bold tracking-tight text-nd-ink">
          {author}
        </p>
        <p className="mt-0.5 text-[0.6875rem] leading-snug text-nd-muted">{role}</p>
      </div>
    </div>
  );
}

/* Floating layout positions — 5 cards framing the center heading.
   depth drives parallax intensity: higher = more movement on mouse. */
const FLOAT_CONFIG = [
  { index: 0, depth: 1.0, className: "top-[4%]  left-[25%]", delay: 0.20 }, // top vertex
  { index: 1, depth: 1.3, className: "top-[27%] left-[8%]",  delay: 0.32 }, // upper-left
  { index: 2, depth: 1.3, className: "top-[27%] left-[70%]", delay: 0.44 }, // upper-right
  { index: 3, depth: 0.7, className: "top-[64%] left-[22%]", delay: 0.52 }, // lower-left
  { index: 4, depth: 0.7, className: "top-[64%] left-[56%]", delay: 0.60 }, // lower-right
] as const;

function TestimonialsSection() {
  return (
    <section
      className="border-t border-nd-border-dim bg-nd-bg"
      aria-label="Testimonials"
    >
      {/* ── Mobile / tablet layout: stacked heading + horizontal scroll ── */}
      <div className="lg:hidden px-6 py-20">
        <Reveal className="mb-8 text-center">
          <h2
            className="font-display font-black tracking-tighter text-nd-ink"
            style={{ fontSize: "clamp(2.25rem, 8vw, 3.5rem)", lineHeight: 1.05 }}
          >
            Trusted by
            <br />
            <span className="text-nd-primary">368</span> Users
          </h2>
        </Reveal>
        {/* Horizontal scroll snap */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="flex-none w-[260px] snap-center">
              <TestimonialCard {...t} size="md" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Desktop layout: parallax floating cards ── */}
      <div className="relative hidden min-h-[620px] items-center justify-center overflow-hidden lg:flex">
        {/* Radial glow */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2"
          style={{ background: "radial-gradient(ellipse, rgba(11,110,66,0.07) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        {/* Central heading */}
        <motion.div
          className="relative z-10 px-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
        >
          <h2
            className="mb-3 font-display font-black tracking-tighter text-nd-ink"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05 }}
          >
            Trusted by
            <br />
            <span className="text-nd-primary">368</span> Users
          </h2>
        </motion.div>

        {/* Floating testimonial cards */}
        <Floating sensitivity={-0.6} className="overflow-hidden" easingFactor={0.04}>
          {FLOAT_CONFIG.map((cfg) => (
            <FloatingElement key={cfg.index} depth={cfg.depth} className={cfg.className}>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: cfg.delay }}
              >
                <TestimonialCard {...TESTIMONIALS[cfg.index]} />
              </motion.div>
            </FloatingElement>
          ))}
        </Floating>
      </div>
    </section>
  );
}

/* ================================================================
   FOOTER
================================================================ */
const CREDENTIALS = [
  {
    label: "HSA Class A Regulatory Pathway",
    sub: "2026 Projection",
  },
  {
    label: "Tan Tock Seng Hospital Collaboration",
    sub: "Clinical Research Partner",
  },
  {
    label: "SGD $275,000 Funding Secured",
    sub: "Seed Round",
  },
];

function Footer() {
  return (
    <footer
      className="border-t border-nd-border-dim bg-nd-surface/40"
      aria-label="Site footer"
    >
      {/* Main footer body */}
      <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">

          {/* Col 1 — Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-nd-primary text-[0.5625rem] font-black text-white">
                ND
              </span>
              <span className="font-display text-[1.0625rem] font-extrabold tracking-tight text-nd-ink">
                Neural Drive
              </span>
            </div>
            <p
              className="leading-relaxed text-nd-muted"
              style={{ fontSize: "0.875rem", maxWidth: "30ch" }}
            >
              Singapore&rsquo;s breakthrough brain-computer interface giving
              voice to the paralyzed in just 10 seconds.
            </p>
            <a
              href="/team"
              className="mt-4 inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-nd-primary transition-colors duration-200 hover:text-nd-primary-hover"
            >
              Meet the team
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          {/* Col 2 — Clinical Excellence */}
          <div>
            <p className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-nd-primary">
              Clinical Excellence
            </p>
            <ul className="flex flex-col gap-3.5" role="list">
              {CREDENTIALS.map(({ label, sub }) => (
                <li key={label} className="flex items-start gap-2.5">
                  <span
                    className="mt-[3px] flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-nd-primary/15"
                    aria-hidden="true"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4l1.75 1.75L6.5 2.5"
                        stroke="#0B6E42"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <p className="text-[0.8125rem] font-medium text-nd-ink">{label}</p>
                    <p className="text-[0.75rem] text-nd-muted">{sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Get in Touch */}
          <div>
            <p className="mb-5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-nd-primary">
              Get in Touch
            </p>
            <ul className="flex flex-col gap-3" role="list">
              <li>
                <a
                  href="mailto:mo@neuraldrive.tech"
                  className="flex items-center gap-2.5 text-[0.875rem] text-nd-muted transition-colors duration-200 hover:text-nd-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <rect x="1" y="3" width="12" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M1 4.5l6 4 6-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  nyan@neuraldrive.tech
                </a>
              </li>
              <li>
                <a
                  href="tel:+6581133532"
                  className="flex items-center gap-2.5 text-[0.875rem] text-nd-muted transition-colors duration-200 hover:text-nd-ink"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2.5C2 2.5 3 1 4.5 2.5L5.5 4C5.5 4 6 4.5 5 5.5C4 6.5 5 7.5 6.5 9C8 10.5 9 11.5 10 10.5C11 9.5 11.5 10 11.5 10L13 11C14 12 12.5 13.5 12 13.5C11 13.5 8 13 5 10C2 7 1 4 2 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  +65 8113 3532
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-nd-border-dim">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-4 py-5 text-[0.75rem] text-nd-muted sm:px-8 md:flex-row">
          <p>© 2026 Neural Drive. All rights reserved.</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2" role="list">
            {[
              { label: "Privacy Policy",     href: "/privacy" },
              { label: "Terms of Service",   href: "/terms" },
              { label: "Medical Disclaimer", href: "/medical-disclaimer" },
            ].map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="transition-colors duration-200 hover:text-nd-ink">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ================================================================
   PAGE ROOT
================================================================ */
export default function Home() {
  return (
    <main className="min-h-screen bg-nd-bg">
      <Nav />
      <HeroSection />
      <TrySection />
      <TestimonialsSection />
      <DemoSection />
      <ProcessSection />
      <FeaturesSection />
      {/* Proof & traction cluster */}
      <StatsSection />
      <TractionStrip />
      <MarqueeSection />
      <VisionSection />
      <CTASection />
      <Footer />
    </main>
  );
}
