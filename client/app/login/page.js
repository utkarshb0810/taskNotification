"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Sign In / Sign Up
        </h1>
        <input
          type="text"
          placeholder="Enter username"
          className="w-full p-2 border mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
