"use client";
import { useMemo, useState } from "react";
import { dequis as initialDequis, folders as initialFolders, templates as initialTemplates, type Dequi, type DequiStatus, type Folder, type Template } from "@/data/mockData";
import { DequiGrid, Folders, SearchAndActions, TemplateGrid } from "./Cards";
import { SharePanel } from "./SharePanel";
import { BarsIcon, GridIcon } from "./HeroIcons";

type DialogState =
  | { type: "folder"; mode: "create"; item?: Folder }
  | { type: "folder"; mode: "edit"; item: Folder }
  | { type: "dequi"; mode: "create"; item?: Dequi }
  | { type: "dequi"; mode: "edit"; item: Dequi }
  | { type: "template"; mode: "edit"; item: Template }
  | null;

const themes = ["teal", "mint", "indigo", "ice", "blue"];

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `item-${Date.now()}`;
}

export function DashboardClient() {
  const [folders, setFolders] = useState(initialFolders);
  const [dequis, setDequis] = useState(initialDequis);
  const [templates, setTemplates] = useState(initialTemplates);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DequiStatus | "Todos">("Todos");
  const [dialog, setDialog] = useState<DialogState>(null);
  const [shareDequi, setShareDequi] = useState<Dequi | null>(initialDequis[0]);
  const [toast, setToast] = useState("");

  const filteredDequis = useMemo(() => dequis.filter(item => {
    const matchesText = item.name.toLowerCase().includes(query.toLowerCase()) || item.thumbnailSubtitle.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === "Todos" || item.status === statusFilter;
    return matchesText && matchesStatus;
  }), [dequis, query, statusFilter]);

  function saveFolder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Nova pasta");
    const count = Number(form.get("count") || 0);
    if (dialog?.type === "folder" && dialog.mode === "edit") {
      setFolders(items => items.map(item => item.id === dialog.item.id ? { ...item, name, count } : item));
      setToast(`Pasta “${name}” atualizada.`);
    } else {
      setFolders(items => [...items, { id: `${slugify(name)}-${Date.now()}`, name, count }]);
      setToast(`Pasta “${name}” criada.`);
    }
    setDialog(null);
  }

  function saveDequi(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Novo Dequi");
    const status = String(form.get("status") || "Rascunho") as DequiStatus;
    const thumbnailSubtitle = String(form.get("subtitle") || name);
    if (dialog?.type === "dequi" && dialog.mode === "edit") {
      setDequis(items => items.map(item => item.id === dialog.item.id ? { ...item, name, thumbnailSubtitle, status, description: "Editado agora por você" } : item));
      setToast(`Dequi “${name}” atualizado.`);
    } else {
      const newDequi: Dequi = { id: `${slugify(name)}-${Date.now()}`, thumbnailTitle: "Nova apresentação", thumbnailSubtitle, status, name, description: "Criado agora por você", views: 0, comments: 0, favorite: false, theme: themes[dequis.length % themes.length] };
      setDequis(items => [newDequi, ...items]);
      setShareDequi(newDequi);
      setToast(`Dequi “${name}” criado.`);
    }
    setDialog(null);
  }

  function saveTemplate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "Template");
    const slides = Number(form.get("slides") || 1);
    if (dialog?.type === "template" && dialog.mode === "edit") {
      setTemplates(items => items.map(item => item.id === dialog.item.id ? { ...item, name, slides } : item));
      setToast(`Template “${name}” atualizado.`);
      setDialog(null);
    }
  }

  function deleteFolder(folder: Folder) { setFolders(items => items.filter(item => item.id !== folder.id)); setToast(`Pasta “${folder.name}” excluída.`); }
  function deleteDequi(dequi: Dequi) { setDequis(items => items.filter(item => item.id !== dequi.id)); if (shareDequi?.id === dequi.id) setShareDequi(null); setToast(`Dequi “${dequi.name}” excluído.`); }
  function deleteTemplate(template: Template) { setTemplates(items => items.filter(item => item.id !== template.id)); setToast(`Template “${template.name}” excluído.`); }
  function useTemplate(template: Template) { setDialog({ type: "dequi", mode: "create", item: { ...initialDequis[0], name: template.name, thumbnailSubtitle: template.name, theme: template.theme } }); }

  return <>
    <section className="workspace">
      <div className="heroRow"><div><h1>Olá, Rodolfo</h1><p>Aqui está o resumo dos seus Dequis e atividades.</p>{toast && <span className="toast">{toast}</span>}</div></div>
      <SearchAndActions query={query} onQueryChange={setQuery} onFilter={() => setStatusFilter(statusFilter === "Todos" ? "Publicado" : statusFilter === "Publicado" ? "Em desenvolvimento" : statusFilter === "Em desenvolvimento" ? "Rascunho" : "Todos")} onCreateFolder={() => setDialog({ type: "folder", mode: "create" })} onCreateDequi={() => setDialog({ type: "dequi", mode: "create" })} />
      <section className="section"><h2>Pastas</h2><Folders folders={folders} onCreate={() => setDialog({ type: "folder", mode: "create" })} onEdit={(item) => setDialog({ type: "folder", mode: "edit", item })} onDelete={deleteFolder} /></section>
      <section className="section bigGap"><div className="sectionHead"><div><h2>Meus Dequis</h2><div className="tabs"><button className={statusFilter === "Todos" ? "active" : ""} onClick={() => setStatusFilter("Todos")}>Todos</button><button onClick={() => setStatusFilter("Publicado")}>Recentes</button><button onClick={() => setStatusFilter("Rascunho")}>Favoritos</button></div></div><div className="viewTools"><select defaultValue="recentes"><option value="recentes">Mais recentes</option></select><button className="active" aria-label="Visualização em grade"><GridIcon className="buttonIcon" /></button><button aria-label="Visualização em lista"><BarsIcon className="buttonIcon" /></button></div></div><DequiGrid dequis={filteredDequis} onOpenShare={setShareDequi} onEdit={(item) => setDialog({ type: "dequi", mode: "edit", item })} onDelete={deleteDequi} onToggleFavorite={(item) => setDequis(items => items.map(current => current.id === item.id ? { ...current, favorite: !current.favorite } : current))} /></section>
      <section className="section templates"><div className="sectionHead inline"><h2>Templates recomendados</h2><button className="linkButton" onClick={() => setToast("Lista completa de templates será conectada ao backend.")}>Ver todos</button></div><TemplateGrid templates={templates} onUse={useTemplate} onEdit={(item) => setDialog({ type: "template", mode: "edit", item })} onDelete={deleteTemplate} /></section>
    </section>
    {shareDequi && <SharePanel dequi={shareDequi} onClose={() => setShareDequi(null)} />}
    {dialog && <CrudDialog dialog={dialog} onClose={() => setDialog(null)} onSaveFolder={saveFolder} onSaveDequi={saveDequi} onSaveTemplate={saveTemplate} />}
  </>;
}

