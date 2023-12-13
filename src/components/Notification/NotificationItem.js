import React from 'react';

export default function NotificationItem({ notification, onMarkAsRead, onDelete }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <div style={{ flex: 1 }}>
        {notification.message}
      </div>
      <button onClick={onMarkAsRead} disabled={notification.isRead}>
        읽음
      </button>
      <button onClick={onDelete}>
        삭제
      </button>
    </div>
  );
}
