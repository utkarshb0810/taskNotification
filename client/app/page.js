"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaBell,
  FaPencilAlt,
  FaUserFriends,
} from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-indigo-700 tracking-tight drop-shadow-md mb-6">
          <span className="inline-block animate-bounce mr-3 text-purple-400">
            🔔
          </span>
          <span className="text-indigo-800">Insyd</span>{" "}
          <span className="text-gray-600 font-normal">Notifications</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
          A simplified notification system built for the architecture
          community to post updates, follow members, and stay informed.
        </p>
      </div>

      {/* What You Can Do Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full px-6 mb-12">
        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
          <FaPencilAlt className="text-indigo-600 text-3xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-1 text-indigo-700">
            Post Updates
          </h3>
          <p className="text-sm text-gray-600">
            Share announcements or news with your followers instantly.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
          <FaBell className="text-yellow-500 text-3xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-1 text-yellow-700">
            Get Notifications
          </h3>
          <p className="text-sm text-gray-600">
            Receive alerts whenever someone you follow posts something new.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
          <FaUserFriends className="text-green-600 text-3xl mx-auto mb-2" />
          <h3 className="text-xl font-semibold mb-1 text-green-700">
            Follow Users
          </h3>
          <p className="text-sm text-gray-600">
            Build your network by following fellow members in your domain.
          </p>
        </div>
      </div>

      {/* Go to Dashboard Button */}
      {currentUser && (
        <div className="mt-4 p-6 bg-white rounded-xl shadow-lg flex flex-col items-center space-y-4">
          <p className="text-xl font-semibold text-gray-800">
            👋 Welcome,{" "}
            <span className="text-indigo-700">{currentUser.username}</span>!
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-md flex items-center gap-2 shadow-md transition duration-200"
          >
            <FaTachometerAlt />
            Go to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
