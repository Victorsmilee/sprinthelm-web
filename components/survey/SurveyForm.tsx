"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_URL =
  "https://sprinthelm.streamlit.app/?demo=true&utm_source=survey&utm_medium=web";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ?? "";
const LS_KEY = "sh_survey_last_submit";
const COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes

// ── Types ────────────────────────────────────────────────────────────────────

type AnswerValue = string | string[];

interface Answers {
  [key: string]: AnswerValue;
}

// ── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }): React.ReactElement {
  const pct = step > 5 ? 100 : (step / 5) * 100;
  const label = step > 5 ? "Complete" : `${step} of 5`;
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="flex-1 h-1 bg-border-subtle rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-caption text-text-disabled whitespace-nowrap min-w-[56px] text-right">
        {label}
      </span>
    </div>
  );
}

function SectionTag({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <span className="block text-label font-semibold text-accent uppercase tracking-widest mb-1">
      {children}
    </span>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <h2 className="text-xl font-semibold text-text-primary mb-6">{children}</h2>
  );
}

function QBlock({ children }: { children: React.ReactNode }): React.ReactElement {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-xl p-4 mb-4">
      {children}
    </div>
  );
}

function QLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}): React.ReactElement {
  return (
    <p className="text-sm font-medium text-text-primary mb-3 leading-snug">
      {children}
      {required && <span className="text-accent ml-1">*</span>}
    </p>
  );
}

function ErrorMsg({ show, msg }: { show: boolean; msg: string }): React.ReactElement {
  if (!show) return <></>;
  return <p className="text-xs text-danger mt-2">{msg}</p>;
}

// Single-select radio option
function RadioOpt({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors duration-150 cursor-pointer w-full ${
        selected
          ? "border-accent bg-accent/10 text-text-primary"
          : "border-border-subtle text-text-secondary hover:border-border-active hover:bg-bg-elevated"
      }`}
    >
      <span
        className={`mt-0.5 w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
          selected ? "border-accent bg-accent" : "border-border-active"
        }`}
      >
        {selected && (
          <span className="w-1.5 h-1.5 rounded-full bg-bg-primary block" />
        )}
      </span>
      {label}
    </button>
  );
}

// Multi-select checkbox option
function CheckOpt({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-colors duration-150 cursor-pointer w-full ${
        selected
          ? "border-accent bg-accent/10 text-text-primary"
          : "border-border-subtle text-text-secondary hover:border-border-active hover:bg-bg-elevated"
      }`}
    >
      <span
        className={`mt-0.5 w-3.5 h-3.5 rounded-md border flex-shrink-0 flex items-center justify-center text-[9px] font-bold ${
          selected ? "border-accent bg-accent text-bg-primary" : "border-border-active"
        }`}
      >
        {selected && "✓"}
      </span>
      {label}
    </button>
  );
}

