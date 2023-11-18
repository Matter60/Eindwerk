"use client";
import Link from "next/link";
import GameCard from "@/components/GameCard";

export async function getTrendingGames() {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&ordering=-added`
  );

  if (response.ok) {
    const data = await response.json();
    return data.results;
  }

  return [];
}

export async function TrendingGames() {
  const trendingGames = await getTrendingGames();

  return (
    <>
      <h2 className="text-xl my-5 font-bold">Trending Games</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {trendingGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </>
  );
}

export default TrendingGames;
