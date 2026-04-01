export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};
  if (!email) return res.status(400).json({ error: 'Email required' });

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) return res.status(500).json({ error: 'Email service not configured' });

  try {
    // Notify hello@hostack.co
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Hostack <onboarding@resend.dev>',
        to: ['hello@hostack.co'],
        subject: `New founding member: ${email}`,
        html: `<p>New signup from <strong>${email}</strong> on hostack.co</p>`
      })
    });

    // Welcome email
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Hostack <onboarding@resend.dev>',
        to: [email],
        subject: "You're in — Hostack Founding Member Programme",
        html: `<div style="font-family:'DM Sans',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0d1f22">
          <h2 style="color:#019179">Welcome to Hostack 👋</h2>
          <p>Thanks for joining our Founding Member Programme.</p>
          <p>We're building the operations OS for hostels & co-livings — and you're among the first to know.</p>
          <p>We'll reach out within 24 hours to schedule a quick call.</p>
          <p style="margin-top:32px;color:#7a9ea4;font-size:13px">— The Hostack Team<br>hello@hostack.co</p>
        </div>`
      })
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'Email failed' });
  }
}
