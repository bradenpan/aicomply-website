export interface ResultScreen {
  headline: string;
  body: string[];
  cta: string;
}

export function getResultScreen(answers: Record<string, string | string[]>): ResultScreen {
  const toolQuestions = [
    "recruiting_tools",
    "screening_tools",
    "evaluation_tools",
    "performance_comp_tools",
  ];

  const totalTools = toolQuestions.reduce((count, qId) => {
    const val = answers[qId];
    if (!val || !Array.isArray(val)) return count;
    return count + val.filter((v) => v !== "None of the above").length;
  }, 0);

  const notice = answers["written_notice"] as string;
  const noNotice = notice === "No" || notice === "I didn't know this was required";
  const hasPolicy = answers["written_policy"] === "Yes";
  const hasNoticeForAll = notice === "Yes, for all AI tools";
  const hasContact = answers["point_of_contact"] === "Yes";

  // Screen C: already compliant
  if (hasNoticeForAll && hasPolicy && hasContact) {
    return {
      headline: "You're ahead of most employers.",
      body: [
        `Based on your responses, you identified ${totalTools} AI-powered tool${totalTools !== 1 ? "s" : ""} in your employment process and appear to have key compliance measures in place.`,
        "However, HB 3773 requires employers to update notices within 30 days when AI tools change and regenerate disclosures annually. As your tool stack evolves, staying compliant becomes an ongoing operational burden.",
        "We're building a tool to automate ongoing monitoring and notice updates as your AI tools change. We'll be in touch.",
      ],
      cta: "We'll be in touch with early access details.",
    };
  }

  // Screen A: high exposure
  if (totalTools >= 3 && noNotice) {
    return {
      headline: "You may have significant compliance gaps.",
      body: [
        `Based on your responses, you identified ${totalTools} AI-powered tools in your employment process. Illinois HB 3773 (effective January 1, 2026) requires employers who use AI in employment decisions to:`,
        "• Provide written notice to every applicant and employee about each AI tool used\n• Include specific details: tool name, purpose, data collected, decisions affected, and a designated point of contact\n• Post notices in job listings, employee handbook, physical workplace, and company website\n• Update notices within 30 days when tools change, and regenerate annually\n• Designate a point of contact for AI-related questions and accommodation requests",
        "Under HB 3773, non-compliance may expose employers to civil penalties of up to $16,000-$70,000 per violation, plus actual damages, back pay, and attorneys' fees through the Illinois Human Rights Act enforcement process.",
        "We're building a tool to help automate this. We'll be in touch with early access details.",
      ],
      cta: "We'll be in touch with early access details.",
    };
  }

  // Screen B: moderate exposure
  return {
    headline: "You may have compliance requirements to address.",
    body: [
      `Based on your responses, you identified ${totalTools} AI-powered tool${totalTools !== 1 ? "s" : ""} that may trigger disclosure requirements under Illinois HB 3773 (effective January 1, 2026).`,
      "HB 3773 requires employers who use AI in employment decisions to provide written notice to applicants and employees, including: the tool name, its purpose, data collected, decisions affected, and a designated point of contact. Notices must appear in job postings, employee handbooks, the physical workplace, and the employer's website.",
      "We're building a tool to help employers manage these compliance requirements. We'll be in touch with early access details.",
    ],
    cta: "We'll be in touch with early access details.",
  };
}
