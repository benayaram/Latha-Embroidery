import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function useEmailSubscription() {
  const [loading, setLoading] = useState(false);

  const subscribe = async (email: string) => {
    setLoading(true);
    try {
      // Send email to admin about new subscription
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          to_email: 'admin@embroiderystore.com',
          subscriber_email: email,
          message: `New subscription request from ${email}`,
        },
        'YOUR_PUBLIC_KEY'
      );

      // Store subscriber in localStorage
      const subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
      subscribers.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subscribers));

      // Show success message
      alert('Successfully subscribed to notifications!');
    } catch (error) {
      console.error('Subscription failed:', error);
      alert('Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribe,
    loading,
  };
}