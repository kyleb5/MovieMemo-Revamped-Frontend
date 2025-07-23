"use client";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export default function SignupForm() {
  const { signUp, sendVerification } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const userCredential = await signUp(email, password);
      await sendVerification(userCredential.user);
      setSuccess("Account created! Please check your email to verify your account.");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-2 w-72">
      <h2 className="font-bold text-lg">Sign Up</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded mt-2">
        Create Account
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
}