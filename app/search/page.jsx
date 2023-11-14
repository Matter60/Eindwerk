"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const [games, setGames] = useState([]);
  const searchParams = useSearchParams();
  const search = searchParams.get("q");

  async function searchGames() {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${search}`
    );

    console.log(response);

    if (response.ok) {
      const data = await response.json();
      setGames(data.results);
    }
  }

  useEffect(() => {
    if (search) {
      searchGames();
    }
  }, [search]);

  return (
    <div className="p-5">
      {search ? (
        <>
          <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
            Search results for "{search}"
          </h2>
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-6 md:grid-cols-2 gap-4 mt-12">
            {games.map((game) => (
              <Link
                href={`/game/${game.slug}`}
                key={game.id}
                className="h-full"
              >
                <Card className="border border-muted h-full hover:bg-primary-foreground hover:scale-105 transition duration-100 hover:shadow-lg">
                  <CardContent className="p-3">
                    <div className="h-[187px] w-full">
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="rounded object-cover w-full h-full"
                      />
                    </div>

                    <div className="my-3">
                      <CardTitle>{game.name}</CardTitle>
                      <CardDescription>{game.released}</CardDescription>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </>
      ) : (
        <h1></h1>
      )}
    </div>
  );
}
