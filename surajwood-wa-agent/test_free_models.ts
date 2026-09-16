import fetch from "node-fetch";

const OPENROUTER_KEY = process.env.OPENROUTER_KEY || "";

const testList = [
  "nex-agi/nex-n2.5-mini:free",
  "nex-agi/nex-n2.5-pro:free",
  "inclusionai/ling-3.0-flash-vl:free",
  "google/gemma-4-26b-a4b-it:free",
  "google/gemma-4-31b-it:free",
  "nvidia/nemotron-3.5-lightning:free",
  "thinkingmachines/inkling:free"
];

async function test() {
  for (const m of testList) {
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
        messages: [{ role: "user", content: "Hi" }],
      }),
    });
    console.log(m, res.status);
    if (res.ok) {
      console.log("SUCCESS on", m);
      return;
    }
  }
}

test();
