"use client";
import { useAuth } from "../../hooks/useAuth";
import { createUser } from "../../hooks/userData"; // Import your API function
import { useState } from "react";

export default function SignupForm() {
  const { signUp, sendVerification, signOutUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username field
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      // 1. Create Firebase Auth user
      const userCredential = await signUp(email, password);
      
      // 2. Create user profile in your API
      const apiResult = await createUser({
        email: email,
        username: username,
        uid: userCredential.user.uid,
      });
      
      if (!apiResult.success) {
        throw new Error(apiResult.message || "Failed to create user profile");
      }
      
      // 3. Send email verification
      await sendVerification(userCredential.user);
      
      // 4. Sign out user so they must log in manually
      await signOutUser();
      
      setSuccess("Account created! Please check your email to verify your account, then log in.");
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSignup} className="bg-white dark:bg-black text-black dark:text-white">
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit">Create Account</button>
      {error && <p>{error}</p>}
      {success && <p>{success}</p>}
    </form>
  );
}