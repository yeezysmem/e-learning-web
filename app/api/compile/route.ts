// app/api/compile/route.ts
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { language, code } = await req.json();

    const lang = language.toLowerCase();
    const glotLanguages: Record<string, string> = {
      javascript: "javascript",
      js: "javascript",
      python: "python",
      py: "python",
      typescript: "typescript",
      ts: "typescript",
    };

    const targetLang = glotLanguages[lang] || "javascript";
    const fileExt = targetLang === "python" ? "py" : "js";

    // Робимо запит до Glot.io із сервера Node.js (тут немає CORS)
    const response = await axios.post(
      `https://glot.io/api/run/${targetLang}/latest`,
      {
        files: [
          {
            name: `main.${fileExt}`,
            content: code,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const stdout = response.data.stdout || "";
    const stderr = response.data.stderr || response.data.error || "";

    return NextResponse.json(
      { output: stdout || stderr || "Program executed with no output." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Compile Route Error:", error?.response?.data || error.message);
    return NextResponse.json(
      { error: "Failed to execute code" },
      { status: 500 }
    );
  }
}
