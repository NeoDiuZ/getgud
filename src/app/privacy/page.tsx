import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Neural Drive",
  description: "How Neural Drive collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-nd-bg">
      <div className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-24">

        {/* Back nav */}
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
          Privacy Policy
        </h1>
        <p className="mb-14 text-sm text-nd-muted">Last updated: 31 May 2026</p>

        <div className="prose-legal">
          <Section title="1. Introduction">
            <p>
              Neural Drive Pte. Ltd. (&ldquo;Neural Drive,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting
              your personal data. This Privacy Policy explains what information we collect through our website
              (neuraldrive.tech), how we use it, and the rights you have over your data.
            </p>
            <p>
              By accessing or using our website or services, you acknowledge that you have read and understood this
              Privacy Policy. If you do not agree, please discontinue use of our services.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of personal data:</p>
            <ul>
              <li><strong>Contact information</strong> — name, email address, phone number, and organisation, when provided via our contact forms or access requests.</li>
              <li><strong>Usage data</strong> — IP address, browser type, pages visited, time spent, and referring URLs, collected automatically through standard server logs and analytics.</li>
              <li><strong>Communications</strong> — content of messages you send us via email or our website forms.</li>
              <li><strong>Device data</strong> — device type, operating system, and screen resolution, for the purpose of optimising site performance.</li>
            </ul>
            <p>We do not collect neural signal data or any physiological data through this website.</p>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the data we collect to:</p>
            <ul>
              <li>Respond to enquiries and fulfil access requests.</li>
              <li>Send relevant research updates, product announcements, and clinical trial information (only where you have consented).</li>
              <li>Improve the website experience and diagnose technical issues.</li>
              <li>Comply with applicable legal obligations under the Personal Data Protection Act 2012 (Singapore) (&ldquo;PDPA&rdquo;).</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>
              We process personal data on the following grounds: your consent (where obtained), the performance of a
              contract or pre-contractual steps, compliance with a legal obligation, and our legitimate interests in
              operating and improving our services — provided those interests are not overridden by your rights.
            </p>
          </Section>

          <Section title="5. Data Sharing and Disclosure">
            <p>
              We do not sell your personal data. We may share it with:
            </p>
            <ul>
              <li><strong>Service providers</strong> — third-party vendors who assist with hosting, analytics, and communications, bound by confidentiality agreements.</li>
              <li><strong>Clinical partners</strong> — such as Tan Tock Seng Hospital, under data-sharing agreements that comply with the PDPA and applicable medical data regulations.</li>
              <li><strong>Regulatory authorities</strong> — where required by law or court order.</li>
            </ul>
          </Section>

          <Section title="6. Data Retention">
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes described in this policy or
              as required by law. Contact and enquiry data is typically retained for up to three years unless a longer
              retention period is required or permitted by applicable regulation.
            </p>
          </Section>

          <Section title="7. Security">
            <p>
              We implement appropriate technical and organisational measures — including encryption in transit and at
              rest, access controls, and regular security reviews — to protect your personal data against unauthorised
              access, disclosure, or destruction. However, no transmission over the Internet is completely secure, and
              we cannot guarantee absolute security.
            </p>
          </Section>

          <Section title="8. Your Rights">
            <p>Under the PDPA and applicable laws, you have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Withdraw consent at any time, where processing is based on consent.</li>
              <li>Request deletion of your data, subject to legal retention obligations.</li>
            </ul>
            <p>
              To exercise these rights, contact us at <a href="mailto:mo@neuraldrive.tech">mo@neuraldrive.tech</a>.
              We will respond within 30 days.
            </p>
          </Section>

          <Section title="9. Cookies">
            <p>
              Our website may use essential cookies to ensure basic functionality. We do not use advertising or
              tracking cookies. You can disable cookies in your browser settings, though this may affect site
              functionality.
            </p>
          </Section>

          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Material changes will be notified by updating
              the &ldquo;Last updated&rdquo; date above. Continued use of the website following such changes constitutes
              acceptance of the revised policy.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              For privacy-related enquiries, contact our Data Protection Officer at:
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
            <Link href="/terms" className="hover:text-nd-ink transition-colors">Terms of Service</Link>
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
