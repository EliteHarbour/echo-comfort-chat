
import Layout from "@/components/Layout";
import SelfAssessmentQuiz from "@/components/SelfAssessmentQuiz";
import { useState, useEffect } from "react";
import { generateQuizQuestions, QuizQuestion } from "@/lib/api";
import { Loader2, ClipboardList, Info } from "lucide-react";

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
        <div className="flex flex-col items-start gap-2 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            Mental Health Self-Assessment
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Complete this brief assessment to gain insights about your current mental wellbeing. 
            Your responses will help generate personalized recommendations.
          </p>
        </div>

        <div className="bg-gradient-to-r from-mint-50/80 to-mint-100/50 dark:from-mint-900/50 dark:to-mint-800/30 rounded-lg p-6 mb-8 border border-mint-200 dark:border-mint-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-primary">About This Assessment</h2>
              <p className="text-muted-foreground">
                This AI-powered assessment is designed to help you reflect on your mental health.
                Your responses are analyzed to provide tailored recommendations and insights.
              </p>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>The assessment is anonymous and your data is never stored permanently. 
                This is not a clinical evaluation and does not provide medical diagnosis.</p>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 bg-background border rounded-lg shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
            <p className="text-lg font-medium">Generating personalized assessment questions...</p>
            <p className="text-muted-foreground mt-2">This will only take a moment.</p>
          </div>
        ) : (
          <div className="bg-background border rounded-lg shadow-sm">
            <SelfAssessmentQuiz questions={aiQuestions} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Assessment;
