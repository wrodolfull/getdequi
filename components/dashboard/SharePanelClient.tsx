"use client";

import { useState } from "react";
import type { Dequi } from "@/data/mockData";
import { recentAccesses } from "@/data/mockData";
import { Thumbnail } from "./Cards";
import { ArrowDownTrayIcon, ChevronDownIcon, LinkIcon, QrCodeIcon, ShareIcon, UserCircleIcon, XMarkIcon } from "./HeroIcons";

const tabs = ["Link", "Incorporar", "LinkedIn", "E-mail", "Permissões"];

type ShareTabProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export function ShareTab({ label, active, onClick }: ShareTabProps) {
  return (
    <button className={`shareTab ${active ? "active" : ""}`} onClick={onClick} type="button">
      {label}
    </button>
  );
}

export function RecentAccessList() {
  return (
    <div className="recentBox">
      <div className="boxHead">
        <h4>Acessos recentes</h4>
        <a>Ver todos</a>
      </div>
      {recentAccesses.map((access) => (
        <div className="access" key={access.email}>
          <span><UserCircleIcon className="accessIcon" /></span>
          <b>{access.email}</b>
          <time>{access.date}</time>
        </div>
      ))}
    </div>
  );
}

type SharePanelProps = {
  dequi: Dequi;
  onClose: () => void;
};

export function SharePanel({ dequi, onClose }: SharePanelProps) {
  const [tab, setTab] = useState("Link");
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://getdequi.com/d/${dequi.id}`;

  async function copy() {
    await navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <aside className="sharePanel" role="dialog" aria-modal="true" aria-label="Compartilhar Dequi">
      <header className="shareHeader">
        <h2>Compartilhar Dequi</h2>
        <button onClick={onClose} aria-label="Fechar compartilhamento" type="button"><XMarkIcon className="buttonIcon" /></button>
      </header>

      <div className="selectedDequi">
        <div className="miniThumb">
          <Thumbnail title={dequi.thumbnailTitle} subtitle={dequi.thumbnailSubtitle} theme={dequi.theme} />
        </div>
        <strong>{dequi.name}</strong>
      </div>

      <div className="shareContent">
        <nav className="shareTabs">
          {tabs.map((item) => (
            <ShareTab key={item} label={item} active={tab === item} onClick={() => setTab(item)} />
          ))}
        </nav>

        <section className="shareMain">
          {tab === "Link" ? (
            <div className="shareLinkContent">
              <div className="sectionIntro">
                <h3>Link da apresentação</h3>
                <p>Compartilhe sua apresentação com um link público.</p>
              </div>

              <div className="copyRow">
                <input readOnly value={shareUrl} />
                <button onClick={copy} type="button">{copied ? "Link copiado" : "Copiar link"}</button>
              </div>

              <div className="permission">
                <div>
                  <strong>Qualquer pessoa com o link pode visualizar</strong>
                  <span>Não é necessário login para acessar</span>
                </div>
                <b><ChevronDownIcon className="buttonIcon" /></b>
              </div>

              <h4>Opções de compartilhamento</h4>
              <div className="shareActions">
                {[
                  { label: "Abrir link", Icon: LinkIcon },
                  { label: "Compartilhar", Icon: ShareIcon },
                  { label: "Baixar PDF", Icon: ArrowDownTrayIcon },
                  { label: "QR Code", Icon: QrCodeIcon },
                ].map(({ label, Icon }) => (
                  <button key={label} type="button">
                    <Icon className="shareActionIcon" /><span>{label}</span>
                  </button>
                ))}
              </div>

              <RecentAccessList />
              <div className="tip">
                <strong>Dica de segurança</strong>
                <p>Revogue o link ou altere as permissões a qualquer momento na aba de Permissões.</p>
              </div>
            </div>
          ) : (
            <div className="emptyTab">
              <h3>{tab}</h3>
              <p>Configure esta forma de compartilhamento em breve.</p>
            </div>
          )}
        </section>
      </div>
    </aside>
  );
}
