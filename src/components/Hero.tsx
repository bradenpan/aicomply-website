export function Hero() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mb-6 inline-flex items-center rounded-full bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700 ring-1 ring-red-100">
          Law effective January 1, 2026
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
          Is Your Company Compliant with Illinois&apos;s New AI Hiring Law?
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
          If you use Indeed, LinkedIn, Greenhouse, or any AI&#8209;powered tool
          in hiring, Illinois law now requires specific written disclosures to
          every applicant and employee.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#assessment"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Check My Compliance &mdash; Free 2&#8209;Min Assessment
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500">
          No signup required. See your compliance status instantly.
        </p>
      </div>
    </section>
  );
}
