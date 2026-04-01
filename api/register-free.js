/**
 * Free trial registration API endpoint
 * Handles registration for users signing up for free tier
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, propertyName, propertyType, beds, country, phone, language } = req.body || {};

  // Validation
  if (!email || !propertyName || !propertyType || !beds || !country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const RESEND_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_KEY) {
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const lang = language === 'es' ? 'es' : 'en';

    const emailTexts = {
      en: {
        subject: `New free trial signup: ${propertyName}`,
        adminNotif: `<p><strong>New Free Trial Registration</strong></p>
          <p><strong>Property:</strong> ${propertyName}<br/>
          <strong>Type:</strong> ${propertyType}<br/>
          <strong>Beds:</strong> ${beds}<br/>
          <strong>Country:</strong> ${country}<br/>
          <strong>Email:</strong> ${email}<br/>
          ${phone ? `<strong>Phone:</strong> ${phone}<br/>` : ''}
          </p>`,
        welcomeSubject: 'Welcome to Hostack — Your free trial is ready',
        welcomeHtml: `<div style="font-family:'DM Sans',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0d1f22">
          <h2 style="color:#019179">Welcome, ${propertyName}! 🎉</h2>
          <p>Your free trial is ready to set up.</p>
          <p>We've created your account and you can now access the Hostack dashboard.</p>
          <p><strong>What's next:</strong></p>
          <ul>
            <li>Check your email for your dashboard login link</li>
            <li>Generate your QR code for guest access</li>
            <li>Invite your first team member</li>
            <li>Test with a guest request</li>
          </ul>
          <p><a href="https://app.hostack.co/auth/login?email=${encodeURIComponent(email)}" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#019179;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">Access your dashboard →</a></p>
          <p style="margin-top:32px;color:#7a9ea4;font-size:13px">Questions? Reply to this email or contact hello@hostack.co<br/>— The Hostack Team</p>
        </div>`
      },
      es: {
        subject: `Nuevo registro de prueba gratuita: ${propertyName}`,
        adminNotif: `<p><strong>Nuevo Registro de Prueba Gratuita</strong></p>
          <p><strong>Propiedad:</strong> ${propertyName}<br/>
          <strong>Tipo:</strong> ${propertyType}<br/>
          <strong>Camas:</strong> ${beds}<br/>
          <strong>País:</strong> ${country}<br/>
          <strong>Email:</strong> ${email}<br/>
          ${phone ? `<strong>Teléfono:</strong> ${phone}<br/>` : ''}
          </p>`,
        welcomeSubject: 'Bienvenido a Hostack — Tu prueba gratuita está lista',
        welcomeHtml: `<div style="font-family:'DM Sans',sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#0d1f22">
          <h2 style="color:#019179">¡Bienvenido, ${propertyName}! 🎉</h2>
          <p>Tu prueba gratuita está lista para configurar.</p>
          <p>Hemos creado tu cuenta y ahora puedes acceder al dashboard de Hostack.</p>
          <p><strong>Próximos pasos:</strong></p>
          <ul>
            <li>Revisa tu email para el enlace de acceso al dashboard</li>
            <li>Genera tu código QR para acceso de huéspedes</li>
            <li>Invita a tu primer miembro del equipo</li>
            <li>Prueba con una solicitud de huésped</li>
          </ul>
          <p><a href="https://app.hostack.co/auth/login?email=${encodeURIComponent(email)}" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#019179;color:#fff;text-decoration:none;border-radius:6px;font-weight:600">Acceder al dashboard →</a></p>
          <p style="margin-top:32px;color:#7a9ea4;font-size:13px">¿Preguntas? Responde a este email o contacta a hello@hostack.co<br/>— El Equipo de Hostack</p>
        </div>`
      }
    };

    const texts = emailTexts[lang];

    // Notify admin
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Hostack <onboarding@resend.dev>',
        to: ['hello@hostack.co'],
        subject: texts.subject,
        html: texts.adminNotif
      })
    });

    // Send welcome email to user
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Hostack <onboarding@resend.dev>',
        to: [email],
        subject: texts.welcomeSubject,
        html: texts.welcomeHtml
      })
    });

    return res.status(200).json({
      success: true,
      message: 'Registration successful. Check your email for next steps.'
    });

  } catch (err) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Registration failed. Please try again.' });
  }
}
