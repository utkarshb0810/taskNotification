"use client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NotificationCard from "../../components/Notificationcard";
import { FaBell, FaPencilAlt, FaUsers } from "react-icons/fa";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [content, setContent] = useState("");
  const [selectedSection, setSelectedSection] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      fetchNotifications(storedUser._id);
      fetchUsers(storedUser._id);

      const interval = setInterval(() => {
        fetchNotifications(storedUser._id);
      }, 5000);

      return () => clearInterval(interval);
    } else {
      router.push("/login");
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
    const data = await res.json();
    setUsers(data);
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
    await fetchNotifications(user._id);
    toast.success("Post created and followers notified!");
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
    await fetchUsers(user._id);
    toast.success("Followed user successfully");
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

  if (!user)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-8">
          👋 Welcome, <span className="text-indigo-900">{user.username}</span>
        </h1>

        {/* Dashboard Menu Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => setSelectedSection("post")}
            className={`flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 transition p-6 rounded-lg shadow border border-blue-200 cursor-pointer ${
              selectedSection === "post" ? "border-blue-500" : ""
            }`}
          >
            <FaPencilAlt className="text-blue-500 text-4xl mb-3" />
            <h2 className="text-lg font-semibold text-blue-700">Create Post</h2>
          </button>

          <button
            onClick={() => setSelectedSection("notifications")}
            className={`flex flex-col items-center justify-center bg-yellow-50 hover:bg-yellow-100 transition p-6 rounded-lg shadow border border-yellow-200 cursor-pointer ${
              selectedSection === "notifications" ? "border-yellow-500" : ""
            }`}
          >
            <FaBell className="text-yellow-500 text-4xl mb-3" />
            <h2 className="text-lg font-semibold text-yellow-700">
              View Notifications
            </h2>
          </button>

          <button
            onClick={() => setSelectedSection("users")}
            className={`flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 transition p-6 rounded-lg shadow border border-green-200 cursor-pointer ${
              selectedSection === "users" ? "border-green-500" : ""
            }`}
          >
            <FaUsers className="text-green-500 text-4xl mb-3" />
            <h2 className="text-lg font-semibold text-green-700">
              Follow Users
            </h2>
          </button>
        </div>

        {/* Conditional Section Rendering */}
        {selectedSection === "post" && (
          <div className="mb-8 p-4 bg-white rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaPencilAlt className="inline mr-2 text-blue-500" /> Create a
              Post
            </h2>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts with the community..."
              rows="4"
            />
            <button
              onClick={createPost}
              className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md shadow-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1 transition-colors duration-150 text-sm"
            >
              Post
            </button>
          </div>
        )}

        {selectedSection === "notifications" && (
          <div className="mb-8 p-4 bg-white rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaBell className="inline mr-2 text-yellow-500" /> Your
              Notifications
            </h2>
            {notifications.length === 0 && (
              <p className="text-gray-600">No new notifications.</p>
            )}
            <ul className="space-y-3">
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif._id}
                  notification={notif}
                  onSeen={markSeen}
                />
              ))}
            </ul>
          </div>
        )}

        {selectedSection === "users" && (
          <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <FaUsers className="inline mr-2 text-green-500" /> Discover Users
            </h2>
            <ul className="space-y-3">
              {users
                .filter((u) => u._id !== user._id)
                .map((u) => {
                  const isFollowing = user.following?.includes(u._id);
                  return (
                    <li
                      key={u._id}
                      className="flex justify-between items-center p-3 border rounded-md bg-gray-50"
                    >
                      <span className="text-gray-700 font-medium">
                        {u.username}
                      </span>
                      {isFollowing ? (
                        <span className="text-green-600 font-semibold text-sm">
                          Following
                        </span>
                      ) : (
                        <button
                          onClick={() => follow(u._id)}
                          className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-colors duration-150"
                        >
                          Follow
                        </button>
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
