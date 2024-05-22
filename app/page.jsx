"use client";
import React, { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import Image from "next/image";
import SkeletonLoader from "@/components/SkeletonLoader";

const Page = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=-added&page_size=21`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch trending games");
        }

        const data = await response.json();
        setTrendingGames(data.results);
      } catch (error) {
        console.error("An error occurred while fetching trending games", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUpcomingGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games/lists/main?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=-released&page_size=5`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming games");
        }

        const data = await response.json();
        setUpcomingGames(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("An error occurred while fetching upcoming games", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingGames();
    fetchUpcomingGames();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-xl my-5 font-bold">Upcoming Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : upcomingGames.map((game) => (
              <div key={game.id} className="relative">
                <Image
                  src={game.background_image}
                  alt={game.name}
                  width={1280}
                  height={720}
                  className="rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                  <h2 className="text-xs font-bold">{game.name}</h2>
                </div>
              </div>
            ))}
      </div>

      <h1 className="text-xl my-5 font-bold">Trending Games</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-6">
        {loading
          ? Array.from({ length: 21 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          : trendingGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default Page;
