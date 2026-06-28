import type { OutlineItem } from "@/lib/types";
export function OutlinePreview({outline}:{outline:OutlineItem[]}){if(!outline.length)return null;return <div className="panel"><h2>Estrutura sugerida</h2><div className="gridui">{outline.map(item=><div className="panel" key={item.slide}><b>{item.slide}. {item.title}</b><p className="muted">{item.purpose}</p></div>)}</div></div>}
