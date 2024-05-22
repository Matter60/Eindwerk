"use client";
import React, { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";

const Page = () => {
  const [trendingGames, setTrendingGames] = useState([]);
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

    fetchTrendingGames();
  }, []);

  return (
    <div>
      <h1 className="text-xl my-5 font-bold">Trending Games</h1>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-12">
        {trendingGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Page;