function CrudDialog({ dialog, onClose, onSaveFolder, onSaveDequi, onSaveTemplate }: { dialog: Exclude<DialogState, null>; onClose: () => void; onSaveFolder: (event: React.FormEvent<HTMLFormElement>) => void; onSaveDequi: (event: React.FormEvent<HTMLFormElement>) => void; onSaveTemplate: (event: React.FormEvent<HTMLFormElement>) => void }) {
  const title = dialog.mode === "create" ? (dialog.type === "folder" ? "Criar pasta" : "Criar Dequi") : `Editar ${dialog.type === "folder" ? "pasta" : dialog.type === "dequi" ? "Dequi" : "template"}`;
  return <div className="modalBackdrop"><div className="crudModal" role="dialog" aria-modal="true"><header><h2>{title}</h2><button onClick={onClose} aria-label="Fechar">Fechar</button></header>
    {dialog.type === "folder" && <form onSubmit={onSaveFolder}><label>Nome<input name="name" defaultValue={dialog.item?.name ?? ""} required /></label><label>Quantidade<input name="count" type="number" min="0" defaultValue={dialog.item?.count ?? 0} /></label><div className="modalActions"><button type="button" onClick={onClose}>Cancelar</button><button type="submit">Salvar</button></div></form>}
    {dialog.type === "dequi" && <form onSubmit={onSaveDequi}><label>Nome<input name="name" defaultValue={dialog.item?.name ?? ""} required /></label><label>Subtítulo do thumbnail<input name="subtitle" defaultValue={dialog.item?.thumbnailSubtitle ?? ""} /></label><label>Status<select name="status" defaultValue={dialog.item?.status ?? "Rascunho"}><option>Publicado</option><option>Em desenvolvimento</option><option>Rascunho</option></select></label><div className="modalActions"><button type="button" onClick={onClose}>Cancelar</button><button type="submit">Salvar</button></div></form>}
    {dialog.type === "template" && <form onSubmit={onSaveTemplate}><label>Nome<input name="name" defaultValue={dialog.item.name} required /></label><label>Slides<input name="slides" type="number" min="1" defaultValue={dialog.item.slides} /></label><div className="modalActions"><button type="button" onClick={onClose}>Cancelar</button><button type="submit">Salvar</button></div></form>}
  </div></div>;
}
