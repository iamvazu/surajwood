import Anthropic from "@anthropic-ai/sdk";
import { CONFIG } from "../config";
import { getSystemPrompt } from "./prompt";
import { CLAUDE_TOOLS, executeTool } from "./tools";

let anthropicClient: Anthropic | null = null;

function getClient(): Anthropic {
  if (!anthropicClient) {
    if (!CONFIG.anthropicApiKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured in .env");
    }
    anthropicClient = new Anthropic({
      apiKey: CONFIG.anthropicApiKey,
    });
  }
  return anthropicClient;
}

// In-memory conversation history per WhatsApp chat ID
const conversationSessions = new Map<
  string,
  { role: "user" | "assistant"; content: any }[]
>();

const MAX_HISTORY = 16;

export function clearChatHistory(chatId: string) {
  conversationSessions.delete(chatId);
}

export async function processUserMessage(
  chatId: string,
  userText: string,
  senderName?: string
): Promise<string> {
  const client = getClient();
  const systemPrompt = getSystemPrompt();

  let history = conversationSessions.get(chatId) || [];

  const userContent = senderName
    ? `[From: ${senderName}] ${userText}`
    : userText;

  history.push({
    role: "user",
    content: userContent,
  });

  // Limit conversation history
  if (history.length > MAX_HISTORY) {
    history = history.slice(history.length - MAX_HISTORY);
  }

  let messages: Anthropic.MessageParam[] = history.map((h) => ({
    role: h.role,
    content: h.content,
  }));

  try {
    let response = await client.messages.create({
      model: CONFIG.anthropicModel,
      max_tokens: 1500,
      system: systemPrompt,
      tools: CLAUDE_TOOLS,
      messages,
    });

    // Handle tool execution loop
    while (response.stop_reason === "tool_use") {
      const toolUseBlocks = response.content.filter(
        (b) => b.type === "tool_use"
      ) as Anthropic.ToolUseBlock[];

      if (toolUseBlocks.length === 0) break;

      // Add assistant's response to history
      messages.push({
        role: "assistant",
        content: response.content,
      });

      // Execute each tool and gather results
      const toolResultBlocks: Anthropic.ToolResultBlockParam[] = [];
      for (const toolBlock of toolUseBlocks) {
        const resultStr = await executeTool(
          toolBlock.name,
          toolBlock.input,
          chatId
        );
        toolResultBlocks.push({
          type: "tool_result",
          tool_use_id: toolBlock.id,
          content: resultStr,
        });
      }

      // Feed results back to Claude
      messages.push({
        role: "user",
        content: toolResultBlocks,
      });

      response = await client.messages.create({
        model: CONFIG.anthropicModel,
        max_tokens: 1500,
        system: systemPrompt,
        tools: CLAUDE_TOOLS,
        messages,
      });
    }

    // Extract text reply
    const textBlocks = response.content.filter(
      (b) => b.type === "text"
    ) as Anthropic.TextBlock[];
    const replyText = textBlocks.map((b) => b.text).join("\n\n").trim();

    // Store in session history
    history.push({
      role: "assistant",
      content: replyText,
    });
    conversationSessions.set(chatId, history);

    return replyText;
  } catch (error: any) {
    console.error(`[ClaudeAgent] Error processing message for ${chatId}:`, error);
    if (error?.status === 401) {
      return "⚠️ *Configuration Notice*: Anthropic Claude API Key is missing or invalid. Please check your `.env` configuration on the server.";
    }
    return "Thank you for reaching out to *SurajWood*! Our technical team is reviewing your requirements and will connect with you shortly. You can also reach our factory desk directly at +91 90091 71819.";
  }
}
