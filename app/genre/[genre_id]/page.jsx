"use client";
import GameByGenreId from "@/components/GameByGenreId";
import { useParams } from "next/navigation";
export default function Page() {
  const { genre_id } = useParams();
  return (
    <div>
      <GameByGenreId genre_id={genre_id} />
    </div>
  );
}
