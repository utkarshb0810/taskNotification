"use client";

import { useEffect, useState } from "react";
import UserForm from "../../components/UserForm";
import UserList from "../../components/UserList";

export default function UsersPage() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
    const data = await res.json();
    setUsers(data);
  };

  const handleCreate = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
  };

  const handleFollow = async (followeeId) => {
    const followerId = prompt("Enter your user ID to follow this user:");
    if (!followerId) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${followeeId}/follow`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ followerId }),
      }
    );
    alert("Followed successfully!");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <UserForm onCreate={handleCreate} />
      <UserList users={users} onFollow={handleFollow} />
    </div>
  );
}
