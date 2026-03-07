"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import { questions } from "@/lib/questions";
import { getResultScreen } from "@/lib/results";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackConversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: "AW-17998193382/kD3yCJKi-YMcEObFmoZD",
      value: 1.0,
      currency: "USD",
    });
  }
}

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

interface AssessmentProps {
  variant?: "embedded" | "standalone";
}

export function Assessment({ variant = "standalone" }: AssessmentProps) {
  const [phase, setPhase] = useState<Phase>("questions");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [otherText, setOtherText] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
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
      for (const [k, v] of Object.entries(data)) {
        if (Array.isArray(v)) {
          data[k] = v.join("; ");
        }
      }
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

  const handleSingleSelect = (optionLabel: string) => {
    const updated = { ...answers, [question.id]: optionLabel };
    setAnswers(updated);

    if (question.skipIf && optionLabel === question.skipIf.answer) {
      syncToSheet({ [question.id]: optionLabel, completed: false, last_step: step + 1 });
      setPhase("no_illinois");
      return;
    }

    if (step < totalSteps - 1) {
      syncToSheet({ [question.id]: optionLabel, last_step: step + 2 });
      setStep(step + 1);
    } else {
      syncToSheet({ [question.id]: optionLabel, last_step: totalSteps });
      setPhase("email");
    }
  };

  const handleMultiToggle = (optionLabel: string) => {
    const current = (answers[question.id] as string[]) || [];
    if (optionLabel === "None of the above") {
      setAnswers({ ...answers, [question.id]: ["None of the above"] });
      return;
    }
    const filtered = current.filter((o) => o !== "None of the above");
    if (filtered.includes(optionLabel)) {
      setAnswers({ ...answers, [question.id]: filtered.filter((o) => o !== optionLabel) });
    } else {
      setAnswers({ ...answers, [question.id]: [...filtered, optionLabel] });
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
      title: title.trim(),
      completed: true,
      last_step: totalSteps,
    });
    trackConversion();
    setPhase("results");
  };

  const isEmbedded = variant === "embedded";

  // No Illinois screen
  if (phase === "no_illinois") {
    const content = (
      <>
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-gray-200">
          <h3 className="text-xl font-bold text-gray-900">
            This law may not apply to you today — but the landscape is changing fast.
          </h3>
          <p className="mt-4 text-gray-600 leading-relaxed text-sm">
            Based on your answer, Illinois HB 3773 may not directly apply to your
            company. However:
          </p>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-teal-600 mt-0.5">•</span>
              <span>If you hire remote workers who could be based in Illinois, you may still be covered</span>
            </li>
            <li className="flex gap-2">
              <span className="text-teal-600 mt-0.5">•</span>
              <span>Colorado, New York City, and Maryland already have AI employment laws in effect, and multiple other states are actively considering similar legislation</span>
            </li>
          </ul>
          <p className="mt-4 text-gray-600 leading-relaxed text-sm">
            Enter your email and we&apos;ll notify you as new laws develop.
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
                trackConversion();
              }
              setPhase("results");
            }}
            className="mt-6 space-y-3"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-coral-500 px-6 py-3 font-semibold text-white hover:bg-coral-600 transition-colors"
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
        <p className="mt-4 text-center text-xs text-gray-400">
          This assessment provides general compliance information, not legal advice.
        </p>
      </>
    );
    return isEmbedded ? <div>{content}</div> : (
      <section id="assessment" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-2xl px-6">{content}</div>
      </section>
    );
  }

  // Results screen
  if (phase === "results") {
    const result = getResultScreen(answers);
    const content = (
      <>
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50">
              <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              {result.headline}
            </h3>
          </div>
          {result.body.map((paragraph, i) => (
            <div
              key={i}
              className="mt-3 text-sm text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: paragraph
                  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                  .replace(/\n/g, "<br />"),
              }}
            />
          ))}
          <div className="mt-6 rounded-lg bg-teal-50 px-4 py-3">
            <p className="text-sm font-medium text-teal-700">
              {result.cta}
            </p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          This assessment provides general compliance information, not legal
          advice. Consult an attorney for specific legal questions.
        </p>
      </>
    );
    return isEmbedded ? <div>{content}</div> : (
      <section id="assessment" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-2xl px-6">{content}</div>
      </section>
    );
  }

  // Email gate
  if (phase === "email") {
    const content = (
      <>
        {!isEmbedded && (
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Free Compliance Assessment
            </h2>
          </div>
        )}
        <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-gray-200">
          <div className="mb-4">
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-teal-600" style={{ width: "100%" }} />
            </div>
            <p className="mt-2 text-xs text-gray-500">Almost done</p>
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Enter your email to see your compliance results.
          </h3>
          <form onSubmit={handleEmailSubmit} className="mt-5 space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                placeholder="Work email address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Your title (optional)"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
            <button
              type="submit"
              className="w-full rounded-lg bg-coral-500 px-6 py-3.5 text-base font-bold text-white hover:bg-coral-600 transition-colors"
            >
              See My Results
            </button>
          </form>
        </div>
        <p className="mt-4 text-center text-xs text-gray-400">
          This assessment provides general compliance information, not legal advice.
        </p>
      </>
    );
    return isEmbedded ? <div>{content}</div> : (
      <section id="assessment" className="bg-cream-50 py-20">
        <div className="mx-auto max-w-2xl px-6">{content}</div>
      </section>
    );
  }

  // Question phase
  const multiSelected = (answers[question.id] as string[]) || [];
  const progress = ((step + 1) / totalSteps) * 100;

  const content = (
    <>
      {!isEmbedded && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Free Compliance Assessment
          </h2>
          <p className="mt-3 text-gray-600">
            {totalSteps} quick questions. Instant results.
          </p>
        </div>
      )}

      <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-lg ring-1 ring-gray-200">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-gray-500 mb-2">
            <span>Question {step + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-teal-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
          {question.text}
        </h3>

        {/* Options */}
        <div className="mt-5 space-y-2.5">
          {question.type === "single"
            ? question.options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSingleSelect(opt.label)}
                  className={`w-full rounded-lg border-2 px-4 py-3.5 text-left text-sm font-medium transition-all ${
                    answers[question.id] === opt.label
                      ? "border-teal-600 bg-teal-50 text-teal-800"
                      : "border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50/50"
                  }`}
                >
                  {opt.label}
                </button>
              ))
            : question.options.map((opt) => {
                const checked = multiSelected.includes(opt.label);
                return (
                  <label
                    key={opt.label}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3.5 text-sm font-medium transition-all ${
                      checked
                        ? "border-teal-600 bg-teal-50 text-teal-800"
                        : "border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50/50"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleMultiToggle(opt.label)}
                      className="h-4 w-4 shrink-0 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    />
                    {opt.logos && opt.logos.length > 0 && (
                      <span className="flex shrink-0 items-center gap-1.5">
                        {opt.logos.map((logo) => (
                          <Image
                            key={logo}
                            src={logo}
                            alt=""
                            width={20}
                            height={20}
                            className="rounded"
                          />
                        ))}
                      </span>
                    )}
                    <span>{opt.label}</span>
                  </label>
                );
              })}

          {question.hasOther && question.type === "multi" && (
            <label
              className={`flex cursor-pointer items-center gap-3 rounded-lg border-2 px-4 py-3.5 text-sm font-medium transition-all ${
                multiSelected.includes("Other")
                  ? "border-teal-600 bg-teal-50 text-teal-800"
                  : "border-gray-200 text-gray-700 hover:border-teal-300 hover:bg-teal-50/50"
              }`}
            >
              <input
                type="checkbox"
                checked={multiSelected.includes("Other")}
                onChange={() => handleMultiToggle("Other")}
                className="h-4 w-4 shrink-0 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
            />
          )}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {question.type === "multi" && (
            <button
              onClick={handleMultiNext}
              disabled={multiSelected.length === 0}
              className="rounded-lg bg-coral-500 px-8 py-3 text-sm font-bold text-white hover:bg-coral-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step < totalSteps - 1 ? "Next" : "See Results"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-gray-400">
        This assessment provides general compliance information, not legal advice.
      </p>
    </>
  );

  return isEmbedded ? <div>{content}</div> : (
    <section id="assessment" className="bg-cream-50 py-20">
      <div className="mx-auto max-w-2xl px-6">{content}</div>
    </section>
  );
}
