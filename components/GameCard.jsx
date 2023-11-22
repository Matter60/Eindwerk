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
  FaComputer,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAppStoreIos,
  FaUbuntu,
} from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { TbWorldWww } from "react-icons/tb";
import { IoLogoAndroid } from "react-icons/io";

const GameCard = ({ game }) => (
  <Link href={`/game/${game.slug}`} key={game.id} className="h-full ">
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
                  <FaComputer />
                ) : platform.platform.slug === "playstation" ? (
                  <FaPlaystation />
                ) : platform.platform.slug === "xbox" ? (
                  <FaXbox />
                ) : platform.platform.slug === "ios" ? (
                  <FaAppStoreIos />
                ) : platform.platform.slug === "mac" ? (
                  <FaApple />
                ) : platform.platform.slug === "linux" ? (
                  <FaUbuntu />
                ) : platform.platform.slug === "nintendo" ? (
                  <BsNintendoSwitch />
                ) : platform.platform.slug === "android" ? (
                  <IoLogoAndroid />
                ) : platform.platform.slug === "web" ? (
                  <TbWorldWww />
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
