import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.SUPABASE_URL || 'https://hmxkofsuukxbgfwuknhy.supabase.co',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhteGtvZnN1dWt4YmdmdXVrbmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMDc3MjksImV4cCI6MjA1ODU4MzcyOX0.38NiGPpLqHHOFg6QSd11gTnc5lIJjBBrMVGO9KAoJOo'
);

export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const {
        contactName,
        email,
        propertyName,
        propertyType,
        beds,
        country,
        currentTools,
        biggestChallenge,
        howHeard,
    } = req.body || {};

    if (!email || !contactName || !propertyName || !beds || !country) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const { error } = await supabase.from('founder_applications').insert({
        contact_name: contactName,
        email,
        property_name: propertyName,
        property_type: propertyType || 'hostel',
        beds,
        country,
        current_tools: currentTools || null,
        biggest_challenge: biggestChallenge || null,
        how_heard: howHeard || null,
    });

    if (error) {
        console.error('Supabase insert error:', error);
        return res.status(500).json({ error: 'Failed to save application' });
    }

    return res.status(200).json({ success: true });
}
