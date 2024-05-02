"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GameCard from "@/components/GameCard";

export default function Page() {
  const [Wishlist, setWishlist] = useState([]);
  const [Games, setGames] = useState([]);
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
        setWishlist(data);
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
        // Na succesvol verwijderen, roep getWishlist op om de lijst opnieuw te laden
        getWishlist();
      })
      .catch((error) => {
        console.error("Error deleting wishlist item:", error);
      });
  };

  const getGames = (callback) => {
    fetch("/api/owned", {
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
        console.error("Error fetching games:", error);
      });
  };
  console.log(Games);

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
        console.log(data);
        getGames();
      })
      .catch((error) => {
        console.error("Error deleting game item:", error);
      });
  };

  useEffect(() => {
    getWishlist();
    getGames();
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {Games.map((game, index) => (
              <GameCard
                key={index}
                game={game}
                onDelete={deleteGames} // Pass the deleteWishlist function
                isLibrary={true} // Set isLibrary prop to true
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="wishlist">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {Wishlist.map((game, index) => (
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
