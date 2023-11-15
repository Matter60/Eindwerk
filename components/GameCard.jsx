// GameCard.js
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const GameCard = ({ game }) => (
  <Link href={`/game/${game.slug}`} key={game.id} className="h-full">
    <Card className="border border-muted h-full hover:bg-primary-foreground hover:scale-105 transition duration-100 hover:shadow-lg">
      <div className="relative h-[187px] w-full">
        <img
          src={game.background_image}
          alt={game.name}
          className="rounded object-cover w-full h-full"
        />
        {game.metacritic && (
          <p
            style={{
              backgroundColor: "#4CAF50",
              border: "2px solid #4CAF50",
              padding: "4px",
              borderRadius: "4px",
              position: "absolute",
              top: "0",
              right: "0",
            }}
          >
            {game.metacritic}
          </p>
        )}
      </div>
      <CardContent className="p-3">
        <div className="my-3">
          <CardTitle>{game.name}</CardTitle>
          <CardDescription>{game.released}</CardDescription>
          {/* Add more details as needed */}
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default GameCard;