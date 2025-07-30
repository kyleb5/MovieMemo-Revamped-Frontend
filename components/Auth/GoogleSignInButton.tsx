"use client";
import { useAuth } from "../../hooks/useAuth";
import { createUser, userExists } from "../../hooks/userData";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Function to generate random username like X/Reddit
const generateRandomUsername = () => {
  const adjectives = [
    'Swift', 'Clever', 'Bright', 'Cool', 'Epic', 'Wise', 'Bold', 'Quick', 
    'Sharp', 'Smart', 'Fast', 'Wild', 'Brave', 'Calm', 'Pure', 'Free'
  ];
  
  const nouns = [
    'Eagle', 'Wolf', 'Tiger', 'Falcon', 'Lion', 'Shark', 'Fox', 'Bear',
    'Hawk', 'Deer', 'Owl', 'Lynx', 'Raven', 'Viper', 'Phoenix', 'Dragon'
  ];
  
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 999) + 1;
  
  return `${adjective}${noun}-${number}`;
};

export default function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleSignIn = async () => {
  setError(null);
  setIsLoading(true);
  try {
    const result = await signInWithGoogle();
    const user = result.user;

    // Check if user already exists in  API
    const exists = await userExists(user.uid);
    console.log("userExists response:", exists);

    if (!exists) {
      // Create new user profile with random username
      const randomUsername = generateRandomUsername();
      const apiResult = await createUser({
        email: user.email!,
        username: randomUsername,
        uid: user.uid,
      });
      console.log("createUser response:", apiResult);

      if (!apiResult.success) {
        console.error("Failed to create user profile:", apiResult.message);
      }
    }

    router.push("/");
  } catch (err: any) {
    setError(err.message || "Google sign-in failed");
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-200 font-medium py-2 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-neutral-700 transition mb-2 pl-4 pr-6 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <img src="/google-logo.png" alt="Google" className="w-5 h-5" />
        <span className="ml-2">
          {isLoading ? "Creating account..." : "Sign in with Google"}
        </span>
      </button>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}