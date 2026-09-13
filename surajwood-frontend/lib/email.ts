import nodemailer from "nodemailer";

interface SendCatalogEmailParams {
  to: string;
  fullName: string;
  userType?: string;
  company?: string;
}

interface SendLeadNotificationParams {
  lead: {
    full_name: string;
    email: string;
    phone: string;
    company?: string;
    user_type?: string;
    inquiry_type?: string;
    product_interest?: string | string[];
    city?: string;
    message?: string;
    source_page?: string;
  };
}

/**
 * Creates a Nodemailer transporter using environment variables.
 * Returns null if SMTP configuration is not provided.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER || "bd@surajwood.com";
  const pass = process.env.SMTP_PASS;
  const port = parseInt(process.env.SMTP_PORT || "465", 10);
  const secure = process.env.SMTP_SECURE === "true" || port === 465;

  if (!host || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Sends automated catalog download email to the prospective customer from bd@surajwood.com
 */
export async function sendCatalogEmail({
  to,
  fullName,
  userType,
  company,
}: SendCatalogEmailParams) {
  const fromEmail = process.env.SMTP_FROM_EMAIL || "bd@surajwood.com";
  const fromName = process.env.SMTP_FROM_NAME || "SurajWood Business Development";
  const siteUrl = process.env.SITE_URL || "https://www.surajwood.com";

  const acrylicCatalogUrl = `${siteUrl}/catalogs/acrylic_2025.pdf`;
  const aluminiumCatalogUrl = `${siteUrl}/catalogs/aluminium_2025.pdf`;
  const technicalDataSheetUrl = `${siteUrl}/downloads/ACRYLUX_Technical_Data_Sheet.pdf`;

  const recipientSubtitle = [userType, company].filter(Boolean).join(" • ");

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your SurajWood Design Catalogs & Technical Specifications</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 36px 32px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0 0 8px; font-size: 26px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase;">
                SURAJ<span style="color: #ea580c;">WOOD</span>
              </h1>
              <p style="color: #94a3b8; margin: 0; font-size: 13px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase;">
                Premium Acrylic & Surface Solutions
              </p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 36px 32px;">
              <h2 style="color: #0f172a; font-size: 20px; font-weight: 700; margin: 0 0 6px;">
                Hello ${fullName ? fullName : "Valued Partner"},
              </h2>
              ${recipientSubtitle ? `<p style="color: #ea580c; font-size: 13px; font-weight: 600; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.05em;">${recipientSubtitle}</p>` : `<div style="margin-bottom: 16px;"></div>`}
              <p style="color: #475569; font-size: 15px; margin: 0 0 24px; line-height: 1.6;">
                Thank you for your interest in SurajWood premium architectural surfaces. As requested, your high-resolution catalogs, latest 2026 shade cards, and technical engineering folders are ready for immediate download below:
              </p>

              <!-- Resource 1: Acrylic Shade Card & E-Book -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 16px; padding: 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
                      Flagship Catalog • 4.8 MB
                    </div>
                    <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
                      SurajWood ACRYLUX Shade Card & E-Book 2026
                    </div>
                    <div style="font-size: 13px; color: #64748b; margin-bottom: 14px;">
                      Complete 50+ collection of satin finishes, metallics, high-gloss, and authentic wood grains with PUR bonding specs.
                    </div>
                    <div>
                      <a href="${acrylicCatalogUrl}" target="_blank" style="display: inline-block; background-color: #ea580c; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.02em;">
                        Download Acrylic Catalog (PDF) &rarr;
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Resource 2: Aluminum Profiles Folder -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 16px; padding: 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #ea580c; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
                      Technical Guide • 2.2 MB
                    </div>
                    <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
                      AL-PROFHAN Aluminum Profiles Engineering Folder 2026
                    </div>
                    <div style="font-size: 13px; color: #64748b; margin-bottom: 14px;">
                      Detailed section profiles, cross-sectional dimensions, handleless gola profiles, and installation tolerances.
                    </div>
                    <div>
                      <a href="${aluminiumCatalogUrl}" target="_blank" style="display: inline-block; background-color: #0f172a; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.02em;">
                        Download Aluminum Profiles (PDF) &rarr;
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Resource 3: Technical Data Sheet -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; padding: 18px;">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">
                      Tech Specs & Guide • 4.8 MB
                    </div>
                    <div style="font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 6px;">
                      Technical Data Sheets & Installation Manual
                    </div>
                    <div style="font-size: 13px; color: #64748b; margin-bottom: 14px;">
                      PUR hot-melt lamination properties, scratch resistance benchmarks, humidity resistance, and substrate cutting guidelines.
                    </div>
                    <div>
                      <a href="${technicalDataSheetUrl}" target="_blank" style="display: inline-block; background-color: #475569; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: 0.02em;">
                        Download Technical Data Sheet (PDF) &rarr;
                      </a>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Assistance & Physical Sample Kit Section -->
              <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; border-radius: 4px; padding: 16px 20px; margin-bottom: 28px;">
                <h4 style="margin: 0 0 6px; color: #9a3412; font-size: 14px; font-weight: 700;">
                  Need Physical Finish Swatches or Sample Box?
                </h4>
                <p style="margin: 0 0 12px; color: #7c2d12; font-size: 13px; line-height: 1.5;">
                  We dispatch complimentary sample kits and shade folders to Architects, Interior Designers, and OEMs across India.
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                  <a href="https://wa.me/919009171819?text=Hi%20SurajWood%20Team%2C%20I%20downloaded%20the%20catalog%20and%20would%20like%20to%20request%20physical%20samples." target="_blank" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 700;">
                    Chat on WhatsApp (+91 9009171819)
                  </a>
                  <a href="mailto:bd@surajwood.com" style="display: inline-block; background-color: #ffffff; color: #9a3412; border: 1px solid #fdba74; text-decoration: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; font-weight: 700;">
                    Email: bd@surajwood.com
                  </a>
                </div>
              </div>

              <!-- Signoff -->
              <p style="color: #475569; font-size: 14px; margin: 0 0 4px;">
                Warm regards,
              </p>
              <p style="color: #0f172a; font-size: 14px; font-weight: 700; margin: 0 0 2px;">
                Business Development Team
              </p>
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                Suraj Wood Products Pvt. Ltd. | Bahadurgarh, NCR
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 24px 32px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #64748b; font-size: 12px; margin: 0 0 6px;">
                Direct: <a href="tel:+919009171819" style="color: #ea580c; text-decoration: none; font-weight: 600;">+91-9009171819</a> &nbsp;|&nbsp; Web: <a href="${siteUrl}" style="color: #ea580c; text-decoration: none; font-weight: 600;">www.surajwood.com</a>
              </p>
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">
                Manufacturing Facility: 45 KM Stone, VPO Rohad, Bahadurgarh, Haryana - 124501
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const transporter = getTransporter();

  if (!transporter) {
    console.log(
      `[Email Service] SMTP credentials not configured in environment. Mocking automated email dispatch to ${to} from ${fromEmail}.`
    );
    return { success: true, mocked: true };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject: `Your SurajWood Design Catalogs & Technical Specifications [2026]`,
      text: `Hello ${fullName || "Partner"},\n\nThank you for requesting SurajWood resources. Here are your direct catalog download links:\n\n1. ACRYLUX Shade Card 2026: ${acrylicCatalogUrl}\n2. AL-PROFHAN Aluminum Profiles: ${aluminiumCatalogUrl}\n3. Technical Data Sheet: ${technicalDataSheetUrl}\n\nContact us on WhatsApp: +91 9009171819 or Email: bd@surajwood.com\n\nSuraj Wood Products Pvt. Ltd.`,
      html: htmlContent,
    });

    console.log(`[Email Service] Catalog email successfully sent to ${to}: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("[Email Service] Failed to send catalog email:", error);
    return { success: false, error };
  }
}

/**
 * Sends an internal notification email to the SurajWood team for every new lead
 */
export async function sendLeadTeamNotification({ lead }: SendLeadNotificationParams) {
  const notifyEmail = process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER || "bd@surajwood.com";
  const fromEmail = process.env.SMTP_FROM_EMAIL || "bd@surajwood.com";
  const fromName = "SurajWood Website Leads";

  const transporter = getTransporter();
  if (!transporter) {
    console.log(`[Email Service] Mocking internal lead notification to ${notifyEmail} for lead ${lead.email}`);
    return { success: true, mocked: true };
  }

  try {
    const productInterest = Array.isArray(lead.product_interest)
      ? lead.product_interest.join(", ")
      : lead.product_interest || "N/A";

    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: notifyEmail,
      subject: `[New Lead] ${lead.inquiry_type || "Resource Download"} - ${lead.full_name} (${lead.city || lead.user_type || "Website"})`,
      text: `New Lead Submitted on Website:\n\nName: ${lead.full_name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nRole: ${lead.user_type || "N/A"}\nCompany: ${lead.company || "N/A"}\nInquiry Type: ${lead.inquiry_type || "Resource Download"}\nProducts: ${productInterest}\nCity: ${lead.city || "N/A"}\nMessage: ${lead.message || "N/A"}\nSource Page: ${lead.source_page || "Website"}\nDate: ${new Date().toISOString()}`,
      html: `
        <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
          <h2 style="color: #ea580c; border-bottom: 2px solid #ea580c; padding-bottom: 8px;">New Lead Received from Website</h2>
          <table style="width: 100%; max-width: 600px; border-collapse: collapse; margin-top: 15px;">
            <tr><td style="padding: 6px; font-weight: bold; width: 140px; background: #f8fafc;">Full Name:</td><td style="padding: 6px;">${lead.full_name}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Email:</td><td style="padding: 6px;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Phone:</td><td style="padding: 6px;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Role:</td><td style="padding: 6px;">${lead.user_type || "N/A"}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Company:</td><td style="padding: 6px;">${lead.company || "N/A"}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Inquiry Type:</td><td style="padding: 6px;">${lead.inquiry_type || "Resource Download"}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Products:</td><td style="padding: 6px;">${productInterest}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">City:</td><td style="padding: 6px;">${lead.city || "N/A"}</td></tr>
            <tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Source Page:</td><td style="padding: 6px;">${lead.source_page || "N/A"}</td></tr>
            ${lead.message ? `<tr><td style="padding: 6px; font-weight: bold; background: #f8fafc;">Message:</td><td style="padding: 6px;">${lead.message}</td></tr>` : ""}
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #888;">This lead has also been recorded in Perfex CRM.</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("[Email Service] Failed to send team lead notification:", error);
    return { success: false, error };
  }
}
