export type QuestionType = "single" | "multi";

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
  hasOther?: boolean;
  skipIf?: { questionId: string; answer: string; screen: string };
}

export const questions: Question[] = [
  {
    id: "company_size",
    text: "How many employees does your company have?",
    type: "single",
    options: ["1-49", "50-199", "200-999", "1,000-4,999", "5,000+"],
  },
  {
    id: "illinois_nexus",
    text: "Do you hire or interview candidates who work in Illinois?",
    type: "single",
    options: ["Yes", "No", "Not sure"],
    skipIf: {
      questionId: "illinois_nexus",
      answer: "No",
      screen: "no_illinois",
    },
  },
  {
    id: "recruiting_tools",
    text: "Which of these tools do you use for recruiting? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      "LinkedIn Recruiter / Job Slots",
      "Indeed Sponsored Jobs / Indeed Resume",
      "Textio / Datapeople (job description optimization)",
      "ChatGPT or other AI to write job descriptions",
      "Appcast / PandoLogic / Joveo (programmatic job advertising)",
      "hireEZ / SeekOut / Entelo (AI sourcing)",
      "Gem / Beamery (recruiting CRM)",
      "Workable AI sourcing",
      "None of the above",
    ],
  },
  {
    id: "screening_tools",
    text: "Which of these tools do you use to screen or filter candidates? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      "Greenhouse",
      "Workday Recruiting",
      "iCIMS",
      "Lever / Ashby",
      "SmartRecruiters / Jobvite",
      "BambooHR / JazzHR / Breezy HR",
      "Paradox (Olivia) / Phenom / XOR (chatbot screening)",
      "Eightfold AI / HiredScore",
      "Checkr / Sterling / HireRight (background checks)",
      "None of the above",
    ],
  },
  {
    id: "evaluation_tools",
    text: "Which of these tools do you use to evaluate or assess candidates? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      "HireVue / Spark Hire (video interviews)",
      "TestGorilla / Criteria Corp / Harver (skills/personality assessments)",
      "HackerRank / Codility / CodeSignal (technical assessments)",
      "Metaview / BrightHire (AI interview notes/scorecards)",
      "Otter.ai / Fireflies.ai (AI meeting notetakers)",
      "Zoom AI Companion / Google Gemini in Meet / Microsoft Copilot in Teams",
      "Crosschq / Searchlight (AI reference checks)",
      "Sapia.ai / Humanly (AI-conducted interviews)",
      "None of the above",
    ],
  },
  {
    id: "performance_comp_tools",
    text: "Which of these tools do you use for managing performance or compensation? Select all that apply.",
    type: "multi",
    hasOther: true,
    options: [
      "Lattice / 15Five / Culture Amp (performance management)",
      "Workday / SAP SuccessFactors / Oracle HCM (enterprise HR suite)",
      "PayScale / Salary.com / Compa (compensation benchmarking)",
      "Syndio / Trusaic (pay equity analysis)",
      "Qualtrics / Viva Glint / Perceptyx (engagement surveys)",
      "Eightfold / Gloat / Fuel50 (internal mobility / succession)",
      "ActivTrak / Teramind / Hubstaff (employee monitoring)",
      "Visier / ADP DataCloud (people analytics)",
      "None of the above",
    ],
  },
  {
    id: "auto_screen",
    text: "Do any of your tools automatically screen, rank, filter, or score candidates?",
    type: "single",
    options: ["Yes", "No", "I'm not sure"],
  },
  {
    id: "written_notice",
    text: "Do you currently provide written notice to job applicants that AI is being used in your hiring process?",
    type: "single",
    options: [
      "Yes, for all AI tools",
      "Yes, for some AI tools",
      "No",
      "I didn't know this was required",
    ],
  },
  {
    id: "written_policy",
    text: "Do you have a written company policy on AI use in employment decisions?",
    type: "single",
    options: ["Yes", "No", "We're working on one"],
  },
  {
    id: "point_of_contact",
    text: "Have you designated a point of contact for AI-related questions from applicants or employees?",
    type: "single",
    options: ["Yes", "No", "I didn't know this was required"],
  },
  {
    id: "concern_level",
    text: "How concerned are you about compliance with AI hiring laws?",
    type: "single",
    options: [
      "Very concerned - this is a top priority",
      "Somewhat concerned - it's on my radar",
      "Not very concerned - we'll deal with it eventually",
      "Not concerned at all",
    ],
  },
];
