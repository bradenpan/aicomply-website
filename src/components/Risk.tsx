const risks = [
  {
    stat: "Private right of action",
    description:
      "Rejected applicants can personally sue your company — no government agency needed to initiate enforcement.",
  },
  {
    stat: "Uncapped damages",
    description:
      "No cap on compensatory or punitive damages. Class action lawsuits are possible.",
  },
  {
    stat: "2-year statute of limitations",
    description:
      "Applicants have up to 2 years to file a charge after the alleged discrimination.",
  },
  {
    stat: "Strict liability",
    description:
      "Your company is liable even if you didn't know your hiring tool used AI or that it was discriminating.",
  },
];

export function Risk() {
  return (
    <section className="bg-gray-900 py-20 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-3xl font-bold">Why This Matters</h2>
        <p className="mt-4 max-w-2xl text-lg text-gray-300">
          HB&nbsp;3773 has the strongest enforcement mechanism of any state AI
          employment law. Non&#8209;compliance creates real legal exposure.
        </p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {risks.map((risk) => (
            <div key={risk.stat}>
              <h3 className="text-lg font-semibold text-white">{risk.stat}</h3>
              <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                {risk.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
