"use client";

import { useState, useCallback, useRef } from "react";
import { questions } from "@/lib/questions";
import { getResultScreen } from "@/lib/results";

function generateSessionId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function sendToSheet(data: Record<string, unknown>) {
  fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

type Phase = "questions" | "email" | "results" | "no_illinois";

export function Assessment() {
  const [phase, setPhase] = useState<Phase>("questions");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [pricing, setPricing] = useState("");
  const [emailError, setEmailError] = useState("");
  const sessionId = useRef(generateSessionId());

  const question = questions[step];
  const totalSteps = questions.length;

  const syncToSheet = useCallback(
    (overrides?: Record<string, unknown>) => {
      const data: Record<string, unknown> = {
        session_id: sessionId.current,
        timestamp: new Date().toISOString(),
        completed: false,
        last_step: step + 1,
        ...answers,
        ...overrides,
      };
      // Flatten arrays for sheet readability
      for (const [k, v] of Object.entries(data)) {
        if (Array.isArray(v)) {
          data[k] = v.join("; ");
        }
      }
      // Append other text
      for (const [qId, text] of Object.entries(otherText)) {
        if (text.trim()) {
          const existing = data[qId];
          data[qId] = existing ? `${existing}; Other: ${text.trim()}` : `Other: ${text.trim()}`;
        }
      }
      sendToSheet(data);
    },
    [step, answers, otherText]
  );

  const handleSingleSelect = (option: string) => {
    const updated = { ...answers, [question.id]: option };
    setAnswers(updated);

    // Check skip condition
    if (question.skipIf && option === question.skipIf.answer) {
      syncToSheet({ [question.id]: option, completed: false, last_step: step + 1 });
      setPhase("no_illinois");
      return;
    }

    // Auto-advance on single select
    if (step < totalSteps - 1) {
      syncToSheet({ [question.id]: option, last_step: step + 2 });
      setStep(step + 1);
    } else {
      syncToSheet({ [question.id]: option, last_step: totalSteps });
      setPhase("email");
    }
  };

  const handleMultiToggle = (option: string) => {
    const current = (answers[question.id] as string[]) || [];
    if (option === "None of the above") {
      setAnswers({ ...answers, [question.id]: ["None of the above"] });
      return;
    }
    const filtered = current.filter((o) => o !== "None of the above");
    if (filtered.includes(option)) {
      setAnswers({ ...answers, [question.id]: filtered.filter((o) => o !== option) });
    } else {
      setAnswers({ ...answers, [question.id]: [...filtered, option] });
    }
  };

  const handleMultiNext = () => {
    const current = (answers[question.id] as string[]) || [];
    if (current.length === 0) return;

    if (step < totalSteps - 1) {
      syncToSheet({ last_step: step + 2 });
      setStep(step + 1);
    } else {
      syncToSheet({ last_step: totalSteps });
      setPhase("email");
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    syncToSheet({
      email: email.trim(),
      company: company.trim(),
      pricing,
      completed: true,
      last_step: totalSteps,
    });
    setPhase("results");
  };

  // No Illinois screen
  if (phase === "no_illinois") {
    return (
      <section id="assessment" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              HB 3773 may not currently apply to your company.
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Based on your answer, Illinois HB 3773 may not apply to your
              company at this time. However, if you hire remote workers who could
              be based in Illinois, you may still be covered. Multiple other
              states are developing similar AI employment laws.
            </p>
            <p className="mt-4 text-gray-600 leading-relaxed">
              Enter your email and we&apos;ll keep you updated as new laws are
              enacted.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) {
                  syncToSheet({
                    email: email.trim(),
                    company: company.trim(),
                    completed: true,
                    result_screen: "no_illinois",
                  });
                }
                setPhase("results");
              }}
              className="mt-6 space-y-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Keep Me Updated
              </button>
              <button
                type="button"
                onClick={() => setPhase("results")}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Skip
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            This assessment provides general compliance information, not legal
            advice.
          </p>
        </div>
      </section>
    );
  }

  // Results screen
  if (phase === "results") {
    const result = getResultScreen(answers);
    return (
      <section id="assessment" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              {result.headline}
            </h3>
            {result.body.map((paragraph, i) => (
              <p
                key={i}
                className="mt-4 text-gray-600 leading-relaxed whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-6 text-sm font-medium text-blue-600">
              {result.cta}
            </p>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            This assessment provides general compliance information, not legal
            advice. Consult an attorney for specific legal questions.
          </p>
        </div>
      </section>
    );
  }

  // Email gate
  if (phase === "email") {
    return (
      <section id="assessment" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Free Compliance Assessment
            </h2>
            <div className="mx-auto mt-6 h-2 max-w-md overflow-hidden rounded-full bg-gray-200">
              <div className="h-full rounded-full bg-blue-600" style={{ width: "100%" }} />
            </div>
            <p className="mt-2 text-sm text-gray-500">Almost done</p>
          </div>
          <div className="mt-8 rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Enter your email to see your compliance results.
            </h3>
            <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                  placeholder="Work email address"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
              </div>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Company name (optional)"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which pricing range would you consider for a compliance
                  automation tool? (optional)
                </label>
                <select
                  value={pricing}
                  onChange={(e) => setPricing(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select...</option>
                  <option value="Under $50/month">Under $50/month</option>
                  <option value="$50-100/month">$50-100/month</option>
                  <option value="$100-200/month">$100-200/month</option>
                  <option value="$200+/month">$200+/month</option>
                  <option value="One-time purchase">
                    I&apos;d prefer a one-time purchase
                  </option>
                  <option value="Wouldn't pay">
                    I wouldn&apos;t pay for this
                  </option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                See My Results
              </button>
            </form>
          </div>
          <p className="mt-6 text-center text-xs text-gray-400">
            This assessment provides general compliance information, not legal
            advice.
          </p>
        </div>
      </section>
    );
  }

  // Question phase
  const multiSelected = (answers[question.id] as string[]) || [];
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <section id="assessment" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-2xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Free Compliance Assessment
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Answer {totalSteps} quick questions to see if your hiring tools may
            trigger Illinois HB&nbsp;3773 disclosure requirements.
          </p>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>
              Question {step + 1} of {totalSteps}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {question.text}
          </h3>

          <div className="mt-6 space-y-3">
            {question.type === "single"
              ? question.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSingleSelect(option)}
                    className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                      answers[question.id] === option
                        ? "border-blue-600 bg-blue-50 text-blue-900"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))
              : question.options.map((option) => {
                  const checked = multiSelected.includes(option);
                  return (
                    <label
                      key={option}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                        checked
                          ? "border-blue-600 bg-blue-50 text-blue-900"
                          : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleMultiToggle(option)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      {option}
                    </label>
                  );
                })}

            {question.hasOther && question.type === "multi" && (
              <label
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                  multiSelected.includes("Other")
                    ? "border-blue-600 bg-blue-50 text-blue-900"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <input
                  type="checkbox"
                  checked={multiSelected.includes("Other")}
                  onChange={() => handleMultiToggle("Other")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                Other (please specify)
              </label>
            )}
            {question.hasOther && multiSelected.includes("Other") && (
              <input
                type="text"
                value={otherText[question.id] || ""}
                onChange={(e) =>
                  setOtherText({ ...otherText, [question.id]: e.target.value })
                }
                placeholder="Please specify..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            )}
          </div>

          <div className="mt-8 flex items-center justify-between">
            {step > 0 ? (
              <button
                onClick={handleBack}
                className="text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Back
              </button>
            ) : (
              <div />
            )}

            {question.type === "multi" && (
              <button
                onClick={handleMultiNext}
                disabled={multiSelected.length === 0}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {step < totalSteps - 1 ? "Next" : "See Results"}
              </button>
            )}
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          This assessment provides general compliance information, not legal
          advice.
        </p>
      </div>
    </section>
  );
}
