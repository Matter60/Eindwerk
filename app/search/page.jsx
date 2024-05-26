"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GameCard from "@/components/GameCard";
import SkeletonLoader from "@/components/SkeletonLoader"; // Import SkeletonLoader

export default function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const searchParams = useSearchParams();
  const search = searchParams.get("q");
  const sort = searchParams.get("sort");

  async function searchGames() {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${
          process.env.NEXT_PUBLIC_RAWG_API_KEY
        }&search=${search}&ordering=-${sort || ""}`
      );

      if (response.ok) {
        const data = await response.json();
        setGames(data.results);
      }
    } finally {
      setLoading(false); // Set loading back to false after fetching
    }
  }

  useEffect(() => {
    // Load games only if search term is present
    if (search) {
      searchGames();
    }
  }, [search]);

  return (
    <div className="p-5">
      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-5 mt-5">
          {Array.from({ length: 30 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          {search && (
            <>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Search results for &quot;{search}&quot;
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-5 mt-5">
                {games.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
