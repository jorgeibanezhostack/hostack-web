import { Check } from 'lucide-react';

const scrollToFounder = () => {
  document.getElementById('founder-form')?.scrollIntoView({ behavior: 'smooth' });
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

        <div className="grid md:grid-cols-3 gap-8">
          {/* FREE TIER */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h3 className="text-2xl font-bold mb-2">FREE</h3>
            <p className="text-gray-600 mb-6">Start managing smarter</p>

            <p className="text-3xl font-bold mb-6">€0<span className="text-lg text-gray-600">/month</span></p>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Guest App (core)</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Staff App (core)</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Up to 5 team members</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Email support</span>
              </li>
            </ul>

            <button
              onClick={() => onWaitlist('Free')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Join the Waiting List
            </button>
          </div>

          {/* PRO TIER (Highlighted) */}
          <div className="bg-white rounded-lg p-8 border-2 border-blue-500 shadow-lg relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              RECOMMENDED
            </div>

            <h3 className="text-2xl font-bold mb-2">PRO ✨</h3>
            <p className="text-gray-600 mb-6">Everything you need to scale + automate</p>

            <p className="text-3xl font-bold mb-2">€99<span className="text-lg text-gray-600">/month</span></p>
            <p className="text-sm text-gray-600 mb-6">+ €300 activation fee (one-time)</p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900"><strong>Special offer:</strong> Pay 6 months → Get 12 months + free activation</p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>All Free features</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Unlimited team members</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>CRM integration</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Task automation</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Advanced reporting</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-600 flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>

            <button
              onClick={() => onWaitlist('Pro')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors mb-3"
            >
              Join the Waiting List
            </button>
            <button
              onClick={scrollToFounder}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold transition-colors"
            >
              Apply to Founder Program →
            </button>
          </div>

          {/* FOUNDER MEMBER */}
          <div className="bg-slate-900 text-white rounded-lg p-8 border border-blue-500">
            <h3 className="text-2xl font-bold mb-2">FOUNDER MEMBER</h3>
            <p className="text-blue-300 mb-6">Partner with us. Shape the future.</p>

            <p className="text-3xl font-bold mb-2">€300</p>
            <p className="text-sm text-gray-300 mb-6">one-time activation fee + 12 months Pro</p>

            <div className="bg-blue-900 rounded-lg p-3 mb-6">
              <p className="text-xs text-blue-200"><strong>Only 3 spots available</strong></p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex gap-3">
                <Check size={20} className="text-green-400 flex-shrink-0" />
                <span>Everything Pro includes</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-400 flex-shrink-0" />
                <span>Direct access to Jorge</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-400 flex-shrink-0" />
                <span>Monthly 1:1 strategy calls</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-400 flex-shrink-0" />
                <span>Custom onboarding</span>
              </li>
              <li className="flex gap-3">
                <Check size={20} className="text-green-400 flex-shrink-0" />
                <span>Beta testing rights</span>
              </li>
            </ul>

            <p className="text-sm text-gray-300 italic mb-6">
              "We're building this WITH our first partners, not FOR them."
            </p>

            <button
              onClick={scrollToFounder}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
