import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Neural Drive",
  description: "Terms and conditions governing use of Neural Drive's website and services.",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-nd-bg">
      <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-24">

        <Link
          href="/"
          className="mb-12 inline-flex items-center gap-2 text-sm text-nd-muted transition-colors hover:text-nd-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Neural Drive
        </Link>

        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary">
          Legal
        </p>
        <h1 className="mb-2 font-display text-4xl font-extrabold tracking-tighter text-nd-ink">
          Terms of Service
        </h1>
        <p className="mb-14 text-sm text-nd-muted">Last updated: 31 May 2026</p>

        <div>
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing the Neural Drive website (neuraldrive.tech) or using any of our services, you agree to be
              bound by these Terms of Service (&ldquo;Terms&rdquo;) and our Privacy Policy. If you do not agree, you must
              discontinue use immediately.
            </p>
            <p>
              These Terms apply to all visitors, researchers, investors, and clinical partners who interact with our
              website or request access to our technology.
            </p>
          </Section>

          <Section title="2. Description of Services">
            <p>
              Neural Drive provides information about our brain-computer interface (BCI) technology, research
              updates, and access request functionality through this website. Our clinical device is currently in
              pre-commercial development and is not available for general consumer purchase.
            </p>
          </Section>

          <Section title="3. Intellectual Property">
            <p>
              All content on this website, including text, graphics, logos, images, software, and research
              summaries, is the exclusive property of Neural Drive Pte. Ltd. or its licensors and is protected
              by applicable copyright, trademark, and intellectual property laws.
            </p>
            <p>
              You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any
              content from this website without our prior written consent.
            </p>
          </Section>

          <Section title="4. Acceptable Use">
            <p>You agree not to:</p>
            <ul>
              <li>Use the website for any unlawful purpose or in violation of any applicable regulation.</li>
              <li>Attempt to reverse-engineer, decompile, or extract proprietary information from our technology descriptions.</li>
              <li>Use automated tools to scrape, crawl, or harvest data from the website without permission.</li>
              <li>Misrepresent your affiliation with any institution or organisation when submitting access requests.</li>
              <li>Transmit any content that is harmful, defamatory, or infringes third-party rights.</li>
            </ul>
          </Section>

          <Section title="5. Access Requests">
            <p>
              Submitting an access request does not constitute or guarantee any agreement, partnership, or commercial
              arrangement. Neural Drive reserves the right to accept or decline any access request at its sole
              discretion.
            </p>
          </Section>

          <Section title="6. Disclaimers">
            <p>
              The website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of
              any kind, express or implied, including but not limited to warranties of merchantability, fitness for a
              particular purpose, or non-infringement.
            </p>
            <p>
              Neural Drive does not warrant that the website will be error-free, uninterrupted, or free of viruses
              or other harmful components. Information on this website is for general informational purposes only and
              does not constitute clinical, medical, or investment advice.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Neural Drive and its officers, directors, employees,
              and partners shall not be liable for any indirect, incidental, special, consequential, or punitive
              damages arising from your use of or inability to use this website or its content.
            </p>
          </Section>

          <Section title="8. Third-Party Links">
            <p>
              This website may contain links to third-party websites for informational purposes. Neural Drive has no
              control over, and assumes no responsibility for, the content, privacy policies, or practices of such
              sites. We recommend reviewing the terms and privacy policies of any third-party site you visit.
            </p>
          </Section>

          <Section title="9. Governing Law">
            <p>
              These Terms are governed by and construed in accordance with the laws of Singapore. Any disputes arising
              under these Terms shall be subject to the exclusive jurisdiction of the courts of Singapore.
            </p>
          </Section>

          <Section title="10. Changes to Terms">
            <p>
              We reserve the right to modify these Terms at any time. Changes will be indicated by updating the
              &ldquo;Last updated&rdquo; date. Continued use of the website following any changes constitutes acceptance of the
              revised Terms.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Questions regarding these Terms should be directed to:
              <br />
              <strong>Neural Drive Pte. Ltd.</strong>
              <br />
              Email: <a href="mailto:mo@neuraldrive.tech">mo@neuraldrive.tech</a>
              <br />
              Phone: +65 8113 3532
            </p>
          </Section>
        </div>

        <div className="mt-16 border-t border-nd-border-dim pt-8">
          <div className="flex flex-wrap gap-6 text-sm text-nd-muted">
            <Link href="/privacy" className="hover:text-nd-ink transition-colors">Privacy Policy</Link>
            <Link href="/medical-disclaimer" className="hover:text-nd-ink transition-colors">Medical Disclaimer</Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-display text-xl font-bold tracking-tight text-nd-ink">{title}</h2>
      <div className="flex flex-col gap-4 text-[0.9375rem] leading-relaxed text-nd-muted [&_a]:text-nd-primary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:font-semibold [&_strong]:text-nd-ink [&_ul]:ml-5 [&_ul]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2">
        {children}
      </div>
    </section>
  );
}
