'use client'

import React from 'react';
import { useNotification } from './NotificationContext';
import { NotificationType } from '@/types/notifications';
export function Notifications() {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-80">
      {notifications.map(notification => (
        <div 
          key={notification.id} 
          className={`shadow-lg rounded-lg p-4 flex justify-between items-center ${getNotificationClasses(notification.type)}`}
        >
          <p className="text-white font-medium">{notification.message}</p>
          <button 
            onClick={() => removeNotification(notification.id)}
            className="text-white opacity-70 hover:opacity-100 transition-opacity focus:outline-none"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

function getNotificationClasses(type: NotificationType): string {
  switch (type) {
    case NotificationType.Success:
      return 'bg-green-500 text-white';
    case NotificationType.Error:
      return 'bg-red-500 text-white';
    case NotificationType.Warning:
      return 'bg-yellow-500 text-white';
    case NotificationType.Info:
      return 'bg-accent text-white';
    default:
      return 'bg-accent text-white';
  }
} 