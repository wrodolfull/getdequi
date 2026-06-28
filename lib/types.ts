export type TemplateName = "poc-modern-orange" | "commercial-sober-mono" | "happy-pastel";
export type PresentationType = "poc" | "commercial_proposal" | "diagnosis" | "executive_summary";
export interface BriefingInterpretation { clientName?: string; issuerName?: string; audience?: string; presentationType: PresentationType; solution?: string; objective?: string; recommendedTemplate: TemplateName; missingFields: string[]; commercial?: { users?: number; supervisorLicenses?: number; totalLicenses?: number; pricePerLicense?: number; monthlyTotal?: number; implementationFee?: number; implementationDiscountPercent?: number; implementationFinal?: number; proposalValidityDays?: number; }; consultantName?: string; consultantRole?: string; }
export interface GeneratedPresentation { template: TemplateName; metadata: { clientName: string; issuerName: string; audience: string; consultantName?: string; consultantRole?: string; }; content: Record<string, any>; }
export interface TemplateSchemaField { type: "text" | "array" | "number"; maxChars?: number; maxLines?: number; maxItems?: number; }
export interface TemplateSchema { template: TemplateName; maxSlides: number; fields: Record<string, TemplateSchemaField>; }
export interface OutlineItem { slide: number; title: string; purpose: string; }
