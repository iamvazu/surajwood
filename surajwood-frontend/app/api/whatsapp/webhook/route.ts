import { NextRequest, NextResponse } from 'next/server';
import { sendTextMessage, sendInteractiveButtons, sendDocumentMessage } from '@/lib/whatsapp';

// --- CONFIGURATION ---
const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || 'surajwood_secret_token';
const PERFEX_API_URL = "https://crm.surajwood.com/api/leads/create";
const PERFEX_API_KEY = process.env.PERFEX_API_KEY;

// Catalogs (Update with real public URLs once hosted)
const CATALOGS = {
  acrylic: "https://www.surajwood.com/catalogs/acrylic_2025.pdf",
  aluminium: "https://www.surajwood.com/catalogs/aluminium_2025.pdf"
};

interface Session {
  step: string;
  data: {
    full_name: string;
    phone: string;
    product_interest?: string[];
    user_type?: string;
    inquiry_type?: string;
    email?: string;
    message?: string;
    city?: string;
    consent?: boolean;
    honeypot?: string;
  };
}

// In-memory session store (Note: Use Redis/DB for production)
const sessions: Record<string, Session> = {};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook Verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Check if it's a WhatsApp message
    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];
      const contact = value?.contacts?.[0];

      if (!message) return NextResponse.json({ status: 'ok' });

      const from = message.from; // Phone number
      const userName = contact?.profile?.name || 'Customer';
      
      // Initialize or get session
      if (!sessions[from]) {
        sessions[from] = { step: 'START', data: { full_name: userName, phone: from } };
      }
      
      const session = sessions[from];
      const messageText = message.text?.body?.toLowerCase();
      const buttonId = message.interactive?.button_reply?.id;

      await handleFlow(from, session, messageText, buttonId);

      return NextResponse.json({ status: 'ok' });
    }

    return NextResponse.json({ status: 'ignored' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

async function handleFlow(from: string, session: Session, text: string, buttonId?: string) {
  switch (session.step) {
    case 'START':
      await sendInteractiveButtons(from, 
        `Hi ${session.data.full_name}! 👋 Welcome to SurajWood. We provide premium surface solutions.\n\nWhich product catalog would you like to explore today?`,
        [
          { id: 'cat_acrylic', title: 'Acrylic Panels' },
          { id: 'cat_aluminium', title: 'Aluminium Profiles' }
        ]
      );
      session.step = 'AWAITING_INTEREST';
      break;

    case 'AWAITING_INTEREST':
      if (buttonId === 'cat_acrylic' || buttonId === 'cat_aluminium') {
        const type = buttonId === 'cat_acrylic' ? 'Acrylic' : 'Aluminium';
        session.data.product_interest = [type.toUpperCase()];
        
        const catalogUrl = buttonId === 'cat_acrylic' ? CATALOGS.acrylic : CATALOGS.aluminium;
        const fileName = buttonId === 'cat_acrylic' ? 'SurajWood_Acrylic_2025.pdf' : 'SurajWood_Aluminium_2025.pdf';

        await sendDocumentMessage(from, catalogUrl, fileName, `Here is our latest ${type} catalog! 📂`);
        
        await new Promise(r => setTimeout(r, 2000)); // Small delay

        await sendInteractiveButtons(from, 
          "To better assist you, could you please tell us your primary role?",
          [
            { id: 'role_architect', title: 'Architect' },
            { id: 'role_dealer', title: 'Dealer / Showroom' },
            { id: 'role_homeowner', title: 'Homeowner' }
          ]
        );
        session.step = 'AWAITING_ROLE';
      } else {
        await sendTextMessage(from, "Please select an option from the buttons above.");
      }
      break;

    case 'AWAITING_ROLE':
      if (buttonId?.startsWith('role_')) {
        const roleMap: Record<string, string> = {
          role_architect: 'Architect',
          role_dealer: 'Dealer',
          role_homeowner: 'Homeowner'
        };
        session.data.user_type = roleMap[buttonId];

        await sendInteractiveButtons(from, 
          "Would you like us to send you a physical 'Sample Kit'? It includes our premium finishes to help you decide.",
          [
            { id: 'sample_yes', title: 'Yes, I want one' },
            { id: 'sample_no', title: 'Not right now' }
          ]
        );
        session.step = 'AWAITING_SAMPLE_KIT';
      }
      break;

    case 'AWAITING_SAMPLE_KIT':
      if (buttonId === 'sample_yes') {
        session.data.inquiry_type = 'Sample Kit';
        await sendTextMessage(from, "Great! Please provide your Full Name to address the delivery.");
        session.step = 'AWAITING_NAME';
      } else if (buttonId === 'sample_no') {
        session.data.inquiry_type = 'Other';
        await syncToCRM(session.data);
        await sendTextMessage(from, "No problem! A member of our team will contact you shortly if you have any questions. Have a great day!");
        delete sessions[from];
      }
      break;

    case 'AWAITING_NAME':
      session.data.full_name = text;
      await sendTextMessage(from, "Thank you. Now, please share your Email Address.");
      session.step = 'AWAITING_EMAIL';
      break;

    case 'AWAITING_EMAIL':
      session.data.email = text;
      await sendTextMessage(from, "Finally, please provide your Company Name and Shipping Address (City/State/Pincode).");
      session.step = 'AWAITING_ADDRESS';
      break;

    case 'AWAITING_ADDRESS':
      session.data.message = `Company/Address: ${text}`;
      session.data.city = text.split(',').pop()?.trim() || ''; // Rough city extraction
      session.data.consent = true;
      session.data.honeypot = "";

      await sendTextMessage(from, "Perfect! We've received your request. Our team will verify the details and dispatch your Sample Kit soon. 🚚");
      
      await syncToCRM(session.data);
      delete sessions[from];
      break;
  }
}

async function syncToCRM(data: Session['data']) {
  try {
    const response = await fetch(PERFEX_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': PERFEX_API_KEY || '',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('CRM Sync Result:', result);
    return result;
  } catch (error) {
    console.error('CRM Sync Error:', error);
    return null;
  }
}
