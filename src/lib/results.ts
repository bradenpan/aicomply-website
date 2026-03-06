export interface ResultScreen {
  headline: string;
  body: string[];
  cta: string;
}

export function getResultScreen(answers: Record<string, string | string[]>): ResultScreen {
  const toolQuestions = [
    "recruiting_screening_tools",
    "interview_evaluation_tools",
    "performance_comp_tools",
  ];

  const totalTools = toolQuestions.reduce((count, qId) => {
    const val = answers[qId];
    if (!val || !Array.isArray(val)) return count;
    return count + val.filter((v) => v !== "None of the above").length;
  }, 0);

  const hasNotice = answers["written_notice"] === "Yes";
  const hasPolicy = answers["written_policy"] === "Yes";
  const hasContact = answers["point_of_contact"] === "Yes";

  // Screen C: already compliant
  if (hasNotice && hasPolicy && hasContact) {
    return {
      headline: "You're ahead of most employers — but compliance is ongoing.",
      body: [
        `You've identified ${totalTools} AI tool${totalTools !== 1 ? "s" : ""} and appear to have key compliance measures in place. That puts you ahead of the majority of employers we've assessed.`,
        "However, HB 3773 requires notices to be updated within 30 days when tools change and regenerated annually. As your tool stack evolves, staying compliant is an ongoing effort.",
      ],
      cta: "We're building a tool to automate ongoing monitoring and updates. We'll reach out with early access details.",
    };
  }

  // Default screen: disclosure requirements
  return {
    headline: `You have ${totalTools} AI tool${totalTools !== 1 ? "s" : ""} that may require disclosure under HB 3773.`,
    body: [
      "Under Illinois HB 3773 (effective January 1, 2026), disclosure requirements include:",
      "1. **Job listings** — AI tool use must be disclosed in every job posting\n2. **Handbook, workplace, and website** — Written notices must be posted in your employee handbook, physical workplace, and company website\n3. **Ongoing updates** — Notices must be updated within 30 days whenever a tool changes",
      "Non-compliance may lead to fines of up to $70,000 per person per violation, civil actions, and/or uncapped liability in private lawsuits.",
    ],
    cta: "We're building a tool to automate review and disclosure. We'll reach out with early access details.",
  };
}
