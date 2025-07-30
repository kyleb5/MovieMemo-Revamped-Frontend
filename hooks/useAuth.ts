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
import { getUserByUid } from "./userData"; // Function to fetch your backend user by Firebase UID

export function useAuth() {
  // State for the Firebase user object (from Firebase Auth)
  const [user, setUser] = useState<User | null>(null);
  // State for loading status (true while checking auth state)
  const [loading, setLoading] = useState(true);
  // State for your backend user object (custom user info, e.g. username)
  const [customUser, setCustomUser] = useState<any>(null);

  useEffect(() => {
    // Listen for Firebase Auth state changes (login/logout)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser); // Set the Firebase user
      setLoading(false);     // Done loading

      // If logged in, fetch your backend user info using the Firebase UID
      if (firebaseUser) {
        const backendUser = await getUserByUid(firebaseUser.uid);
        // Some APIs return { user: {...} }, some just {...}
        setCustomUser(backendUser?.user || backendUser);
      } else {
        setCustomUser(null); // Not logged in, clear custom user
      }
    });
    // Cleanup listener on unmount
    return unsubscribe;
  }, []);

  // Sign in with Google popup
  const signInWithGoogle = () => signInWithPopup(auth, provider);
  // Sign out the user
  const signOutUser = () => signOut(auth);
  // Sign up with email and password
  const signUp = (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password);
  // Send email verification to the user
  const sendVerification = (user: User) => sendEmailVerification(user);
  // Sign in with email and password
  const signIn = (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password);
  // Send password reset email
  const sendPasswordReset = (email: string) =>
    sendPasswordResetEmail(auth, email);

  // Return all useful values and functions from the hook
  return {
    user,                // Firebase user object (email, uid, etc.)
    customUser,          // Your backend user object (username, id, etc.)
    loading,             // Loading state for auth
    signInWithGoogle,    // Google sign-in function
    signOutUser,         // Sign out function
    signUp,              // Email/password sign up
    sendVerification,    // Send email verification
    signIn,              // Email/password sign in
    sendPasswordReset,   // Send password reset email
  };
}