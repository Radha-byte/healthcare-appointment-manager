import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function generatePrevisitSummary(symptoms: string) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Analyse these symptoms and return ONLY valid JSON with keys "urgencyLevel" (Low/Medium/High), "chiefComplaint" (short string), and "suggestedQuestions" (array of exactly 3 strings). Symptoms: ${symptoms}`,
        },
      ],
    });

    const text = response.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("");

    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return { success: true as const, data: parsed, raw: text };
  } catch (error) {
    console.error("LLM previsit summary failed:", error);
    return { success: false as const, error: "LLM_FAILED" };
  }
}

export async function generatePostvisitSummary(clinicalNotes: string) {
  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Convert these clinical notes into a patient-friendly summary with medication schedule and follow-up steps. Return ONLY valid JSON with keys "patientFriendlySummary", "medicationSchedule", "followUpSteps" (all strings). Notes: ${clinicalNotes}`,
        },
      ],
    });

    const text = response.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
    return { success: true as const, data: parsed };
  } catch (error) {
    console.error("LLM postvisit summary failed:", error);
    return { success: false as const, error: "LLM_FAILED" };
  }
}