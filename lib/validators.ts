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

