import OpenAI from "openai";
export const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "missing-key" });
export const openaiModel = process.env.OPENAI_MODEL || "gpt-4.1-mini";
export function parseJson<T>(text: string): T { const cleaned = text.trim().replace(/^```json\s*/i, "").replace(/```$/i, ""); return JSON.parse(cleaned) as T; }
