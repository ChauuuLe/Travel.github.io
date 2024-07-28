import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Latitude and Longitude are required", { status: 400 });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;

    if (!apiKey) {
      console.error("API key is missing");
      return new Response("Server configuration error", { status: 500 });
    }

    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in getting pollution data:", error);
    return new Response("Error fetching pollution data", { status: 500 });
  }
}
