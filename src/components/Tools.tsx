import Image from "next/image";

const categories = [
  {
    label: "Recruiting & Screening",
    tools: [
      { name: "Indeed", logo: "/logos/indeed.png" },
      { name: "LinkedIn", logo: "/logos/linkedin.png" },
      { name: "Greenhouse", logo: "/logos/greenhouse.png" },
      { name: "Workday", logo: "/logos/workday.png" },
      { name: "Workable", logo: "/logos/workable.png" },
      { name: "Paradox (Olivia)", logo: "/logos/paradox.png" },
      { name: "iCIMS", logo: "/logos/icims.png" },
    ],
  },
  {
    label: "Interviews & Evaluation",
    tools: [
      { name: "HireVue", logo: "/logos/hirevue.png" },
      { name: "Spark Hire", logo: "/logos/sparkhire.png" },
      { name: "Zoom AI", logo: "/logos/zoom.png" },
      { name: "TestGorilla", logo: "/logos/testgorilla.png" },
      { name: "HackerRank", logo: "/logos/hackerrank.png" },
      { name: "Otter.ai", logo: "/logos/otter.png" },
      { name: "Fireflies.ai", logo: "/logos/fireflies.png" },
    ],
  },
  {
    label: "Performance & Compensation",
    tools: [
      { name: "Lattice", logo: "/logos/lattice.png" },
      { name: "15Five", logo: "/logos/15five.png" },
      { name: "Culture Amp", logo: "/logos/cultureamp.png" },
      { name: "PayScale", logo: "/logos/payscale.png" },
      { name: "ADP", logo: "/logos/adp.png" },
      { name: "BambooHR", logo: "/logos/bamboohr.png" },
      { name: "Gusto", logo: "/logos/gusto.png" },
    ],
  },
];

export function Tools() {
  return (
    <section className="bg-white py-20">
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
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {categories.map((cat) => (
            <div key={cat.label}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-5">
                {cat.label}
              </h3>
              <div className="space-y-3">
                {cat.tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-3 ring-1 ring-gray-100"
                  >
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={28}
                      height={28}
                      className="shrink-0 rounded"
                    />
                    <span className="text-sm font-semibold text-gray-800">
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            This is not an exhaustive list — many other tools use AI in ways
            that may trigger HB&nbsp;3773.
          </p>
          <a
            href="#assessment"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-coral-500 px-6 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
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
