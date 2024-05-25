"use client";
import React, { useEffect, useState, useMemo } from "react";
import GameCard from "@/components/GameCard";
import Image from "next/image";
import SkeletonLoaderImg from "@/components/SkeletonLoaderImg";
import SkeletonLoader from "@/components/SkeletonLoader";
import Link from "next/link";

const Page = () => {
  const [trendingGames, setTrendingGames] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const [trendingResponse, upcomingResponse] = await Promise.all([
          fetch(
            `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=-added&page_size=21`
          ),
          fetch(
            `https://api.rawg.io/api/games/lists/main?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=-released&page_size=5`
          ),
        ]);

        if (!trendingResponse.ok || !upcomingResponse.ok) {
          throw new Error("Failed to fetch games data");
        }

        const [trendingData, upcomingData] = await Promise.all([
          trendingResponse.json(),
          upcomingResponse.json(),
        ]);

        setTrendingGames(trendingData.results);
        setUpcomingGames(upcomingData.results);
      } catch (error) {
        console.error("An error occurred while fetching games data", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  const loadingSkeletons = useMemo(
    () => ({
      upcoming: Array.from({ length: 5 }).map((_, index) => (
        <SkeletonLoaderImg key={index} />
      )),
      trending: Array.from({ length: 21 }).map((_, index) => (
        <SkeletonLoader key={index} />
      )),
    }),
    []
  );

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-xl my-5 font-bold">Upcoming Games</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-6">
        {loading
          ? loadingSkeletons.upcoming
          : upcomingGames.map((game) => (
              <div
                key={game.id}
                className="relative hover:bg-primary-foreground hover:scale-105 transition duration-100 hover:shadow-lg"
              >
                <Link href={`/game/${game.slug}`}>
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
                </Link>
              </div>
            ))}
      </div>

      <h1 className="text-xl my-5 font-bold">Trending Games</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-6">
        {loading
          ? loadingSkeletons.trending
          : trendingGames.map((game) => <GameCard key={game.id} game={game} />)}
      </div>
    </div>
  );
};

export default Page;
