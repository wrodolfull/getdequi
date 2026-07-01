import type { Dequi, Folder, Template } from "@/data/mockData";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function HeaderStatsCard({ title, value, caption, tone }: { title: string; value: string; caption: string; tone: "primary" | "teal" }) {
  return <div className="statCard"><div className={`statIcon ${tone}`}>✦</div><div className="statContent"><span>{title}</span><strong>{value}</strong><ProgressBar value={tone === "primary" ? 58 : 48} tone={tone} /><small>{caption}</small></div></div>;
}

export function SearchAndActions({ query, onQueryChange, onFilter, onCreateFolder, onCreateDequi }: { query: string; onQueryChange: (value: string) => void; onFilter: () => void; onCreateFolder: () => void; onCreateDequi: () => void }) {
  return <div className="actions"><label className="search">⌕<input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Buscar por nome do dequi..." /></label><button className="btn ghost" onClick={onFilter}>☷ Filtros</button><div className="spacer" /><button className="btn secondary" onClick={onCreateFolder}>Nova pasta</button><div className="split"><button className="btn primary" onClick={onCreateDequi}>＋ Criar Dequi</button><button className="btn primary drop" onClick={onCreateDequi}>⌄</button></div></div>;
}

export function FolderCard({ folder, add, onCreate, onEdit, onDelete }: { folder?: Folder; add?: boolean; onCreate?: () => void; onEdit?: (folder: Folder) => void; onDelete?: (folder: Folder) => void }) {
  if (add) return <button className="folderCard add" onClick={onCreate}><span className="plus">＋</span>Nova pasta</button>;
  if (!folder) return null;
  return <div className="folderCard"><button className="folderMain" onClick={() => onEdit?.(folder)}><span className="folderIcon">▰</span><b>{folder.name}</b><small>{folder.count}</small></button><button className="miniAction" aria-label={`Editar ${folder.name}`} onClick={() => onEdit?.(folder)}>✎</button><button className="miniAction danger" aria-label={`Excluir ${folder.name}`} onClick={() => onDelete?.(folder)}>×</button></div>;
}

export function Folders({ folders, onCreate, onEdit, onDelete }: { folders: Folder[]; onCreate: () => void; onEdit: (folder: Folder) => void; onDelete: (folder: Folder) => void }) {
  return <div className="folderGrid">{folders.map(folder => <FolderCard key={folder.id} folder={folder} onEdit={onEdit} onDelete={onDelete} />)}<FolderCard add onCreate={onCreate} /></div>;
}

export function Thumbnail({ title, subtitle, theme }: { title: string; subtitle: string; theme: string }) {
  return <div className={`thumb ${theme}`}><div className="orb one"/><div className="orb two"/><p>{title}</p><h3>{subtitle}</h3><span>Get Dequi</span></div>;
}

export function DequiCard({ item, onOpenShare, onEdit, onDelete, onToggleFavorite }: { item: Dequi; onOpenShare: (item: Dequi) => void; onEdit: (item: Dequi) => void; onDelete: (item: Dequi) => void; onToggleFavorite: (item: Dequi) => void }) {
  return <article className="dequiCard"><div className="thumbWrap"><button className="thumbButton" onClick={() => onOpenShare(item)}><Thumbnail title={item.thumbnailTitle} subtitle={item.thumbnailSubtitle} theme={item.theme} /></button><button className={`star ${item.favorite ? "on" : ""}`} onClick={() => onToggleFavorite(item)}>★</button></div><div className="dequiBody"><StatusBadge status={item.status} /><h3>{item.name}</h3><p>{item.description}</p></div><footer><span>◎ {item.views}</span><span>□ {item.comments}</span><button onClick={() => onOpenShare(item)}>↗</button><button onClick={() => onEdit(item)}>✎</button><button className="dangerText" onClick={() => onDelete(item)}>×</button></footer></article>;
}

export function DequiGrid({ dequis, onOpenShare, onEdit, onDelete, onToggleFavorite }: { dequis: Dequi[]; onOpenShare: (item: Dequi) => void; onEdit: (item: Dequi) => void; onDelete: (item: Dequi) => void; onToggleFavorite: (item: Dequi) => void }) {
  return <div className="dequiGrid">{dequis.map(item => <DequiCard key={item.id} item={item} onOpenShare={onOpenShare} onEdit={onEdit} onDelete={onDelete} onToggleFavorite={onToggleFavorite} />)}</div>;
}

export function TemplateCard({ item, onUse, onEdit, onDelete }: { item: Template; onUse: (item: Template) => void; onEdit: (item: Template) => void; onDelete: (item: Template) => void }) {
  return <article className="templateCard"><button onClick={() => onUse(item)}><Thumbnail title={item.name} subtitle="" theme={item.theme} /></button><div><b>{item.name}</b><span>{item.slides} slides</span><div className="templateActions"><button onClick={() => onUse(item)}>Usar</button><button onClick={() => onEdit(item)}>Editar</button><button onClick={() => onDelete(item)}>Excluir</button></div></div></article>;
}

export function TemplateGrid({ templates, onUse, onEdit, onDelete }: { templates: Template[]; onUse: (item: Template) => void; onEdit: (item: Template) => void; onDelete: (item: Template) => void }) {
  return <div className="templateGrid">{templates.map(item => <TemplateCard key={item.id} item={item} onUse={onUse} onEdit={onEdit} onDelete={onDelete} />)}</div>;
}
