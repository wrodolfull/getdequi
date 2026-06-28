"use client";
import { useRef, useState } from "react";
import { BriefingSummary } from "./BriefingSummary";
import { TemplateSelector } from "./TemplateSelector";
import { OutlinePreview } from "./OutlinePreview";
import { PdfResult } from "./PdfResult";
import type { BriefingInterpretation, OutlineItem, TemplateName } from "@/lib/types";

const sample = "Preciso de uma apresentação comercial para a diretoria de um colégio. O cliente é o Colégio Objetivo. A empresa emissora é Tecno School Center. A solução é contact center com recepcionista IA, atendimento telefônico, entendimento de intenção, triagem e direcionamento por departamento. São 15 usuários e uma licença de supervisor. Cada licença custa R$ 109,90. Os 15 aparelhos IA Link P31G serão grátis. A implantação custa R$ 3.000,00 com 50% de desconto. Validade da proposta: 30 dias. Contato final: Rodolfo Silva, Solutions Consultant.";

export function Chat() {
  const [briefing, setBriefing] = useState(sample);
  const [interpretation, setInterpretation] = useState<BriefingInterpretation>();
  const [template, setTemplate] = useState<TemplateName>("commercial-sober-mono");
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [pdfPath, setPdfPath] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [audioStatus, setAudioStatus] = useState<string>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function transcribeAudio(file: File) {
    setBusy(true);
    setAudioStatus("Transcrevendo áudio com Whisper...");
    setInterpretation(undefined);
    setOutline([]);
    setPdfPath(undefined);

    const formData = new FormData();
    formData.append("audio", file);
    const response = await fetch("/api/transcribe-briefing", { method: "POST", body: formData });
    const data = await response.json();

    if (!response.ok) {
      setAudioStatus(data.error || "Não foi possível transcrever o áudio.");
      setBusy(false);
      return;
    }

    setBriefing(data.briefing || "");
    setAudioStatus("Áudio transcrito. Revise o briefing antes de interpretar.");
    setBusy(false);
  }

  async function interpret() {
    setBusy(true);
    setPdfPath(undefined);
    const r = await fetch("/api/interpret-briefing", { method: "POST", body: JSON.stringify({ briefing }) });
    const data = await r.json();
    setInterpretation(data.interpretation);
    setTemplate(data.interpretation.recommendedTemplate);
    await loadOutline(data.interpretation.recommendedTemplate, data.interpretation);
    setBusy(false);
  }

  async function loadOutline(t: TemplateName, currentInterpretation = interpretation) {
    const r = await fetch("/api/generate-outline", { method: "POST", body: JSON.stringify({ interpretation: currentInterpretation, template: t }) });
    setOutline((await r.json()).outline);
  }

  async function approve() {
    setBusy(true);
    const contentR = await fetch("/api/generate-content", { method: "POST", body: JSON.stringify({ briefing, template }) });
    const { content } = await contentR.json();
    const pdfR = await fetch("/api/generate-pdf", { method: "POST", body: JSON.stringify({ template, content }) });
    const data = await pdfR.json();
    setPdfPath(data.pdfPath);
    setBusy(false);
  }

  return <>
    <div className="panel">
      <h1>Dequi Local — MVP</h1>
      <p className="muted">A IA escreve o conteúdo; o template controla o layout; o sistema valida limites; o PDF é o resultado final.</p>
      <label className="fieldLabel" htmlFor="briefing-audio">Enviar briefing por áudio</label>
      <div className="audioRow">
        <input
          ref={fileInputRef}
          id="briefing-audio"
          type="file"
          accept="audio/*,.mp3,.mp4,.mpeg,.mpga,.m4a,.wav,.webm"
          disabled={busy}
          onChange={event => {
            const file = event.target.files?.[0];
            if (file) transcribeAudio(file);
            event.target.value = "";
          }}
        />
        <button type="button" className="secondaryButton" disabled={busy} onClick={() => fileInputRef.current?.click()}>Escolher áudio</button>
      </div>
      {audioStatus && <p className="muted">{audioStatus}</p>}
      <label className="fieldLabel" htmlFor="briefing-text">Briefing em texto</label>
      <textarea id="briefing-text" value={briefing} onChange={e => setBriefing(e.target.value)} />
      <p><button onClick={interpret} disabled={busy || !briefing.trim()}>{busy ? "Processando..." : "Interpretar briefing"}</button></p>
    </div>
    <BriefingSummary interpretation={interpretation} />
    {interpretation && <TemplateSelector value={template} onChange={t => { setTemplate(t); loadOutline(t); }} />}
    <OutlinePreview outline={outline} />
    {outline.length > 0 && <div className="panel"><h2>Confirmação final</h2><p>O PDF só será gerado após esta aprovação.</p><button disabled={busy} onClick={approve}>Aprovar e gerar PDF</button></div>}
    <PdfResult pdfPath={pdfPath} />
  </>;
}
