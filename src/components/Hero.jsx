import { ChevronDown } from 'lucide-react';

export function Hero() {
  const scroll = () => {
    document.getElementById('founding-member')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 pt-32 pb-24 px-4">
      {/* Subtle accent shape */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 opacity-5 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Reclaim 70% of Your Time.<br />Build the Community You Love.
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Hostack is the operating system built for hostel and coliving managers.
          <br /><br />
          You manage guests, staff, and experiences. We manage the busywork—so you don't.
          <br /><br />
          One platform. Three connected apps:
          <br />
          • <strong>Guest App:</strong> Self check-in, activity booking, service requests, community feed
          <br />
          • <strong>Staff App:</strong> Task automation, real-time communication, schedule visibility
          <br />
          • <strong>Owner Dashboard:</strong> Central control, team management, training, reporting, event calendars
          <br /><br />
          No WhatsApp chaos. No paper checklists. No OTA integration nightmares. Just clarity, speed, and time back in your day.
          <br /><br />
          Built for humans. Built for community. Built for managers like you.
        </p>

        <button
          onClick={scroll}
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center gap-2"
        >
          Join the Founder Member program →
          <ChevronDown size={20} />
        </button>
      </div>
    </section>
  );
}

export default Hero;
