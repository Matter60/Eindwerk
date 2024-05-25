"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/GameCard";
import { Input } from "@/components/ui/input";

export default function Page() {
  const [wishlist, setWishlist] = useState([]);
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [filteredWishlist, setFilteredWishlist] = useState([]);

  const getWishlist = () => {
    fetch("/api/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setWishlist(data);
        setFilteredWishlist(data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist:", error);
      });
  };

  const deleteWishlist = (id, slug) => {
    fetch("/api/wishlist", {
      method: "DELETE",
      body: JSON.stringify({
        game_id: id,
        slug: slug,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting wishlist item:", error);
      });
  };

  const getGames = () => {
    fetch("/api/owned", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
        setFilteredGames(data);
      })
      .catch((error) => {
        console.error("Error fetching games:", error);
      });
  };

  const deleteGames = (id, slug) => {
    fetch("/api/owned", {
      method: "DELETE",
      body: JSON.stringify({
        game_id: id,
        slug: slug,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting game item:", error);
      });
  };

  useEffect(() => {
    getWishlist();
    getGames();
  }, []);

  useEffect(() => {
    setFilteredGames(
      games.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredWishlist(
      wishlist.filter((game) =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, games, wishlist]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Welcome to your library</h1>
      <Input
        type="text"
        placeholder="Search for games..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Tabs defaultValue="your-games">
        <TabsList>
          <TabsTrigger value="your-games">Games</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>

        <TabsContent value="your-games">
          {filteredGames.length === 0 ? (
            <p className="text-gray-500 mt-10 text-center">
              No games found in your library
            </p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-12">
              {filteredGames.map((game, index) => (
                <GameCard
                  key={index}
                  game={game}
                  onDelete={deleteGames}
                  isLibrary={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="wishlist">
          {filteredWishlist.length === 0 ? (
            <p className="text-gray-500 mt-10 text-center">
              Your wishlist is empty
            </p>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-4 mt-12">
              {filteredWishlist.map((game, index) => (
                <GameCard
                  key={index}
                  game={game}
                  onDelete={deleteWishlist}
                  isLibrary={true}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
