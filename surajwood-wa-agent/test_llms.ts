import Anthropic from "@anthropic-ai/sdk";
import fetch from "node-fetch";

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY || "";
const OPENROUTER_KEY = process.env.OPENROUTER_KEY || "";

async function testClaude() {
  console.log("Testing Claude API...");
  try {
    const client = new Anthropic({ apiKey: ANTHROPIC_KEY });
    const res = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 100,
      messages: [{ role: "user", content: "Hi" }],
    });
    console.log("Claude Success:", res.content);
  } catch (err: any) {
    console.error("Claude Error:", err.message);
  }
}

async function testOpenRouter() {
  console.log("\nTesting OpenRouter API models...");
  const models = [
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "mistralai/mistral-small-24b-instruct-2501:free",
    "qwen/qwen-2.5-coder-32b-instruct:free",
    "deepseek/deepseek-chat:free",
    "deepseek/deepseek-r1:free",
    "openrouter/free"
  ];

  for (const m of models) {
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "HTTP-Referer": "https://surajwood.com",
          "X-Title": "SurajWood WhatsApp Assistant",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: m,
          messages: [{ role: "user", content: "Say hello and your model name in 5 words" }],
        }),
      });

      if (res.ok) {
        const d = await res.json();
        console.log(`✅ Model ${m} SUCCESS:`, d?.choices?.[0]?.message?.content);
      } else {
        const text = await res.text();
        console.log(`❌ Model ${m} FAILED (${res.status}):`, text.substring(0, 150));
      }
    } catch (e: any) {
      console.log(`❌ Model ${m} ERROR:`, e.message);
    }
  }
}

async function main() {
  await testClaude();
  await testOpenRouter();
}

main();
