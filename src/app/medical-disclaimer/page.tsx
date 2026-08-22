import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Neural Drive",
  description: "Important medical and regulatory information regarding Neural Drive's brain-computer interface technology.",
};

export default function MedicalDisclaimer() {
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

        {/* Regulatory notice banner */}
        <div className="mb-10 rounded-xl border border-nd-accent/30 bg-nd-accent/5 px-6 py-5">
          <p className="text-sm font-semibold text-nd-ink">Important Regulatory Notice</p>
          <p className="mt-1 text-sm leading-relaxed text-nd-muted">
            Neural Drive&rsquo;s brain-computer interface device is currently in pre-commercial development. It has not
            yet received full regulatory clearance from the Health Sciences Authority (HSA) of Singapore or any other
            regulatory body. It is not approved for general consumer sale or unsupervised clinical use.
          </p>
        </div>

        <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-nd-primary">
          Legal
        </p>
        <h1 className="mb-2 font-display text-4xl font-extrabold tracking-tighter text-nd-ink">
          Medical Disclaimer
        </h1>
        <p className="mb-14 text-sm text-nd-muted">Last updated: 22 August 2026</p>

        <div>
          <Section title="1. Not a Substitute for Medical Advice">
            <p>
              The information published on this website, including descriptions of Neural Drive&rsquo;s technology,
              clinical research, and case studies, is intended for general informational and educational purposes only.
              It does not constitute medical advice, diagnosis, or treatment recommendation.
            </p>
            <p>
              Always seek the guidance of a qualified healthcare professional regarding any medical condition, treatment
              option, or assistive device. Never disregard or delay seeking professional medical advice because of
              information you have read on this website.
            </p>
          </Section>

          <Section title="2. Regulatory Status">
            <p>
              Neural Drive is pursuing regulatory clearance under the Health Sciences Authority (HSA) Class A Medical
              Device pathway in Singapore, with a projected submission timeline of 2027. Until such clearance is
              granted, the device may only be used under strictly supervised clinical research settings with appropriate
              ethics board approval.
            </p>
            <p>
              Performance metrics, success rates, and clinical outcomes referenced on this website reflect data collected
              during controlled research environments and supervised trials. These results may not be representative of
              outcomes in general clinical use.
            </p>
          </Section>

          <Section title="3. Clinical Research Context">
            <p>
              Neural Drive&rsquo;s clinical studies are conducted in collaboration with Tan Tock Seng Hospital and other
              institutional research partners. All research protocols are subject to ethics committee review and
              comply with applicable research regulations under Singapore law.
            </p>
            <p>
              Participation in any Neural Drive research study is entirely voluntary. Participants have the right to
              withdraw at any time without consequence to their standard medical care.
            </p>
          </Section>

          <Section title="4. Accuracy of Information">
            <p>
              We make reasonable efforts to ensure that the information on this website is accurate and up to date.
              However, medical and scientific knowledge evolves rapidly. Neural Drive makes no warranty, express or
              implied, regarding the completeness, accuracy, or timeliness of any information provided.
            </p>
            <p>
              Statistics, metrics, and technical specifications are based on internal research and are subject to
              revision as clinical data matures.
            </p>
          </Section>

          <Section title="5. Patient Safety">
            <p>
              Neural Drive is designed and tested with patient safety as the primary design criterion. Our engineering
              processes follow IEC 62304 (medical device software lifecycle) and ISO 14971 (risk management) standards.
              Notwithstanding these safeguards, no medical device is entirely without risk.
            </p>
            <p>
              If you are a healthcare professional evaluating Neural Drive for a patient, we strongly encourage direct
              contact with our clinical team at <a href="mailto:mo@neuraldrive.tech">mo@neuraldrive.tech</a> before
              any patient-facing deployment.
            </p>
          </Section>

          <Section title="6. No Doctor-Patient Relationship">
            <p>
              Use of this website, submission of an access request, or correspondence with Neural Drive does not
              establish a doctor-patient relationship, clinical relationship, or any duty of care. Neural Drive is a
              technology company and not a licensed medical provider.
            </p>
          </Section>

          <Section title="7. Limitation of Liability">
            <p>
              To the fullest extent permitted by applicable law, Neural Drive Pte. Ltd. disclaims all liability for
              any medical decisions made in reliance on information published on this website. Any reliance you place
              on such information is strictly at your own risk.
            </p>
          </Section>

          <Section title="8. Contact">
            <p>
              For clinical enquiries, safety concerns, or regulatory questions, please contact:
              <br />
              <strong>Neural Drive Pte. Ltd., Clinical Affairs</strong>
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
            <Link href="/terms" className="hover:text-nd-ink transition-colors">Terms of Service</Link>
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
