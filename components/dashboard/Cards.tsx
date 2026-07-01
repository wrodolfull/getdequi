import { dequis, folders, templates } from "@/data/mockData";
import { ProgressBar } from "./ProgressBar";
import { StatusBadge } from "./StatusBadge";

export function HeaderStatsCard({ title, value, caption, tone }: { title: string; value: string; caption: string; tone: "primary" | "teal" }) {
  return <div className="statCard"><div className={`statIcon ${tone}`}>✦</div><div className="statContent"><span>{title}</span><strong>{value}</strong><ProgressBar value={tone === "primary" ? 58 : 48} tone={tone} /><small>{caption}</small></div></div>;
}

export function SearchAndActions() {
  return <div className="actions"><label className="search">⌕<input placeholder="Buscar por nome do dequi..." /></label><button className="btn ghost">☷ Filtros</button><div className="spacer" /><button className="btn secondary">Nova pasta</button><div className="split"><button className="btn primary">＋ Criar Dequi</button><button className="btn primary drop">⌄</button></div></div>;
}

export function FolderCard({ name, count, add }: { name?: string; count?: number; add?: boolean }) {
  return <button className={`folderCard ${add ? "add" : ""}`}>{add ? <><span className="plus">＋</span>Nova pasta</> : <><span className="folderIcon">▰</span><b>{name}</b><small>{count}</small></>}</button>;
}
export function Folders() { return <div className="folderGrid">{folders.map(f => <FolderCard key={f.name} {...f} />)}<FolderCard add /></div>; }

export function Thumbnail({ title, subtitle, theme }: { title: string; subtitle: string; theme: string }) {
  return <div className={`thumb ${theme}`}><div className="orb one"/><div className="orb two"/><p>{title}</p><h3>{subtitle}</h3><span>Get Dequi</span></div>;
}

export function DequiCard({ item }: { item: typeof dequis[number] }) {
  return <article className="dequiCard"><div className="thumbWrap"><Thumbnail title={item.thumbnailTitle} subtitle={item.thumbnailSubtitle} theme={item.theme} /><button className={`star ${item.favorite ? "on" : ""}`}>★</button></div><div className="dequiBody"><StatusBadge status={item.status} /><h3>{item.name}</h3><p>{item.description}</p></div><footer><span>◎ {item.views}</span><span>□ {item.comments}</span><button>⋯</button></footer></article>;
}
export function DequiGrid() { return <div className="dequiGrid">{dequis.map(d => <DequiCard key={d.id} item={d} />)}</div>; }

export function TemplateCard({ item }: { item: typeof templates[number] }) {
  return <article className="templateCard"><Thumbnail title={item.name} subtitle="" theme={item.theme} /><div><b>{item.name}</b><span>{item.slides} slides</span></div></article>;
}
export function TemplateGrid() { return <div className="templateGrid">{templates.map(t => <TemplateCard key={t.name} item={t} />)}</div>; }
