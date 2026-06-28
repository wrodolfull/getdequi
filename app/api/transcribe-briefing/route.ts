import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

const maxAudioSizeBytes = 25 * 1024 * 1024;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Configure OPENAI_API_KEY para transcrever briefing por áudio." },
      { status: 503 },
    );
  }

  const formData = await req.formData();
  const audio = formData.get("audio");

  if (!(audio instanceof File)) {
    return NextResponse.json({ error: "Envie um arquivo de áudio no campo 'audio'." }, { status: 400 });
  }

  if (!audio.type.startsWith("audio/") && !audio.name.match(/\.(mp3|mp4|mpeg|mpga|m4a|wav|webm)$/i)) {
    return NextResponse.json({ error: "Formato de áudio não suportado." }, { status: 400 });
  }

  if (audio.size > maxAudioSizeBytes) {
    return NextResponse.json({ error: "O áudio deve ter até 25 MB." }, { status: 413 });
  }

  const transcription = await openai.audio.transcriptions.create({
    file: audio,
    model: process.env.OPENAI_TRANSCRIPTION_MODEL || "whisper-1",
    language: "pt",
  });

  return NextResponse.json({ briefing: transcription.text });
}
