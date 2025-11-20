"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Question = {
  text: string;
  options: { label: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite activity?",
    options: [
      { label: "Chasing mice", animal: "cat" },
      { label: "Playing fetch", animal: "dog" },
      { label: "Hunting in the forest", animal: "fox" },
      { label: "Running in a cage", animal: "hamster" },
      { label: "Racing on a track", animal: "horse" },
    ],
  },
  {
    text: "How do you prefer to travel?",
    options: [
      { label: "On a quiet path", animal: "cat" },
      { label: "With a loyal friend", animal: "dog" },
      { label: "Through the woods", animal: "fox" },
      { label: "In a small space", animal: "hamster" },
      { label: "Across wide fields", animal: "horse" },
    ],
  },
  {
    text: "What is your personality like?",
    options: [
      { label: "Independent", animal: "cat" },
      { label: "Friendly", animal: "dog" },
      { label: "Clever", animal: "fox" },
      { label: "Energetic", animal: "hamster" },
      { label: "Strong", animal: "horse" },
    ],
  },
  {
    text: "What kind of environment do you thrive in?",
    options: [
      { label: "Quiet home", animal: "cat" },
      { label: "Open yard", animal: "dog" },
      { label: "Dense forest", animal: "fox" },
      { label: "Small enclosure", animal: "hamster" },
      { label: "Wide pasture", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite food?",
    options: [
      { label: "Fish", animal: "cat" },
      { label: "Bones", animal: "dog" },
      { label: "Insects", animal: "fox" },
      { label: "Seeds", animal: "hamster" },
      { label: "Grass", animal: "horse" },
    ],
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const randomizedQuestions = useMemo(() => {
    return questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
  }, []);

  function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const handleSelect = (animal: string) => {
    setAnswers((prev) => [...prev, animal]);
  };

  const computeResult = () => {
    const counts: Record<string, number> = {};
    answers.forEach((a) => {
      counts[a] = (counts[a] ?? 0) + 1;
    });
    const max = Math.max(...Object.values(counts));
    const topAnimals = Object.entries(counts)
      .filter(([, v]) => v === max)
      .map(([k]) => k);
    setResult(topAnimals[0]); // pick first if tie
  };

  const handleRetake = () => {
    setAnswers([]);
    setResult(null);
  };

  if (result) {
    return (
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">You are a {result}!</h2>
        <img
          src={`/${result}.png`}
          alt={result}
          width={512}
          height={512}
          className="size-[512px]"
        />
        <Share text={`I am a ${result}! ${url}`} />
        <Button onClick={handleRetake}>Retake Quiz</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-md">
      {randomizedQuestions.map((q, idx) => (
        <div key={idx} className="flex flex-col gap-2">
          <p className="font-medium">{q.text}</p>
          <div className="flex flex-col gap-1">
            {q.options.map((opt) => (
              <Button
                key={opt.label}
                variant="outline"
                onClick={() => handleSelect(opt.animal)}
              >
                {opt.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
      {answers.length === questions.length && (
        <Button onClick={computeResult}>See Result</Button>
      )}
    </div>
  );
}
