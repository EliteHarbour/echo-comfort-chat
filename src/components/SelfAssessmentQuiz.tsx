
import { useState, useEffect } from "react";
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, ArrowRight, ArrowLeft, CheckCircle, RefreshCcw, AlertTriangle } from "lucide-react";
import { scoreAssessment, QuizQuestion, QUIZ_TYPES } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

// Default options for most assessments
const standardOptions = [
  { value: "0", label: "Not at all" },
  { value: "1", label: "Several days" },
  { value: "2", label: "More than half the days" },
  { value: "3", label: "Nearly every day" },
];

// Custom options sets for specific quiz types
const customOptionsMap: Record<string, { value: string; label: string }[]> = {
  stress: [
    { value: "0", label: "Never" },
    { value: "1", label: "Almost never" },
    { value: "2", label: "Sometimes" },
    { value: "3", label: "Fairly often" },
    { value: "4", label: "Very often" },
  ],
  sleep: [
    { value: "0", label: "Very good" },
    { value: "1", label: "Fairly good" },
    { value: "2", label: "Fairly bad" },
    { value: "3", label: "Very bad" },
  ],
  values: [
    { value: "1", label: "Not important to me at all" },
    { value: "2", label: "Slightly important to me" },
    { value: "3", label: "Moderately important to me" },
    { value: "4", label: "Very important to me" },
    { value: "5", label: "Extremely important to me" },
  ],
  "emotional-intelligence": [
    { value: "1", label: "Almost never" },
    { value: "2", label: "Rarely" },
    { value: "3", label: "Sometimes" },
    { value: "4", label: "Often" },
    { value: "5", label: "Almost always" },
  ],
  coping: [
    { value: "0", label: "Never do that" },
    { value: "1", label: "Rarely do that" },
    { value: "2", label: "Sometimes do that" },
    { value: "3", label: "Often do that" },
    { value: "4", label: "Always do that" },
  ],
  workplace: [
    { value: "0", label: "Never" },
    { value: "1", label: "Rarely (a few times a month)" },
    { value: "2", label: "Sometimes (once a week)" },
    { value: "3", label: "Often (several times a week)" },
    { value: "4", label: "Very often (almost daily)" },
  ],
};

type AssessmentResults = {
  score: number;
  feedback: string;
  recommendations: string[];
};

interface SelfAssessmentQuizProps {
  questions?: QuizQuestion[];
  quizType?: string;
}

const SelfAssessmentQuiz = ({ 
  questions = [], 
  quizType = "mood" 
}: SelfAssessmentQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [questionSetIndex, setQuestionSetIndex] = useState(0);
  const { toast } = useToast();

  // For large question sets, we'll paginate them
  const questionsPerPage = 10;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestionSet = questions.slice(
    questionSetIndex * questionsPerPage,
    (questionSetIndex + 1) * questionsPerPage
  );

  const currentQuestion = currentQuestionSet[currentQuestionIndex];
  const absoluteQuestionIndex = questionSetIndex * questionsPerPage + currentQuestionIndex;
  const progress = ((absoluteQuestionIndex + 1) / questions.length) * 100;
  const isLastQuestion = absoluteQuestionIndex === questions.length - 1;
  const isLastInSet = currentQuestionIndex === currentQuestionSet.length - 1;
  
  // Get current quiz details
  const currentQuiz = QUIZ_TYPES.find(q => q.id === quizType) || QUIZ_TYPES[0];
  
  // Choose appropriate options based on quiz type
  const options = customOptionsMap[quizType] || standardOptions;

  // Check for existing answer when navigating
  useEffect(() => {
    if (currentQuestion) {
      const existingAnswer = answers[currentQuestion.text];
      if (existingAnswer !== undefined) {
        setCurrentAnswer(existingAnswer.toString());
      } else {
        setCurrentAnswer(null);
      }
    }
  }, [currentQuestionIndex, questionSetIndex, currentQuestion, answers]);

  // Handle depression quiz question about self-harm
  useEffect(() => {
    if (quizType === "depression" && 
        currentQuestion && 
        currentQuestion.text.includes("thoughts that you would be better off dead") && 
        parseInt(currentAnswer || "0") >= 2) {
      setShowCrisisAlert(true);
    } else {
      setShowCrisisAlert(false);
    }
  }, [currentAnswer, currentQuestion, quizType]);

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value);
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (questionSetIndex > 0) {
      setQuestionSetIndex(questionSetIndex - 1);
      setCurrentQuestionIndex(questionsPerPage - 1);
    }
  };

  const handleNext = () => {
    if (currentAnswer === null) return;

    // Save current answer
    const updatedAnswers = {
      ...answers,
      [currentQuestion.text]: parseInt(currentAnswer),
    };
    
    setAnswers(updatedAnswers);

    // Navigate to next question or page
    if (isLastQuestion) {
      handleSubmit(updatedAnswers);
    } else if (isLastInSet && questionSetIndex < totalPages - 1) {
      setQuestionSetIndex(questionSetIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async (finalAnswers: Record<string, number>) => {
    setIsSubmitting(true);

    try {
      const assessmentResults = await scoreAssessment(finalAnswers, quizType);
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
    setQuestionSetIndex(0);
    setAnswers({});
    setCurrentAnswer(null);
    setResults(null);
    setShowCrisisAlert(false);
  };

  const getOptionLabel = (option: { value: string, label: string }) => {
    // For reverse-scored items in stress assessment
    if (quizType === 'stress' && currentQuestion?.text.includes("confident") || 
        currentQuestion?.text.includes("going your way") ||
        currentQuestion?.text.includes("control irritations") ||
        currentQuestion?.text.includes("on top of things")) {
      // Display the same label but note it's reverse-scored
      return option.label;
    }
    return option.label;
  };

  if (!questions.length) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>No Questions Available</CardTitle>
          <CardDescription>
            Unable to load assessment questions. Please try again later.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (results) {
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            {currentQuiz.name} Results
          </CardTitle>
          <CardDescription>
            Thank you for completing the {currentQuiz.name.toLowerCase()}. Here are your results:
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
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={restartQuiz}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Retake This Assessment
          </Button>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Choose Different Assessment
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>{currentQuiz.name}</CardTitle>
        <CardDescription>
          {currentQuiz.description}. Your responses are anonymous and not stored beyond this session.
        </CardDescription>
        <Progress value={progress} className="mt-2" />
        <div className="text-sm text-muted-foreground mt-2">
          Question {absoluteQuestionIndex + 1} of {questions.length}
          {totalPages > 1 && ` (Page ${questionSetIndex + 1} of ${totalPages})`}
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{currentQuestion?.text}</h3>
          
          {showCrisisAlert && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription>
                If you're having thoughts of harming yourself, please reach out for help immediately:
                <ul className="list-disc list-inside mt-2">
                  <li>National Suicide Prevention Lifeline: 988 or 1-800-273-8255</li>
                  <li>Crisis Text Line: Text HOME to 741741</li>
                  <li>Or go to your nearest emergency room</li>
                </ul>
              </AlertDescription>
            </Alert>
          )}
          
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
                  id={`${currentQuestion?.id}-${option.value}`}
                />
                <Label
                  htmlFor={`${currentQuestion?.id}-${option.value}`}
                  className="flex-1 cursor-pointer"
                >
                  {getOptionLabel(option)}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={absoluteQuestionIndex === 0}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
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
