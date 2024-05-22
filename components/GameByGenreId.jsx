import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import GameCard from "./GameCard";
import SkeletonLoader from "./SkeletonLoader"; // Voeg de SkeletonLoader component toe

export default function GameByGenreId(props) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("page")) {
      setPage(parseInt(searchParams.get("page")));
    }

    fetchGames();
  }, []);

  const fetchGames = () => {
    fetch(
      `https://api.rawg.io/api/games?key=${
        process.env.NEXT_PUBLIC_RAWG_API_KEY
      }&genres=${props.genre_id}&page_size=30&page=${parseInt(
        searchParams.get("page") || 1
      )}`
    ).then((response) => {
      response.json().then((data) => {
        setGames(data.results);
        setLoading(false);
      });
    });
  };

  const genreLabels = {
    4: "Action",
    51: "Indie",
    3: "Adventure",
    5: "RPG",
    10: "Strategy",
    2: "Shooter",
    40: "Casual",
    14: "Simulation",
    7: "Puzzle",
    11: "Arcade",
    83: "Platformer",
    59: "Massively Multiplayer",
    1: "Racing",
    15: "Sports",
    6: "Fighting",
    19: "Family",
    28: "Board",
    34: "Educational",
    17: "Card",
  }[props.genre_id];

  return (
    <div className="min-h-screen relative px-5">
      <h2 className="text-xl my-5 font-bold">{genreLabels} Games</h2>

      {loading ? (
        <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-6">
          {Array.from({ length: 21 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-6">
            {games.map((game) => (
              <GameCard game={game} key={game.id} />
            ))}
          </div>
          <div className="py-16 flex justify-center">
            <div className="flex space-x-3">
              {page === 1 ? null : (
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
