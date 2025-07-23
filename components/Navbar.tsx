"use client"; // Ensures this component is rendered on the client side (required for hooks like useTheme)

import Link from "next/link"; // For navigation links
import { useEffect, useState } from "react"; // React hooks
import { useTheme } from "next-themes"; // Theme switching (light/dark)
import { useAuth } from "../hooks/useAuth"; // Custom authentication hook
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Icons for theme toggle

export default function Navbar() {
  // Get user info and sign out function from custom auth hook
  const { user, signOutUser } = useAuth();

  // Get current theme and function to change it from next-themes
  const { theme, setTheme } = useTheme();

  // State to track if component has mounted (prevents hydration errors)
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after component mounts (runs only on client)
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    // Navbar container: flex layout, dark background, white text
    <nav className="w-full flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
      {/* App title/brand */}
      <div className="text-xl font-bold">MovieMemo</div>
      {/* Right side: theme toggle and auth buttons */}
      <div className="flex items-center gap-2">
        {/* Only render theme toggle after mount to avoid SSR mismatch */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")} // Toggle theme on click
            className="p-2 rounded border bg-transparent hover:bg-gray-800 transition"
            aria-label="Toggle theme"
          >
            {/* Show sun icon in dark mode, moon icon in light mode */}
            {theme === "dark" ? (
              <SunIcon className="h-6 w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="h-6 w-6 text-gray-200" />
            )}
          </button>
        )}
        {/* Show Sign Out if user is logged in, otherwise show Login link */}
        {user ? (
          <button
            onClick={signOutUser}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sign Out
          </button>
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