import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FaTrashAlt } from "react-icons/fa";
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
import StarRating from "@/components/StarRating"; // Adjust the path accordingly
import Image from "next/image";

const GameCard = ({ game, onDelete, isLibrary }) => {
  // Use isLibrary prop to conditionally render the delete button
  return (
    <Link href={`/game/${game.slug}`} key={game.id} className="h-full ">
      <Card className="border border-muted h-full hover:bg-primary-foreground hover:scale-105 transition duration-100 hover:shadow-lg">
        <div className="relative h-[187px] w-full">
          <Image
            src={game.background_image}
            alt={game.name}
            className="rounded object-cover"
            fill="responsive"
            sizes="100%"
            priority={true}
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
              <br />
              Review count: {game.reviews_count}
              <div className="mt-3 flex space-x-1">
                {game.parent_platforms.map((platform, index) =>
                  platform.platform.slug === "pc" ? (
                    <FaComputer key={index} />
                  ) : platform.platform.slug === "playstation" ? (
                    <FaPlaystation key={index} />
                  ) : platform.platform.slug === "xbox" ? (
                    <FaXbox key={index} />
                  ) : platform.platform.slug === "ios" ? (
                    <FaAppStoreIos key={index} />
                  ) : platform.platform.slug === "mac" ? (
                    <FaApple key={index} />
                  ) : platform.platform.slug === "linux" ? (
                    <FaUbuntu key={index} />
                  ) : platform.platform.slug === "nintendo" ? (
                    <BsNintendoSwitch key={index} />
                  ) : platform.platform.slug === "android" ? (
                    <IoLogoAndroid key={index} />
                  ) : platform.platform.slug === "web" ? (
                    <TbWorldWww key={index} />
                  ) : null
                )}
              </div>
              {game.rating && (
                <div className="mt-3">
                  <StarRating rating={game.rating} />
                </div>
              )}
            </CardDescription>
          </div>
          {isLibrary && (
            <Button
              className="px-2 py-1 bg-red-500 text-white hover:bg-red-700"
              onClick={() => onDelete(game.id, game.slug)}
            >
              <FaTrashAlt />
            </Button>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default GameCard;
