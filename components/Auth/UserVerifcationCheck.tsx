"use client";

import { useAuth } from "@/hooks/useAuth";

export default function UserVerifcationCheck() {
  const { user } = useAuth();

  // Don't show if no user or email is already verified
  if (!user || user.emailVerified) {
    return null;
  }

  return (
    <p className="text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 text-sm">
      Please verify your email to unlock all features.
    </p>
  );
}