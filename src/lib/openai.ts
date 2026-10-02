import { parseModelJson, textFromResponse, WRITING_MODEL } from "@/lib/idea-model";

export class ModelError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ModelError";
  }
}

export function writingKey() {
  return process.env.OPENAI_API_KEY?.trim() || "";
}

function safeDetail(payload: unknown) {
  if (!payload || typeof payload !== "object" || !("error" in payload)) return "";
  const message = (payload as { error?: { message?: unknown } }).error?.message;
  if (typeof message !== "string") return "";
  return message.replace(/sk-[A-Za-z0-9_-]+/g, "[key]").slice(0, 180);
}

function failureMessage(status: number, payload: unknown) {
  if (status === 401) {
    return "The writing key was rejected. Check OPENAI_API_KEY in .env.local, then restart the dev server.";
  }
  if (status === 429) return "The writing model is busy. Try again in a minute.";
  const detail = safeDetail(payload);
  return detail ? `The writing model did not answer. ${detail}` : "The writing model did not answer. Try again.";
}

export async function completeStructured(options: {
  name: string;
  schema: Record<string, unknown>;
  instructions: string;
  input: string;
  maxOutputTokens: number;
}) {
  const key = writingKey();
  if (!key) throw new ModelError("The writing key is not set.");

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: WRITING_MODEL,
        store: false,
        max_output_tokens: options.maxOutputTokens,
        input: [
          { role: "developer", content: options.instructions },
          { role: "user", content: options.input },
        ],
        text: {
          format: {
            type: "json_schema",
            name: options.name,
            strict: true,
            schema: options.schema,
          },
        },
      }),
      signal: AbortSignal.timeout(120_000),
      cache: "no-store",
    });
  } catch {
    throw new ModelError("The writing model did not answer. Try again.");
  }

  const payload = (await response.json().catch(() => null)) as { status?: string } | null;
  if (!response.ok) throw new ModelError(failureMessage(response.status, payload));
  if (payload?.status === "incomplete") throw new ModelError("The writing model stopped early. Try again.");

  const text = textFromResponse(payload);
  if (!text) throw new ModelError("The writing model did not answer. Try again.");
  try {
    return parseModelJson(text);
  } catch {
    throw new ModelError("The writing model sent something this page could not read.");
  }
}
