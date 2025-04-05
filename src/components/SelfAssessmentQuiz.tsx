
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Loader2, ArrowRight, CheckCircle, RefreshCcw } from "lucide-react";
import { scoreAssessment } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const questions = [
  {
    id: "q1",
    text: "Over the past 2 weeks, how often have you felt little interest or pleasure in doing things?",
  },
  {
    id: "q2",
    text: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
  },
  {
    id: "q3",
    text: "Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
  },
  {
    id: "q4",
    text: "Over the past 2 weeks, how often have you felt tired or had little energy?",
  },
  {
    id: "q5",
    text: "Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?",
  },
  {
    id: "q6",
    text: "Over the past 2 weeks, how often have you been unable to stop or control worrying?",
  },
  {
    id: "q7",
    text: "Over the past 2 weeks, how often have you had difficulty concentrating on things?",
  },
];

const options = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
];

type AssessmentResults = {
  score: number;
  feedback: string;
  recommendations: string[];
};

const SelfAssessmentQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.text]: parseInt(currentAnswer),
    };
    
    setAnswers(updatedAnswers);
    setCurrentAnswer(null);

    if (isLastQuestion) {
      handleSubmit(updatedAnswers);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async (finalAnswers: Record<string, number>) => {
    setIsSubmitting(true);

    try {
      const assessmentResults = await scoreAssessment(finalAnswers);
      setResults(assessmentResults);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process assessment results. Please try again.",
        variant: "destructive",
      });
      console.error("Assessment error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setCurrentAnswer(null);
    setResults(null);
  };

  if (results) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Assessment Complete
          </CardTitle>
          <CardDescription>
            Thank you for completing the self-assessment. Here are your results:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your score:</p>
            <div className="relative h-4 rounded-full bg-muted mb-2">
              <div
                className="absolute top-0 left-0 h-full rounded-full bg-primary"
                style={{ width: `${results.score}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low concern</span>
              <span>Moderate concern</span>
              <span>High concern</span>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4">
            <h3 className="font-medium mb-2">Feedback</h3>
            <p className="text-sm whitespace-pre-line">{results.feedback}</p>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Recommendations</h3>
            <ul className="list-disc list-inside space-y-2">
              {results.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm">{recommendation}</li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            variant="outline"
            onClick={restartQuiz}
            startIcon={<RefreshCcw className="h-4 w-4 mr-2" />}
          >
            Take Assessment Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Mental Health Self-Assessment</CardTitle>
        <CardDescription>
          This brief assessment helps identify potential mental health concerns.
          Your responses are anonymous and not stored beyond this session.
        </CardDescription>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          <RadioGroup
            value={currentAnswer || ""}
            onValueChange={handleAnswerSelect}
            className="space-y-3"
          >
            {options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-3 bg-muted/40 p-3 rounded-md hover:bg-muted/80 transition-colors"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`${currentQuestion.id}-${option.value}`}
                />
                <Label
                  htmlFor={`${currentQuestion.id}-${option.value}`}
                  className="flex-1 cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <Button
          onClick={handleNext}
          disabled={currentAnswer === null || isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : isLastQuestion ? (
            "Complete Assessment"
          ) : (
            <>
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SelfAssessmentQuiz;
