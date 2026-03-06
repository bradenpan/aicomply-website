const categories = [
  {
    label: "Recruiting",
    tools: [
      { name: "Indeed", tag: "AI job targeting & resume matching" },
      { name: "LinkedIn Recruiter", tag: "AI candidate matching & recommendations" },
      { name: "Workable", tag: "AI sourcing across 400M+ profiles" },
    ],
  },
  {
    label: "Screening",
    tools: [
      { name: "Greenhouse", tag: "AI resume screening & suggested candidates" },
      { name: "Workday", tag: "AI candidate matching & automated screening" },
      { name: "Paradox (Olivia)", tag: "AI chatbot pre-screening & scheduling" },
    ],
  },
  {
    label: "Evaluation",
    tools: [
      { name: "HireVue", tag: "AI video analysis & candidate scoring" },
      { name: "Zoom / Teams / Meet", tag: "AI meeting summaries & notetaking" },
      { name: "TestGorilla", tag: "AI-scored skills assessments" },
    ],
  },
  {
    label: "Performance",
    tools: [
      { name: "Lattice / 15Five", tag: "AI performance insights & reviews" },
      { name: "PayScale", tag: "AI compensation benchmarking" },
      { name: "Culture Amp", tag: "AI engagement analytics" },
    ],
  },
];

export function Tools() {
  return (
    <section className="bg-cream-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Do you use any of these?
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
            These common tools likely trigger HB&nbsp;3773 disclosure
            requirements — and most employers don&apos;t realize it.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((cat) => (
            <div key={cat.label}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-4">
                {cat.label}
              </h3>
              <div className="space-y-3">
                {cat.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-100"
                  >
                    <p className="font-semibold text-gray-900 text-sm">
                      {tool.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{tool.tag}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href="#assessment"
            className="inline-flex items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
          >
            Not sure? Take the free assessment
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
