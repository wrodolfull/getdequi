import type { Dequi, Folder, Template } from "@/data/mockData";
import { StatusBadge } from "./StatusBadge";
import { ChatBubbleIcon, ChevronDownIcon, EyeIcon, FolderIcon, FunnelIcon, PencilIcon, PlusIcon, SearchIcon, ShareIcon, StarIcon, TrashIcon } from "./HeroIcons";

export function SearchAndActions({ query, onQueryChange, onFilter, onCreateFolder, onCreateDequi }: { query: string; onQueryChange: (value: string) => void; onFilter: () => void; onCreateFolder: () => void; onCreateDequi: () => void }) {
  return <div className="actions"><label className="search"><SearchIcon className="fieldIcon" /><input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Buscar por nome do dequi..." /></label><button className="btn ghost" onClick={onFilter}><FunnelIcon className="buttonIcon" />Filtros</button><div className="spacer" /><button className="btn secondary" onClick={onCreateFolder}>Nova pasta</button><div className="split"><button className="btn primary" onClick={onCreateDequi}><PlusIcon className="buttonIcon" />Criar Dequi</button><button className="btn primary drop" onClick={onCreateDequi} aria-label="Mais opções"><ChevronDownIcon className="buttonIcon" /></button></div></div>;
}

export function FolderCard({ folder, add, onCreate, onEdit, onDelete }: { folder?: Folder; add?: boolean; onCreate?: () => void; onEdit?: (folder: Folder) => void; onDelete?: (folder: Folder) => void }) {
  if (add) return <button className="folderCard add" onClick={onCreate}><PlusIcon className="buttonIcon" />Nova pasta</button>;
  if (!folder) return null;
  return <div className="folderCard"><button className="folderMain" onClick={() => onEdit?.(folder)}><span className="folderIcon"><FolderIcon /></span><b>{folder.name}</b><small>{folder.count}</small></button><button className="miniAction" aria-label={`Editar ${folder.name}`} onClick={() => onEdit?.(folder)}><PencilIcon /></button><button className="miniAction danger" aria-label={`Excluir ${folder.name}`} onClick={() => onDelete?.(folder)}><TrashIcon /></button></div>;
}

export function Folders({ folders, onCreate, onEdit, onDelete }: { folders: Folder[]; onCreate: () => void; onEdit: (folder: Folder) => void; onDelete: (folder: Folder) => void }) {
  return <div className="folderGrid">{folders.map(folder => <FolderCard key={folder.id} folder={folder} onEdit={onEdit} onDelete={onDelete} />)}<FolderCard add onCreate={onCreate} /></div>;
}

export function Thumbnail({ title, subtitle, theme }: { title: string; subtitle: string; theme: string }) {
  return <div className={`thumb ${theme}`}><div className="orb one"/><div className="orb two"/><p>{title}</p><h3>{subtitle}</h3><span>Get Dequi</span></div>;
}

export function DequiCard({ item, onOpenShare, onEdit, onDelete, onToggleFavorite }: { item: Dequi; onOpenShare: (item: Dequi) => void; onEdit: (item: Dequi) => void; onDelete: (item: Dequi) => void; onToggleFavorite: (item: Dequi) => void }) {
  return <article className="dequiCard"><div className="thumbWrap"><button className="thumbButton" onClick={() => onOpenShare(item)}><Thumbnail title={item.thumbnailTitle} subtitle={item.thumbnailSubtitle} theme={item.theme} /></button><button className={`star ${item.favorite ? "on" : ""}`} onClick={() => onToggleFavorite(item)} aria-label="Alternar favorito"><StarIcon /></button></div><div className="dequiBody"><StatusBadge status={item.status} /><h3>{item.name}</h3><p>{item.description}</p></div><footer><span><EyeIcon />{item.views}</span><span><ChatBubbleIcon />{item.comments}</span><button onClick={() => onOpenShare(item)} aria-label="Compartilhar"><ShareIcon /></button><button onClick={() => onEdit(item)} aria-label="Editar"><PencilIcon /></button><button className="dangerText" onClick={() => onDelete(item)} aria-label="Excluir"><TrashIcon /></button></footer></article>;
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
