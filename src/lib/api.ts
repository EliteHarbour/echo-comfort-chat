
const OPENROUTER_API_KEY = "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";
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: Message;
    index: number;
    finish_reason: string;
  }[];
};

export type QuizQuestion = {
  id: string;
  text: string;
};

export const generateChatResponse = async (
  messages: Message[]
): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo", // Using a model available in the free tier
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Failed to generate chat response:", error);
    return "I'm sorry, but I'm having trouble connecting right now. Please try again in a moment.";
  }
};

// Generate a resource using the AI
export const generateResource = async (
  resourceTypeOrCustomPrompt: string,
  userConcern?: string
): Promise<string> => {
  // Check if this is a custom prompt or a resource type
  const isCustomPrompt = !userConcern && resourceTypeOrCustomPrompt.length > 20;
  
  let prompt;
  
  if (isCustomPrompt) {
    // Use the input directly as a custom prompt
    prompt = resourceTypeOrCustomPrompt;
  } else {
    // Format as a resource type prompt
    prompt = `Create a helpful resource about ${resourceTypeOrCustomPrompt}${
      userConcern ? ` for someone dealing with ${userConcern}` : ""
    }. Include an introduction, key points, practical exercises, and a conclusion. Format with markdown.`;
  }
  
  try {
    const messages: Message[] = [
      {
        role: "system",
        content: "You are a compassionate mental health professional creating helpful resources. Be supportive, practical, and evidence-based. Format your response with markdown, including headings, bullet points, and emphasized text where appropriate.",
      },
      { role: "user", content: prompt },
    ];
    
    return await generateChatResponse(messages);
  } catch (error) {
    console.error("Failed to generate resource:", error);
    return "I'm sorry, but I couldn't generate this resource right now. Please try again later.";
  }
};

// Generate quiz questions using AI
export const generateQuizQuestions = async (
  topic: string = "mental health",
  questionCount: number = 7
): Promise<QuizQuestion[]> => {
  try {
    const prompt = `Create ${questionCount} mental health self-assessment questions about ${topic}. 
    Format each question with an id and text property, with questions focused on symptoms and experiences 
    over the past 2 weeks. Return as valid JSON array that I can parse directly.`;

    const messages: Message[] = [
      {
        role: "system",
        content: "You are an expert psychologist creating mental health assessment questions. Create questions similar to established mental health screening tools. Output ONLY valid JSON without any explanation or markdown.",
      },
      { role: "user", content: prompt },
    ];
    
    const response = await generateChatResponse(messages);
    
    // Try to parse the response as JSON
    try {
      // In case the response has markdown code blocks, try to extract just the JSON
      const jsonMatch = response.match(/```(?:json)?([\s\S]*?)```/) || 
                       [null, response];
      const jsonContent = jsonMatch[1].trim();
      
      const parsedQuestions = JSON.parse(jsonContent);
      return parsedQuestions.map((q: any, index: number) => ({
        id: q.id || `q${index + 1}`,
        text: q.text
      }));
    } catch (parseError) {
      console.error("Failed to parse question response:", parseError);
      // If parsing fails, return default questions
      return Array.from({ length: questionCount }, (_, i) => ({
        id: `q${i + 1}`,
        text: `Question ${i + 1} about your mental health in the past 2 weeks.`
      }));
    }
  } catch (error) {
    console.error("Failed to generate quiz questions:", error);
    // Return default questions if API call fails
    return Array.from({ length: questionCount }, (_, i) => ({
      id: `q${i + 1}`,
      text: `Question ${i + 1} about your mental health in the past 2 weeks.`
    }));
  }
};

// Score assessment quiz
export const scoreAssessment = async (
  answers: Record<string, number>
): Promise<{score: number; feedback: string; recommendations: string[]}> => {
  try {
    const answersString = Object.entries(answers)
      .map(([question, score]) => `Question: ${question}, Score: ${score}`)
      .join("\n");
      
    const prompt = `I've taken a mental health self-assessment. Here are my answers (0-4 scale, higher means more frequent/severe):
${answersString}

Based on these answers, please provide:
1. A supportive assessment of my current mental state
2. 3-5 specific recommendations for resources or coping strategies
`;

    const messages: Message[] = [
      {
        role: "system",
        content: "You are a compassionate mental health professional analyzing self-assessment results. Provide supportive, non-diagnostic feedback and practical recommendations.",
      },
      { role: "user", content: prompt },
    ];
    
    const response = await generateChatResponse(messages);
    
    // Parse the response to extract the score and feedback
    const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const maxPossibleScore = Object.keys(answers).length * 4;
    const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);
    
    // Extract recommendations from the response
    const recommendations = response
      .split(/\d+\.\s/)
      .filter(item => item.trim().length > 10)
      .map(item => item.trim())
      .slice(0, 5);
    
    return {
      score: normalizedScore,
      feedback: response,
      recommendations: recommendations,
    };
  } catch (error) {
    console.error("Failed to score assessment:", error);
    return {
      score: 0,
      feedback: "I'm sorry, but I couldn't process your assessment right now. Please try again later.",
      recommendations: ["Take a break and practice self-care", "Try again later when the system is available"],
    };
  }
};
