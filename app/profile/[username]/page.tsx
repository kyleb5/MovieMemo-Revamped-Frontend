"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GravatarProfileIcon from "@/components/GravatarProfileIcon";
import { getUserByUsername, userUsernameExists } from "@/hooks/userData";

export default function ProfilePage() {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      setNotFound(false);

      // Check if username exists first
      const existsResult = await userUsernameExists(username as string);
      if (!existsResult?.exists) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      // Fetch user profile if username exists
      const userData = await getUserByUsername(username as string);
      setProfile(userData?.user || userData);
      setLoading(false);
    }
    fetchProfile();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (notFound) return <div>Profile not found</div>;


  console.warn(profile);

  return (
    <main>
      {!profile ? (
        <div>Profile not found</div>
      ) : (
        <div>
          <p>Welcome, {profile.username || profile.email}</p>
          <GravatarProfileIcon email={profile.email} size={64} />
        </div>
      )}
    </main>
  );
}