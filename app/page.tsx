"use client";
import { useAuth } from "../hooks/useAuth";
import UserVerifcationCheck from "../components/Auth/UserVerifcationCheck"

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
   <div>
    <main>
        
      </main>
    </div>
  );
}