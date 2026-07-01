export function StatusBadge({ status }: { status: string }) {
  const key = status === "Publicado" ? "published" : status === "Em desenvolvimento" ? "building" : "draft";
  return <span className={`status ${key}`}>{status}</span>;
}
