import { readFile } from "fs/promises";
import path from "path";
import type { TemplateName } from "./types";
import { getByPath } from "./validators";
function escapeHtml(value: unknown) { return String(value ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]!)); }
export async function renderTemplate(templateName: TemplateName, content: Record<string, any>): Promise<string> { const dir = path.join(process.cwd(), "templates", templateName); const [html, css] = await Promise.all([readFile(path.join(dir, "template.html"), "utf8"), readFile(path.join(dir, "style.css"), "utf8")]); const rendered = html.replace(/{{\s*([\w.[\]_-]+)\s*}}/g, (_m, key) => escapeHtml(getByPath(content, key))); return `<!doctype html><html><head><meta charset="utf-8"/><style>${css}</style></head><body>${rendered}</body></html>`; }
