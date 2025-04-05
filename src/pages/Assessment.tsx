
import Layout from "@/components/Layout";
import SelfAssessmentQuiz from "@/components/SelfAssessmentQuiz";
import { useState, useEffect } from "react";
import { generateQuizQuestions, QuizQuestion } from "@/lib/api";
import { Loader2 } from "lucide-react";

const Assessment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const questions = await generateQuizQuestions();
        setAiQuestions(questions);
      } catch (error) {
        console.error("Error generating questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Mental Health Self-Assessment</h1>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin mb-4" />
            <p className="text-muted-foreground">Generating personalized assessment questions...</p>
          </div>
        ) : (
          <SelfAssessmentQuiz questions={aiQuestions} />
        )}
      </div>
    </Layout>
  );
};

export default Assessment;
