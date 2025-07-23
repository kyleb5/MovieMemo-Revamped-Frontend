"use client";
import { useAuth } from "../../hooks/useAuth";
import {useRouter} from "next/navigation"
import { useState } from "react";

export default function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Google sign-in failed");
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="button"
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}