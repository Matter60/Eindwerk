import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchGames = () => {
    const games = getGames(query);
    setSearchResults(games);
  };

  return (
    <form action="/search" method="get" className="flex items-center space-x-2">
      <Input
        type="text"
        name="q"
        className="px-3 py-2 w-80"
        placeholder="Search..."
      />
      <Button type="submit" className="px-3 py-2" onClick={searchGames}>
        Search
      </Button>
    </form>
  );
}
