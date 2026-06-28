export type TemplateName = "commercial-sober-mono" | "poc-modern-orange" | "happy-pastel";

export interface TemplateRenderRequest {
  template: TemplateName;
  content: Record<string, any>;
}

export interface TemplateRenderResult {
  html: string;
}

