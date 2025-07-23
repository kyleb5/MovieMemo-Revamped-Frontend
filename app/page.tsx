"use client"; // Next.js directive for client-side rendering

import { auth, provider } from "../firebase"; // Import Firebase config
import {
  signInWithPopup,
  User,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"; // Import Firebase Auth methods
import { useState, useEffect } from "react"; // React hooks

export default function Home() {
  // State for the current user (null if not logged in)
  const [user, setUser] = useState<User | null>(null);

  // States for sign up form
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  // States for login form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // States for password reset form
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [resetError, setResetError] = useState("");

  // Listen for authentication state changes (login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Update user state when auth state changes
    });
    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  // Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Open Google sign-in popup
      setUser(result.user); // Set user state to the signed-in user
    } catch (error) {
      alert("Sign in failed"); // Show error if sign-in fails
    }
  };

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user
      setUser(null); // Clear user state
    } catch (error) {
      alert("Sign out failed"); // Show error if sign-out fails
    }
  };

  // Handle email/password sign up
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setSignupError(""); // Clear previous errors
    setSignupSuccess(""); // Clear previous success message
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupEmail,
        signupPassword
      );
      // Send email verification to the new user
      await sendEmailVerification(userCredential.user);
      setSignupSuccess("Account created! Please check your email to verify your account."); // Show success message
      setSignupEmail(""); // Clear email input
      setSignupPassword(""); // Clear password input
    } catch (error) {
      setSignupError(error.message); // Show error message
    }
  };

  // Handle email/password login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setLoginError(""); // Clear previous errors
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail(""); // Clear email input
      setLoginPassword(""); // Clear password input
    } catch (error) {
      setLoginError(error.message); // Show error message
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent form submission reload
    setResetMessage(""); // Clear previous messages
    setResetError(""); // Clear previous errors
    try {
      // Send password reset email
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent! Please check your inbox."); // Show success message
      setResetEmail(""); // Clear email input
    } catch (error) {
      setResetError(error.message); // Show error message
    }
  };

  console.warn(user); // Log user state for debugging

  return (
    // Main container with grid layout and padding
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* If user is not logged in, show auth forms */}
        {!user ? (
          <div className="flex flex-col gap-8 items-center">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Sign in with Google
            </button>

            {/* Email/Password Sign Up Form */}
            <form onSubmit={handleSignup} className="flex flex-col gap-2 w-72">
              <h2 className="font-bold text-lg">Sign Up</h2>
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded mt-2"
              >
                Create Account
              </button>
              {/* Show sign up error or success messages */}
              {signupError && <p className="text-red-500">{signupError}</p>}
              {signupSuccess && <p className="text-green-600">{signupSuccess}</p>}
            </form>

            {/* Email/Password Login Form */}
            <form onSubmit={handleLogin} className="flex flex-col gap-2 w-72">
              <h2 className="font-bold text-lg">Login</h2>
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <input
                type="password"
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
              >
                Login
              </button>
              {/* Show login error message */}
              {loginError && <p className="text-red-500">{loginError}</p>}
            </form>

            {/* Password Reset Form */}
            <form onSubmit={handleResetPassword} className="flex flex-col gap-2 w-72">
              <h2 className="font-bold text-lg">Reset Password</h2>
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                required
                className="border px-2 py-1 rounded"
              />
              <button
                type="submit"
                className="bg-yellow-600 text-white px-4 py-2 rounded mt-2"
              >
                Send Reset Email
              </button>
              {/* Show reset error or success messages */}
              {resetError && <p className="text-red-500">{resetError}</p>}
              {resetMessage && <p className="text-green-600">{resetMessage}</p>}
            </form>
          </div>
        ) : (
          // If user is logged in, show welcome and sign out
          <div className="flex flex-col items-center gap-4">
            <p>Welcome, {user.displayName || user.email}</p>
            {/* Show user profile photo if available */}
            {user.photoURL && (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
            )}
            {/* Show email verification warning if not verified */}
            {!user.emailVerified && (
              <p className="text-yellow-600">
                Please verify your email to unlock all features.
              </p>
            )}
            {/* Sign out button */}
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
        )}
      </main>
    </div>
  );
}