import type { NextRequest } from "next/server";

const UPSTREAM = "https://phonepe-backend-njty.onrender.com/api";

type Ctx = { params: Promise<{ path: string[] }> };

/**
 * Server-side proxy for the PhonePe backend.
 *
 * That backend only emits CORS headers for `https://kerithtravel.com` and
 * answers preflight requests from any other origin with a 500, so the browser
 * calls our own origin and this handler forwards the request without the
 * Origin/Referer headers.
 */
async function forward(request: NextRequest, { params }: Ctx) {
  const { path } = await params;
  const target = `${UPSTREAM}/${path.join("/")}${request.nextUrl.search}`;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);

  const init: RequestInit = { method: request.method, headers, cache: "no-store" };
  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  try {
    const upstream = await fetch(target, init);
    const body = await upstream.arrayBuffer();

    return new Response(body, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("PhonePe proxy error:", error);
    return Response.json(
      { error: "Payment service is unreachable right now." },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest, ctx: Ctx) {
  return forward(request, ctx);
}

export async function POST(request: NextRequest, ctx: Ctx) {
  return forward(request, ctx);
}

export async function PUT(request: NextRequest, ctx: Ctx) {
  return forward(request, ctx);
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  return forward(request, ctx);
}

export async function DELETE(request: NextRequest, ctx: Ctx) {
  return forward(request, ctx);
}
