import GoogleSignInButton from "@/components/Auth/GoogleSignInButton";
import LoginForm from "@/components/Auth/LoginForm";

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoginForm />
      <GoogleSignInButton />
    </div>
  );
}