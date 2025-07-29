"use client";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
   <div>
    <main>
        {!user ? (
          <div>
            Welcome
          </div>
        ) : (
          <div>
            <p>Welcome, {user.displayName || user.email || "User"}</p>
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