import React from 'react';
import { X } from 'lucide-react';
import { type Notification } from '../../types';

interface NotificationModalProps {
  notification: Notification;
  onClose: () => void;
}

export function NotificationModal({ notification, onClose }: NotificationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-lg w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{notification.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <img
            src={notification.image}
            alt={notification.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          
          <p className="text-gray-600 mb-6">{notification.description}</p>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}