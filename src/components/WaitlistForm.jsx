import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../lib/supabase';

const schema = z.object({
  email: z.string().email('Invalid email'),
  property_name: z.string().min(2, 'Property name required'),
  manager_name: z.string().min(2, 'Manager name required'),
  tier_interest: z.enum(['free', 'pro', 'not_sure'], {
    errorMap: () => ({ message: 'Please select a tier' }),
  }),
});

export function WaitlistForm({ isOpen, onClose, defaultTier }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { tier_interest: defaultTier === 'Pro' ? 'pro' : defaultTier === 'Free' ? 'free' : undefined },
  });

  const onSubmit = async (data) => {
    try {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([data]);

      if (error) throw error;

      alert("You're in! We'll email you when your tier opens up.");
      reset();
      onClose();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
        <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          Join the Waitlist
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <div>
            <input
              type="email"
              placeholder="Your email *"
              {...register('email')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Property name *"
              {...register('property_name')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {errors.property_name && <p className="text-red-600 text-sm mt-1">{errors.property_name.message}</p>}
          </div>

          <div>
            <input
              type="text"
              placeholder="Your name *"
              {...register('manager_name')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            {errors.manager_name && <p className="text-red-600 text-sm mt-1">{errors.manager_name.message}</p>}
          </div>

          <div>
            <select
              {...register('tier_interest')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-700"
            >
              <option value="">Which tier interests you? *</option>
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="not_sure">Not sure yet</option>
            </select>
            {errors.tier_interest && <p className="text-red-600 text-sm mt-1">{errors.tier_interest.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-lg font-semibold transition-colors"
          >
            {isSubmitting ? 'Submitting…' : 'Join the Waitlist'}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full mt-4 text-gray-600 hover:text-gray-900 transition-colors text-sm"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WaitlistForm;
