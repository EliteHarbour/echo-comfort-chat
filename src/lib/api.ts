
// OpenRouter AI API interface
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

export const generateChatResponse = async (
  messages: Message[]
): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
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
  resourceType: string,
  userConcern?: string
): Promise<string> => {
  const prompt = `Create a helpful resource about ${resourceType}${
    userConcern ? ` for someone dealing with ${userConcern}` : ""
  }. Include an introduction, key points, practical exercises, and a conclusion. Format with markdown.`;
  
  try {
    const messages: Message[] = [
      {
        role: "system",
        content: "You are a compassionate mental health professional creating helpful resources. Be supportive, practical, and evidence-based.",
      },
      { role: "user", content: prompt },
    ];
    
    return await generateChatResponse(messages);
  } catch (error) {
    console.error("Failed to generate resource:", error);
    return "I'm sorry, but I couldn't generate this resource right now. Please try again later.";
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
