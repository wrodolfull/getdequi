import type { TemplateSchema } from "./types";

export const GLOBAL_LIMITS = {
  max_slides: 10,
  title_max_chars: 68,
  title_max_lines: 2,
  subtitle_max_chars: 140,
  card_title_max_chars: 38,
  card_description_max_chars: 100,
  max_cards_per_slide: 6,
  max_bullets_per_slide: 5,
  bullet_max_chars: 105,
};

function normalizePath(path: string) {
  return path.replace(/\[(\d+)\]/g, ".$1");
}

export function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return normalizePath(path)
    .split(".")
    .reduce<unknown>((accumulator, part) => {
      if (accumulator == null || typeof accumulator !== "object") return undefined;
      return (accumulator as Record<string, unknown>)[part];
    }, obj);
}

export function validateContent(schema: TemplateSchema, content: Record<string, unknown>) {
  const errors: string[] = [];

  if (schema.maxSlides > GLOBAL_LIMITS.max_slides) {
    errors.push(`Template excede ${GLOBAL_LIMITS.max_slides} slides.`);
  }

  for (const [fieldPath, rules] of Object.entries(schema.fields)) {
    const value = getByPath(content, fieldPath);
    if (value == null) continue;

    if (rules.type === "text") {
      const text = String(value);
      if (rules.maxChars && text.length > rules.maxChars) {
        errors.push(`${fieldPath} excede ${rules.maxChars} caracteres.`);
      }

      if (rules.maxLines) {
        const estimatedLines = Math.ceil(text.length / 34);
        if (estimatedLines > rules.maxLines) {
          errors.push(`${fieldPath} excede ${rules.maxLines} linhas estimadas.`);
        }
      }
    }

    if (rules.type === "array" && Array.isArray(value) && rules.maxItems && value.length > rules.maxItems) {
      errors.push(`${fieldPath} excede ${rules.maxItems} itens.`);
    }
  }

  return { valid: errors.length === 0, errors };
}

export function truncateToSchema(schema: TemplateSchema, content: Record<string, unknown>) {
  const copy = structuredClone(content) as Record<string, unknown>;

  for (const [fieldPath, rules] of Object.entries(schema.fields)) {
    if (rules.type !== "text" || !rules.maxChars) continue;

    const parts = normalizePath(fieldPath).split(".");
    let target: unknown = copy;

    for (const part of parts.slice(0, -1)) {
      if (target == null || typeof target !== "object") break;
      target = (target as Record<string, unknown>)[part];
    }

    const key = parts.at(-1);
    if (!key || target == null || typeof target !== "object") continue;

    const record = target as Record<string, unknown>;
    if (record[key] && String(record[key]).length > rules.maxChars) {
      record[key] = `${String(record[key]).slice(0, rules.maxChars - 1).trimEnd()}…`;
    }
  }

  return copy;
}
