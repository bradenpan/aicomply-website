const items = [
  {
    title: "Broad coverage",
    description:
      "Applies to any employer with 1+ employees who hires or interviews candidates in Illinois — including remote positions. Staffing agencies are covered too.",
  },
  {
    title: "Beyond just hiring",
    description:
      "Covers AI used in recruitment, hiring, promotion, discipline, termination, compensation, and other employment decisions.",
  },
  {
    title: "Most employers don't realize they're covered",
    description:
      "If your ATS screens resumes, your job ads are algorithmically targeted, or your video interview tool scores candidates — you're using AI under this law.",
  },
  {
    title: "Detailed disclosure required",
    description:
      "For each AI tool, you must disclose: the tool name, its purpose, what data it collects, which decisions it affects, targeted positions, and a contact person.",
  },
];

export function Problem() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold text-gray-900">
          What is Illinois HB&nbsp;3773?
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-600">
          Illinois House Bill 3773 amends the Illinois Human Rights Act to
          regulate AI in employment decisions. It is the most
          employer-impactful AI hiring law in the United States.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
