"use client";

import { useState } from "react";
import NotificationCard from "../../components/Notificationcard";

export default function NotificationsPage() {
  const [userId, setUserId] = useState("");
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`
    );
    const data = await res.json();
    setNotifications(data);
  };

  const handleSeen = async (notifId) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}/seen`,
      {
        method: "PUT",
      }
    );
    fetchNotifications();
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <input
        type="text"
        placeholder="Enter your user ID"
        className="p-2 border w-full mb-4"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button
        onClick={fetchNotifications}
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Get Notifications
      </button>

      {notifications.map((n) => (
        <NotificationCard key={n._id} notification={n} onSeen={handleSeen} />
      ))}
    </div>
  );
}
