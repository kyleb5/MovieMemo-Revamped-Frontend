"use client";
import { useAuth } from "../hooks/useAuth";
import UserVerifcationCheck from "../components/Auth/UserVerifcationCheck"
import PopularMovies from "@/components/Movie/PopularMovies";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
   <div>
    <main>
        <PopularMovies />
      </main>
    </div>
  );
}