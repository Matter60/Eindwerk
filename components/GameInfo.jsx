import { useEffect, useState, useMemo } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { Badge } from "./ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/clerk-react";
import Link from "next/link";

import {
  FaSteam,
  FaXbox,
  FaPlaystation,
  FaAppStore,
  FaGooglePlay,
  FaItchIo,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { SiEpicgames } from "react-icons/si";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

const getStoreNameById = (storeId) => {
  switch (storeId) {
    case 1:
      return <FaSteam />;
    case 2:
      return <FaXbox />;
    case 3:
      return <FaPlaystation />;
    case 4:
      return <FaAppStore />;
    case 5:
      return "GOG";
    case 6:
      return <BsNintendoSwitch />;
    case 8:
      return <FaGooglePlay />;
    case 9:
      return <FaItchIo />;
    case 11:
      return <SiEpicgames />;
    default:
      return "Unknown";
  }
};

export default function GameBySlug({ slug }) {
  const { toast } = useToast();
  const user = useUser();

  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const gameResponse = fetch(
          `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );
        const screenshotsResponse = fetch(
          `https://api.rawg.io/api/games/${slug}/screenshots?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );
        const storesResponse = fetch(
          `https://api.rawg.io/api/games/${slug}/stores?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
        );

        const [gameData, screenshotsData, storesData] = await Promise.all([
          gameResponse,
          screenshotsResponse,
          storesResponse,
        ]);

        const gameJson = await gameData.json();
        const screenshotsJson = await screenshotsData.json();
        const storesJson = await storesData.json();

        setGame(gameJson);
        setScreenshots(screenshotsJson.results);
        setStores(storesJson.results);
      } catch (error) {
        console.error("Failed to fetch game data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [slug]);

  const memoizedGetStoreNameById = useMemo(() => getStoreNameById, []);

  const handleAddToWishlist = async () => {
    await addGameToCollection("/api/wishlist", "Wishlist");
  };

  const handleAddToOwned = async () => {
    await addGameToCollection("/api/owned", "My Games");
  };

  const addGameToCollection = async (apiEndpoint, collectionName) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify({
          game_id: game.id,
          slug: game.slug,
          name: game.name,
          background_image: game.background_image,
          released: game.released,
          metacritic: game.metacritic,
          reviews_count: game.reviews_count,
          parent_platforms: game.parent_platforms,
          rating: game.rating,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: `Added to ${collectionName}`,
          description: `This game has been added to your ${collectionName.toLowerCase()}`,
          status: "success",
        });
      } else {
        toast({
          title: `Already in ${collectionName}`,
          description: `This game is already in your ${collectionName.toLowerCase()}`,
          status: "warning",
        });
      }
    } catch (error) {
      console.error(`Failed to add to ${collectionName}:`, error);
      toast({
        title: "Error",
        description: `Failed to add this game to your ${collectionName.toLowerCase()}`,
        status: "error",
      });
    }
  };

  const toggleShowDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) {
    return (
      <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-700 flex justify-center items-center absolute left-1/2 top-1/2" />
    );
  }

  return (
    <div className="min-h-screen relative px-5 mt-4">
      <Image
        alt="Background"
        className="rounded object-cover w-full h-full"
        src={game.background_image}
        width={1920}
        height={1080}
      />
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
                {screenshots &&
                  screenshots.map((screenshot, index) => (
                    <CarouselItem key={index}>
                      <Image
                        src={screenshot.image}
                        className="rounded-lg w-full"
                        alt={game.name}
                        width={1920}
                        height={1080}
                      />
                    </CarouselItem>
                  ))}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </div>
          {user && user.isSignedIn && (
            <>
              <Button onClick={handleAddToWishlist}>Add to Wishlist</Button>
              <Button onClick={handleAddToOwned}>Add To My Games</Button>
            </>
          )}
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
          <h2 className="text-2xl font-semibold mt-4">Stores</h2>
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stores.map((store) => (
              <Link
                href={store.url}
                key={store.id}
                target="_blank"
                className="text-lg"
              >
                {memoizedGetStoreNameById(store.store_id)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
