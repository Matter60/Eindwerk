// GameCard.js
import React from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  IconArrowLeft,
  IconBrandAndroid,
  IconBrandApple,
  IconBrandFinder,
  IconBrandUbuntu,
  IconBrandXbox,
  IconCpu,
  IconDeviceLaptop,
  IconDeviceNintendo,
  IconPlaystationSquare,
  IconWorldWww,
  IconXboxA,
} from "@tabler/icons-react";

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
          <div
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              border: "2px solid #4CAF50",
              padding: "2px",
              borderRadius: "4px",
              position: "absolute",
              bottom: "8px",
              right: "8px",
              width: "30px",
              height: "30px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {game.metacritic}
          </div>
        )}
      </div>
      <CardContent className="p-3">
        <div className="my-3">
          <CardTitle>{game.name}</CardTitle>
          <CardDescription>
            Released on: {game.released}
            <div className="mt-3 flex space-x-1">
              {game.parent_platforms.map((platform, index) =>
                platform.platform.slug === "pc" ? (
                  <IconDeviceLaptop />
                ) : platform.platform.slug === "playstation" ? (
                  <IconPlaystationSquare />
                ) : platform.platform.slug === "xbox" ? (
                  <IconBrandXbox />
                ) : platform.platform.slug === "ios" ? (
                  <IconBrandApple />
                ) : platform.platform.slug === "mac" ? (
                  <IconBrandFinder />
                ) : platform.platform.slug === "linux" ? (
                  <IconBrandUbuntu />
                ) : platform.platform.slug === "nintendo" ? (
                  <IconDeviceNintendo />
                ) : platform.platform.slug === "android" ? (
                  <IconBrandAndroid />
                ) : platform.platform.slug === "web" ? (
                  <IconWorldWww />
                ) : null
              )}
            </div>
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  </Link>
);

export default GameCard;
