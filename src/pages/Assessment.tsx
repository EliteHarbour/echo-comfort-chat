
import Layout from "@/components/Layout";
import SelfAssessmentQuiz from "@/components/SelfAssessmentQuiz";
import { useState, useEffect } from "react";
import { generateQuizQuestions, QuizQuestion, QUIZ_TYPES, QuizType } from "@/lib/api";
import { Loader2, ClipboardList, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const Assessment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [aiQuestions, setAiQuestions] = useState<QuizQuestion[]>([]);
  const [selectedQuizType, setSelectedQuizType] = useState<string>("mood");
  const [quizCategories, setQuizCategories] = useState<Record<string, QuizType[]>>({});

  // Group quiz types by category
  useEffect(() => {
    const grouped = QUIZ_TYPES.reduce<Record<string, QuizType[]>>((acc, quiz) => {
      if (!acc[quiz.category]) {
        acc[quiz.category] = [];
      }
      acc[quiz.category].push(quiz);
      return acc;
    }, {});
    setQuizCategories(grouped);
  }, []);

  // Load questions based on selected quiz type
  useEffect(() => {
    const loadQuestions = async () => {
      setIsLoading(true);
      try {
        const questions = await generateQuizQuestions(selectedQuizType);
        setAiQuestions(questions);
      } catch (error) {
        console.error("Error generating questions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [selectedQuizType]);

  const handleQuizTypeSelect = (quizType: string) => {
    setSelectedQuizType(quizType);
  };

  // Get current quiz type object
  const currentQuiz = QUIZ_TYPES.find(q => q.id === selectedQuizType) || QUIZ_TYPES[0];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-start gap-2 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            Mental Health Self-Assessment
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Choose from different assessment types to gain personalized insights about your mental wellbeing.
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
                These AI-powered assessments help you reflect on different aspects of your mental health.
                Your responses are analyzed to provide tailored recommendations and insights.
              </p>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>All assessments are anonymous and your data is never stored permanently. 
                These are not clinical evaluations and do not provide medical diagnosis.</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Select Assessment Type</h2>
        
        <Tabs defaultValue="screening" className="mb-8">
          <TabsList className="mb-4">
            {Object.keys(quizCategories).map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category.replace('-', ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {Object.entries(quizCategories).map(([category, quizzes]) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {quizzes.map((quiz) => (
                  <Card 
                    key={quiz.id} 
                    className={`cursor-pointer hover:border-primary transition-colors ${
                      selectedQuizType === quiz.id ? 'border-primary bg-primary/5' : ''
                    }`}
                    onClick={() => handleQuizTypeSelect(quiz.id)}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{quiz.name}</CardTitle>
                      <CardDescription>{quiz.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{currentQuiz.name}</h2>
          <p className="text-muted-foreground">{currentQuiz.description}</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-16 bg-background border rounded-lg shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin mb-4 text-primary" />
            <p className="text-lg font-medium">Generating personalized assessment questions...</p>
            <p className="text-muted-foreground mt-2">This will only take a moment.</p>
          </div>
        ) : (
          <div className="bg-background border rounded-lg shadow-sm">
            <SelfAssessmentQuiz questions={aiQuestions} quizType={selectedQuizType} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Assessment;
