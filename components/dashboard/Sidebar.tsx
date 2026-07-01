import Link from "next/link";
import { plan, user } from "@/data/mockData";
import { ProgressBar } from "./ProgressBar";
import { ChartIcon, ChevronDownIcon, CogIcon, HomeIcon, PresentationIcon, PuzzleIcon, ShareIcon, SquaresIcon, TemplateIcon } from "./HeroIcons";

const items = [
  { label: "Início", href: "/dashboard", Icon: HomeIcon },
  { label: "Meus Dequis", href: "/dashboard?secao=meus-dequis", Icon: SquaresIcon },
  { label: "Apresentações", href: "/dashboard?secao=apresentacoes", Icon: PresentationIcon },
  { label: "Modelos", href: "/dashboard?secao=modelos", Icon: TemplateIcon },
  { label: "Compartilhar", href: "/dashboard?secao=compartilhar", Icon: ShareIcon },
  { label: "Analytics", href: "/dashboard?secao=analytics", Icon: ChartIcon },
  { label: "Integrações", href: "/dashboard?secao=integracoes", Icon: PuzzleIcon },
  { label: "Configurações", href: "/dashboard?secao=configuracoes", Icon: CogIcon },
];

export function SidebarItem({ label, Icon, href, active }: { label: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; href: string; active?: boolean }) {
  return <Link href={href} className={`sideItem ${active ? "active" : ""}`}><Icon className="sideIcon" />{label}</Link>;
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
    <Link href="/dashboard" className="brand"><span className="brandMark" /><span>Get Dequi</span></Link>
    <nav>{items.map((item, i) => <SidebarItem key={item.href} {...item} active={i === 0} />)}</nav>
    <div className="sideBottom">
      <div className="profileCard"><div className="avatar">{user.initial}</div><div><strong>{user.name}</strong><span>{user.role}</span></div><ChevronDownIcon className="chev" /></div>
      <UserPlanCard />
    </div>
  </aside>;
}
