import React from 'react';
import NotificationItem from './NotificationItem';

export default function NotificationList({ notifications, onMarkAsRead, onDelete }) {
  return (
    <div>
      {notifications.map(notification => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onMarkAsRead={() => onMarkAsRead(notification.id)}
          onDelete={() => onDelete(notification.id)}
        />
      ))}
    </div>
  );
}
