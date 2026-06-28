import { readFile } from "fs/promises";
import path from "path";
import type { TemplateName } from "./types";
import { getByPath } from "./validators";

const PLACEHOLDER_PATTERN = /{{\s*([\w.[\]_-]+)\s*}}/g;

function escapeHtml(value: unknown): string {
  return String(value ?? "").replace(/[&<>"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

export async function renderTemplate(
  templateName: TemplateName,
  content: Record<string, unknown>,
): Promise<string> {
  const templateDir = path.join(process.cwd(), "templates", templateName);
  const [templateHtml, stylesheet] = await Promise.all([
    readFile(path.join(templateDir, "template.html"), "utf8"),
    readFile(path.join(templateDir, "style.css"), "utf8"),
  ]);

  const renderedBody = templateHtml.replace(PLACEHOLDER_PATTERN, (_match, key: string) => {
    return escapeHtml(getByPath(content, key));
  });

  return [
    "<!doctype html>",
    '<html lang="pt-BR">',
    "<head>",
    '<meta charset="utf-8" />',
    '<meta name="viewport" content="width=1280,height=720" />',
    `<style>${stylesheet}</style>`,
    "</head>",
    "<body>",
    renderedBody,
    "</body>",
    "</html>",
  ].join("\n");
}
