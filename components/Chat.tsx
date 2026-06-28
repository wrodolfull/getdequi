"use client";
import { useRef, useState } from "react";
import { BriefingSummary } from "./BriefingSummary";
import { TemplateSelector } from "./TemplateSelector";
import { OutlinePreview } from "./OutlinePreview";
import { PdfResult } from "./PdfResult";
import type { BriefingInterpretation, OutlineItem, TemplateName } from "@/lib/types";

const sample = "Preciso de uma apresentação comercial para a diretoria de um colégio. O cliente é o Colégio Objetivo. A empresa emissora é Tecno School Center. A solução é contact center com recepcionista IA, atendimento telefônico, entendimento de intenção, triagem e direcionamento por departamento. São 15 usuários e uma licença de supervisor. Cada licença custa R$ 109,90. Os 15 aparelhos IA Link P31G serão grátis. A implantação custa R$ 3.000,00 com 50% de desconto. Validade da proposta: 30 dias. Contato final: Rodolfo Silva, Solutions Consultant.";

const fallbackTemplate: TemplateName = "commercial-sober-mono";
const templateNames = new Set<TemplateName>(["commercial-sober-mono", "poc-modern-orange", "happy-pastel"]);

function isTemplateName(value: unknown): value is TemplateName {
  return typeof value === "string" && templateNames.has(value as TemplateName);
}

function normalizeOutline(value: unknown): OutlineItem[] {
  return Array.isArray(value) ? value : [];
}

