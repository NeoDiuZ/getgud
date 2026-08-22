"use client";

import { useEffect } from "react";

const DEMO_VIDEO = "/videos/neural-drive-demo-video.mp4";
const CONTACT_EMAIL = "mo@neuraldrive.tech";
const CONTACT_PHONE_HREF = "tel:+6581133532";
const CONTACT_PHONE_LABEL = "+65 8113 3532";

function gmailComposerToMailto(href: string) {
  try {
    const url = new URL(href);
    if (url.hostname !== "mail.google.com") return null;

    const to = url.searchParams.get("to") || CONTACT_EMAIL;
    const subject = url.searchParams.get("su") || "Neural Drive inquiry";
    return `mailto:${to}?subject=${encodeURIComponent(subject)}`;
  } catch {
    return null;
  }
}

/**
 * China-specific runtime cleanup.
 *
 * The global site keeps the same source structure as the Vercel build while
 * this branch removes browser-time dependencies on services that are commonly
 * unavailable from mainland China.
 */
export default function ChinaRuntime() {
  useEffect(() => {
    // Gmail composer links -> the visitor's own mail client.
    document.querySelectorAll<HTMLAnchorElement>("a[href]").forEach((anchor) => {
      const mailto = gmailComposerToMailto(anchor.href);
      if (mailto) anchor.href = mailto;

      // Normalize the homepage footer contact details.
      if (anchor.href.startsWith("mailto:") && anchor.textContent?.trim().includes("@neuraldrive.tech")) {
        anchor.href = `mailto:${CONTACT_EMAIL}`;
        anchor.textContent = CONTACT_EMAIL;
      }

      if (anchor.href.startsWith("tel:") && anchor.textContent?.includes("+65")) {
        anchor.href = CONTACT_PHONE_HREF;
        anchor.textContent = CONTACT_PHONE_LABEL;
      }
    });

    // Replace YouTube embeds with the self-hosted MP4 supplied for this branch.
    document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube.com"], iframe[src*="youtu.be"]').forEach((iframe) => {
      const video = document.createElement("video");
      video.src = DEMO_VIDEO;
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("aria-label", iframe.title || "Neural Drive demo");
      video.className = iframe.className;
      video.style.width = "100%";
      video.style.height = "100%";
      video.style.objectFit = "cover";
      video.style.background = "#000";
      iframe.replaceWith(video);
    });
  }, []);

  return null;
}
