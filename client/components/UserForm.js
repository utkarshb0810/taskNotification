"use client";

import { useState } from "react";

export default function UserForm({ onCreate }) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();
    onCreate(data);
    setUsername("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
        className="p-2 border rounded w-full"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  );
}