// 1-5 scale selector
function ScaleSelector({
  qid,
  value,
  onChange,
  labelLeft,
  labelRight,
}: {
  qid: string;
  value: string;
  onChange: (v: string) => void;
  labelLeft: string;
  labelRight: string;
}): React.ReactElement {
  return (
    <div>
      <div className="flex gap-2">
        {["1", "2", "3", "4", "5"].map((n) => (
          <button
            key={`${qid}-${n}`}
            type="button"
            onClick={() => onChange(n)}
            className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors duration-150 ${
              value === n
                ? "border-accent bg-accent text-bg-primary"
                : "border-border-subtle text-text-secondary hover:border-border-active hover:bg-bg-elevated"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-[11px] text-text-disabled">{labelLeft}</span>
        <span className="text-[11px] text-text-disabled">{labelRight}</span>
      </div>
    </div>
  );
}

// ── Score calculation ────────────────────────────────────────────────────────

function calcScore(answers: Answers): number {
  let s = 0;

  const painMap: Record<string, number> = {
    "Most sprints — spillover is the default": 3,
    "Regularly (1 in 2–3 sprints)": 2,
    "Occasionally (1 in 4–5 sprints)": 1,
    "Almost never — we consistently hit our sprint goals": 0,
  };
  s += painMap[answers["q4"] as string] ?? 0;

  const pain5 = (answers["q5"] as string[]) ?? [];
  s += Math.min(pain5.length * 0.5, 2);

  const conf = parseInt((answers["q6"] as string) ?? "3", 10);
  s += (5 - conf) * 0.4;

  const gap = (answers["q8"] as string) ?? "";
  if (gap.includes("No — this is a gap")) s += 2;
  else if (gap.includes("gut feel")) s += 1;

  const val = parseInt((answers["q10"] as string) ?? "3", 10);
  s += (val - 1) * 0.5;

  const pay = (answers["q12"] as string) ?? "";
  if (pay.includes("$60–$99") || pay.includes("$100–$199") || pay.includes("$200+")) {
    s += 1;
  } else if (pay.includes("$29–$59")) {
    s += 0.5;
  }

  const demo = parseInt((answers["q15"] as string) ?? "3", 10);
  s += (demo - 1) * 0.4;

  return Math.min(Math.round(s * 10) / 10, 10);
}

type ResultTier = {
  title: string;
  body: string;
};

function getResultTier(score: number): ResultTier {
  if (score >= 7) {
    return {
      title: "SprintHelm is built for you.",
      body: "You're running a team under real delivery pressure, your current tooling has a visible gap, and you're ready to move beyond gut feel. SprintHelm's Monte Carlo simulation, Pressure Index, and backlog scoring engine were designed for exactly this situation.",
    };
  }
  if (score >= 4) {
    return {
      title: "SprintHelm could make a real difference.",
      body: "You're managing delivery reasonably well but feel the friction. SprintHelm's what-if scenario planner and epic timeline projections are likely to be the features that click for you — especially when a stakeholder asks why their feature didn't make the sprint.",
    };
  }
  return {
    title: "Good to meet you — we'd love your feedback.",
    body: "Your team seems to have delivery fairly well managed. SprintHelm's PRD extraction and AI executive summary might still save you hours of sprint prep — and the free demo takes 60 seconds to try.",
  };
}

function getPainPills(answers: Answers): string[] {
  const pain5 = (answers["q5"] as string[]) ?? [];
  const pills: string[] = [];
  if (pain5.some((p) => p.includes("takeholder") || p.includes("CEO")))
    pills.push("Stakeholder alignment");
  if (pain5.some((p) => p.includes("prioritis")))
    pills.push("Backlog prioritisation");
  if (pain5.some((p) => p.includes("debt")))
    pills.push("Tech debt visibility");
  if (pain5.some((p) => p.includes("capacity")))
    pills.push("Capacity modelling");
  if (pain5.some((p) => p.includes("forecast")))
    pills.push("Epic forecasting");
  if (pain5.some((p) => p.includes("Single point")))
    pills.push("SPOF risk");
  return pills;
}

// ── Formspree submission ─────────────────────────────────────────────────────

async function submitToFormspree(answers: Answers): Promise<void> {
  if (!FORMSPREE_ID) return;
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(answers)) {
    flat[k] = Array.isArray(v) ? v.join(", ") : v;
  }
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(flat),
  });
  if (!res.ok) throw new Error("Formspree submission failed");
}

// ── Main component ───────────────────────────────────────────────────────────

export function SurveyForm(): React.ReactElement {
  const [step, setStep] = useState<number>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [alreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
  const [resultTier, setResultTier] = useState<ResultTier | null>(null);
  const [painPills, setPainPills] = useState<string[]>([]);

  useEffect(() => {
    const ts = localStorage.getItem(LS_KEY);
    if (ts && Date.now() - parseInt(ts, 10) < COOLDOWN_MS) {
      setAlreadySubmitted(true);
    }
  }, []);

  function setRadio(qid: string, val: string): void {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
    setErrors((prev) => ({ ...prev, [qid]: false }));
  }

  function toggleCheck(qid: string, val: string, max?: number): void {
    setAnswers((prev) => {
      const current = (prev[qid] as string[]) ?? [];
      const idx = current.indexOf(val);
      let next: string[];
      if (idx > -1) {
        next = current.filter((v) => v !== val);
      } else {
        if (max && current.length >= max) return prev;
        next = [...current, val];
      }
      return { ...prev, [qid]: next };
    });
    setErrors((prev) => ({ ...prev, [qid]: false }));
  }

  function setScale(qid: string, val: string): void {
    setAnswers((prev) => ({ ...prev, [qid]: val }));
    setErrors((prev) => ({ ...prev, [qid]: false }));
  }

  function isChecked(qid: string, val: string): boolean {
    const current = (answers[qid] as string[]) ?? [];
    return current.includes(val);
  }

  const REQUIRED: Record<number, string[]> = {
    1: ["q1", "q2"],
    2: ["q4", "q5"],
    3: ["q8"],
    4: ["q10", "q11", "q12"],
    5: ["q15"],
  };

  function validate(section: number): boolean {
    const fields = REQUIRED[section] ?? [];
    const newErrors: Record<string, boolean> = {};
    let ok = true;
    for (const qid of fields) {
      const val = answers[qid];
      const empty = !val || (Array.isArray(val) && val.length === 0);
      if (empty) {
        newErrors[qid] = true;
        ok = false;
      }
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    return ok;
  }

  function goNext(n: number): void {
    if (n > step && !validate(step)) return;
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(): Promise<void> {
    if (!validate(5)) return;
    setSubmitting(true);
    setSubmitError("");

    const finalAnswers: Answers = {
      ...answers,
      q16: (document.getElementById("q16") as HTMLTextAreaElement | null)?.value ?? "",
      q17: (document.getElementById("q17") as HTMLInputElement | null)?.value ?? "",
    };

    try {
      await submitToFormspree(finalAnswers);
      localStorage.setItem(LS_KEY, String(Date.now()));
    } catch {
      setSubmitError(
        "Submission failed — your results are still shown below. Please try again later."
      );
    }

    const score = calcScore(finalAnswers);
    setResultTier(getResultTier(score));
    setPainPills(getPainPills(finalAnswers));
    setStep(6);
    setSubmitting(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ── Already submitted ───────────────────────────────────────────────────────

  if (alreadySubmitted) {
    return (
      <div className="text-center py-12">
        <div className="text-3xl mb-4">✓</div>
        <h2 className="text-xl font-semibold text-text-primary mb-3">
          You&apos;ve already submitted — thank you!
        </h2>
        <p className="text-text-secondary text-sm mb-6">
          Your responses are on their way to us. Ready to see SprintHelm in action?
        </p>
        <Button asChild>
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-survey-cta="demo"
          >
            Try the live demo <ArrowRight size={16} className="ml-2" />
          </a>
        </Button>
      </div>
    );
  }

  // ── Result screen ───────────────────────────────────────────────────────────

  if (step === 6 && resultTier) {
    return (
      <motion.div
        key="result"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="text-2xl font-semibold text-text-primary mb-3">
          {resultTier.title}
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed max-w-prose mx-auto mb-6">
          {resultTier.body}
        </p>

        {painPills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {painPills.map((pill) => (
              <span
                key={pill}
                className="px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20"
              >
                {pill}
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-3 justify-center flex-wrap">
          <Button asChild>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-survey-cta="demo"
            >
              Try the live demo <ArrowRight size={16} className="ml-2" />
            </a>
          </Button>
          <Button variant="secondary" asChild>
            <a href="/">Learn more</a>
          </Button>
        </div>

        {submitError && (
          <p className="text-xs text-warning mt-4 max-w-prose mx-auto">{submitError}</p>
        )}
      </motion.div>
    );
  }

  // ── Survey sections ─────────────────────────────────────────────────────────

  return (
    <div>
      <ProgressBar step={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <SectionTag>Section 1 of 5 — About You</SectionTag>
              <SectionTitle>Tell us about your role and team</SectionTitle>
            </div>

            {/* q1 — Role (multi-select, max 3) */}
            <QBlock>
              <QLabel required>What is your role? (select all that apply, up to 3)</QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Product Manager / Senior PM",
                  "Product Owner",
                  "Delivery Manager / Programme Manager",
                  "Head of Engineering / Engineering Manager",
                  "CTO / VP Engineering",
                  "Scrum Master / Agile Coach",
                  "CEO / Founder",
                ].map((opt) => (
                  <CheckOpt
                    key={opt}
                    label={opt}
                    selected={isChecked("q1", opt)}
                    onClick={() => toggleCheck("q1", opt, 3)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q1"]} msg="Please select at least one role to continue." />
            </QBlock>

            {/* q_teams — How many teams */}
            <QBlock>
              <QLabel>How many teams do you currently work with?</QLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {["1", "2", "3+", "Not sure"].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q_teams"] === opt}
                    onClick={() => setRadio("q_teams", opt)}
                  />
                ))}
              </div>
            </QBlock>

            {/* q2 — Engineer count */}
            <QBlock>
              <QLabel required>How many engineers are on your primary team?</QLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {["1–3", "4–10", "11–30", "31–100", "100+"].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q2"] === opt}
                    onClick={() => setRadio("q2", opt)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q2"]} msg="Please select a team size." />
            </QBlock>

            {/* q3 — Sprint cadence */}
            <QBlock>
              <QLabel>What sprint cadence does your team run?</QLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "1-week sprints",
                  "2-week sprints",
                  "3–4 week sprints",
                  "Continuous flow (Kanban)",
                  "No formal sprints",
                ].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q3"] === opt}
                    onClick={() => setRadio("q3", opt)}
                  />
                ))}
              </div>
            </QBlock>

            <div className="flex justify-end mt-4">
              <Button onClick={() => goNext(2)}>
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <SectionTag>Section 2 of 5 — The Pain</SectionTag>
              <SectionTitle>How much does delivery uncertainty cost you right now?</SectionTitle>
            </div>

            {/* q4 — Sprint miss frequency */}
            <QBlock>
              <QLabel required>How often do sprints miss their committed scope?</QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Almost never — we consistently hit our sprint goals",
                  "Occasionally (1 in 4–5 sprints)",
                  "Regularly (1 in 2–3 sprints)",
                  "Most sprints — spillover is the default",
                ].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q4"] === opt}
                    onClick={() => setRadio("q4", opt)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q4"]} msg="Please select one." />
            </QBlock>

            {/* q5 — Friction causes */}
            <QBlock>
              <QLabel required>
                Which of these causes the most friction in your team? (select all that apply)
              </QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Stakeholders adding scope mid-sprint without understanding the trade-off",
                  "No clear way to prioritise the backlog objectively",
                  'Technical debt keeps getting pushed to \u201cnext sprint\u201d',
                  "Team capacity is hard to model — absences, seniority gaps, new hires",
                  "No way to forecast when features or epics will actually ship",
                  "Getting alignment with the CEO / board on delivery timelines",
                  "Single points of failure — too much relying on one person",
                ].map((opt) => (
                  <CheckOpt
                    key={opt}
                    label={opt}
                    selected={isChecked("q5", opt)}
                    onClick={() => toggleCheck("q5", opt)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q5"]} msg="Please select at least one." />
            </QBlock>

            {/* q6 — Confidence scale */}
            <QBlock>
              <QLabel>
                On a scale of 1–5, how much confidence do you have that your current sprint plan
                will complete on time?
              </QLabel>
              <ScaleSelector
                qid="q6"
                value={(answers["q6"] as string) ?? ""}
                onChange={(v) => setScale("q6", v)}
                labelLeft="No confidence"
                labelRight="Very confident"
              />
            </QBlock>

            <div className="flex justify-between mt-4">
              <Button variant="secondary" onClick={() => goNext(1)}>
                ← Back
              </Button>
              <Button onClick={() => goNext(3)}>
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <SectionTag>Section 3 of 5 — Current Tools</SectionTag>
              <SectionTitle>What are you using today — and where does it fall short?</SectionTitle>
            </div>

            {/* q7 — Current tools */}
            <QBlock>
              <QLabel>
                Which tools do you currently use for sprint planning and backlog management?
                (select all that apply)
              </QLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Jira",
                  "Linear",
                  "Asana",
                  "Productboard",
                  "Aha!",
                  "Notion / Confluence",
                  "Spreadsheets",
                  "Post-its / whiteboard",
                  "No tool",
                ].map((opt) => (
                  <CheckOpt
                    key={opt}
                    label={opt}
                    selected={isChecked("q7", opt)}
                    onClick={() => toggleCheck("q7", opt)}
                  />
                ))}
              </div>
            </QBlock>

            {/* q8 — Tooling gap */}
            <QBlock>
              <QLabel required>
                Can your current tooling answer this question in real time: &ldquo;If we add this
                feature to the sprint, what is the probability we complete on time?&rdquo;
              </QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Yes — we have a reliable way to answer this",
                  "Roughly — we estimate based on gut feel and experience",
                  "No — this is a gap we feel every sprint",
                  "We don't track this at all",
                ].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q8"] === opt}
                    onClick={() => setRadio("q8", opt)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q8"]} msg="Please select one." />
            </QBlock>

            {/* q9 — Sprint derailed */}
            <QBlock>
              <QLabel>
                Have you ever had a sprint derailed by something your planning process should have
                flagged earlier?
              </QLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {["Yes — frequently", "Yes — occasionally", "Rarely", "No"].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q9"] === opt}
                    onClick={() => setRadio("q9", opt)}
                  />
                ))}
              </div>
            </QBlock>

            <div className="flex justify-between mt-4">
              <Button variant="secondary" onClick={() => goNext(2)}>
                ← Back
              </Button>
              <Button onClick={() => goNext(4)}>
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="s4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <SectionTag>Section 4 of 5 — Willingness to Pay</SectionTag>
              <SectionTitle>What&apos;s the right price for solving this?</SectionTitle>
            </div>

            {/* q10 — Value scale */}
            <QBlock>
              <QLabel required>
                If a tool could mathematically score your backlog, run 100 sprint simulations, and
                tell you the probability your sprint completes on time — how valuable would that be?
              </QLabel>
              <ScaleSelector
                qid="q10"
                value={(answers["q10"] as string) ?? ""}
                onChange={(v) => setScale("q10", v)}
                labelLeft="Not valuable"
                labelRight="Extremely valuable"
              />
              <ErrorMsg show={!!errors["q10"]} msg="Please rate this." />
            </QBlock>

            {/* q11 — Pricing model */}
            <QBlock>
              <QLabel required>Which pricing model would work best for your team?</QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Per team — flat rate per team per month",
                  "Per organisation — annual contract, unlimited seats",
                  "Free with paid upgrade for advanced features",
                  "I'd need to evaluate before committing to any model",
                ].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q11"] === opt}
                    onClick={() => setRadio("q11", opt)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q11"]} msg="Please select one." />
            </QBlock>

            {/* q12 — Price point (team-based USD) */}
            <QBlock>
              <QLabel required>
                At what monthly price would SprintHelm be a no-brainer purchase for your team?
              </QLabel>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Under $29/mo",
                  "$29–$59/mo",
                  "$60–$99/mo",
                  "$100–$199/mo",
                  "$200+/mo",
                  "Free only — I wouldn't pay",
                ].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q12"] === opt}
                    onClick={() => setRadio("q12", opt)}
                  />
                ))}
              </div>
              <ErrorMsg show={!!errors["q12"]} msg="Please select one." />
            </QBlock>

            {/* q13 — Enterprise tier */}
            <QBlock>
              <QLabel>
                Would your company pay for a team/enterprise tier that includes multi-team
                portfolio view, board-ready PDF reports, and executive benchmarking?
              </QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Yes — this is exactly what our CTO/CEO needs",
                  "Possibly — I'd need to see it in action first",
                  "No — we don't have budget for additional tooling",
                  "Not sure",
                ].map((opt) => (
                  <RadioOpt
                    key={opt}
                    label={opt}
                    selected={answers["q13"] === opt}
                    onClick={() => setRadio("q13", opt)}
                  />
                ))}
              </div>
            </QBlock>

            <div className="flex justify-between mt-4">
              <Button variant="secondary" onClick={() => goNext(3)}>
                ← Back
              </Button>
              <Button onClick={() => goNext(5)}>
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            key="s5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-6">
              <SectionTag>Section 5 of 5 — Interest & Next Steps</SectionTag>
              <SectionTitle>Almost done — let us know how to follow up</SectionTitle>
            </div>

            {/* q14 — Feature selection */}
            <QBlock>
              <QLabel>
                Which SprintHelm features would be most useful to you right now? (select up to 3)
              </QLabel>
              <div className="flex flex-col gap-1.5">
                {[
                  "Backlog scoring engine — objective priority scores across 6 factors",
                  "Monte Carlo simulation — probability that the sprint completes on time",
                  "Pressure Index — Green/Yellow/Red sprint health gauge",
                  "AI Executive Summary — 3-sentence board-ready sprint brief generated by AI",
                  "Epic Timeline Projections — forecast when each epic ships across future sprints",
                  'What-If Scenario Planning \u2014 \u201cwhat if we add this dev / remove this epic?\u201d',
                  "PRD Extraction — upload a PRD doc and get a scored backlog automatically",
                  "Multi-team portfolio view — side-by-side velocity and health for all teams",
                ].map((opt) => (
                  <CheckOpt
                    key={opt}
                    label={opt}
                    selected={isChecked("q14", opt)}
                    onClick={() => toggleCheck("q14", opt, 3)}
                  />
                ))}
              </div>
            </QBlock>

            {/* q15 — Demo likelihood */}
            <QBlock>
              <QLabel required>
                How likely are you to try SprintHelm&apos;s free demo (no sign-up required)?
              </QLabel>
              <ScaleSelector
                qid="q15"
                value={(answers["q15"] as string) ?? ""}
                onChange={(v) => setScale("q15", v)}
                labelLeft="Not likely"
                labelRight="Definitely will"
              />
              <ErrorMsg show={!!errors["q15"]} msg="Please rate this." />
            </QBlock>

            {/* q16 — Open feedback */}
            <QBlock>
              <QLabel>
                Is there anything specific you&apos;d want SprintHelm to do that you didn&apos;t
                see above?
              </QLabel>
              <textarea
                id="q16"
                placeholder="Open feedback — any missing features, integration needs, or deal-breakers…"
                rows={3}
                className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent transition-colors duration-200 resize-y"
              />
            </QBlock>

            {/* q17 — Email */}
            <QBlock>
              <QLabel>Work email — if you&apos;d like early access or an invite to our beta</QLabel>
              <input
                id="q17"
                type="email"
                placeholder="you@company.com"
                className="w-full bg-bg-elevated border border-border-subtle rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-disabled focus:outline-none focus:border-accent transition-colors duration-200"
              />
            </QBlock>

            <p className="text-xs text-text-disabled mt-6 text-center">
              Have a question before you submit?{" "}
              <a
                href="mailto:hello@sprinthelm.com"
                className="text-accent hover:underline"
              >
                hello@sprinthelm.com
              </a>
            </p>

            <div className="flex justify-between mt-4">
              <Button variant="secondary" onClick={() => goNext(4)}>
                ← Back
              </Button>
              <Button onClick={handleSubmit} disabled={submitting}>
                {submitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Submit <ArrowRight size={16} className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
