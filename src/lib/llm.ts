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