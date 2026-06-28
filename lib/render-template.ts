import fs from "node:fs/promises";
import path from "node:path";

type AnyRecord = Record<string, any>;

function getByPath(obj: AnyRecord, keyPath: string): string {
  if (keyPath === "__css") return "";
  const value = keyPath.split(".").reduce<any>((acc, key) => {
    if (acc === undefined || acc === null) return undefined;
    return acc[key];
  }, obj);

  if (value === undefined || value === null) return "";
  return String(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function renderTemplate(templateName: string, content: AnyRecord): Promise<string> {
  const templateDir = path.join(process.cwd(), "templates", templateName);
  const [templateHtml, css] = await Promise.all([
    fs.readFile(path.join(templateDir, "template.html"), "utf8"),
    fs.readFile(path.join(templateDir, "style.css"), "utf8")
  ]);

  return templateHtml.replace(/{{\s*([^}]+)\s*}}/g, (_, rawKey: string) => {
    const key = rawKey.trim();
    if (key === "__css") return css;
    return escapeHtml(getByPath(content, key));
  });
}

