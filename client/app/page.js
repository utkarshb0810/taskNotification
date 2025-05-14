"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTachometerAlt, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  const handleDashboard = () => {
    router.push("/dashboard");
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tl from-pink-200 to-purple-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-indigo-800 tracking-tight drop-shadow-md">
          <span className="inline-block animate-pulse mr-3 text-purple-500">
            ✨
          </span>
          <span className="text-pink-600">Notification</span>{" "}
          <span className="text-blue-600">System</span>
        </h1>
        <p className="mt-3 text-lg text-gray-700 max-w-xl mx-auto">
          Simple dashboard to create posts, follow users, and view notifications
          — all personalized.
        </p>
      </div>

      {currentUser ? (
        <>
          <p className="text-xl font-semibold text-gray-800 mb-4">
            👋 Welcome,{" "}
            <span className="text-indigo-700">{currentUser.username}</span>
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleDashboard}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow"
            >
              <FaTachometerAlt />
              Go to Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white px-6 py-4 rounded-xl shadow-lg text-lg flex items-center gap-3"
        >
          <FaSignInAlt />
          Login / Sign Up
        </button>
      )}
    </div>
  );
}
