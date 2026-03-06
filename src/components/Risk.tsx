const risks = [
  {
    stat: "$70K",
    label: "per violation",
    description: "Civil penalties up to $70,000 for repeat offenders under the Illinois Human Rights Act.",
  },
  {
    stat: "2 years",
    label: "to file",
    description: "Applicants have up to 2 years to file a charge after the alleged discrimination.",
  },
  {
    stat: "Uncapped",
    label: "damages",
    description: "No cap on actual damages, back pay, or attorneys' fees. Class actions are possible.",
  },
  {
    stat: "Strict",
    label: "liability",
    description: "Liable even if you didn't know your tool used AI or that it was discriminating.",
  },
];

export function Risk() {
  return (
    <section className="bg-teal-800 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">What&apos;s at stake</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-teal-50/70">
            HB&nbsp;3773 has the strongest enforcement mechanism of any state AI
            employment law.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {risks.map((risk) => (
            <div key={risk.stat} className="text-center">
              <p className="text-4xl font-bold text-coral-500">{risk.stat}</p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-teal-50/60">
                {risk.label}
              </p>
              <p className="mt-3 text-sm text-teal-50/80 leading-relaxed">
                {risk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
