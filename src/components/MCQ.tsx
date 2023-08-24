"use client";

import { useMemo, useState } from "react";
import { Game, Question } from "@prisma/client";
import { ChevronRight, Loader2, Timer } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MCQCounter from "@/components/MCQCounter";

interface Props {
  game: Game & { questions: Pick<Question, "id" | "options" | "question">[] };
}
const MCQ: React.FC<Props> = ({ game }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(-1);
  const [stats, setStats] = useState({
    correct_answers: 0,
    wrong_answers: 0,
  });

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game]);
  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (!currentQuestion.options) return [];

    return JSON.parse(currentQuestion.options as string) as string[];
  }, [currentQuestion]);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-[80vw] w-[90vw] max-w-4xl">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">Topic</span>&nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span>00:00</span>
          </div>
        </div>
        <MCQCounter
          correct_answers={stats.correct_answers}
          wrong_answers={stats.wrong_answers}
        />
      </div>

      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center">
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50">
            <div>1</div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="flex flex-col items-center justify-center w-full mt-4">
        {options.map((option, index) => (
          <Button
            key={option}
            variant={selectedChoice === index ? "default" : "outline"}
            className="justify-start w-full py-8 mb-4"
            onClick={() => setSelectedChoice(index)}
          >
            <div className="flex items-center justify-start">
              <div className="p-2 px-3 mr-5 border rounded-md">{index + 1}</div>
            </div>
            <div className="text-start">{option}</div>
          </Button>
        ))}
      </div>
      <Button variant="default" className="mt-2" size="lg">
        {/* {isChecking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} */}
        Next <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
};

export default MCQ;