export function Chat() {
  const [briefing, setBriefing] = useState(sample);
  const [interpretation, setInterpretation] = useState<BriefingInterpretation>();
  const [template, setTemplate] = useState<TemplateName>(fallbackTemplate);
  const [outline, setOutline] = useState<OutlineItem[]>([]);
  const [pdfPath, setPdfPath] = useState<string>();
  const [busy, setBusy] = useState(false);
  const [audioStatus, setAudioStatus] = useState<string>();
  const [statusMessage, setStatusMessage] = useState<string>();
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);

  function resetGeneratedContent() {
    setInterpretation(undefined);
    setOutline([]);
    setPdfPath(undefined);
    setStatusMessage(undefined);
  }

  async function transcribeAudio(file: File) {
    setBusy(true);
    setAudioStatus("Transcrevendo áudio com Whisper...");
    resetGeneratedContent();

    try {
      const formData = new FormData();
      formData.append("audio", file);
      const response = await fetch("/api/transcribe-briefing", { method: "POST", body: formData });
      const data = await response.json();

      if (!response.ok) {
        setAudioStatus(data.error || "Não foi possível transcrever o áudio.");
        return;
      }

      setBriefing(data.briefing || "");
      setAudioStatus("Áudio transcrito. Revise o briefing antes de interpretar.");
    } catch {
      setAudioStatus("Não foi possível transcrever o áudio.");
    } finally {
      setBusy(false);
    }
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setAudioStatus("Seu navegador não suporta gravação de áudio direta. Use a importação de arquivo.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      recorder.ondataavailable = event => {
        if (event.data.size > 0) recordedChunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        stream.getTracks().forEach(track => track.stop());
        const mimeType = recorder.mimeType || "audio/webm";
        const extension = mimeType.includes("mp4") ? "m4a" : "webm";
        const blob = new Blob(recordedChunksRef.current, { type: mimeType });

        if (!blob.size) {
          setAudioStatus("Nenhum áudio foi capturado. Tente gravar novamente.");
          return;
        }

        const file = new File([blob], `briefing-gravado.${extension}`, { type: mimeType });
        transcribeAudio(file);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setAudioStatus("Gravando áudio... clique em Parar gravação para transcrever.");
    } catch {
      setAudioStatus("Não foi possível acessar o microfone. Verifique a permissão do navegador.");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setAudioStatus("Gravação finalizada. Preparando transcrição...");
  }

  async function interpret() {
    setBusy(true);
    setStatusMessage(undefined);
    setPdfPath(undefined);

    try {
      const r = await fetch("/api/interpret-briefing", { method: "POST", body: JSON.stringify({ briefing }) });
      const data = await r.json();

      if (!r.ok || !data.interpretation) {
        setInterpretation(undefined);
        setOutline([]);
        setStatusMessage(data.error || "Não foi possível interpretar o briefing.");
        return;
      }

      const nextInterpretation = data.interpretation as BriefingInterpretation;
      const nextTemplate = isTemplateName(nextInterpretation.recommendedTemplate)
        ? nextInterpretation.recommendedTemplate
        : fallbackTemplate;

      setInterpretation(nextInterpretation);
      setTemplate(nextTemplate);
      await loadOutline(nextTemplate, nextInterpretation);
    } catch {
      setInterpretation(undefined);
      setOutline([]);
      setStatusMessage("Não foi possível interpretar o briefing.");
    } finally {
      setBusy(false);
    }
  }

  async function loadOutline(t: TemplateName, currentInterpretation = interpretation) {
    try {
      const r = await fetch("/api/generate-outline", { method: "POST", body: JSON.stringify({ interpretation: currentInterpretation, template: t }) });
      const data = await r.json();
      setOutline(r.ok ? normalizeOutline(data.outline) : []);
      if (!r.ok) setStatusMessage(data.error || "Não foi possível gerar a estrutura sugerida.");
    } catch {
      setOutline([]);
      setStatusMessage("Não foi possível gerar a estrutura sugerida.");
    }
  }

  async function approve() {
    setBusy(true);
    setStatusMessage(undefined);

    try {
      const contentR = await fetch("/api/generate-content", { method: "POST", body: JSON.stringify({ briefing, template }) });
      const { content, error: contentError } = await contentR.json();

      if (!contentR.ok || !content) {
        setStatusMessage(contentError || "Não foi possível gerar o conteúdo.");
        return;
      }

      const pdfR = await fetch("/api/generate-pdf", { method: "POST", body: JSON.stringify({ template, content }) });
      const data = await pdfR.json();

      if (!pdfR.ok || !data.pdfPath) {
        setStatusMessage(data.error || "Não foi possível gerar o PDF.");
        return;
      }

      setPdfPath(data.pdfPath);
    } catch {
      setStatusMessage("Não foi possível gerar o PDF.");
    } finally {
      setBusy(false);
    }
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
          disabled={busy || isRecording}
          onChange={(event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) transcribeAudio(file);
            (event.target as HTMLInputElement).value = "";
          }}
        />
        <button type="button" className="secondaryButton" disabled={busy || isRecording} onClick={() => fileInputRef.current?.click()}>Importar áudio</button>
        <button type="button" className="secondaryButton" disabled={busy || isRecording} onClick={startRecording}>Gravar áudio</button>
        <button type="button" className="dangerButton" disabled={!isRecording} onClick={stopRecording}>Parar gravação</button>
      </div>
      {audioStatus && <p className="muted">{audioStatus}</p>}
      {statusMessage && <p className="muted" role="alert">{statusMessage}</p>}
      <label className="fieldLabel" htmlFor="briefing-text">Briefing em texto</label>
      <textarea id="briefing-text" value={briefing} onChange={(e: Event) => setBriefing((e.target as HTMLTextAreaElement).value)} />
      <p><button onClick={interpret} disabled={busy || isRecording || !briefing.trim()}>{busy ? "Processando..." : "Interpretar briefing"}</button></p>
    </div>
    <BriefingSummary interpretation={interpretation} />
    {interpretation && <TemplateSelector value={template} onChange={t => { setTemplate(t); loadOutline(t); }} />}
    <OutlinePreview outline={outline} />
    {outline.length > 0 && <div className="panel"><h2>Confirmação final</h2><p>O PDF só será gerado após esta aprovação.</p><button disabled={busy} onClick={approve}>Aprovar e gerar PDF</button></div>}
    <PdfResult pdfPath={pdfPath} />
  </>;
}
