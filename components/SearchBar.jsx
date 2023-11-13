import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export async function getGames(query) {
  const response = await fetch(
    `https://api.rawg.io/api/games?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}&search=${query}`
  );

  console.log(response);

  if (response.ok) {
    const data = await response.json();
    return data.results;
  }

  return [];
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchGames = async () => {
    const games = await getGames(query);
    setSearchResults(games);
  };

  return (
    <div className="flex items-center space-x-2">
      <Input
        type="text"
        className="px-3 py-2 w-80"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button className="px-3 py-2" onClick={searchGames}>
        Search
      </Button>

      {/* Render search results if there are any */}
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {searchResults.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
