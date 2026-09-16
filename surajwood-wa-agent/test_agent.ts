import { processUserMessage } from "./src/agent/claude";

async function run() {
  const result = await processUserMessage(
    "test_user_1",
    "i like to see shade code 1302 whitw 3325 urban grey and 2307 white metallic",
    "Priya Sharma"
  );

  console.log("\n==================== AGENT REPLY TEXT ====================");
  console.log(result.text);
  console.log("\n==================== QUEUED IMAGES ====================");
  console.log(JSON.stringify(result.images, null, 2));
}

run().catch(console.error);
