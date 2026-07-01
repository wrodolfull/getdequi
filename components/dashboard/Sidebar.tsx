import Link from "next/link";
import { plan, user } from "@/data/mockData";
import { ProgressBar } from "./ProgressBar";

const items = [
  { label: "Início", href: "/dashboard", icon: "⌂" },
  { label: "Meus Dequis", href: "/dashboard?secao=meus-dequis", icon: "◫" },
  { label: "Apresentações", href: "/dashboard?secao=apresentacoes", icon: "▣" },
  { label: "Modelos", href: "/dashboard?secao=modelos", icon: "◇" },
  { label: "Compartilhar", href: "/dashboard?secao=compartilhar", icon: "↗" },
  { label: "Analytics", href: "/dashboard?secao=analytics", icon: "◌" },
  { label: "Integrações", href: "/dashboard?secao=integracoes", icon: "⚯" },
  { label: "Configurações", href: "/dashboard?secao=configuracoes", icon: "⚙" },
];

export function SidebarItem({ label, icon, href, active }: { label: string; icon: string; href: string; active?: boolean }) {
  return <Link href={href} className={`sideItem ${active ? "active" : ""}`}><span>{icon}</span>{label}</Link>;
}

export function UserPlanCard() {
  return <div className="planCard">
    <div className="planTop"><strong>Plano {plan.name}</strong><Link href="/dashboard?secao=plano">Gerenciar plano</Link></div>
    <div className="planUsage"><span>Limite de uso</span><b>{plan.used} / {plan.limit} Dequis</b></div>
    <ProgressBar value={(plan.used / plan.limit) * 100} />
  </div>;
}

export function Sidebar() {
  return <aside className="sidebar">
    <Link href="/dashboard" className="brand"><span className="brandMark">●</span><span>Get Dequi</span></Link>
    <nav>{items.map((item, i) => <SidebarItem key={item.href} {...item} active={i === 0} />)}</nav>
    <div className="sideBottom">
      <div className="profileCard"><div className="avatar">{user.initial}</div><div><strong>{user.name}</strong><span>{user.role}</span></div><span className="chev">⌄</span></div>
      <UserPlanCard />
    </div>
  </aside>;
}
