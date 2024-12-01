import emailjs from '@emailjs/browser';

export async function sendNotificationEmail(email: string, notification: { title: string; description: string }) {
  try {
    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      {
        to_email: email,
        notification_title: notification.title,
        notification_description: notification.description,
      },
      'YOUR_PUBLIC_KEY'
    );
  } catch (error) {
    console.error('Failed to send notification email:', error);
    throw error;
  }
}