import { NextRequest, NextResponse } from "next/server";

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";

// Rate limiting: max 10 requests per minute per IP
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

// Valid values for each field
const VALID_FIELDS: Record<string, string[] | "free_text"> = {
  session_id: "free_text",
  timestamp: "free_text",
  completed: "free_text",
  last_step: "free_text",
  company_size: ["1-49", "50-199", "200-999", "1,000-4,999", "5,000+"],
  illinois_nexus: ["Yes", "No", "Not sure"],
  auto_screen: ["Yes", "No", "I'm not sure"],
  written_notice: [
    "Yes, for all AI tools",
    "Yes, for some AI tools",
    "No",
    "I didn't know this was required",
  ],
  written_policy: ["Yes", "No", "We're working on one"],
  point_of_contact: ["Yes", "No", "I didn't know this was required"],
  concern_level: [
    "Very concerned - this is a top priority",
    "Somewhat concerned - it's on my radar",
    "Not very concerned - we'll deal with it eventually",
    "Not concerned at all",
  ],
  // Multi-select fields and free text fields are validated loosely
  recruiting_tools: "free_text",
  screening_tools: "free_text",
  evaluation_tools: "free_text",
  performance_comp_tools: "free_text",
  email: "free_text",
  company: "free_text",
  pricing: "free_text",
  result_screen: "free_text",
};

function isValidPayload(body: Record<string, unknown>): boolean {
  // Must have a session_id
  if (!body.session_id || typeof body.session_id !== "string") return false;
  if (body.session_id.length > 100) return false;

  // Reject unknown fields
  for (const key of Object.keys(body)) {
    if (!(key in VALID_FIELDS)) return false;
  }

  // Validate single-select fields against allowed values
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === "") continue;
    const allowed = VALID_FIELDS[key];
    if (Array.isArray(allowed) && typeof value === "string" && !allowed.includes(value)) {
      return false;
    }
    // Reject excessively long values
    if (typeof value === "string" && value.length > 2000) return false;
  }

  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const body = await request.json();

    if (!isValidPayload(body)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    if (!GOOGLE_SCRIPT_URL) {
      console.error("GOOGLE_SCRIPT_URL not configured");
      return NextResponse.json({ ok: true });
    }

    // Fire and forget to Google Apps Script — don't block the user
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch((err) => {
      console.error("Failed to write to Google Sheet:", err);
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
