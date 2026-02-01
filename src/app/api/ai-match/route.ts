import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { experience, profile, techs } from "@/constants/profile.data";

export const maxDuration = 30;

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
    `Nombre: ${profile.fullName}`,
    `Título: ${profile.title}`,
    "",
    "Resumen:",
    profile.summary.map((s) => `- ${s}`).join("\n"),
    "",
    "Habilidades (top):",
    topTechs,
    "",
    "Experiencia:",
    exp,
  ].join("\n");
}

function systemPrompt(resumeText: string) {
  return [
    "Eres un reclutador técnico/ATS muy estricto y útil.",
    "Tu tarea: comparar los REQUISITOS del puesto (pegados por el usuario) contra el CV del candidato (abajo) y producir un informe claro en español.",
    "",
    "Reglas:",
    "- No inventes experiencia: si no está en el CV, dilo explícitamente como gap.",
    "- Distingue entre: (1) match directo, (2) match parcial/transferible, (3) no match.",
    "- Para match parcial, explica qué faltaría demostrar/aprender y sugiere un plan corto (2–6 semanas) con acciones concretas.",
    "- Si faltan datos del puesto (seniority, stack, dominio), menciona supuestos.",
    "- Formato: usa Markdown con secciones y bullets.",
    "",
    "Estructura de salida (usa estos títulos):",
    "## Match fuerte",
    "## Match parcial (transferible)",
    "## No match / gaps",
    "## Preguntas para aclarar el puesto",
    "## Recomendaciones (cómo mejorar el fit)",
    "",
    "CV del candidato:",
    "```",
    resumeText,
    "```",
  ].join("\n");
}

export async function POST(req: Request) {
  const body = (await req.json()) as { messages?: UIMessage[] };
  const messages = body.messages ?? [];

  const last = messages.at(-1);
  const lastText =
    last?.parts?.find((p) => p.type === "text")?.text?.trim() ?? "";
  if (!lastText) {
    return new Response("Missing requirements text.", { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response("Missing OPENAI_API_KEY.", { status: 500 });
  }

  const modelName = process.env.AI_MATCH_MODEL ?? "gpt-4o-mini";
  const result = streamText({
    model: openai(modelName),
    system: systemPrompt(toResumeText()),
    messages: await convertToModelMessages(messages),
  });

  return result.toTextStreamResponse();
}
