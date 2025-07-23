import { useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";

// Custom React hook to manage Firebase authentication
export function useAuth() {
  // State to hold the current authenticated user (null if not logged in)
  const [user, setUser] = useState<User | null>(null);
  // State to indicate if the auth state is still loading (useful for SSR or initial load)
  const [loading, setLoading] = useState(true);

  // Effect to subscribe to Firebase auth state changes (login/logout)
  useEffect(() => {
    // Listen for changes in authentication state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Set the user (or null if logged out)
      setLoading(false);     // Set loading to false once we know the state
    });
    // Cleanup the listener on unmount
    return unsubscribe;
  }, []);

  // Sign in with Google popup
  const signInWithGoogle = () => signInWithPopup(auth, provider);

  // Sign out the current user
  const signOutUser = () => signOut(auth);

  // Create a new user with email and password
  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Send a verification email to the current user
  const sendVerification = (user: User) => sendEmailVerification(user);

  // Sign in with email and password
  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);

  // Send a password reset email to the given email address
  const sendPasswordReset = (email: string) =>
    sendPasswordResetEmail(auth, email);

  // Return all state and auth actions for use in components
  return {
    user,                // The current user object (or null)
    loading,             // Whether the auth state is still loading
    signInWithGoogle,    // Function to sign in with Google
    signOutUser,         // Function to sign out
    signUp,              // Function to sign up with email/password
    sendVerification,    // Function to send email verification
    signIn,              // Function to sign in with email/password
    sendPasswordReset,   // Function to send password reset
  };
}