import { mkdir, readFile, writeFile, copyFile } from "fs/promises";
import path from "path";
export async function savePresentation(record: Record<string, any>) { const file = path.join(process.cwd(), "data", "presentations.json"); let items: any[] = []; try { items = JSON.parse(await readFile(file, "utf8")); } catch {} items.push({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...record }); await writeFile(file, JSON.stringify(items, null, 2)); }
export async function publishPdf(localPath: string, fileName: string) { const publicDir = path.join(process.cwd(), "public", "outputs", "pdfs"); await mkdir(publicDir, { recursive: true }); await copyFile(localPath, path.join(publicDir, fileName)); return `/outputs/pdfs/${fileName}`; }
