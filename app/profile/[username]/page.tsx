"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useParams } from "next/navigation";
import GravatarProfileIcon from "@/components/GravatarProfileIcon";
import Link from "next/link";
import { getUserByUsername, userUsernameExists } from "@/hooks/userData";
import Image from "next/image";

export default function ProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const { publicUser } = useAuth();
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



  return (
    <main>
      <div>
        <p>Welcome, {profile.username || profile.email}</p>
        {profile.profile_picture ? (
          <Image
            src={profile.profile_picture}
            alt="Profile"
            width={124}
            height={124}
            className="rounded-full border-2 border-blue-500 cursor-pointer object-cover"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <p>Failed to load image</p>
        )}
        {/* Show Edit Profile button if router username matches profile.username */}
        {username === publicUser?.username && (
          <div>
            <Link href="/dashboard/settings" passHref>
              <button
                type="button"
                className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Edit Profile
              </button>
            </Link>
            <h1>{username} is router
              {publicUser?.username} is your username
            </h1>
          </div>
        )}
      </div>
    </main>
  );
}