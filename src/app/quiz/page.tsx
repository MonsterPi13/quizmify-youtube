import { redirect, useParams } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";
import QuizCreation from "@/components/forms/QuizCreation";

export const metadata = {
  title: "Quiz | Quizmify",
};

interface Props {
  searchParams: {
    topic?: string;
  };
}

async function QuizPage({ searchParams }: Props) {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  return <QuizCreation topic={searchParams.topic ?? ""} />;
}

export default QuizPage;
