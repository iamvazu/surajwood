import { processUserMessage, clearChatHistory } from "./src/agent/claude";

async function testConversationFlow() {
  const chatId = "test_customer_pre_sales_1";
  clearChatHistory(chatId);

  const turns = [
    "i like to see shade code 1302 whitw 3325 urban grey and 2307 white metallic",
    "kitchen",
    "15 running feet",
    "yes send samples"
  ];

  for (let i = 0; i < turns.length; i++) {
    const text = turns[i];
    console.log(`\n==================== [TURN ${i + 1}] USER: "${text}" ====================`);
    const res = await processUserMessage(chatId, text, "Architect Vikram");
    console.log("[AGENT REPLY]:");
    console.log(res.text);
    console.log("[IMAGES ATTACHED]:", res.images.map(img => img.url));
  }
}

testConversationFlow().catch(console.error);
