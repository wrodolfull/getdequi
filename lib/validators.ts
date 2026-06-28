type AnyRecord = Record<string, any>;

type ValidationError = {
  path: string;
  message: string;
  value?: string;
};

const LIMITS = {
  titleMaxChars: 68,
  subtitleMaxChars: 140,
  cardTitleMaxChars: 38,
  cardDescriptionMaxChars: 100,
  agendaItemMaxChars: 48,
  bulletMaxChars: 34,
  stepMaxChars: 58
};

function pushIfTooLong(errors: ValidationError[], path: string, value: unknown, max: number) {
  if (typeof value === "string" && value.length > max) {
    errors.push({ path, message: `Excede limite de ${max} caracteres`, value });
  }
}

export function validateCommercialSoberMono(content: AnyRecord): ValidationError[] {
  const errors: ValidationError[] = [];

  pushIfTooLong(errors, "cover.title_line_1", content.cover?.title_line_1, LIMITS.titleMaxChars);
  pushIfTooLong(errors, "cover.title_line_2", content.cover?.title_line_2, LIMITS.titleMaxChars);
  pushIfTooLong(errors, "cover.subtitle", content.cover?.subtitle, LIMITS.subtitleMaxChars);

  content.agenda?.items?.forEach((item: string, i: number) => {
    pushIfTooLong(errors, `agenda.items.${i}`, item, LIMITS.agendaItemMaxChars);
  });

  const cardGroups = ["objective", "context", "solution", "included"];
  for (const group of cardGroups) {
    content[group]?.cards?.forEach((card: AnyRecord, i: number) => {
      pushIfTooLong(errors, `${group}.cards.${i}.title`, card.title, LIMITS.cardTitleMaxChars);
      pushIfTooLong(errors, `${group}.cards.${i}.description`, card.description, LIMITS.cardDescriptionMaxChars);
    });
  }

  content.flow?.steps?.forEach((step: AnyRecord, i: number) => {
    pushIfTooLong(errors, `flow.steps.${i}.title`, step.title, LIMITS.cardTitleMaxChars);
    pushIfTooLong(errors, `flow.steps.${i}.description`, step.description, LIMITS.cardDescriptionMaxChars);
  });

  content.commercial?.cards?.forEach((card: AnyRecord, i: number) => {
    pushIfTooLong(errors, `commercial.cards.${i}.label`, card.label, LIMITS.cardTitleMaxChars);
    pushIfTooLong(errors, `commercial.cards.${i}.title`, card.title, LIMITS.cardTitleMaxChars);
    card.bullets?.forEach((bullet: string, j: number) => {
      pushIfTooLong(errors, `commercial.cards.${i}.bullets.${j}`, bullet, LIMITS.bulletMaxChars);
    });
  });

  content.final?.steps?.forEach((step: string, i: number) => {
    pushIfTooLong(errors, `final.steps.${i}`, step, LIMITS.stepMaxChars);
  });

  return errors;
}


export type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};

export function getByPath(content: AnyRecord, path: string) {
  return path
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .filter(Boolean)
    .reduce<unknown>((value, key) => {
      if (value && typeof value === "object") return (value as AnyRecord)[key];
      return undefined;
    }, content);
}

export function truncateToSchema(schema: AnyRecord, content: AnyRecord): AnyRecord {
  const fields = schema.fields as Record<string, { maxChars?: number }> | undefined;
  if (!fields) return content;

  const clone = structuredClone(content);

  for (const [path, field] of Object.entries(fields)) {
    const maxChars = field.maxChars;
    const value = getByPath(clone, path);

    if (typeof value === "string" && typeof maxChars === "number" && value.length > maxChars) {
      const segments = path.replace(/\[(\d+)\]/g, ".$1").split(".").filter(Boolean);
      const last = segments.pop();
      const parent = segments.reduce<unknown>((current, key) => {
        if (current && typeof current === "object") return (current as AnyRecord)[key];
        return undefined;
      }, clone);

      if (last && parent && typeof parent === "object") {
        (parent as AnyRecord)[last] = value.slice(0, maxChars);
      }
    }
  }

  return clone;
}

export function validateContent(schema: AnyRecord, content: AnyRecord): ValidationResult {
  const schemaErrors: ValidationError[] = [];
  const fields = schema.fields as Record<string, { maxChars?: number; required?: boolean }> | undefined;

  if (fields) {
    for (const [path, field] of Object.entries(fields)) {
      const value = getByPath(content, path);

      if (field.required && (value === undefined || value === null || value === "")) {
        schemaErrors.push({ path, message: "Campo obrigatório não informado" });
      }

      if (typeof field.maxChars === "number") {
        pushIfTooLong(schemaErrors, path, value, field.maxChars);
      }
    }
  } else if (schema.template === "commercial-sober-mono") {
    schemaErrors.push(...validateCommercialSoberMono(content));
  }

  return { valid: schemaErrors.length === 0, errors: schemaErrors };
}
