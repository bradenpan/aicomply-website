import { Assessment } from "./Assessment";

export function Hero() {
  return (
    <section id="assessment" className="bg-cream-50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left column */}
          <div className="pt-4">
            <div className="mb-6 inline-flex items-center rounded-full bg-coral-50 px-4 py-1.5 text-sm font-semibold text-coral-500 ring-1 ring-coral-500/20">
              Law effective January 1, 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              Is your company compliant with Illinois&apos;s new AI hiring law?
            </h1>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              If you use Indeed, LinkedIn, Greenhouse, or any AI&#8209;powered
              tool in hiring, Illinois law now requires specific written
              disclosures to every applicant and employee.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">2-minute assessment</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Instant results</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50">
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">No data shared</span>
              </div>
            </div>
          </div>

          {/* Right column — assessment form */}
          <div>
            <Assessment variant="embedded" />
          </div>
        </div>
      </div>
    </section>
  );
}
