import { useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext"; // Import our global context
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
import { getUserByUid, userExists } from "./userData"; // Function to fetch your backend user by Firebase UID

export function useAuth() {
  // IMPORTANT: Instead of local state, we now use GLOBAL context state
  // This means all components using useAuth() share the same user data
  // When one component updates the user data, ALL components see the change
  const { user, setUser, loading, setLoading, publicUser, setPublicUser } = useAuthContext();

  useEffect(() => {
    // Listen for Firebase Auth state changes (login/logout)
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser); // Update GLOBAL Firebase user state
      setLoading(false);     // Update GLOBAL loading state

      // If logged in, fetch your backend user info using the Firebase UID
      if (firebaseUser) {
        // First check if user exists in backend
        const exists = await userExists(firebaseUser.uid);
        if (exists) {
          // Only fetch if user exists
          const backendUser = await getUserByUid(firebaseUser.uid);
          if (backendUser) {
            // Update GLOBAL backend user state - this will update Navbar automatically
            setPublicUser(backendUser?.user || backendUser);
          } else {
            setPublicUser(null);
          }
        }
      }
    });
    // Cleanup listener on unmount
    return unsubscribe;
  }, [setUser, setLoading, setPublicUser]); // Dependencies include the context setters

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
    publicUser,          // Your backend user object (username, id, etc.) - GLOBAL STATE
    loading,             // Loading state for auth - GLOBAL STATE
    signInWithGoogle,    // Google sign-in function
    signOutUser,         // Sign out function
    signUp,              // Email/password sign up
    sendVerification,    // Send email verification
    signIn,              // Email/password sign in
    sendPasswordReset,   // Send password reset email
    setPublicUser,       // CRITICAL: Expose this so components can update global user state
  };
}