import { useState } from 'react';

export function FoundingMember() {
  const [form, setForm] = useState({
    contact_name: '',
    property_name: '',
    property_website: '',
    whatsapp: '',
    email: '',
    staff_size: '',
    room_count: '',
    has_manuals: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const required = ['contact_name', 'property_name', 'whatsapp', 'email', 'staff_size', 'room_count', 'has_manuals'];
    const missing = required.find(k => !form[k]);
    if (missing) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/founder-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          has_manuals: form.has_manuals === 'yes',
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="founding-member">
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2>Join the Founding Member Program</h2>
        <p className="subtitle">We're building Hostack WITH our first partners, not FOR them.</p>

        <div className="description">
          <p><strong>As a Founding Member, you get:</strong></p>
          <ul>
            <li>€300 one-time activation fee (instead of €300 + €99/month ongoing)</li>
            <li>12 months of Pro subscription included</li>
            <li>Direct access to Jorge (Founder) via monthly 1:1 calls</li>
            <li>Custom onboarding & in-site operational consulting</li>
            <li>Priority feature requests & beta testing</li>
            <li>Dedicated Slack channel for fast support</li>
          </ul>

          <p style={{ marginTop: 32 }}><strong>How it works:</strong></p>
          <ol style={{ paddingLeft: 20, marginTop: 8, lineHeight: 1.8, color: '#4a6e74' }}>
            <li>Apply below (takes 5 min)</li>
            <li>We review within 24 hours</li>
            <li>Pay €300, get 12 months Pro free</li>
            <li>Start building with founder support</li>
          </ol>
        </div>

        <p className="limit">Only 3 spots available</p>

        {success ? (
          <p className="success-msg" style={{ marginTop: 40, fontSize: '1.1rem' }}>
            Thanks for applying! We'll review within 24 hours. ✓
          </p>
        ) : (
          <form className="founding-form" onSubmit={handleSubmit} noValidate>
            <input
              name="contact_name"
              type="text"
              placeholder="Contact Name *"
              value={form.contact_name}
              onChange={handleChange}
              required
            />
            <input
              name="property_name"
              type="text"
              placeholder="Property Name *"
              value={form.property_name}
              onChange={handleChange}
              required
            />
            <input
              name="property_website"
              type="url"
              placeholder="Property Website (optional)"
              value={form.property_website}
              onChange={handleChange}
            />
            <input
              name="whatsapp"
              type="tel"
              placeholder="Manager WhatsApp * (e.g. +34 600 000 000)"
              value={form.whatsapp}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Manager Email *"
              value={form.email}
              onChange={handleChange}
              required
            />

            <select
              name="staff_size"
              value={form.staff_size}
              onChange={handleChange}
              required
            >
              <option value="">Property Size (staff) *</option>
              <option value="3-8">3–8 staff</option>
              <option value="9-15">9–15 staff</option>
              <option value="16-20">16–20 staff</option>
              <option value="20+">20+ staff</option>
            </select>

            <select
              name="room_count"
              value={form.room_count}
              onChange={handleChange}
              required
            >
              <option value="">Number of Rooms *</option>
              <option value="2-4">2–4 rooms</option>
              <option value="5-9">5–9 rooms</option>
              <option value="10-15">10–15 rooms</option>
              <option value="16-20">16–20 rooms</option>
              <option value="20+">20+ rooms</option>
            </select>

            <div>
              <p style={{ marginBottom: 10, color: '#4a6e74', fontSize: '0.95rem' }}>
                Have operational manuals? *
              </p>
              <div style={{ display: 'flex', gap: 24 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#0d1f22' }}>
                  <input
                    type="radio"
                    name="has_manuals"
                    value="yes"
                    checked={form.has_manuals === 'yes'}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: '#0d1f22' }}>
                  <input
                    type="radio"
                    name="has_manuals"
                    value="no"
                    checked={form.has_manuals === 'no'}
                    onChange={handleChange}
                  />
                  No
                </label>
              </div>
            </div>

            <textarea
              name="message"
              placeholder="Message (optional) — tell us about your property and why you want to join"
              value={form.message}
              onChange={handleChange}
              rows={4}
            />

            {error && (
              <p style={{ color: '#EF4444', fontSize: '0.9rem', marginTop: -8 }}>{error}</p>
            )}

            <button type="submit" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Apply Now →'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default FoundingMember;
