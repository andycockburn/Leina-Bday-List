import { kv } from "@vercel/kv";

const KEY = "leina-birthday-claims";

export async function GET() {
  try {
    const data = await kv.get(KEY);
    return Response.json(data || {});
  } catch (e) {
    return Response.json({});
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    await kv.set(KEY, body);
    return Response.json({ ok: true });
  } catch (e) {
    return Response.json({ ok: false }, { status: 500 });
  }
}
