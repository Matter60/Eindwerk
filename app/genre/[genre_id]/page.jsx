"use client";
import GameByGenreID from "@/components/GameByGenreID";
import { useParams } from "next/navigation";
export default function Page() {
  const { genre_id } = useParams();
  return (
    <>
      <div className="">
        <h1>Genre {genre_id}</h1>
        <GameByGenreID genre_id={genre_id} />
      </div>
    </>
  );
}
