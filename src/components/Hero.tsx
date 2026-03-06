import { Assessment } from "./Assessment";

export function Hero() {
  return (
    <section id="assessment" className="bg-cream-50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left column */}
          <div className="pt-4">
            <div className="mb-6 inline-flex items-center rounded-full bg-coral-50 px-4 py-1.5 text-sm font-semibold text-coral-500 ring-1 ring-coral-500/20">
              In effect since January 1, 2026
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
              In Illinois, a rejected applicant can sue your company for using AI in hiring
            </h1>
            <p className="mt-6 text-base text-gray-600 leading-relaxed">
              If you use LinkedIn, Indeed, Greenhouse, or any AI&#8209;powered
              tool in employment decisions, you may need written disclosures
              under HB&nbsp;3773.
            </p>
            <div className="mt-6 flex gap-8">
              <div>
                <p className="text-2xl font-bold text-coral-500">Up to $70K</p>
                <p className="mt-1 text-xs font-medium text-gray-500">in fines per person, per incident</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-coral-500">Uncapped</p>
                <p className="mt-1 text-xs font-medium text-gray-500">liability in private lawsuits</p>
              </div>
            </div>
          </div>

          {/* Right column — assessment form */}
          <div className="pt-8 lg:pt-12">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Check your exposure in 2 minutes
              </h2>
            </div>
            <Assessment variant="embedded" />
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="h-3.5 w-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Instant results
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="h-3.5 w-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                No data shared
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="h-3.5 w-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                No signup required
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
