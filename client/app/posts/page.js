"use client";

import { useState } from "react";

export default function PostsPage() {
  const [userId, setUserId] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!userId || !content) return;

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, content }),
    });

    alert("Post created and followers notified!");
    setUserId("");
    setContent("");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Post</h1>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Your User ID"
        className="p-2 border w-full mb-2"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Post content..."
        className="p-2 border w-full mb-2"
      />
      <button
        onClick={handlePost}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Post
      </button>
    </div>
  );
}
