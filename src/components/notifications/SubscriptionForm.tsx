import React from 'react';
import { useEmailSubscription } from '../../hooks/useEmailSubscription';

export function SubscriptionForm() {
  const { subscribe, loading } = useEmailSubscription();
  const [email, setEmail] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribe(email);
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Subscribe to Notifications
      </h2>
      <p className="text-gray-600 mb-4">
        Get updates about new designs and special offers!
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}