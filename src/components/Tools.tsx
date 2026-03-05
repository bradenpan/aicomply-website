const tools = [
  {
    name: "Indeed",
    detail: "Sponsored Jobs use algorithmic targeting to decide which candidates see your posting. Indeed Resume uses AI matching.",
  },
  {
    name: "LinkedIn Recruiter",
    detail: "AI-powered candidate matching, job recommendations, and the new AI Hiring Assistant agent.",
  },
  {
    name: "Greenhouse",
    detail: "AI resume screening, AI-suggested candidates, AI-powered matching with Real Talent.",
  },
  {
    name: "Workday",
    detail: "AI-driven hiring tools, skills-based candidate matching, automated screening.",
  },
  {
    name: "HireVue / Spark Hire",
    detail: "AI video analysis, automated candidate scoring, structured interview evaluation.",
  },
  {
    name: "TestGorilla / Codility",
    detail: "AI-scored skills assessments, automated candidate ranking and filtering.",
  },
  {
    name: "Paradox (Olivia)",
    detail: "AI chatbot that pre-screens candidates, schedules interviews, and collects information.",
  },
  {
    name: "Lattice / 15Five",
    detail: "AI-powered performance insights, review analysis, and compensation recommendations.",
  },
];

export function Tools() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-gray-900">
          These Common Tools Likely Trigger HB&nbsp;3773
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Most employers don&apos;t realize their existing software uses AI in
          ways that require disclosure under Illinois law.
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex gap-4 rounded-lg border border-gray-200 p-5"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100">
                <span className="text-amber-700 text-xs font-bold">!</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{tool.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Not sure if your tools qualify?
          </p>
          <a
            href="#assessment"
            className="mt-2 inline-block font-semibold text-blue-600 hover:text-blue-700"
          >
            Take the free assessment to find out
          </a>
        </div>
      </div>
    </section>
  );
}
