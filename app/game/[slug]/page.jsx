"use client";

import GameInfo from "@/components/GameInfo";
import { useParams } from "next/navigation";
export default function Page() {
  const { slug } = useParams();
  return (
    <div>
      <GameInfo slug={slug} />
    </div>
  );
}
