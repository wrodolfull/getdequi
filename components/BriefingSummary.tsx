import type { BriefingInterpretation } from "@/lib/types";

export function BriefingSummary({ interpretation }: { interpretation?: BriefingInterpretation }) {
  if (!interpretation) return null;

  const missingFields = Array.isArray(interpretation.missingFields) ? interpretation.missingFields : [];

  return (
    <div className="panel">
      <h2>Resumo interpretado</h2>
      <div className="gridui">
        <p><b>Cliente:</b> {interpretation.clientName || "Não informado"}</p>
        <p><b>Emissora:</b> {interpretation.issuerName || "Não informado"}</p>
        <p><b>Público:</b> {interpretation.audience || "Não informado"}</p>
        <p><b>Solução:</b> {interpretation.solution || "Não informado"}</p>
        <p><b>Template recomendado:</b> {interpretation.recommendedTemplate}</p>
      </div>
      <h3>Informações faltantes</h3>
      {missingFields.length ? (
        <ul>{missingFields.map(field => <li key={field}>{field}</li>)}</ul>
      ) : (
        <p className="muted">Nenhuma informação obrigatória pendente.</p>
      )}
    </div>
  );
}
