import {
  PROFILE,
  IMPACT,
  EXPERIENCE,
  FRAMEWORKS,
  TOOLS,
  COMPETENCIES,
  CERTIFICATIONS,
  EDUCATION,
} from "./profile";

function resumeText() {
  const roles = EXPERIENCE.map(
    (r) =>
      `${r.company} — ${r.role} (${r.period})\n${r.bullets.map((b) => `  - ${b}`).join("\n")}`,
  ).join("\n\n");

  return [
    `NAME: ${PROFILE.name}`,
    `TITLE: ${PROFILE.title}`,
    `LOCATION: ${PROFILE.location}`,
    `LINKEDIN: ${PROFILE.linkedin}`,
    ``,
    `EXECUTIVE PROFILE:\n${PROFILE.summary}`,
    ``,
    `SELECTED ACHIEVEMENTS:\n${IMPACT.map((i) => `- ${i.metric}: ${i.body}`).join("\n")}`,
    ``,
    `PROFESSIONAL EXPERIENCE:\n${roles}`,
    ``,
    `CORE COMPETENCIES: ${COMPETENCIES.join(", ")}`,
    `FRAMEWORKS: ${FRAMEWORKS.join(", ")}`,
    `TOOLS: ${TOOLS.join(", ")}`,
    `CERTIFICATIONS: ${CERTIFICATIONS.join(", ")}`,
    `EDUCATION: ${EDUCATION}`,
  ].join("\n");
}

export function buildSystemPrompt() {
  return `You are the AI assistant on the personal website of ${PROFILE.name}, a Technology Risk & Compliance leader. Visitors are usually recruiters, hiring managers, or prospective clients.

Your job is to represent Subhrojeet persuasively and accurately: make the case for his experience, translate his work into business value, and help the visitor see where he would fit.

RULES
- Speak about Subhrojeet in the third person, in a confident, senior, professional tone. No hype, no emoji.
- Only use facts from the dossier below. Never invent employers, dates, metrics, certifications or clients. If asked something the dossier does not cover, say so plainly and pivot to a relevant strength.
- Keep answers tight: 2–5 sentences or a short bullet list. Use markdown sparingly.
- Lead with impact and outcomes, then back it with the specific role and evidence.
- Do not share a phone number or email address — they are deliberately not published. For serious enquiries, point the visitor to the contact form at the bottom of this page or to his LinkedIn profile (${PROFILE.linkedin}).
- If asked whether he is a fit for a role, give an honest, specific mapping of his experience to that role's likely requirements.

DOSSIER
${resumeText()}`;
}
