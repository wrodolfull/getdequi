import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const template = process.argv[2] ?? "commercial-sober-mono";
const root = process.cwd();
const templateDir = path.join(root, "templates", template);
const outputDir = path.join(root, "outputs", "pdfs");

function getByPath(content, key) {
  return key
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".")
    .reduce((accumulator, part) => accumulator?.[part], content);
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"]/g, (character) => {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[character];
  });
}

const [templateHtml, stylesheet, exampleJson] = await Promise.all([
  readFile(path.join(templateDir, "template.html"), "utf8"),
  readFile(path.join(templateDir, "style.css"), "utf8"),
  readFile(path.join(templateDir, "example.json"), "utf8"),
]);

const content = JSON.parse(exampleJson);
const body = templateHtml.replace(/{{\s*([\w.[\]_-]+)\s*}}/g, (_match, key) => {
  return escapeHtml(getByPath(content, key));
});
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8" /><meta name="viewport" content="width=1280,height=720" /><style>${stylesheet}</style></head><body>${body}</body></html>`;

await mkdir(outputDir, { recursive: true });
const htmlPath = path.join(outputDir, `${template}.html`);
const pdfPath = path.join(outputDir, `${template}.pdf`);
await writeFile(htmlPath, html);

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "networkidle0" });
  await page.pdf({
    path: pdfPath,
    printBackground: true,
    width: "1280px",
    height: "720px",
    preferCSSPageSize: true,
  });
} finally {
  await browser.close();
}

console.log(`HTML: ${htmlPath}`);
console.log(`PDF: ${pdfPath}`);
