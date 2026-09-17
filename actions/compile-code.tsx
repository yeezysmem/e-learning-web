"use server";

import axios from "axios";

export async function compileCode(requestData: {
  language: string;
  files: { content: string }[];
}) {
  const lang = requestData.language.toLowerCase().trim();

  // Мапінг мов для Paiza API
  const languageMap: Record<string, string> = {
    javascript: "javascript",
    js: "javascript",
    python: "python3",
    py: "python3",
    typescript: "typescript",
    ts: "typescript",
  };

  const targetLang = languageMap[lang] || "javascript";
  const userCode = requestData.files[0]?.content || "";

  try {
    // Крок 1: Створюємо сесію виконання коду в Paiza
    const createRes = await axios.post(
      "https://api.paiza.io/runners/create",
      {
        source_code: userCode,
        language: targetLang,
        longpoll: true,
        api_key: "guest",
      },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 10000,
      }
    );

    const id = createRes.data?.id;

    if (!id) {
      throw new Error("Failed to initialize runner session.");
    }

    // Крок 2: Отримуємо результати виконання
    const statusRes = await axios.get(
      "https://api.paiza.io/runners/get_details",
      {
        params: { id, api_key: "guest" },
        timeout: 10000,
      }
    );

    const stdout = statusRes.data.stdout || "";
    const stderr = statusRes.data.stderr || statusRes.data.build_stderr || "";

    return {
      run: {
        output: stdout || stderr || "Program executed with no output.",
      },
    };
  } catch (error: any) {
    console.error("PAIZA API ERROR:", error?.response?.data || error.message);

    return {
      run: {
        output: `Execution error: Unable to run code via public runner (${error?.message || "Unknown error"}).`,
      },
    };
  }
}
