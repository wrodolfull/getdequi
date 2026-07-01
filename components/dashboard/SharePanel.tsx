"use client";
import { useState } from "react";
import type { Dequi } from "@/data/mockData";
import { recentAccesses } from "@/data/mockData";
import { Thumbnail } from "./Cards";

const tabs = ["Link", "Incorporar", "LinkedIn", "E-mail", "Permissões"];

export function ShareTab({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return <button className={`shareTab ${active ? "active" : ""}`} onClick={onClick}>{label}</button>;
}

export function RecentAccessList() {
  return <div className="recentBox"><div className="boxHead"><h4>Acessos recentes</h4><a>Ver todos</a></div>{recentAccesses.map(a => <div className="access" key={a.email}><span>◉</span><b>{a.email}</b><time>{a.date}</time></div>)}</div>;
}

export function SharePanel({ dequi, onClose }: { dequi: Dequi; onClose: () => void }) {
  const [tab, setTab] = useState("Link");
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://getdequi.com/d/${dequi.id}`;
  async function copy() { await navigator.clipboard?.writeText(shareUrl); setCopied(true); setTimeout(() => setCopied(false), 1800); }
  return <aside className="sharePanel" role="dialog" aria-modal="true" aria-label="Compartilhar Dequi">
    <header className="shareHeader"><h2>Compartilhar Dequi</h2><button onClick={onClose} aria-label="Fechar compartilhamento">×</button></header>
    <div className="selectedDequi"><div className="miniThumb"><Thumbnail title={dequi.thumbnailTitle} subtitle={dequi.thumbnailSubtitle} theme={dequi.theme} /></div><strong>{dequi.name}</strong></div>
    <div className="shareContent"><nav className="shareTabs">{tabs.map(t => <ShareTab key={t} label={t} active={tab === t} onClick={() => setTab(t)} />)}</nav><section className="shareMain">
      {tab === "Link" ? <>
        <div className="sectionIntro"><h3>Link da apresentação</h3><p>Compartilhe sua apresentação com um link público.</p></div>
        <div className="copyRow"><input readOnly value={shareUrl} /><button onClick={copy}>{copied ? "Link copiado" : "Copiar link"}</button></div>
        <div className="permission"><div><strong>Qualquer pessoa com o link pode visualizar</strong><span>Não é necessário login para acessar</span></div><b>⌄</b></div>
        <h4>Opções de compartilhamento</h4><div className="shareActions">{["Abrir link", "Compartilhar", "Baixar PDF", "QR Code"].map(x => <button key={x}>◇<span>{x}</span></button>)}</div>
        <RecentAccessList />
        <div className="tip"><strong>Dica de segurança</strong><p>Revogue o link ou altere as permissões a qualquer momento na aba de Permissões.</p></div>
      </> : <div className="emptyTab"><h3>{tab}</h3><p>Configure esta forma de compartilhamento em breve.</p></div>}
    </section></div>
  </aside>;
}
