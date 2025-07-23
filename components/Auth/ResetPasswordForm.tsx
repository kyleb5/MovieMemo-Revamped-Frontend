"use client";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";

export default function ResetPasswordForm() {
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await sendPasswordReset(email);
      setMessage("Password reset email sent! Please check your inbox.");
      setEmail("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleReset} className="flex flex-col gap-2 w-72">
      <h2 className="font-bold text-lg">Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="border px-2 py-1 rounded"
      />
      <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded mt-2">
        Send Reset Email
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-600">{message}</p>}
    </form>
  );
}