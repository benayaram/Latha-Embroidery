import React from 'react';
import { type Notification } from '../types';
import database from '../data/database.json';
import toast from 'react-hot-toast';

export function useNotifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>(database.notifications);
  const [unreadCount, setUnreadCount] = React.useState(0);

  React.useEffect(() => {
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
    const unread = notifications.filter(n => !readNotifications.includes(n.id)).length;
    setUnreadCount(unread);

    // Show toast for unread notifications
    if (unread > 0) {
      toast(`You have ${unread} unread notification${unread === 1 ? '' : 's'}`, {
        icon: '🔔',
      });
    }
  }, [notifications]);

  const markAsRead = (notificationId: string) => {
    const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
    if (!readNotifications.includes(notificationId)) {
      readNotifications.push(notificationId);
      localStorage.setItem('readNotifications', JSON.stringify(readNotifications));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  return {
    notifications,
    unreadCount,
    markAsRead,
  };
}