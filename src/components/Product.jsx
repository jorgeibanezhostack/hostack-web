import { Users, CheckSquare, BarChart3 } from 'lucide-react';

export function Product() {
  return (
    <section id="product" className="py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Early Stage / Beta</span>
          <h2 className="text-4xl font-bold mt-2 mb-4" style={{ fontFamily: "'DM Sans', sans-serif" }}>The Product</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're building Hostack in public. Your feedback shapes what we build next.
          </p>
        </div>

        {/* Ecosystem Diagram */}
        <div className="mb-20 bg-slate-50 rounded-lg p-12 flex justify-center">
          <svg viewBox="0 0 1000 300" className="w-full max-w-4xl">
            {/* Owner Dashboard (Center) */}
            <rect x="350" y="50" width="300" height="200" fill="#0F172A" stroke="#3B82F6" strokeWidth="2" rx="8" />
            <text x="500" y="155" textAnchor="middle" fill="white" fontSize="20" fontWeight="bold" fontFamily="DM Sans, sans-serif">
              Owner Dashboard
            </text>

            {/* Guest App (Left) */}
            <rect x="50" y="100" width="200" height="100" fill="#E5E7EB" stroke="#3B82F6" strokeWidth="2" rx="8" />
            <text x="150" y="155" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="DM Sans, sans-serif">
              Guest App
            </text>

            {/* Staff App (Right) */}
            <rect x="750" y="100" width="200" height="100" fill="#E5E7EB" stroke="#3B82F6" strokeWidth="2" rx="8" />
            <text x="850" y="155" textAnchor="middle" fontSize="16" fontWeight="bold" fontFamily="DM Sans, sans-serif">
              Staff App
            </text>

            {/* Arrows */}
            <line x1="250" y1="150" x2="345" y2="150" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />
            <line x1="655" y1="150" x2="745" y2="150" stroke="#3B82F6" strokeWidth="2" markerEnd="url(#arrowhead)" />

            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                <polygon points="0 0, 10 3, 0 6" fill="#3B82F6" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Guest App Card */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Guest App</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Self check-in &amp; check-out (QR)</li>
              <li>✓ Activity discovery &amp; booking</li>
              <li>✓ Service requests</li>
              <li>✓ Community feed</li>
            </ul>
          </div>

          {/* Staff App Card */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <CheckSquare className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Staff App</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Auto-generated task list</li>
              <li>✓ Real-time communication</li>
              <li>✓ Shift visibility &amp; scheduling</li>
              <li>✓ Training materials</li>
            </ul>
          </div>

          {/* Owner Dashboard Card */}
          <div className="border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-4">Owner Dashboard</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✓ Central command center</li>
              <li>✓ Team management &amp; automation</li>
              <li>✓ Event calendar &amp; reporting</li>
              <li>✓ Real-time insights</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
