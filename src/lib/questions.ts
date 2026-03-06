export type QuestionType = "single" | "multi";

export interface QuestionOption {
  label: string;
  logos?: string[]; // paths to logo images
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
  hasOther?: boolean;
  skipIf?: { questionId: string; answer: string; screen: string };
}

export const questions: Question[] = [
  {
    id: "company_type",
    text: "Which best describes your company?",
    type: "single",
    options: [
      { label: "Employer" },
      { label: "Recruiting or staffing agency" },
    ],
  },
  {
    id: "company_size",
    text: "How many employees does your company have?",
    type: "single",
    options: [
      { label: "1-49" },
      { label: "50-199" },
      { label: "200-999" },
      { label: "1,000-4,999" },
      { label: "5,000+" },
    ],
  },
  {
    id: "illinois_nexus",
    text: "Do you hire or interview candidates who work in Illinois?",
    type: "single",
    options: [
      { label: "Yes" },
      { label: "No" },
      { label: "Not sure" },
    ],
    skipIf: {
      questionId: "illinois_nexus",
      answer: "No",
      screen: "no_illinois",
    },
  },
  {
    id: "recruiting_screening_tools",
    text: "Which of these tools do you use for recruiting or screening? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      { label: "LinkedIn", logos: ["/logos/linkedin.png"] },
      { label: "Indeed", logos: ["/logos/indeed.png"] },
      { label: "Greenhouse", logos: ["/logos/greenhouse.png"] },
      { label: "Workable", logos: ["/logos/workable.png"] },
      { label: "Lever", logos: ["/logos/lever.png"] },
      { label: "BambooHR", logos: ["/logos/bamboohr.png"] },
      { label: "JazzHR", logos: ["/logos/jazzhr.png"] },
      { label: "iCIMS", logos: ["/logos/icims.png"] },
      { label: "Checkr", logos: ["/logos/checkr.png"] },
      { label: "ChatGPT or other AI to write job descriptions", logos: ["/logos/openai.png"] },
      { label: "None of the above" },
    ],
  },
  {
    id: "interview_evaluation_tools",
    text: "Which of these tools do you use for interviews or evaluation? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      { label: "HireVue", logos: ["/logos/hirevue.png"] },
      { label: "Spark Hire", logos: ["/logos/sparkhire.png"] },
      { label: "TestGorilla", logos: ["/logos/testgorilla.png"] },
      { label: "HackerRank", logos: ["/logos/hackerrank.png"] },
      { label: "AI meeting tools", logos: ["/logos/zoom.png", "/logos/google.png", "/logos/microsoft.png"] },
      { label: "Otter.ai", logos: ["/logos/otter.png"] },
      { label: "Metaview", logos: ["/logos/metaview.png"] },
      { label: "None of the above" },
    ],
  },
  {
    id: "performance_comp_tools",
    text: "Which of these tools do you use for performance or compensation? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      { label: "Lattice", logos: ["/logos/lattice.png"] },
      { label: "15Five", logos: ["/logos/15five.png"] },
      { label: "Culture Amp", logos: ["/logos/cultureamp.png"] },
      { label: "Workday", logos: ["/logos/workday.png"] },
      { label: "PayScale", logos: ["/logos/payscale.png"] },
      { label: "Qualtrics", logos: ["/logos/qualtrics.png"] },
      { label: "None of the above" },
    ],
  },
  {
    id: "written_notice",
    text: "Do you provide written notice to job applicants that AI is used in your hiring process?",
    type: "single",
    options: [{ label: "Yes" }, { label: "No" }],
  },
  {
    id: "written_policy",
    text: "Do you have a written policy on AI use in employment decisions?",
    type: "single",
    options: [{ label: "Yes" }, { label: "No" }],
  },
  {
    id: "point_of_contact",
    text: "Have you designated a point of contact for AI-related questions from applicants or employees?",
    type: "single",
    options: [{ label: "Yes" }, { label: "No" }],
  },
  {
    id: "concern_level",
    text: "How concerned are you about compliance with AI hiring laws?",
    type: "single",
    options: [
      { label: "Very concerned - this is a top priority" },
      { label: "Somewhat concerned - it's on my radar" },
      { label: "Not very concerned - we'll deal with it eventually" },
      { label: "Not concerned at all" },
    ],
  },
];
