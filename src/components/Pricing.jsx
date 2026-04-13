import { Check } from 'lucide-react';

const scrollToFounder = () => {
  document.getElementById('founding-member')?.scrollIntoView({ behavior: 'smooth' });
};

export function Pricing({ onWaitlist }) {
  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>Choose Your Plan</h2>
          <p className="text-gray-600 text-lg">
            Start free. Upgrade when you're ready. Or partner with us from day one.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">

          {/* LEFT: FREE */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-2">FREE</h3>
            <p className="text-gray-600 mb-6">Start managing smarter</p>

            <p className="text-3xl font-bold mb-2">€0<span className="text-lg text-gray-600">/month</span></p>
            <p className="text-sm text-gray-500 mb-6">No credit card. No time limit. Try everything for up to 20 beds.</p>

            <ul className="space-y-3 mb-8">
              {[
                'Guest App (core)',
                'Staff App (core)',
                'Up to 5 team members',
                'Email support',
              ].map(f => (
                <li key={f} className="flex gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onWaitlist('Free')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Get started free →
            </button>
          </div>

          {/* CENTER: PRO (elevated) */}
          <div className="bg-white rounded-xl p-8 border-2 border-blue-500 shadow-xl relative -mt-4 md:-mt-6">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-5 py-1 rounded-full text-sm font-bold tracking-wide">
              PRO
            </div>

            <h3 className="text-2xl font-bold mb-1">PRO</h3>
            <p className="text-gray-600 mb-5">Everything you need to scale + automate</p>

            <p className="text-3xl font-bold mb-1">6 months × €99<span className="text-lg text-gray-600">/mo</span></p>
            <p className="text-sm text-gray-500 mb-2">You get 12 months.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-900 font-medium">Pay 6 months · Get 12 · Setup fee waived</p>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Everything in Free',
                'Unlimited team members',
                'Direct access to Jorge (Founder)',
                'Monthly 1:1 strategy calls',
                'Custom onboarding',
                'Beta testing rights',
                'Priority feature requests',
              ].map(f => (
                <li key={f} className="flex gap-3">
                  <Check size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={scrollToFounder}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg font-semibold transition-colors"
            >
              Claim your spot →
            </button>
          </div>

          {/* RIGHT: CUSTOM SOLUTIONS */}
          <div className="bg-slate-900 text-white rounded-lg p-8 border border-slate-700">
            <h3 className="text-2xl font-bold mb-2">CUSTOM SOLUTIONS</h3>
            <p className="text-blue-300 mb-4 text-sm font-medium">Want to explore operational consulting + custom integrations?</p>

            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              We offer on-site operational consulting for new projects or properties redesigning their concepts.
              Partner with us strategically—we help you optimize workflows, build SOPs, and integrate Hostack as your operational backbone.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Guest request system',
                'Staff shift checklists',
                'Incident reporting',
                'Owner real-time dashboard',
              ].map(f => (
                <li key={f} className="flex gap-3">
                  <Check size={20} className="text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-300">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-2xl font-bold mb-1">Free consultation</p>
            <p className="text-gray-400 text-sm mb-6">No commitment. Just a conversation.</p>

            <a
              href="https://calendly.com/jorgebtco/cobu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Book a call →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Pricing;
