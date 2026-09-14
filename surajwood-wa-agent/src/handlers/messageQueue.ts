import { processUserMessage } from "../agent/claude";
import { CONFIG } from "../config";

interface QueuedMessage {
  text: string;
  senderName?: string;
  timestamp: number;
}

// In-memory debounce queues per chatId
const messageQueues = new Map<string, QueuedMessage[]>();
const debounceTimers = new Map<string, NodeJS.Timeout>();

// Human takeover timestamps: chatId -> muteExpiryTimestamp
const humanTakeoverMap = new Map<string, number>();

export function isHumanTakeoverActive(chatId: string): boolean {
  const expiry = humanTakeoverMap.get(chatId);
  if (!expiry) return false;
  if (Date.now() > expiry) {
    humanTakeoverMap.delete(chatId);
    return false;
  }
  return true;
}

export function registerHumanResponse(chatId: string) {
  const muteUntil = Date.now() + CONFIG.humanTakeoverMinutes * 60 * 1000;
  humanTakeoverMap.set(chatId, muteUntil);
  console.log(`[HumanTakeover] Bot paused for chat ${chatId} until ${new Date(muteUntil).toLocaleTimeString()}`);
}

export function clearHumanTakeover(chatId: string) {
  humanTakeoverMap.delete(chatId);
}

export function enqueueMessage(
  chatId: string,
  text: string,
  senderName: string | undefined,
  sendReplyCallback: (chatId: string, reply: string) => Promise<void>
) {
  // Check if human rep is active
  if (isHumanTakeoverActive(chatId)) {
    console.log(`[MessageQueue] Skipping AI response for ${chatId} (Human Rep Active)`);
    return;
  }

  const currentQueue = messageQueues.get(chatId) || [];
  currentQueue.push({
    text,
    senderName,
    timestamp: Date.now(),
  });
  messageQueues.set(chatId, currentQueue);

  // Reset any existing debounce timer
  const existingTimer = debounceTimers.get(chatId);
  if (existingTimer) {
    clearTimeout(existingTimer);
  }

  const timer = setTimeout(async () => {
    debounceTimers.delete(chatId);
    const messages = messageQueues.get(chatId) || [];
    messageQueues.delete(chatId);

    if (messages.length === 0) return;

    // Check again before sending in case human answered during debounce
    if (isHumanTakeoverActive(chatId)) {
      return;
    }

    // Combine multiple short messages
    const combinedText = messages.map((m) => m.text).join("\n");
    const name = messages[messages.length - 1].senderName;

    console.log(`[AI Dispatch] Processing ${messages.length} messages from ${chatId} (${name || "User"})`);

    try {
      const reply = await processUserMessage(chatId, combinedText, name);
      if (reply) {
        await sendReplyCallback(chatId, reply);
      }
    } catch (err) {
      console.error(`[AI Dispatch Error] Failed to generate reply for ${chatId}:`, err);
    }
  }, CONFIG.debounceDelayMs);

  debounceTimers.set(chatId, timer);
}
