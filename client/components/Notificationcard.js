"use client";

export default function NotificationCard({ notification, onSeen }) {
  return (
    <div
      className={`p-3 border rounded mb-2 ${
        notification.seen ? "bg-gray-200" : "bg-yellow-100"
      }`}
    >
      <p>{notification.message}</p>
      {!notification.seen && (
        <button
          className="mt-2 text-sm text-blue-600 underline"
          onClick={() => onSeen(notification._id)}
        >
          Mark as seen
        </button>
      )}
    </div>
  );
}
