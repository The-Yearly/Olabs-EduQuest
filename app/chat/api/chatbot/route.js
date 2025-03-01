import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();
    // Hardcoded API key (not recommended for production)
    const apiKey = "AIzaSyBBm2aTU0Le0nFQykj_hbirRhNCW73Yl4g";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't understand that.";

    return NextResponse.json({ reply: botReply });
  } catch (error) {
    console.error("Chatbot API error:", error);
    return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
  }
}