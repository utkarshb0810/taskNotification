"use client";

import { useEffect, useState } from "react";
import NotificationCard from "../../components/Notificationcard";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      fetchNotifications(storedUser._id);
      fetchUsers(storedUser._id);
    }
  }, []);

  const fetchNotifications = async (userId) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/${userId}`
    );
    const data = await res.json();
    setNotifications(data);
  };

  
  const fetchUsers = async (userId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    console.log(res)
    const data = await res.json();
    console.log(data)
    setUsers(data);

    // Get the latest version of the current user
    const updatedUser = data.find((u) => u._id === userId);
    setUser(updatedUser);
  };

  const createPost = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, content }),
    });

    setContent("");

    // Refresh notifications
    await fetchNotifications(user._id);

    alert("Post created and followers notified!");
  };


  const follow = async (followeeId) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${followeeId}/follow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId: user._id }),
      }
    );
    alert("Followed user successfully");
    await fetchUsers(user._id); // Refresh following list
  };

  const markSeen = async (notifId) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/${notifId}/seen`,
      {
        method: "PUT",
      }
    );
    fetchNotifications(user._id);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.username}</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">📝 Create a Post</h2>
        <textarea
          className="w-full border p-2 mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
        />
        <button
          onClick={createPost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">🔔 Your Notifications</h2>
        {notifications.length === 0 && <p>No notifications yet.</p>}
        {notifications.map((notif) => (
          <NotificationCard
            key={notif._id}
            notification={notif}
            onSeen={markSeen}
          />
        ))}
      </div>
      {/* {console.log(users)} */}
      <div>
        <h2 className="font-semibold mb-2">👥 All Users</h2>
        <ul className="space-y-2">
          {users
            .filter((u) => u._id !== user._id)
            .map((u) => {
              const isFollowing = user.following?.includes(u._id);

              return (
                <li
                  key={u._id}
                  className="flex justify-between items-center p-2 border rounded"
                >
                  <span>{u.username}</span>
                  {isFollowing ? (
                    <span className="text-green-600 font-semibold">
                      Following
                    </span>
                  ) : (
                    <button
                      onClick={() => follow(u._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Follow
                    </button>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
