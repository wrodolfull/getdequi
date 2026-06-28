import fs from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

export async function generatePdf(html: string, outputFileName: string): Promise<string> {
  const outputDir = path.join(process.cwd(), "outputs", "pdfs");
  await fs.mkdir(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, outputFileName);

  const browser = await puppeteer.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPath,
      printBackground: true,
      width: "1280px",
      height: "720px",
      preferCSSPageSize: true
    });
  } finally {
    await browser.close();
  }

  return outputPath;
}

