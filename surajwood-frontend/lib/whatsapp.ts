/**
 * lib/whatsapp.ts
 * Helper functions for WhatsApp Business Cloud API
 */

const WHATSAPP_API_VERSION = 'v21.0';
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;

async function sendWhatsAppRequest(endpoint: string, data: unknown) {
  if (!PHONE_NUMBER_ID || !ACCESS_TOKEN) {
    console.error('WhatsApp credentials missing');
    return null;
  }

  const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${PHONE_NUMBER_ID}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error('WhatsApp API Error:', result);
    }
    return result;
  } catch (error) {
    console.error('WhatsApp API Fetch Error:', error);
    return null;
  }
}

export async function sendTextMessage(to: string, text: string) {
  return sendWhatsAppRequest('messages', {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'text',
    text: { body: text },
  });
}

export async function sendDocumentMessage(to: string, documentUrl: string, filename: string, caption?: string) {
  return sendWhatsAppRequest('messages', {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'document',
    document: {
      link: documentUrl,
      filename: filename,
      caption: caption,
    },
  });
}

export async function sendInteractiveButtons(to: string, text: string, buttons: { id: string, title: string }[]) {
  return sendWhatsAppRequest('messages', {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'button',
      body: { text },
      action: {
        buttons: buttons.map(b => ({
          type: 'reply',
          reply: { id: b.id, title: b.title }
        }))
      }
    },
  });
}

export async function sendInteractiveList(to: string, text: string, buttonText: string, sections: { title: string, rows: { id: string, title: string, description?: string }[] }[]) {
  return sendWhatsAppRequest('messages', {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to,
    type: 'interactive',
    interactive: {
      type: 'list',
      body: { text },
      action: {
        button: buttonText,
        sections: sections.map(s => ({
          title: s.title,
          rows: s.rows.map(r => ({
            id: r.id,
            title: r.title,
            description: r.description
          }))
        }))
      }
    },
  });
}
