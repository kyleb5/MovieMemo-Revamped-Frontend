"use client";
import { useAuth } from "../../hooks/useAuth"; // Custom hook for authentication actions/state
import { useRouter } from "next/navigation";   // Next.js App Router navigation
import { useState } from "react";              // React state management

// LoginForm component handles user login with email and password
export default function LoginForm() {
  const router = useRouter(); // Used to redirect after successful login
  const { signIn } = useAuth(); // signIn function from custom auth hook
  const [email, setEmail] = useState(""); // State for email input
  const [password, setPassword] = useState(""); // State for password input
  const [error, setError] = useState(""); // State for error message

  // Handles form submission for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(""); // Clear any previous error
    try {
      await signIn(email, password); // Attempt to sign in with email/password
      setEmail(""); // Clear email input
      setPassword(""); // Clear password input
      router.push("/"); // Redirect to homepage on success
    } catch (err: any) {
      setError("Incorrect email or password."); // Show generic error on failure
    }
  };

  // Render the login form
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-2 w-72">
      <h2 className="font-bold text-lg">Login</h2>
      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      {/* Submit button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mt-2">
        Login
      </button>
      {/* Error message display */}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}