"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setUser(storedUser);
    setMounted(true);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <nav className="bg-indigo-900 text-white shadow-md py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold flex items-center">
          <span className="mr-2 text-indigo-300">🔔</span>
          <span className="text-indigo-200">Insyd</span>
        </Link>

        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-indigo-200 text-sm font-medium">
              Welcome,{" "}
              <span className="font-semibold text-white">{user.username}</span>
            </span>
            <button
              onClick={() => {
                localStorage.removeItem("currentUser");
                setUser(null);
                router.push("/");
              }}
              className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition-colors duration-150"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition-colors duration-150"
          >
            Log In / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}
