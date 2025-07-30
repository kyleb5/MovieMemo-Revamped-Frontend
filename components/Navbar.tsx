"use client"; // Ensures this component is rendered on the client side (required for hooks like useTheme)

import Link from "next/link"; // For navigation links
import { use, useEffect, useState } from "react"; // React hooks
import { useTheme } from "next-themes"; // Theme switching (light/dark)
import { useAuth } from "../hooks/useAuth"; // Custom authentication hook
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Icons for theme toggle
import GravatarProfileIcon from "./GravatarProfileIcon";

export default function Navbar() {
  // Get user info and sign out function from custom auth hook
  const { user, customUser, signOutUser } = useAuth();

  // Get current theme and function to change it from next-themes
  const { theme, setTheme } = useTheme();

  // State to track if component has mounted (prevents hydration errors)
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts (runs only on client)
  useEffect(() => {
    setMounted(true);
  }, []);

  console.warn(customUser);

  

  return (
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
      <div className="text-xl font-bold">
        <Link
            href="/"
            className=""
          >
            MovieMemo
          </Link></div>
      <div className="flex items-center gap-2">
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded border bg-transparent hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-200" />
            )}
          </button>
        )}
                {user ? (
          <>
            {/* Profile icon, clickable to go to user's profile page */}
            <Link href={`/profile/${customUser?.username}`}>
              <GravatarProfileIcon email={user.email ?? undefined} size={32} />
            </Link>
            <button
              onClick={signOutUser}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}