'use client';

import { useState } from 'react';
import { changeUsername } from "@/hooks/userData";
import { useAuth } from "@/hooks/useAuth";

interface UsernameChangeSectionProps {
  dbUser: any;
  onUserUpdate: (user: any) => void;
}

export default function UsernameChangeSection({ dbUser, onUserUpdate }: UsernameChangeSectionProps) {
  const { user, setPublicUser } = useAuth();
  const [usernameInput, setUsernameInput] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [usernameSuccess, setUsernameSuccess] = useState("");
  const [usernameRestriction, setUsernameRestriction] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const handleUsernameChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user?.uid || !usernameInput.trim()) return;
    setUsernameLoading(true);
    setUsernameError("");
    setUsernameSuccess("");
    setUsernameRestriction(null);
    try {
      const result = await changeUsername(user.uid, usernameInput.trim());
      if (result.success) {
        setUsernameSuccess(result.message || "Username changed successfully!");
        setUsernameInput("");
        onUserUpdate(result.user);
        setPublicUser(result.user); // Update global context so Navbar refreshes
      } else {
        setUsernameError(result.error || "Failed to change username.");
        if (result.remaining) {
          setUsernameRestriction(result.remaining);
        }
      }
    } catch (err) {
      setUsernameError("An unexpected error occurred. Please try again.");
    } finally {
      setUsernameLoading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Username
      </label>
      <div className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 flex items-center gap-2">
        {dbUser?.username || 'Not set'}
      </div>
      
      {/* Username Change Form */}
      <form className="mt-2 flex gap-2" onSubmit={handleUsernameChange}>
        <input
          type="text"
          value={usernameInput}
          onChange={e => setUsernameInput(e.target.value)}
          placeholder="New username"
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          disabled={usernameLoading}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          disabled={usernameLoading || !usernameInput.trim()}
        >
          {usernameLoading ? "Changing..." : "Change Username"}
        </button>
      </form>
      
      {/* Success Message */}
      {usernameSuccess && (
        <div className="mt-2 p-2 bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-800 text-green-800 dark:text-green-300 rounded">
          {usernameSuccess}
        </div>
      )}
      
      {/* Error Message */}
      {usernameError && (
        <div className="mt-2 p-2 bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 rounded">
          {usernameError}
          {usernameRestriction && (
            <div className="mt-1 text-xs text-gray-700 dark:text-gray-300">
              You can change your username again in: {usernameRestriction.days}d {usernameRestriction.hours}h {usernameRestriction.minutes}m {usernameRestriction.seconds}s
            </div>
          )}
        </div>
      )}
    </div>
  );
}
