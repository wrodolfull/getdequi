export function ProgressBar({ value, tone = "primary" }: { value: number; tone?: "primary" | "teal" }) {
  return <div className="progress"><span className={`progressFill ${tone}`} style={{ width: `${value}%` }} /></div>;
}
