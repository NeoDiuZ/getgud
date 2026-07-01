"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/* ================================================================
   TeamShowcase — adapted from 21st.dev (makviesainte/team-showcase)
   Rewired to Neural Drive's brand tokens (nd-*), Satoshi/Cabinet
   Grotesk type, next/image, and inline social icons (no react-icons).
================================================================ */

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  /** object-position utility for the portrait crop, e.g. "object-top" */
  focus?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    behance?: string;
  };
}

interface TeamShowcaseProps {
  members: TeamMember[];
}

export default function TeamShowcase({ members }: TeamShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const col1 = members.filter((_, i) => i % 3 === 0);
  const col2 = members.filter((_, i) => i % 3 === 1);
  const col3 = members.filter((_, i) => i % 3 === 2);

  return (
    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-14 select-none w-full max-w-5xl mx-auto font-body">
      {/* ── Left: photo grid ── */}
      <div className="flex gap-2 md:gap-3 flex-shrink-0 overflow-x-auto pb-1 md:pb-0">
        {/* Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          {col1.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[110px] h-[120px] sm:w-[130px] sm:h-[140px] md:w-[155px] md:h-[165px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 2 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[48px] sm:mt-[56px] md:mt-[68px]">
          {col2.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[122px] h-[132px] sm:w-[145px] sm:h-[155px] md:w-[172px] md:h-[182px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>

        {/* Column 3 */}
        <div className="flex flex-col gap-2 md:gap-3 mt-[22px] sm:mt-[26px] md:mt-[32px]">
          {col3.map((member) => (
            <PhotoCard
              key={member.id}
              member={member}
              className="w-[115px] h-[125px] sm:w-[136px] sm:h-[146px] md:w-[162px] md:h-[172px]"
              hoveredId={hoveredId}
              onHover={setHoveredId}
            />
          ))}
        </div>
      </div>

      {/* ── Right: member name list ── */}
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:flex md:flex-col gap-4 md:gap-5 pt-0 md:pt-2 flex-1 w-full">
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            hoveredId={hoveredId}
            onHover={setHoveredId}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Photo card
───────────────────────────────────────── */

function PhotoCard({
  member,
  className,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  className: string;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl cursor-pointer flex-shrink-0 transition-opacity duration-300",
        className,
        isDimmed ? "opacity-60" : "opacity-100",
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes="(max-width: 768px) 40vw, 180px"
        className={cn(
          "object-cover transition-[filter] duration-500 motion-reduce:transition-none",
          member.focus ?? "object-center",
        )}
        style={{
          filter: isActive
            ? "grayscale(0) brightness(1)"
            : "grayscale(1) brightness(0.77)",
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────
   Member name section
───────────────────────────────────────── */

function MemberRow({
  member,
  hoveredId,
  onHover,
}: {
  member: TeamMember;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
}) {
  const isActive = hoveredId === member.id;
  const isDimmed = hoveredId !== null && !isActive;
  const hasSocial =
    member.social?.twitter ??
    member.social?.linkedin ??
    member.social?.instagram ??
    member.social?.behance;

  return (
    <div
      className={cn(
        "cursor-pointer transition-opacity duration-300",
        isDimmed ? "opacity-50" : "opacity-100",
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Name + social */}
      <div className="flex items-center gap-2.5">
        <span
          className={cn(
            "h-3 rounded-[5px] flex-shrink-0 transition-all duration-300",
            isActive ? "bg-nd-primary w-5" : "bg-nd-ink/20 w-4",
          )}
        />
        <span
          className={cn(
            "font-display text-base md:text-[18px] font-bold leading-none tracking-tight transition-colors duration-300",
            isActive ? "text-nd-ink" : "text-nd-ink/80",
          )}
        >
          {member.name}
        </span>

        {/* Social icons */}
        {hasSocial && (
          <div
            className={cn(
              "flex items-center gap-1.5 ml-0.5 transition-all duration-200",
              isActive
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-2 pointer-events-none",
            )}
          >
            {member.social?.twitter && (
              <SocialLink href={member.social.twitter} title="X / Twitter">
                <IconTwitter />
              </SocialLink>
            )}
            {member.social?.linkedin && (
              <SocialLink href={member.social.linkedin} title="LinkedIn">
                <IconLinkedin />
              </SocialLink>
            )}
            {member.social?.instagram && (
              <SocialLink href={member.social.instagram} title="Instagram">
                <IconInstagram />
              </SocialLink>
            )}
            {member.social?.behance && (
              <SocialLink href={member.social.behance} title="Behance">
                <IconBehance />
              </SocialLink>
            )}
          </div>
        )}
      </div>

      {/* Role */}
      <p className="mt-1.5 pl-[27px] text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-nd-muted">
        {member.role}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────
   Social link + inline icons (no react-icons dependency)
───────────────────────────────────────── */

function SocialLink({
  href,
  title,
  children,
}: {
  href: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="p-1 rounded text-nd-muted hover:text-nd-ink hover:bg-nd-ink/10 transition-all duration-150 hover:scale-110 motion-reduce:hover:scale-100"
      title={title}
    >
      {children}
    </a>
  );
}

function IconTwitter() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.756l-4.7-6.14L5.6 22H2.34l8.02-9.17L1.5 2h6.93l4.25 5.62L18.244 2zm-1.185 18h1.83L7.03 3.9H5.06L17.06 20z" />
    </svg>
  );
}

function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.65h.05c.53-1 1.82-2.05 3.75-2.05 4.01 0 4.75 2.64 4.75 6.07V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconBehance() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
      <path d="M8.2 10.6c.6-.3 1-.9 1-1.7 0-1.6-1.2-2.1-2.6-2.1H2v9h4.8c1.5 0 2.9-.7 2.9-2.4 0-1.1-.5-1.9-1.5-2.2zM4 8.4h2.2c.6 0 1 .3 1 .9s-.4.9-1.1.9H4V8.4zm2.4 5.5H4v-2.1h2.5c.7 0 1.2.4 1.2 1.05s-.5 1.05-1.3 1.05zM19.6 8.2h-4V7h4v1.2zm.9 4.2c0-2-1.2-3.6-3.3-3.6-2 0-3.4 1.5-3.4 3.5s1.3 3.5 3.4 3.5c1.6 0 2.7-.7 3.2-2.1h-1.7c-.2.5-.7.7-1.4.7-.9 0-1.5-.5-1.6-1.4h4.8v-.6zm-4.8-.7c.1-.8.6-1.3 1.5-1.3.8 0 1.3.5 1.4 1.3h-2.9z" />
    </svg>
  );
}
