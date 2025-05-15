"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    localStorage.setItem("currentUser", JSON.stringify(data));
    router.push("/dashboard");
  };

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) router.push("/dashboard");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-blue-500">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <div className="flex justify-center mb-6">
          <FaUserCircle className="text-indigo-500 text-5xl" />
        </div>
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Welcome to Insyd
        </h1>
        <input
          type="text"
          placeholder="Enter your username"
          className="w-full p-3 border rounded-md mb-6 text-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="cursor-pointer w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-md font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
}
