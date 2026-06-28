import { NextResponse } from "next/server";
import { outlines } from "@/lib/deck";
import type { TemplateName } from "@/lib/types";

const fallbackTemplate: TemplateName = "commercial-sober-mono";

function isTemplateName(value: unknown): value is TemplateName {
  return typeof value === "string" && value in outlines;
}

export async function POST(req: Request) {
  const { template } = await req.json();
  const selectedTemplate = isTemplateName(template) ? template : fallbackTemplate;

  return NextResponse.json({ outline: outlines[selectedTemplate] });
}
