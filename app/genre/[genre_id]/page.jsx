"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return (
    <>
      <h1>Genre {params.genre_id}</h1>
    </>
  );
}
