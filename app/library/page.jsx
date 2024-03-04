"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/GameCard";

export default function Page() {
  const [games, setGames] = useState([]);
  const getWishlist = (callback) => {
    fetch("/api/wishlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGames(data);
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
        console.log(data);
        getWishlist();
      })
      .catch((error) => {
        console.error("Error deleting wishlist item:", error);
      });
  };
  console.log(games);

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 mt-4">Welcome to your library</h1>
      <Tabs defaultValue="your-games">
        <TabsList>
          <TabsTrigger value="your-games">Games</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
        </TabsList>
        <TabsContent value="your-games">
          Make changes to your account here
        </TabsContent>
        <TabsContent value="wishlist">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {games.map((game, index) => (
              <GameCard
                key={index}
                game={game}
                onDelete={deleteWishlist} // Pass the deleteWishlist function
                isLibrary={true} // Set isLibrary prop to true
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
