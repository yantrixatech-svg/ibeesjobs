'use server';

export async function sendWhatsAppNotification({
  applicantName,
  jobTitle,
  applicantPhone,
}: {
  applicantName: string;
  jobTitle: string;
  applicantPhone: string;
}) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886'; // Default sandbox number
  const to = process.env.TWILIO_WHATSAPP_TO || 'whatsapp:+918075946173'; // Default agency number

  if (!accountSid || !authToken) {
    console.warn('Twilio credentials not configured. WhatsApp alert skipped.');
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
  const auth = Buffer.from(`${accountSid}:${authToken}`).toString('base64');

  const bodyParams = new URLSearchParams();
  bodyParams.append('From', from);
  bodyParams.append('To', to);
  bodyParams.append('Body', `New job application received on IBees Jobs!\n\nCandidate: ${applicantName}\nPosition: ${jobTitle}\nPhone: ${applicantPhone}`);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth}`,
      },
      body: bodyParams.toString(),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Failed to send Twilio WhatsApp notification:', errText);
    }
  } catch (error) {
    console.error('Error dispatching Twilio message:', error);
  }
}
