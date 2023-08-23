import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/nextauth";

export const metadata = {
  title: "Quiz | Quizmify",
};
async function QuizPage() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/");
  }

  return <div>QuizPage</div>;
}

export default QuizPage;
