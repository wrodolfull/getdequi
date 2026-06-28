import { mkdir } from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";

export async function generatePdf(html: string, outputPath: string): Promise<void> {
  await mkdir(path.dirname(outputPath), { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1 });
    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({
      path: outputPath,
      printBackground: true,
      width: "1280px",
      height: "720px",
      preferCSSPageSize: true,
    });
  } finally {
    await browser.close();
  }
}
