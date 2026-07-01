import { plan, user } from "@/data/mockData";
import { ProgressBar } from "./ProgressBar";

const items = ["Início", "Meus Dequis", "Apresentações", "Modelos", "Compartilhar", "Analytics", "Integrações", "Configurações"];
const icons = ["⌂", "◫", "▣", "◇", "↗", "◌", "⚯", "⚙"];

export function SidebarItem({ label, icon, active }: { label: string; icon: string; active?: boolean }) {
  return <button className={`sideItem ${active ? "active" : ""}`}><span>{icon}</span>{label}</button>;
}

export function UserPlanCard() {
  return <div className="planCard">
    <div className="planTop"><strong>Plano {plan.name}</strong><a>Gerenciar plano</a></div>
    <div className="planUsage"><span>Limite de uso</span><b>{plan.used} / {plan.limit} Dequis</b></div>
    <ProgressBar value={(plan.used / plan.limit) * 100} />
  </div>;
}

export function Sidebar() {
  return <aside className="sidebar">
    <div className="brand"><span className="brandMark">●</span><span>Get Dequi</span></div>
    <nav>{items.map((item, i) => <SidebarItem key={item} label={item} icon={icons[i]} active={i === 0} />)}</nav>
    <div className="sideBottom">
      <div className="profileCard"><div className="avatar">{user.initial}</div><div><strong>{user.name}</strong><span>{user.role}</span></div><span className="chev">⌄</span></div>
      <UserPlanCard />
    </div>
  </aside>;
}
