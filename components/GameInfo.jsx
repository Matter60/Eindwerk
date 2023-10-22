"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function GameBySlug(props) {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Haal het slug op van props
    const { slug } = props;

    fetch(
      `https://api.rawg.io/api/games/${slug}?key=${process.env.NEXT_PUBLIC_RAWG_API_KEY}`
    ).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setGame(data);
        setLoading(false);
      });
    });
  }, []);

  return (
    <div className="min-h-screen relative px-5">
      {loading ? (
        <div className="border-gray-400 h-20 w-20 animate-spin rounded-full border-8 border-t-gray-700 flex justify-center items-center absolute left-1/2 top-1/2" />
      ) : (
        <>
          <h2 className="text-xl my-5 font-bold">{game.name}</h2>

          <img src={game.background_image} alt="" />
          {game.description}
        </>
      )}
    </div>
  );
}
