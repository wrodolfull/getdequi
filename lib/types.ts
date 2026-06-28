export type TemplateName = "commercial-sober-mono" | "poc-modern-orange" | "happy-pastel";

export interface OutlineItem {
  slide: number;
  title: string;
  purpose: string;
}

export interface BriefingInterpretation {
  clientName?: string;
  issuerName?: string;
  audience?: string;
  presentationType?: string;
  solution?: string;
  recommendedTemplate: TemplateName | string;
  missingFields?: string[];
  commercial?: {
    users?: number;
    supervisorLicenses?: number;
    totalLicenses?: number;
    pricePerLicense?: number;
    monthlyTotal?: number;
    implementationFee?: number;
    implementationDiscountPercent?: number;
    implementationFinal?: number;
    proposalValidityDays?: number;
  };
  consultantName?: string;
  consultantRole?: string;
}

export interface TemplateFieldSchema {
  type?: string;
  maxChars?: number;
  required?: boolean;
  fields?: Record<string, TemplateFieldSchema>;
  items?: TemplateFieldSchema;
}

export interface TemplateSchema {
  fields: Record<string, TemplateFieldSchema>;
}

export interface TemplateRenderRequest {
  template: TemplateName;
  content: Record<string, any>;
}

export interface TemplateRenderResult {
  html: string;
}
