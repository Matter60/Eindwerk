import { useEffect, useState } from "react";

export function GameByGenreID(props) {
  const [Games, setGames] = useState(props.genre_id);
  useEffect(async () => {
    const response = await fetch(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&genres=${genre_id}`
    );

    if (response.ok) {
      const data = await response.json();
      setGames(data.results);
    }
  }, []);

  return (
    <div>
      <h2 className="text-[30px] font-bold">Games</h2>
      {Games.map((game) => (
        <div>
          <img
            key={game.id}
            className="w-[40px] h-[40px] object-cover rounded-lg group-hover:scale-105 transition-all ease-out duration-300"
            src={game.image_background}
            alt={game.name}
          />
          <h3 className="group-hover:font-bold group-hover:scale-105 transition-all ease-out duration-300">
            {game.name}
          </h3>
        </div>
      ))}
    </div>
  );
}

export default GameByGenreID;
