"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function GameByGenreId(props) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("page")) {
      setPage(parseInt(searchParams.get("page")));
    }

    fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }&genres=${props.genre_id}&page_size=32&page=${parseInt(
        searchParams.get("page") || 1
      )}`
    ).then((response) => {
      response.json().then((data) => {
        console.log(data.results);
        setGames(data.results);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="min-h-screen relative px-5">
      <h2 className="text-xl my-5 font-bold"> {props.genre_id} Games</h2>

      {loading ? (
        <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-700 flex justify-center items-center absolute left-1/2 top-1/2" />
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-6 md:grid-cols-2 gap-4">
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

          <div className="py-16 flex justify-center">
            <div className="flex space-x-3">
              {page == 1 ? null : (
                <Button variant="secondary" asChild>
                  <a
                    href={`/genre/${props.genre_id}?page=${page - 1}`}
                    className="flex items-center"
                  >
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Previous Page
                  </a>
                </Button>
              )}

              <Button variant="secondary" asChild>
                <a href={`/genre/${props.genre_id}?page=${page + 1}`}>
                  Next Page
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
