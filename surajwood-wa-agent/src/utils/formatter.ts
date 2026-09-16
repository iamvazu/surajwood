/**
 * WhatsApp Message Formatter & Sanitizer
 * Transforms standard Markdown output from LLMs into clean, native WhatsApp formatting
 */

export function formatForWhatsApp(rawText: string): string {
  if (!rawText) return "";

  let text = rawText;

  // 1. Remove markdown code blocks wrapper if LLM wraps output in ```markdown ... ```
  text = text.replace(/^```[a-z]*\n/i, "").replace(/\n```$/, "");

  // 2. Convert markdown headers (# Title, ## Title, ### Title) into clean WhatsApp bold with icons
  text = text.replace(/^#{1,3}\s+(.+)$/gm, (match, title) => {
    const cleanTitle = title.replace(/\*/g, "").trim();
    return `✨ *${cleanTitle}*`;
  });

  // 3. Convert double asterisks **text** to single asterisks *text* (WhatsApp native bold)
  text = text.replace(/\*\*(.*?)\*\*/g, "*$1*");

  // 4. Convert double underscores __text__ to single *text*
  text = text.replace(/__(.*?)__/g, "*$1*");

  // 5. Replace dot bullet points (· ) with standard clean bullet points (• )
  text = text.replace(/^[·•]\s+/gm, "• ");
  text = text.replace(/^-\s+/gm, "• ");

  // 6. Remove horizontal rules (--- or ***)
  text = text.replace(/^[-*_]{3,}$/gm, "────────────────────");

  // 7. Remove markdown link syntax [text](url) -> text (url)
  text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, "$1 ($2)");

  // 8. Normalize spacing: max 2 consecutive newlines
  text = text.replace(/\n{3,}/g, "\n\n");

  return text.trim();
}
