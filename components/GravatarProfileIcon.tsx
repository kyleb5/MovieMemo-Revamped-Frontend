import md5 from "blueimp-md5";

interface GravatarProfileIconProps {
  email?: string;
  size?: number;
}

/*
Usage example:
<GravatarProfileIcon
  email={user.email ?? undefined}
  size={64}
/>
*/

export default function GravatarProfileIcon({
  email,
  size = 32,
}: GravatarProfileIconProps) {
  // Generate a Gravatar URL from the email.
  // If the email is not registered with Gravatar, it returns a unique identicon.
  const getGravatarUrl = (email: string) =>
    `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=identicon`;

  // Always use Gravatar based on the email (or empty string if no email)
  const src = email ? getGravatarUrl(email) : "";

  return (
    <img
      src={src}
      alt="Profile"
      className="rounded-full border-2 border-blue-500 cursor-pointer"
      style={{ width: size, height: size }}
    />
  );
}