import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function GameBySlug(props) {
  const createMarkup = (html) => {
    return { __html: html };
  };

  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const { slug } = props;

    // First API request for game information
    fetch(
      `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    ).then((response) => {
      response.json().then((data) => {
        setGame(data);
        setLoading(false);
      });
    });

    // Second API request for screenshots
    fetch(
      `https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    ).then((response) => {
      response.json().then((data) => {
        setScreenshots(data.results);
      });
    });
  }, [props.slug]);

  const addWishlist = () => {
    fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify({ game_id: game.id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      response.json().then((data) => {
        console.log(data);
      });
    });
  };

  const toggleShowDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div className="min-h-screen relative px-5">
      {loading ? (
        <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-700 flex justify-center items-center absolute left-1/2 top-1/2" />
      ) : (
        <>
          <img src={game.background_image} />
          <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold">{game.name}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {game.genres.map((genre) => (
                <Badge key={genre.id}>{genre.name}</Badge>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg">
                  {showFullDescription
                    ? game.description_raw
                    : game.description_raw.substring(0, 300) + "..."}
                </p>
                {game.description_raw.length > 300 && (
                  <a
                    onClick={toggleShowDescription}
                    className="text-blue-500 cursor-pointer"
                  >
                    {showFullDescription ? "Show Less" : "Show More"}
                  </a>
                )}
              </div>
              <div>
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent>
                    {screenshots.map((screenshot, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={screenshot.image}
                          className="rounded-lg w-full"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <Button onClick={addWishlist}>Add to Wishlist</Button>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Game Stats</h2>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <h3 className="text-lg font-medium">Achievements</h3>
                  <p className="text-lg">{game.achievements_count}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Players</h3>
                  <p className="text-lg">{game.added}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Additions</h3>
                  <p className="text-lg">{game.additions_count}</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Creators</h3>
                  <p className="text-lg">{game.creators_count}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
