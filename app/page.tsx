"use client";
import { useAuth } from "../hooks/useAuth";
import GoogleSignInButton from "../components/Auth/GoogleSignInButton";
import SignupForm from "../components/Auth/SignupForm";
import ResetPasswordForm from "../components/Auth/ResetPasswordForm";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { user, signOutUser, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
   <div className="">
    <main className="">

        {!user ? (
          <div className="flex flex-col gap-8 items-center">
            <SignupForm />
            <ResetPasswordForm />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p>Welcome, {user.displayName || user.email}</p>
            {user.photoURL && (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
            )}
            {!user.emailVerified && (
              <p className="text-yellow-600">
                Please verify your email to unlock all features.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}