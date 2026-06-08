import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
export async function POST(req: Request) {
  try {
    const { answers } = await req.json();
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-5', max_tokens: 1600,
      system: 'You are SpendShift, an Australian personal-savings audit assistant. Give practical, non-financial-advice money-saving steps. Use headings, short bullets, scripts, and estimated yearly savings.',
      messages: [{ role: 'user', content: `Create a personalised full savings report from these audit answers: ${JSON.stringify(answers)}` }]
    });
    const text = msg.content.map((b:any)=>b.type==='text'?b.text:'').join('\n');
    return NextResponse.json({ report: text });
  } catch (e:any) { return NextResponse.json({ error: e.message }, { status: 500 }); }
}
