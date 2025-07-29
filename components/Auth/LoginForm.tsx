"use client";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleSignInButton from "./GoogleSignInButton";

export default function LoginForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      setEmail("");
      setPassword("");
      router.push("/");
    } catch (err: any) {
      setError("Incorrect email or password.");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="mx-auto mt-16 max-w-sm rounded-xl shadow-lg bg-white dark:bg-neutral-900 p-8 flex flex-col gap-6 border border-neutral-200 dark:border-neutral-800"
    >
      <h2 className="text-2xl font-semibold text-center text-neutral-900 dark:text-white mb-2">
        Login
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <div className="flex gap-3 items-center">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 cursor-pointer active:scale-95 focus:scale-95"
        >
          Login
        </button>
        <GoogleSignInButton />
      </div>
      {error && (
        <p className="text-red-500 text-center text-sm">{error}</p>
      )}
      <div className="flex flex-col gap-2 mt-2">
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="w-full text-blue-600 hover:underline text-sm transition-all duration-200 cursor-pointer active:scale-95 focus:scale-95"
        >
          Don't Have an Account?
        </button>
        <button
          type="button"
          onClick={() => router.push("/forgot-password")}
          className="w-full text-blue-600 hover:underline text-sm transition-all duration-200 cursor-pointer active:scale-95 focus:scale-95"
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
}