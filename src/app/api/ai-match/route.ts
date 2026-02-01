import { openai } from "@ai-sdk/openai";
import {
  convertToModelMessages,
  generateText,
  streamText,
  type UIMessage,
} from "ai";
import { experience, profile, techs } from "@/constants/profile.data";

export const maxDuration = 30;

function looksLikeJobRequirements(input: string) {
  const text = input.trim().toLowerCase();
  if (text.length < 80) return false;

  const keywords = [
    "job",
    "role",
    "position",
    "responsibilities",
    "responsibility",
    "requirements",
    "required",
    "qualifications",
    "experience",
    "years",
    "skills",
    "stack",
    "must have",
    "nice to have",
    "salary",
    "benefits",
    "location",
    "remote",
    "onsite",
    "hybrid",
  ];

  let hits = 0;
  for (const k of keywords) if (text.includes(k)) hits++;
  return hits >= 2;
}

function toResumeText() {
  const topTechs = techs
    .slice()
    .sort((a, b) => b.proficiency - a.proficiency)
    .slice(0, 18)
    .map((t) => `- ${t.name} (aprox. ${t.proficiency}/10)`)
    .join("\n");

  const exp = experience
    .map((e) => {
      const bullets = e.description.map((d) => `- ${d}`).join("\n");
      return [`${e.company} — ${e.role} (${e.from}–${e.to})`, bullets, ""].join(
        "\n",
      );
    })
    .join("\n");

  return [
    `FullName: ${profile.fullName}`,
    `Title: ${profile.title}`,
    "",
    "Summary:",
    profile.summary.map((s) => `- ${s}`).join("\n"),
    "",
    "Skills (top):",
    topTechs,
    "",
    "Experience:",
    exp,
  ].join("\n");
}

function systemPrompt(resumeText: string) {
  return [
    "You are a strict but helpful technical recruiter/ATS evaluator.",
    "Your task: compare the USER-PASTED JOB REQUIREMENTS against the candidate CV (below).",
    "",
    "Rules:",
    "- Do not invent experience. If it is not in the CV, call it out as a gap.",
    "- When a requirement is expressed as 'X years of experience in <tech>': use the candidate's proficiency score for that tech as a proxy.",
    "  - If proficiency is >= 6/10 for that tech, mark the years requirement as a Direct match regardless of the requested years.",
    "  - Example: '4 years of experience in React' should be considered a Direct match if React proficiency is 6/10 or higher.",
    "- Output must be in ENGLISH.",
    "- Output must be VALID Markdown.",
    "- Primary output must be a single Markdown table.",
    "- Use match levels: Direct, Partial (Transferable), Gap.",
    "- Keep the table focused: list the 10–14 most important requirements only (deduplicate similar ones).",
    "- For Partial/Gap, include a short, actionable ramp-up plan (1–2 weeks) in the Notes column.",
    "",
    "Required output structure:",
    "1) A Markdown table with these columns:",
    "| Requirement | Match | Evidence from CV | What's missing / Plan |",
    "2) After the table, add a short closing line that communicates a growth mindset, e.g.:",
    '"I genuinely enjoy learning and ramping up quickly on new tools and domains."',
    "",
    "Candidate CV:",
    "```",
    resumeText,
    "```",
  ].join("\n");
}

async function validateJobRequirementsInput(text: string, modelName: string) {
  const result = await generateText({
    model: openai(modelName),
    temperature: 0,
    prompt: [
      "Classify the following USER INPUT.",
      "If it is a job description / role requirements for a job, answer exactly: VALID",
      "Otherwise answer exactly: INVALID",
      "",
      "USER INPUT:",
      "```",
      text,
      "```",
    ].join("\n"),
  });

  return result.text.trim().toUpperCase() === "VALID";
}

export async function POST(req: Request) {
  const body = (await req.json()) as { messages?: UIMessage[] };
  const messages = body.messages ?? [];

  const last = messages.at(-1);
  const lastText =
    last?.parts?.find((p) => p.type === "text")?.text?.trim() ?? "";
  if (!lastText) {
    return new Response(
      "Invalid input. Please paste the job description or role requirements.",
      { status: 400 },
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response("Server misconfigured: missing OPENAI_API_KEY.", {
      status: 500,
    });
  }

  const modelName = process.env.AI_MATCH_MODEL ?? "gpt-4o-mini";
  if (!looksLikeJobRequirements(lastText)) {
    return new Response(
      "That doesn't look like job requirements. Please paste a job description (responsibilities/requirements/skills) and try again.",
      { status: 400 },
    );
  }

  const isValid = await validateJobRequirementsInput(lastText, modelName);
  if (!isValid) {
    return new Response(
      "Invalid input. Please paste the job description or role requirements (not a general message) and try again.",
      { status: 400 },
    );
  }

  const result = streamText({
    model: openai(modelName),
    system: systemPrompt(toResumeText()),
    messages: await convertToModelMessages(messages),
  });

  return result.toTextStreamResponse();
}
