// pages/page.jsx
"use client";
import React, { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";

const Page = () => {
  const [trendingGames, setTrendingGames] = useState([]);

  useEffect(() => {
    const fetchTrendingGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&ordering=-added`
        );

        if (response.ok) {
          const data = await response.json();
          setTrendingGames(data.results);
        } else {
          console.error("Failed to fetch trending games");
        }
      } catch (error) {
        console.error("An error occurred while fetching trending games", error);
      }
    };

    fetchTrendingGames();
  }, []);

  return (
    <div>
      <h1 className="text-xl my-5 font-bold">Trending Games</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trendingGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Page;
