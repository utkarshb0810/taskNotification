"use client";

export default function UserList({ users, onFollow }) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user._id}
          className="flex justify-between items-center p-2 border rounded"
        >
          <span>{user.username}</span>
          <button
            onClick={() => onFollow(user._id)}
            className="bg-green-500 text-white px-3 py-1 rounded"
          >
            Follow
          </button>
        </li>
      ))}
    </ul>
  );
}
