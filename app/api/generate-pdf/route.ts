import { readFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { publishPdf, savePresentation } from "@/lib/fileStore";
import { generatePdf } from "@/lib/pdf-generator";
import { renderTemplate } from "@/lib/render-template";
import type { TemplateName, TemplateSchema } from "@/lib/types";
import { validateContent } from "@/lib/validators";

async function loadSchema(template: TemplateName): Promise<TemplateSchema> {
  const schemaPath = path.join(process.cwd(), "templates", template, "schema.json");
  return JSON.parse(await readFile(schemaPath, "utf8")) as TemplateSchema;
}

async function renderPdf(template: TemplateName, content: Record<string, unknown>) {
  const schema = await loadSchema(template);
  const validation = validateContent(schema, content);

  if (!validation.valid) {
    return { validation };
  }

  const html = await renderTemplate(template, content);
  const fileName = `deckbot-${template}-${Date.now()}.pdf`;
  const localPath = path.join(process.cwd(), "outputs", "pdfs", fileName);
  await generatePdf(html, localPath);
  const pdfPath = await publishPdf(localPath, fileName);
  await savePresentation({ template, pdfPath, content });

  return { pdfPath };
}

export async function POST(request: Request) {
  const { template, content } = (await request.json()) as {
    template: TemplateName;
    content: Record<string, unknown>;
  };

  const result = await renderPdf(template, content);
  if ("validation" in result) {
    return NextResponse.json(
      { error: "Conteúdo excede limites", validation: result.validation },
      { status: 422 },
    );
  }

  return NextResponse.json({ pdfPath: result.pdfPath });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const template = (searchParams.get("template") ?? "commercial-sober-mono") as TemplateName;
  const examplePath = path.join(process.cwd(), "templates", template, "example.json");
  const content = JSON.parse(await readFile(examplePath, "utf8")) as Record<string, unknown>;

  const result = await renderPdf(template, content);
  if ("validation" in result) {
    return NextResponse.json(
      { error: "Example excede limites", validation: result.validation },
      { status: 422 },
    );
  }

  return NextResponse.json({ pdfPath: result.pdfPath });
}
