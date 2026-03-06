import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy - AIComply",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6">
          <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-400">Last updated: March 6, 2026</p>

          <div className="mt-12 space-y-10 text-base text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900">Who we are</h2>
              <p className="mt-3">
                This website is operated by My Local Huddle LLC. We built this
                site to help employers understand their obligations under
                Illinois HB&nbsp;3773 and other emerging AI employment laws.
              </p>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">Information we collect</h2>
              <p className="mt-3">
                When you use our compliance assessment, we collect the following
                information:
              </p>
              <div className="mt-4 rounded-xl bg-gray-50 p-5">
                <ul className="space-y-2.5 text-sm">
                  <li className="flex gap-3">
                    <span className="mt-1 text-teal-600">•</span>
                    <span><strong className="text-gray-900">Assessment responses</strong> — company type, company size, tools you use, and your answers to compliance questions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-teal-600">•</span>
                    <span><strong className="text-gray-900">Contact information</strong> — your email address, company name (if provided), and job title (if provided)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-teal-600">•</span>
                    <span><strong className="text-gray-900">Technical data</strong> — a session identifier, timestamp, and your IP address (used for rate limiting only and not stored long-term)</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">How we use your information</h2>
              <p className="mt-3">We use the information we collect to:</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex gap-3">
                  <span className="mt-1 text-teal-600">•</span>
                  <span>Generate your personalized assessment results</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-teal-600">•</span>
                  <span>Contact you about our product when it launches</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 text-teal-600">•</span>
                  <span>Understand market demand for compliance tools</span>
                </li>
              </ul>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">Data storage and security</h2>
              <p className="mt-3">
                Your data is stored securely and all information is transmitted
                over HTTPS. We limit access to your personal data to those who
                need it to operate and improve our service.
              </p>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">What we don&apos;t do</h2>
              <div className="mt-4 rounded-xl bg-gray-50 p-5">
                <ul className="space-y-2.5 text-sm">
                  <li className="flex gap-3">
                    <span className="mt-1 text-coral-500">✕</span>
                    <span>We do not sell your data to anyone</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-coral-500">✕</span>
                    <span>We do not share your data with third parties for marketing purposes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-coral-500">✕</span>
                    <span>We do not use tracking cookies</span>
                  </li>
                </ul>
              </div>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">Children&apos;s privacy</h2>
              <p className="mt-3">
                AIComply is not intended for use by children under the age of 13.
                We do not knowingly collect personal information from children
                under 13. If we become aware that we have collected such
                information, we will delete it.
              </p>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">Your rights</h2>
              <p className="mt-3">
                You have the right to access, correct, or delete your personal
                data at any time. To make a request, contact us through this
                website and we will respond promptly.
              </p>
            </section>

            <hr className="border-gray-200" />

            <section>
              <h2 className="text-xl font-bold text-gray-900">Changes to this policy</h2>
              <p className="mt-3">
                We may update this privacy policy from time to time. Any changes
                will be posted on this page with an updated effective date.
              </p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
