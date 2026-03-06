import { Assessment } from "./Assessment";

export function Hero() {
  return (
    <section id="assessment" className="bg-cream-50 py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left column */}
          <div className="pt-4">
            <div className="mb-6 inline-flex items-center rounded-full bg-coral-50 px-4 py-1.5 text-sm font-semibold text-coral-500 ring-1 ring-coral-500/20">
              In effect since January 1, 2026
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
              In Illinois, employers can be sued for using AI in hiring
            </h1>
            <p className="mt-6 text-base text-gray-600 leading-relaxed">
              LinkedIn, Indeed, and Greenhouse all use AI by default in job
              ad targeting, candidate ranking, and screening. Failure to
              disclose AI use to every applicant may result in severe penalties.
            </p>
            <div className="mt-8 border-t border-gray-200 pt-6 grid grid-cols-2 gap-6 text-center">
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
          </div>
        </div>
      </div>
    </section>
  );
}
