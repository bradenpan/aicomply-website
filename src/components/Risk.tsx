const risks = [
  {
    stat: "$16K–$70K",
    label: "per person, per violation",
    description: "State-imposed civil penalties for each aggrieved person, each violation. 50 rejected applicants could mean 50 separate violations.",
  },
  {
    stat: "Uncapped",
    label: "compensatory damages",
    description: "No cap on actual damages, including emotional distress, back pay, lost benefits, and attorney's fees. Unlike federal Title VII, which caps at $50K–$300K.",
  },
  {
    stat: "AG action",
    label: "up to $100K per violation",
    description: "The Illinois Attorney General can independently bring pattern-and-practice actions with fines up to $100,000 per violation — no individual complaint required.",
  },
];

export function Risk() {
  return (
    <section id="penalties" className="bg-teal-800 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold">What&apos;s at stake</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-teal-50/70">
            HB&nbsp;3773 has the strongest enforcement mechanism of any state AI
            employment law.
          </p>
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
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
