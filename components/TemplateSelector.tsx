import type { TemplateName } from "@/lib/types";
const labels: Record<TemplateName,string>={"poc-modern-orange":"Modern Orange","commercial-sober-mono":"Sober Mono","happy-pastel":"Happy Pastel (avaliação)"};
export function TemplateSelector({value,onChange}:{value:TemplateName;onChange:(v:TemplateName)=>void}){return <div className="panel"><h2>Selecionar template</h2><select value={value} onChange={(e: Event)=>onChange((e.target as HTMLSelectElement).value as TemplateName)}>{Object.entries(labels).map(([k,l])=><option key={k} value={k}>{l}</option>)}</select></div>}
