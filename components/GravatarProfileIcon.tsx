import md5 from "blueimp-md5";

interface GravatarProfileIconProps {
  email?: string;
  photoURL?: string;
  size?: number;
}

export default function GravatarProfileIcon({
  email,
  photoURL,
  size = 32,
}: GravatarProfileIconProps) {
  // Get Gravatar URL from email
  const getGravatarUrl = (email: string) =>
    `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=identicon`;

  // Choose image source: photoURL > gravatar > default
  const src =

    (email ? getGravatarUrl(email) : "/default-profile.png");

  return (
    <img
      src={src}
      alt="Profile"
      className={`rounded-full border-2 border-blue-500 cursor-pointer`}
      style={{ width: size, height: size }}
    />
  );
}