import { NextResponse } from "next/server";

import { ZodError } from "zod";
import { checkAnswerSchema } from "@/schemas/questions";
import { prisma } from "@/lib/db";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { questionId, userInput } = checkAnswerSchema.parse(body);
    const question = await prisma.question.findUnique({
      where: { id: questionId },
    });
    if (!question) {
      return NextResponse.json(
        {
          message: "Question not found",
        },
        {
          status: 404,
        }
      );
    }
    await prisma.question.update({
      where: { id: questionId },
      data: { userAnswer: userInput },
    });
    if (question.questionType === "mcq") {
      const isCorrect =
        question.answer.toLocaleLowerCase().trim() ===
        userInput.toLocaleLowerCase().trim();
      await prisma.question.update({
        where: { id: questionId },
        data: { isCorrect },
      });
      return NextResponse.json(
        {
          isCorrect,
        },
        {
          status: 200,
        }
      );
    } else if (question.questionType === "open_ended") {
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: error.issues,
        },
        {
          status: 400,
        }
      );
    }
  }
}
