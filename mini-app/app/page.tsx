"use client";

import { title, description } from "@/lib/metadata";
import { generateMetadata } from "@/lib/farcaster-embed";
import Quiz from "@/components/quiz";

export { generateMetadata };

export default function Home() {
  return (
    <main className="flex flex-col gap-3 place-items-center place-content-center px-4 grow">
      <span className="text-2xl">{title}</span>
      <span className="text-muted-foreground">{description}</span>
      <Quiz />
    </main>
  );
}
