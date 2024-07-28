import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Missing required query parameters: lat or lon", { status: 400 });
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=uv_index_max,uv_index_clear_sky_max&timezone=auto&forecast_days=1`;

    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 900 },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    const uvData = await res.json();
    return NextResponse.json(uvData);
  } catch (error) {
    console.error("Error Getting Uv Data:", error);
    return new Response("Error getting Uv Data", { status: 500 });
  }
}
