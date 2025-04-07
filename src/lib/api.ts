
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

export type QuizType = {
  id: string;
  name: string;
  description: string;
  category: 'screening' | 'self-discovery' | 'situation' | 'resource-matching' | 'progress';
};

export const QUIZ_TYPES: QuizType[] = [
  // Screening quizzes
  {
    id: 'mood',
    name: 'Mood Assessment',
    description: 'Evaluate your current emotional state and get personalized resources',
    category: 'screening'
  },
  {
    id: 'anxiety',
    name: 'Anxiety Screening',
    description: 'Based on GAD-7 to measure anxiety levels',
    category: 'screening'
  },
  {
    id: 'depression',
    name: 'Depression Screening',
    description: 'Similar to PHQ-9 to identify potential depression symptoms',
    category: 'screening'
  },
  {
    id: 'stress',
    name: 'Stress Level Assessment',
    description: 'Measures your stress levels and recommends coping strategies',
    category: 'screening'
  },
  {
    id: 'sleep',
    name: 'Sleep Quality Quiz',
    description: 'Evaluates sleep patterns and suggests improvement techniques',
    category: 'screening'
  },
  
  // Self-discovery quizzes
  {
    id: 'values',
    name: 'Personal Values Clarification',
    description: 'Identify your core values to guide decision-making',
    category: 'self-discovery'
  },
  {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence Assessment',
    description: 'Measure your ability to recognize and manage emotions',
    category: 'self-discovery'
  },
  {
    id: 'coping',
    name: 'Coping Mechanism Identifier',
    description: 'Understand your current coping strategies',
    category: 'self-discovery'
  },
  {
    id: 'personal-strengths',
    name: 'Personal Strengths Finder',
    description: 'Identify strengths you can leverage during difficult situations',
    category: 'self-discovery'
  },
  
  // Situation-specific assessments
  {
    id: 'workplace',
    name: 'Workplace Stress Evaluation',
    description: 'Targeted assessment for professional challenges',
    category: 'situation'
  },
  {
    id: 'relationships',
    name: 'Relationship Health Check',
    description: 'Evaluate interpersonal relationship dynamics',
    category: 'situation'
  },
  {
    id: 'academic',
    name: 'Academic Pressure Assessment',
    description: 'For students dealing with educational stress',
    category: 'situation'
  },
  {
    id: 'life-balance',
    name: 'Life Balance Quiz',
    description: 'Identify areas of life needing more attention or resources',
    category: 'situation'
  }
];

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
  quizType: string = "mood",
  questionCount: number = 7
): Promise<QuizQuestion[]> => {
  try {
    // Define prompts based on quiz type
    let promptContent;
    
    switch (quizType) {
      case 'mood':
        promptContent = `Create ${questionCount} mood assessment questions focusing on current emotional state. Questions should help identify the user's mood patterns over the past 2 weeks.`;
        break;
      case 'anxiety':
        promptContent = `Create ${questionCount} anxiety screening questions based on validated tools like GAD-7. Focus on worry, nervousness, and anxiety symptoms over the past 2 weeks.`;
        break;
      case 'depression':
        promptContent = `Create ${questionCount} depression screening questions similar to PHQ-9. Focus on mood, interest in activities, sleep, energy, and feelings of worthlessness over the past 2 weeks.`;
        break;
      case 'stress':
        promptContent = `Create ${questionCount} stress assessment questions that measure perceived stress levels and identify stressors in the user's life over the past 2 weeks.`;
        break;
      case 'sleep':
        promptContent = `Create ${questionCount} sleep quality assessment questions that evaluate sleep patterns, difficulties falling asleep, staying asleep, and daytime functioning over the past 2 weeks.`;
        break;
      case 'values':
        promptContent = `Create ${questionCount} values clarification questions that help users identify their core personal values and what matters most to them.`;
        break;
      case 'emotional-intelligence':
        promptContent = `Create ${questionCount} emotional intelligence assessment questions that measure the user's ability to recognize and manage their own emotions and understand others' emotions.`;
        break;
      case 'coping':
        promptContent = `Create ${questionCount} questions that help identify a user's current coping mechanisms and strategies when dealing with stress or difficult situations.`;
        break;
      case 'personal-strengths':
        promptContent = `Create ${questionCount} personal strengths assessment questions that help identify the user's character strengths, talents, and abilities they can leverage during difficult situations. Include questions about past successes, natural abilities, and resilience factors.`;
        break;
      case 'workplace':
        promptContent = `Create ${questionCount} workplace stress evaluation questions that assess professional challenges, work-life balance, career satisfaction, and sources of occupational stress. Questions should help identify specific workplace stressors and their impact.`;
        break;
      case 'relationships':
        promptContent = `Create ${questionCount} relationship health assessment questions that evaluate interpersonal dynamics, communication patterns, boundaries, and emotional connection in close relationships. Questions should help identify relationship strengths and areas for improvement.`;
        break;
      case 'academic':
        promptContent = `Create ${questionCount} academic pressure assessment questions designed for students dealing with educational stress. Focus on workload management, performance anxiety, learning challenges, and academic-life balance. Questions should help identify specific educational stressors.`;
        break;
      case 'life-balance':
        promptContent = `Create ${questionCount} life balance assessment questions that help identify areas of life needing more attention or resources. Cover work, relationships, self-care, leisure, personal growth, and purpose. Questions should reveal imbalances and neglected life domains.`;
        break;
      default:
        promptContent = `Create ${questionCount} mental health self-assessment questions focusing on general wellbeing, mood, and stress over the past 2 weeks.`;
    }
    
    const prompt = `${promptContent}
    Format each question with an id and text property. 
    Return as valid JSON array that I can parse directly.`;

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
  answers: Record<string, number>,
  quizType: string = "mood"
): Promise<{score: number; feedback: string; recommendations: string[]}> => {
  try {
    const answersString = Object.entries(answers)
      .map(([question, score]) => `Question: ${question}, Score: ${score}`)
      .join("\n");
    
    // Adjust prompt based on quiz type  
    let contextPrompt;
    switch (quizType) {
      case 'mood':
        contextPrompt = "mood assessment focusing on emotional state patterns";
        break;
      case 'anxiety':
        contextPrompt = "anxiety screening similar to GAD-7";
        break;
      case 'depression':
        contextPrompt = "depression screening similar to PHQ-9";
        break;
      case 'stress':
        contextPrompt = "stress level assessment";
        break;
      case 'sleep':
        contextPrompt = "sleep quality assessment";
        break;
      case 'values':
        contextPrompt = "personal values clarification";
        break;
      case 'emotional-intelligence':
        contextPrompt = "emotional intelligence assessment";
        break;
      case 'coping':
        contextPrompt = "assessment of coping mechanisms";
        break;
      case 'personal-strengths':
        contextPrompt = "personal strengths finder assessment";
        break;
      case 'workplace':
        contextPrompt = "workplace stress evaluation";
        break;
      case 'relationships':
        contextPrompt = "relationship health check";
        break;
      case 'academic':
        contextPrompt = "academic pressure assessment for students";
        break;
      case 'life-balance':
        contextPrompt = "life balance assessment";
        break;
      default:
        contextPrompt = "mental health self-assessment";
    }
      
    const prompt = `I've taken a ${contextPrompt}. Here are my answers (0-4 scale, higher means more frequent/severe):
${answersString}

Based on these answers, please provide:
1. A supportive assessment of my current state related to this specific quiz type
2. 3-5 specific recommendations for resources or coping strategies tailored to my results
`;

    const messages: Message[] = [
      {
        role: "system",
        content: "You are a compassionate mental health professional analyzing self-assessment results. Provide supportive, non-diagnostic feedback and practical recommendations specific to the assessment type.",
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
