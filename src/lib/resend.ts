'use server';

export async function sendApplicationNotification({
  applicantName,
  applicantEmail,
  applicantPhone,
  jobTitle,
}: {
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  jobTitle: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY is not configured. Email notification skipped.');
    return;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'IBees Jobs Alerts <onboarding@resend.dev>',
        to: ['balasankar8943@gmail.com'],
        subject: `New Job Application: ${jobTitle} - ${applicantName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background-color: #0D1B5E; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">IBees Jobs</h1>
              <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">Connecting Talent with Opportunities</p>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
              <h2 style="color: #0D1B5E; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">New Candidate Application</h2>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; width: 120px;">Position:</td>
                  <td style="padding: 8px 0;">${jobTitle}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Applicant:</td>
                  <td style="padding: 8px 0;">${applicantName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${applicantEmail}" style="color: #2563eb; text-decoration: none;">${applicantEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 8px 0;"><a href="tel:${applicantPhone}" style="color: #2563eb; text-decoration: none;">${applicantPhone}</a></td>
                </tr>
              </table>
              
              <div style="margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #4b5563;">You can view the applicant's resume and manage this application directly inside the IBees Jobs Admin Panel.</p>
              </div>
            </div>
            <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #9ca3af;">
              <p>© ${new Date().getFullYear()} IBees Jobs. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to send email via Resend API:', errText);
    }
  } catch (err) {
    console.error('Error occurred in sendApplicationNotification:', err);
  }
}

export async function sendCandidateConfirmation({
  candidateEmail,
  candidateName,
  jobTitle,
}: {
  candidateEmail: string;
  candidateName: string;
  jobTitle: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'IBees Jobs <onboarding@resend.dev>',
        to: [candidateEmail],
        subject: `Application Received: ${jobTitle} - IBees Jobs`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background-color: #0D1B5E; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">IBees Jobs</h1>
              <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">Connecting Talent with Opportunities</p>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
              <h2 style="color: #0D1B5E; margin-top: 0; font-size: 18px;">Hello ${candidateName},</h2>
              <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
                Thank you for applying for the <strong>${jobTitle}</strong> position through IBees Jobs. We have successfully received your candidate profile and resume.
              </p>
              <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">
                Our recruiting team will review your application and match it against the job requirements. If your profile matches what the employer is looking for, we will get in touch with you to schedule an interview.
              </p>
              <div style="margin-top: 24px; padding: 16px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
                <p style="margin: 0; font-size: 13px; color: #6b7280;">If you have any questions, feel free to reply to this email or contact us directly on WhatsApp.</p>
              </div>
            </div>
            <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #9ca3af;">
              <p>© ${new Date().getFullYear()} IBees Jobs. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to send confirmation email:', errText);
    }
  } catch (err) {
    console.error('Error sending confirmation email:', err);
  }
}

export async function sendInquiryNotification({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'IBees Jobs Inquiries <onboarding@resend.dev>',
        to: ['balasankar8943@gmail.com'],
        subject: `New General Inquiry: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
            <div style="background-color: #0D1B5E; padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">IBees Jobs</h1>
              <p style="color: #93c5fd; margin: 8px 0 0 0; font-size: 14px;">New Website Contact Inquiry</p>
            </div>
            <div style="padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px; background-color: #ffffff;">
              <h2 style="color: #0D1B5E; margin-top: 0; font-size: 18px; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px;">Inquiry Details</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td><td style="padding: 8px 0;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;"><a href="tel:${phone}">${phone}</a></td></tr>
              </table>
              <div style="margin-top: 16px; padding: 16px; background-color: #f9fafb; border-radius: 8px;">
                <span style="font-weight: bold; display: block; margin-bottom: 8px; font-size: 14px;">Message:</span>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #4b5563; white-space: pre-line;">${message}</p>
              </div>
            </div>
            <div style="text-align: center; margin-top: 16px; font-size: 12px; color: #9ca3af;">
              <p>© ${new Date().getFullYear()} IBees Jobs. All rights reserved.</p>
            </div>
          </div>
        `,
      }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error('Failed to send contact inquiry email:', errText);
    }
  } catch (err) {
    console.error('Error sending contact inquiry email:', err);
  }
}

