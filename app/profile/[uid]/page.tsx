"use client";
import { useAuth } from "@/hooks/useAuth";
import GravatarProfileIcon from "@/components/GravatarProfileIcon";

export default function ProfilePage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="">
      {!user ? (
        <div className="flex flex-col gap-8">
          Welcome
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <p>Welcome, {user.displayName || user.email}</p>
          <GravatarProfileIcon
            email={user.email ?? undefined}
            photoURL={user.photoURL ?? undefined}
            size={64}
          />
          {!user.emailVerified && (
            <p className="text-yellow-600">
              Please verify your email to unlock all features.
            </p>
          )}
        </div>
      )}
    </main>
  );
}