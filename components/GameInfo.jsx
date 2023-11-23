import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";

export default function GameBySlug(props) {
  const createMarkup = (html) => {
    return { __html: html };
  };

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const { slug } = props;

    fetch(
      `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setGame(data);
        setLoading(false);
      });
    });
  }, []);

  const toggleShowDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div className="min-h-screen relative px-5">
      {loading ? (
        <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-700 flex justify-center items-center absolute left-1/2 top-1/2" />
      ) : (
        <>
          <h2 className="text-xl my-5 font-bold">{game.name}</h2>
          <div className="mt-12 text-left text-primary">
            <div
              dangerouslySetInnerHTML={createMarkup(
                showFullDescription
                  ? game.description_raw
                  : game.description_raw.substring(0, 300) + "..."
              )}
            />
            {game.description_raw.length > 300 && (
              <p className="text-sm text-gray-600 mt-2">
                <a
                  onClick={toggleShowDescription}
                  className="text-blue-500 cursor-pointer"
                >
                  {showFullDescription ? "Show Less" : "Show More"}
                </a>
              </p>
            )}
          </div>
          <Button
            href={game.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Official site
          </Button>
        </>
      )}
    </div>
  );
}
