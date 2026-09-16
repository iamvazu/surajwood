import fetch from "node-fetch";

async function findFreeModels() {
  const res = await fetch("https://openrouter.ai/api/v1/models");
  const data: any = await res.json();
  const freeModels = data.data.filter((m: any) => m.id.endsWith(":free") || m.pricing?.prompt === "0");
  console.log(`Found ${freeModels.length} free models:`);
  for (const m of freeModels) {
    console.log(`- ${m.id} (${m.name})`);
  }
}

findFreeModels();
