export type Folder = { id: string; name: string; count: number };
export type DequiStatus = "Publicado" | "Em desenvolvimento" | "Rascunho";
export type Dequi = {
  id: string;
  thumbnailTitle: string;
  thumbnailSubtitle: string;
  status: DequiStatus;
  name: string;
  description: string;
  views: number;
  comments: number;
  favorite: boolean;
  theme: string;
};
export type Template = { id: string; name: string; slides: number; theme: string };
export type RecentAccess = { email: string; date: string };

export const user = { name: "Rodolfo Santos", role: "Administrador", initial: "R" };
export const plan = { name: "Pro", validUntil: "18/07/2026", used: 12, limit: 25 };

export const folders: Folder[] = [
  { id: "propostas", name: "Propostas", count: 8 },
  { id: "pocs", name: "POCs", count: 5 },
  { id: "comercial", name: "Comercial", count: 6 },
  { id: "educacao", name: "Educação", count: 4 },
];

export const dequis: Dequi[] = [
  { id: "nova-solucao", thumbnailTitle: "Proposta Comercial", thumbnailSubtitle: "Nova Solução", status: "Publicado", name: "Proposta Comercial – Nova Solução", description: "Editado há 2h por você", views: 48, comments: 6, favorite: true, theme: "teal" },
  { id: "plataforma", thumbnailTitle: "Apresentação", thumbnailSubtitle: "Plataforma Get Dequi", status: "Em desenvolvimento", name: "Apresentação Plataforma", description: "Editado ontem por você", views: 27, comments: 3, favorite: false, theme: "mint" },
  { id: "acme", thumbnailTitle: "Case de Sucesso", thumbnailSubtitle: "Cliente Acme", status: "Publicado", name: "Case de Sucesso – Acme", description: "Editado há 3 dias por Mariana", views: 63, comments: 8, favorite: false, theme: "indigo" },
  { id: "api", thumbnailTitle: "Proposta Técnica", thumbnailSubtitle: "Integração API", status: "Rascunho", name: "Proposta Técnica – API", description: "Editado há 5 dias por você", views: 12, comments: 0, favorite: false, theme: "ice" },
];

export const templates: Template[] = [
  { id: "proposta-comercial", name: "Proposta Comercial", slides: 12, theme: "teal" },
  { id: "apresentacao-produto", name: "Apresentação de Produto", slides: 15, theme: "mint" },
  { id: "case-sucesso", name: "Case de Sucesso", slides: 10, theme: "indigo" },
  { id: "proposta-tecnica", name: "Proposta Técnica", slides: 18, theme: "ice" },
  { id: "pitch-investimento", name: "Pitch de Investimento", slides: 14, theme: "blue" },
];

export const recentAccesses: RecentAccess[] = [
export const user = {
  name: "Rodolfo Santos",
  role: "Administrador",
  initial: "R",
};

export const plan = {
  name: "Pro",
  validUntil: "18/07/2026",
  used: 12,
  limit: 25,
};

export const folders = [
  { name: "Propostas", count: 8 },
  { name: "POCs", count: 5 },
  { name: "Comercial", count: 6 },
  { name: "Educação", count: 4 },
];

export const dequis = [
  {
    id: "nova-solucao",
    thumbnailTitle: "Proposta Comercial",
    thumbnailSubtitle: "Nova Solução",
    status: "Publicado",
    name: "Proposta Comercial – Nova Solução",
    description: "Editado há 2h por você",
    views: 48,
    comments: 6,
    favorite: true,
    theme: "teal",
  },
  {
    id: "plataforma",
    thumbnailTitle: "Apresentação",
    thumbnailSubtitle: "Plataforma Get Dequi",
    status: "Em desenvolvimento",
    name: "Apresentação Plataforma",
    description: "Editado ontem por você",
    views: 27,
    comments: 3,
    favorite: false,
    theme: "mint",
  },
  {
    id: "acme",
    thumbnailTitle: "Case de Sucesso",
    thumbnailSubtitle: "Cliente Acme",
    status: "Publicado",
    name: "Case de Sucesso – Acme",
    description: "Editado há 3 dias por Mariana",
    views: 63,
    comments: 8,
    favorite: false,
    theme: "indigo",
  },
  {
    id: "api",
    thumbnailTitle: "Proposta Técnica",
    thumbnailSubtitle: "Integração API",
    status: "Rascunho",
    name: "Proposta Técnica – API",
    description: "Editado há 5 dias por você",
    views: 12,
    comments: 0,
    favorite: false,
    theme: "ice",
  },
];

export const templates = [
  { name: "Proposta Comercial", slides: 12, theme: "teal" },
  { name: "Apresentação de Produto", slides: 15, theme: "mint" },
  { name: "Case de Sucesso", slides: 10, theme: "indigo" },
  { name: "Proposta Técnica", slides: 18, theme: "ice" },
  { name: "Pitch de Investimento", slides: 14, theme: "blue" },
];

export const recentAccesses = [
  { email: "flavio.junior@acme.com", date: "16/06/2026 • 10:32" },
  { email: "maria.oliveira@tech.com", date: "15/06/2026 • 14:18" },
  { email: "suporte@beta.com", date: "15/06/2026 • 09:41" },
];
