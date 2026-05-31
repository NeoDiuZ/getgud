"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

const EASE: [number, number, number, number] = [0.23, 1, 0.32, 1];

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
  const inView = useInView(ref, { once: true, margin: "0px 0px -48px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedBar({
  pct,
  isND,
  delay = 0,
}: {
  pct: number;
  isND: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20px 0px" });
  return (
    <div ref={ref} className="h-2.5 overflow-hidden rounded-full bg-nd-border-dim">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: isND ? "#0B6E42" : "#BFCFC7" }}
        initial={{ width: "0%" }}
        animate={inView ? { width: `${pct}%` } : {}}
        transition={{ duration: 1.1, ease: [0.32, 0.72, 0, 1], delay }}
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(11,110,66,0.12)", boxShadow: "0 0 0 1px rgba(11,110,66,0.28)" }}
      aria-label="Advantage"
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M2.5 5.5l2 2 4-4" stroke="#0B6E42" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function CrossIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-50 ring-1 ring-red-200"
      aria-label="Disadvantage"
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path d="M3 3l5 5M8 3l-5 5" stroke="#ef4444" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  );
}

function NeutralIcon() {
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
      style={{ background: "rgba(217,119,6,0.10)", boxShadow: "0 0 0 1px rgba(217,119,6,0.28)" }}
      aria-label="Partial"
    >
      <svg width="11" height="4" viewBox="0 0 11 4" fill="none" aria-hidden="true">
        <path d="M1.5 2h8" stroke="#D97706" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/* ================================================================
   DATA
================================================================ */
const COMPANIES = [
  { name: "Neural Drive",  logo: "/neuraldrive.png",  isND: true  },
  { name: "Neurostyle",    logo: "/neurostyle.png",   isND: false },
  { name: "Emotiv",        logo: "/emotiv.png",       isND: false },
  { name: "Tobii Dynavox", logo: "/tobidynavox.png",  isND: false },
  { name: "Zeto",          logo: "/zeto.png",         isND: false },
];

const METRICS: { label: string; values: { value: string; good: boolean | "partial" }[] }[] = [
  {
    label: "Any Dependency",
    values: [
      { value: "Nil, built in Singapore",              good: true  },
      { value: "Limited to TTSH/NUH",                  good: false },
      { value: "Not a medical device",                  good: false },
      { value: "DNR Wheels distributor, 6-month lead",  good: false },
      { value: "Seizure monitoring only",               good: false },
    ],
  },
  {
    label: "Setup Time",
    values: [
      { value: "1 minute",      good: true  },
      { value: "120+ minutes",  good: false },
      { value: "120+ minutes",  good: false },
      { value: "30+ minutes",   good: false },
      { value: "30+ minutes",   good: false },
    ],
  },
  {
    label: "HSA Approved",
    values: [
      { value: "Class A pathway", good: true      },
      { value: "Class B pathway", good: true  },
      { value: "Nil",             good: false },
      { value: "Class B pathway", good: true  },
      { value: "Nil",             good: false     },
    ],
  },
  {
    label: "Starting Price",
    values: [
      { value: "~SGD 2,500",  good: true  },
      { value: "SGD 15,000",  good: false },
      { value: "SGD 3,000",   good: false },
      { value: "SGD 24,399",  good: false },
      { value: "SGD 12,000",  good: false },
    ],
  },
  {
    label: "Ease of Use",
    values: [
      { value: "4.8 / 5", good: true  },
      { value: "2.4 / 5", good: false },
      { value: "2.8 / 5", good: false },
      { value: "3.8 / 5", good: false },
      { value: "3.5 / 5", good: false },
    ],
  },
];

const SETUP_DATA = [
  { company: "Neural Drive",  minutes: 1,   display: "1 min",    isND: true  },
  { company: "Tobii Dynavox", minutes: 30,  display: "30+ min",  isND: false },
  { company: "Zeto",          minutes: 30,  display: "30+ min",  isND: false },
  { company: "Neurostyle",    minutes: 120, display: "120+ min", isND: false },
  { company: "Emotiv",        minutes: 120, display: "120+ min", isND: false },
];

const PRICE_DATA = [
  { company: "Neural Drive",  price: 2500,  label: "~SGD 2,500",  isND: true  },
  { company: "Emotiv",        price: 3000,  label: "SGD 3,000",   isND: false },
  { company: "Zeto",          price: 12000, label: "SGD 12,000",  isND: false },
  { company: "Neurostyle",    price: 15000, label: "SGD 15,000",  isND: false },
  { company: "Tobii Dynavox", price: 24399, label: "SGD 24,399",  isND: false },
];

const EASE_DATA = [
  { company: "Neural Drive",  score: 4.8, isND: true  },
  { company: "Tobii Dynavox", score: 3.8, isND: false },
  { company: "Zeto",          score: 3.5, isND: false },
  { company: "Emotiv",        score: 2.8, isND: false },
  { company: "Neurostyle",    score: 2.4, isND: false },
];

/* ================================================================
   NAV
================================================================ */
function CompareNav() {
  return (
    <nav
      className="fixed top-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-nd-border-dim bg-nd-bg/90 px-2.5 py-2 backdrop-blur-2xl"
      aria-label="Comparison page navigation"
    >
      <Link
        href="/"
        className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 font-display text-[0.875rem] font-extrabold tracking-tight text-nd-ink transition-colors hover:bg-nd-border-dim/40"
        aria-label="Neural Drive home"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-nd-primary text-[0.5rem] font-black text-white" aria-hidden="true">
          ND
        </span>
        Neural Drive
      </Link>
      <span className="px-0.5 text-[0.6875rem] text-nd-border" aria-hidden="true">/</span>
      <span className="px-2 text-[0.8125rem] font-medium text-nd-muted">Compare</span>
      <Link
        href="https://mail.google.com/mail/?view=cm&fs=1&to=mo@neuraldrive.tech&su=Neural%20Drive%20Access%20Request"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-1.5 hidden whitespace-nowrap rounded-full bg-nd-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95 sm:inline-flex"
      >
        Request Access
      </Link>
    </nav>
  );
}

/* ================================================================
   HERO
================================================================ */
function CompareHero() {
  return (
    <section
      className="relative overflow-hidden bg-nd-bg pt-36 pb-20 md:pt-48 md:pb-28"
      aria-labelledby="compare-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 28% -8%, rgba(11,110,66,0.09) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-nd-muted transition-colors hover:text-nd-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path
                d="M9 2.5L4.5 7 9 11.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Neural Drive
          </Link>
        </Reveal>

        <div className="max-w-[820px]">
          <Reveal>
            <h1
              id="compare-hero-heading"
              className="mb-6 font-display font-extrabold text-nd-ink"
              style={{
                fontSize: "clamp(2.75rem, 5.5vw, 5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                textWrap: "balance",
              }}
            >
              Why clinicians choose Neural Drive
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mb-14 text-nd-muted"
              style={{
                fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
                lineHeight: 1.7,
                maxWidth: "50ch",
              }}
            >
              We compare every BCI and AAC solution available in Singapore. The data is consistent: Neural Drive leads on every metric that matters for clinical deployment.
            </p>
          </Reveal>
        </div>

        {/* Key wins strip */}
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-nd-border-dim bg-nd-border-dim sm:grid-cols-3">
          {[
            {
              value: "1 min",
              label: "Setup time",
              context: "competitors take 30 to 120 minutes",
            },
            {
              value: "~SGD 2,500",
              label: "Starting price",
              context: "up to 9.8x less than alternatives",
            },
            {
              value: "4.8 / 5",
              label: "Ease of use",
              context: "highest rated in the category",
            },
          ].map(({ value, label, context }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.15 + i * 0.08 }}
              className="flex flex-col bg-nd-surface px-7 py-7 sm:px-8 sm:py-9"
            >
              <span
                className="mb-1.5 font-display font-black leading-none tracking-tight text-nd-primary tabular-nums"
                style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
              >
                {value}
              </span>
              <span className="mb-1 text-[0.875rem] font-semibold text-nd-ink">{label}</span>
              <span className="text-[0.75rem] leading-snug text-nd-muted">{context}</span>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.35} className="mt-9">
          <Link
            href="#comparison"
            className="inline-flex items-center gap-2 rounded-full bg-nd-primary px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-nd-primary-hover active:scale-95"
          >
            View full comparison
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M2 6.5h9M7 2.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   ADVANTAGE BENTO — asymmetric 2-col
================================================================ */
function AdvantageSection() {
  return (
    <section
      className="border-t border-nd-border-dim py-20 md:py-28"
      aria-label="Neural Drive key advantages"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal className="mb-12">
          <h2
            className="font-display font-extrabold tracking-tight text-nd-ink"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Where we lead
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
          {/* LEFT: Large setup time card with bar chart */}
          <Reveal>
            <div className="flex h-full flex-col rounded-[1.25rem] border border-nd-border-dim bg-nd-surface p-8 sm:p-10">
              <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-nd-muted">
                Setup time
              </p>
              <span
                className="mb-2 font-display font-black leading-none tracking-tighter text-nd-primary"
                style={{ fontSize: "clamp(3rem, 5vw, 4rem)" }}
              >
                1 min
              </span>
              <p
                className="mb-10 leading-relaxed text-nd-muted"
                style={{ fontSize: "0.9375rem", maxWidth: "42ch" }}
              >
                From unboxing to active use. Traditional BCIs require 30 to 120 minutes of electrode calibration before a single command can be registered.
              </p>

              <div className="mt-auto flex flex-col gap-5">
                {SETUP_DATA.map((item, i) => {
                  const pct = Math.max(4, (item.minutes / 120) * 100);
                  return (
                    <div key={item.company} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <span
                          className={`text-[0.8125rem] ${
                            item.isND ? "font-semibold text-nd-ink" : "font-medium text-nd-muted"
                          }`}
                        >
                          {item.company}
                        </span>
                        <span
                          className={`font-mono text-[0.8125rem] tabular-nums ${
                            item.isND ? "font-semibold text-nd-primary" : "text-nd-muted"
                          }`}
                        >
                          {item.display}
                        </span>
                      </div>
                      <AnimatedBar pct={pct} isND={item.isND} delay={i * 0.1} />
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          {/* RIGHT: Two stacked cards */}
          <div className="flex flex-col gap-4">
            {/* Price — inverted green */}
            <Reveal delay={0.1}>
              <div className="rounded-[1.25rem] bg-nd-primary p-8 sm:p-9">
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Starting price
                </p>
                <span
                  className="mb-3 block font-display font-black leading-none tracking-tighter text-white"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
                >
                  ~SGD 2,500
                </span>
                <p className="text-[0.875rem] leading-relaxed text-white/70">
                  Up to 9.8x more affordable than the most expensive alternative on the Singapore market.
                </p>
              </div>
            </Reveal>

            {/* Ease of use */}
            <Reveal delay={0.18}>
              <div className="rounded-[1.25rem] border border-nd-border-dim bg-nd-bg p-8 sm:p-9">
                <p className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-nd-muted">
                  Ease of use
                </p>
                <span
                  className="mb-1.5 block font-display font-black leading-none tracking-tighter text-nd-primary"
                  style={{ fontSize: "clamp(2rem, 3vw, 2.75rem)" }}
                >
                  4.8 / 5
                </span>
                <p className="mb-7 text-[0.875rem] text-nd-muted">
                  Highest rated in the BCI category.
                </p>
                <div className="flex flex-col gap-3.5">
                  {EASE_DATA.slice(0, 3).map((item, i) => (
                    <div key={item.company} className="flex items-center gap-3">
                      <span
                        className={`w-20 shrink-0 text-[0.75rem] font-medium ${
                          item.isND ? "text-nd-ink" : "text-nd-muted"
                        }`}
                      >
                        {item.company === "Neural Drive" ? "Neural Drive" : item.company.split(" ")[0]}
                      </span>
                      <div className="flex-1">
                        <AnimatedBar
                          pct={(item.score / 5) * 100}
                          isND={item.isND}
                          delay={0.25 + i * 0.08}
                        />
                      </div>
                      <span
                        className={`w-8 text-right font-mono text-[0.75rem] tabular-nums ${
                          item.isND ? "font-semibold text-nd-primary" : "text-nd-muted"
                        }`}
                      >
                        {item.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FULL COMPARISON TABLE
================================================================ */
function CompareTable() {
  return (
    <section
      id="comparison"
      className="border-t border-nd-border-dim py-20 md:py-28"
      aria-labelledby="compare-table-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal className="mb-4">
          <h2
            id="compare-table-heading"
            className="font-display font-extrabold tracking-tight text-nd-ink"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Side by side
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mb-12">
          <p className="text-[0.9375rem] text-nd-muted">
            Every solution in Singapore, on the metrics that matter most for clinical deployment.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="overflow-x-auto rounded-[1.25rem] border border-nd-border-dim">
            <table
              className="w-full min-w-[760px] border-separate border-spacing-0"
              aria-label="BCI solution comparison"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="w-[175px] rounded-tl-[1.25rem] border-b border-r border-nd-border-dim bg-nd-surface py-4 pl-6 pr-4 text-left text-[0.625rem] font-semibold uppercase tracking-[0.16em] text-nd-muted"  
                  >
                    Criteria
                  </th>
                  {COMPANIES.map((co, ci) => (
                    <th
                      key={co.name}
                      scope="col"
                      className={[
                        "border-b border-white/[0.07] px-5 py-7 text-center align-middle",
                        co.isND ? "bg-nd-primary" : "bg-[#111111]",
                        ci < COMPANIES.length - 1 ? "border-r border-white/[0.07]" : "",
                        ci === COMPANIES.length - 1 ? "rounded-tr-[1.25rem]" : "",
                      ].join(" ")}
                    >
                      <Image
                        src={co.logo}
                        alt={co.name}
                        width={160}
                        height={72}
                        className="h-[4.5rem] w-auto object-contain"
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {METRICS.map((row, ri) => {
                  const isLast = ri === METRICS.length - 1;
                  return (
                    <tr key={row.label} className="group">
                      <td
                        className={[
                          "border-r border-nd-border-dim bg-nd-bg py-4 pl-6 pr-4 align-middle text-[0.8125rem] font-medium text-nd-muted transition-colors group-hover:bg-nd-surface/60",
                          !isLast ? "border-b border-nd-border-dim" : "rounded-bl-[1.25rem]",
                        ].join(" ")}
                      >
                        {row.label}
                      </td>
                      {row.values.map((cell, ci) => {
                        const co = COMPANIES[ci];
                        const isLastCol = ci === COMPANIES.length - 1;
                        return (
                          <td
                            key={ci}
                            className={[
                              "px-4 py-4 align-middle text-center transition-colors duration-150",
                              co.isND
                                ? "border-x-2 border-nd-primary/25 bg-nd-primary/[0.04] group-hover:bg-nd-primary/[0.08]"
                                : "border-r border-nd-border-dim bg-nd-bg group-hover:bg-nd-surface/50",
                              !isLast ? "border-b border-nd-border-dim/60" : "",
                              isLast && isLastCol ? "rounded-br-[1.25rem]" : "",
                            ].join(" ")}
                          >
                            <div className="flex flex-col items-center gap-2">
                              {cell.good === true ? (
                                <CheckIcon />
                              ) : cell.good === "partial" ? (
                                <NeutralIcon />
                              ) : (
                                <CrossIcon />
                              )}
                              <span
                                className={`max-w-[130px] text-[0.75rem] leading-snug ${
                                  cell.good === true
                                    ? "font-semibold text-nd-primary"
                                    : cell.good === "partial"
                                    ? "font-medium text-amber-700"
                                    : "text-red-500/70"
                                }`}
                              >
                                {cell.value}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   PRICING DEEP-DIVE — full-width card with animated bars
================================================================ */
function PricingSection() {
  const maxPrice = 24399;

  return (
    <section
      className="border-t border-nd-border-dim py-20 md:py-28"
      aria-labelledby="pricing-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal className="mb-4">
          <h2
            id="pricing-heading"
            className="font-display font-extrabold tracking-tight text-nd-ink"
            style={{
              fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            Accessible from day one
          </h2>
        </Reveal>
        <Reveal delay={0.05} className="mb-12">
          <p
            className="text-nd-muted"
            style={{ fontSize: "0.9375rem", lineHeight: 1.65, maxWidth: "48ch" }}
          >
            BCI technology should not be reserved for the well-funded. Every patient who needs it deserves access.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[1.25rem] border border-nd-border-dim bg-nd-surface p-8 sm:p-10">
            <p className="mb-8 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-nd-muted">
              Starting price comparison (SGD)
            </p>
            <div className="flex flex-col gap-6">
              {PRICE_DATA.map((item, i) => {
                const pct = Math.max(6, (item.price / maxPrice) * 100);
                return (
                  <div key={item.company} className="flex items-center gap-4 sm:gap-6">
                    <span
                      className={`w-[120px] shrink-0 text-[0.875rem] sm:w-[140px] ${
                        item.isND
                          ? "font-semibold text-nd-ink"
                          : "font-medium text-nd-muted"
                      }`}
                    >
                      {item.company}
                    </span>
                    <div className="flex-1">
                      <AnimatedBar pct={pct} isND={item.isND} delay={0.15 + i * 0.08} />
                    </div>
                    <span
                      className={`w-[90px] text-right font-mono text-[0.8125rem] tabular-nums sm:w-[110px] ${
                        item.isND
                          ? "font-semibold text-nd-primary"
                          : "text-nd-muted"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 border-t border-nd-border-dim pt-8">
              <p className="text-[0.875rem] leading-relaxed text-nd-muted" style={{ maxWidth: "56ch" }}>
                Neural Drive starts at{" "}
                <strong className="text-nd-ink">~SGD 2,500</strong>. The next most affordable
                option starts at SGD 3,000, and the most expensive reaches SGD 24,399: nearly
                10x the price.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   EASE OF USE DEEP-DIVE — split: callout left, bars right
================================================================ */
function EaseSection() {
  return (
    <section
      className="border-t border-nd-border-dim py-20 md:py-28"
      aria-labelledby="ease-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: large callout */}
          <Reveal>
            <h2
              id="ease-heading"
              className="mb-5 font-display font-extrabold tracking-tight text-nd-ink"
              style={{
                fontSize: "clamp(1.75rem, 2.5vw, 2.5rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              The easiest BCI to use, by far
            </h2>
            <p
              className="mb-9 leading-relaxed text-nd-muted"
              style={{ fontSize: "0.9375rem", lineHeight: 1.65, maxWidth: "40ch" }}
            >
              Two deliberate blinks. No complex training sequences, no gel electrodes, no technician on site. Neural Drive is the only BCI rated above 4.5 by users in real-world clinical settings.
            </p>
            <div className="flex flex-col gap-1">
              <span
                className="font-display font-black leading-none tracking-tighter text-nd-primary"
                style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}
              >
                4.8 / 5
              </span>
              <span className="text-[0.875rem] text-nd-muted">Average user ease-of-use rating</span>
            </div>
          </Reveal>

          {/* Right: progress bars for all companies */}
          <Reveal delay={0.15}>
            <div className="rounded-[1.25rem] border border-nd-border-dim bg-nd-surface p-8 sm:p-10">
              <p className="mb-8 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-nd-muted">
                Ease of use ratings (out of 5)
              </p>
              <div className="flex flex-col gap-6">
                {EASE_DATA.map((item, i) => (
                  <div key={item.company} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-[0.875rem] ${
                          item.isND
                            ? "font-semibold text-nd-ink"
                            : "font-medium text-nd-muted"
                        }`}
                      >
                        {item.company}
                      </span>
                      <span
                        className={`font-mono text-[0.875rem] tabular-nums ${
                          item.isND
                            ? "font-semibold text-nd-primary"
                            : "text-nd-muted"
                        }`}
                      >
                        {item.score} / 5
                      </span>
                    </div>
                    <AnimatedBar
                      pct={(item.score / 5) * 100}
                      isND={item.isND}
                      delay={0.2 + i * 0.1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   CTA — full-bleed inverted green card
================================================================ */
function CompareCTA() {
  return (
    <section className="border-t border-nd-border-dim py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-nd-primary px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-full"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 50% 0%, rgba(255,255,255,0.09) 0%, transparent 60%)",
              }}
              aria-hidden="true"
            />
            <div className="relative">
              <h2
                className="mb-5 font-display font-extrabold tracking-tight text-white"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                Ready to make the choice?
              </h2>
              <p
                className="mx-auto mb-10 leading-relaxed text-white/70"
                style={{
                  fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)",
                  lineHeight: 1.65,
                  maxWidth: "44ch",
                }}
              >
                Partner with us to bring breakthrough brain-computer interface technology to the patients who need it most.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=mo@neuraldrive.tech&su=Neural%20Drive%20Access%20Request"
        target="_blank"
        rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-nd-primary transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  Request Access
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
                >
                  Back to Neural Drive
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE ROOT
================================================================ */
export default function ComparePage() {
  return (
    <main className="min-h-screen bg-nd-bg">
      <CompareNav />
      <CompareHero />
      <AdvantageSection />
      <CompareTable />
      <PricingSection />
      <EaseSection />
      <CompareCTA />
    </main>
  );
}
