const LLM7_API_KEY = "unused"; // Free access as per LLM7.io documentation
const API_URL = "https://api.llm7.io/v1/chat/completions";

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
    name: 'Anxiety Screening (GAD-7)',
    description: 'Clinical tool to measure anxiety severity',
    category: 'screening'
  },
  {
    id: 'depression',
    name: 'Depression Screening (PHQ-9)',
    description: 'Standard clinical assessment for depression symptoms',
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

const STANDARD_ASSESSMENTS: Record<string, QuizQuestion[]> = {
  anxiety: [
    { id: "a1", text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?" },
    { id: "a2", text: "Over the last 2 weeks, how often have you been unable to stop or control worrying?" },
    { id: "a3", text: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?" },
    { id: "a4", text: "Over the last 2 weeks, how often have you had trouble relaxing?" },
    { id: "a5", text: "Over the last 2 weeks, how often have you been so restless that it's hard to sit still?" },
    { id: "a6", text: "Over the last 2 weeks, how often have you become easily annoyed or irritable?" },
    { id: "a7", text: "Over the last 2 weeks, how often have you felt afraid as if something awful might happen?" }
  ],
  depression: [
    { id: "d1", text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?" },
    { id: "d2", text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?" },
    { id: "d3", text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?" },
    { id: "d4", text: "Over the last 2 weeks, how often have you felt tired or had little energy?" },
    { id: "d5", text: "Over the last 2 weeks, how often have you had poor appetite or overeating?" },
    { id: "d6", text: "Over the last 2 weeks, how often have you felt bad about yourself—or that you're a failure or have let yourself or your family down?" },
    { id: "d7", text: "Over the last 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?" },
    { id: "d8", text: "Over the last 2 weeks, how often have you moved or spoken so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you've been moving around a lot more than usual?" },
    { id: "d9", text: "Over the last two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?" }
  ],
  stress: [
    { id: "s1", text: "In the last month, how often have you felt that you were unable to control the important things in your life?" },
    { id: "s2", text: "In the last month, how often have you felt confident about your ability to handle your personal problems?" },
    { id: "s3", text: "In the last month, how often have you felt that things were going your way?" },
    { id: "s4", text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?" },
    { id: "s5", text: "In the last month, how often have you found that you could not cope with all the things that you had to do?" },
    { id: "s6", text: "In the last month, how often have you been able to control irritations in your life?" },
    { id: "s7", text: "In the last month, how often have you felt that you were on top of things?" },
    { id: "s8", text: "In the last month, how often have you been angered because of things that were outside of your control?" },
    { id: "s9", text: "In the last month, how often have you felt nervous and stressed?" },
    { id: "s10", text: "In the last month, how often have you found yourself thinking about things that you have to accomplish?" }
  ],
  sleep: [
    { id: "sl1", text: "How long does it typically take you to fall asleep after going to bed?" },
    { id: "sl2", text: "How many times do you typically wake up during the night?" },
    { id: "sl3", text: "How would you rate your overall sleep quality in the past month?" },
    { id: "sl4", text: "How often do you feel tired or fatigued during the day due to poor sleep?" },
    { id: "sl5", text: "How many hours of actual sleep do you get on a typical night?" },
    { id: "sl6", text: "How often do you use electronic devices (phone, tablet, TV) within 30 minutes of going to bed?" },
    { id: "sl7", text: "How satisfied are you with your current sleep pattern?" },
    { id: "sl8", text: "How often do you use sleep medication (prescribed or over-the-counter)?" }
  ],
};

const ASSESSMENT_INTERPRETATION: Record<string, string> = {
  anxiety: `
Scoring: 
0–4: Minimal anxiety - Consider self-care resources.
5–9: Mild anxiety - Mindfulness exercises and brief counseling may help.
10–14: Moderate anxiety - Structured therapy sessions could be beneficial.
15–21: Severe anxiety - Professional support and crisis resources are recommended.
  `,
  depression: `
Scoring:
0–4 points: Minimal depression - Self-care strategies like mindfulness exercises are recommended.
5–9 points: Mild depression - Consider lifestyle changes and light therapy resources.
10–14 points: Moderate depression - Structured therapy options and coping mechanisms may help.
15–19 points: Moderately severe depression - Professional counseling and support groups are advised.
20–27 points: Severe depression - Immediate professional intervention and crisis resources are recommended.

Note: If you scored anything above 0 on question 9 about self-harm, please reach out to a mental health professional right away.
  `,
  stress: `
Scoring:
0-13: Low stress - Preventive resources and general wellness techniques may help maintain your wellbeing.
14-26: Moderate stress - Specific stress management techniques and mindfulness exercises are recommended.
27-40: High stress - Consider comprehensive stress reduction strategies and professional support options.
  `,
  sleep: `
Scoring:
0-7: Minimal sleep issues - Preventive sleep hygiene techniques can help maintain good sleep.
8-14: Mild sleep problems - Basic sleep improvement strategies may be beneficial.
15-19: Moderate sleep disruption - A comprehensive sleep hygiene program is recommended.
20-24: Severe sleep issues - Consider professional consultation alongside self-help resources.
  `,
};

const STANDARD_RECOMMENDATIONS: Record<string, Record<string, string[]>> = {
  anxiety: {
    minimal: [
      "Practice regular mindfulness meditation for 10 minutes daily",
      "Maintain physical activity like walking or yoga",
      "Keep a worry journal to track and manage anxious thoughts",
      "Establish consistent sleep and relaxation routines"
    ],
    mild: [
      "Try guided meditation apps designed specifically for anxiety",
      "Practice deep breathing exercises during moments of worry",
      "Consider workbooks on cognitive behavioral techniques for anxiety",
      "Establish regular check-ins with a supportive friend or family member",
      "Limit caffeine and alcohol which can exacerbate anxiety"
    ],
    moderate: [
      "Consider working with a therapist who specializes in anxiety disorders",
      "Look into structured anxiety management programs or support groups",
      "Learn and practice progressive muscle relaxation techniques daily",
      "Create a consistent anti-anxiety routine including exercise, nutrition, and sleep",
      "Consider workbooks or apps based on cognitive behavioral therapy"
    ],
    severe: [
      "Consult with a mental health professional about comprehensive treatment options",
      "Explore both therapy and potential medication options with your healthcare provider",
      "Connect with support groups specifically for anxiety disorders",
      "Create a crisis plan with specific steps to take during intense anxiety",
      "Practice grounding techniques for immediate anxiety relief"
    ]
  },
  depression: {
    minimal: [
      "Engage in regular physical activity, even short walks can help improve mood",
      "Maintain social connections and reach out to friends or family",
      "Practice good sleep hygiene with consistent bedtime routines",
      "Consider gratitude journaling to focus on positive aspects of life"
    ],
    mild: [
      "Schedule enjoyable activities throughout your week",
      "Try bright light therapy, especially in the morning hours",
      "Establish a regular sleep schedule and morning routine",
      "Explore mindfulness meditation focused on self-compassion",
      "Consider lifestyle adjustments to diet, exercise, and stress management"
    ],
    moderate: [
      "Consider speaking with a therapist who specializes in depression",
      "Explore structured approaches like cognitive behavioral therapy",
      "Join a support group to connect with others with similar experiences",
      "Create an activity schedule to ensure regular engagement in fulfilling tasks",
      "Discuss treatment options with healthcare providers"
    ],
    "moderately severe": [
      "Work with a mental health professional on a comprehensive treatment plan",
      "Consider both therapy and medication options with your healthcare provider",
      "Connect with depression-specific support groups",
      "Establish a daily routine including physical activity and social connection",
      "Create a safety plan with trusted supporters for difficult times"
    ],
    severe: [
      "Seek immediate professional help from a mental health provider",
      "Discuss comprehensive treatment options including therapy and medication",
      "Consider intensive support options like intensive outpatient programs if available",
      "Create a crisis response plan with clear steps and resources",
      "Ensure regular contact with mental health professionals and support network"
    ]
  }
};

export const generateChatResponse = async (
  messages: Message[]
): Promise<string> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LLM7_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-2025-04-14",
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
    throw error;
  }
};

export const generateResource = async (
  resourceTypeOrCustomPrompt: string,
  userConcern?: string
): Promise<string> => {
  const isCustomPrompt = !userConcern && resourceTypeOrCustomPrompt.length > 20;
  
  let prompt;
  
  if (isCustomPrompt) {
    prompt = resourceTypeOrCustomPrompt;
  } else {
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

export const generateQuizQuestions = async (
  quizType: string = "mood",
  questionCount: number = 7
): Promise<QuizQuestion[]> => {
  if (STANDARD_ASSESSMENTS[quizType]) {
    return STANDARD_ASSESSMENTS[quizType];
  }
  
  try {
    let promptContent;
    
    switch (quizType) {
      case 'mood':
        promptContent = `Create ${questionCount} mood assessment questions focusing on current emotional state. Questions should help identify the user's mood patterns over the past 2 weeks.`;
        break;
      case 'values':
        promptContent = `Create ${questionCount} values clarification questions that help users identify their core personal values and what matters most to them.`;
        break;
      case 'emotional-intelligence':
        promptContent = `Create ${questionCount} emotional intelligence assessment questions that measure the user's ability to recognize and manage their own emotions and understand others' emotions. Include a mix of questions covering self-awareness, self-regulation, motivation, empathy, and social skills.`;
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
    
    try {
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
      return Array.from({ length: questionCount }, (_, i) => ({
        id: `q${i + 1}`,
        text: `Question ${i + 1} about your mental health in the past 2 weeks.`
      }));
    }
  } catch (error) {
    console.error("Failed to generate quiz questions:", error);
    return Array.from({ length: questionCount }, (_, i) => ({
      id: `q${i + 1}`,
      text: `Question ${i + 1} about your mental health in the past 2 weeks.`
    }));
  }
};

export const scoreAssessment = async (
  answers: Record<string, number>,
  quizType: string = "mood"
): Promise<{score: number; feedback: string; recommendations: string[]}> => {
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  
  let maxPossibleScore: number;
  
  switch (quizType) {
    case 'anxiety':
      maxPossibleScore = 21;
      break;
    case 'depression':
      maxPossibleScore = 27;
      break;
    case 'stress':
      maxPossibleScore = 40;
      break;
    case 'sleep':
      maxPossibleScore = 24;
      break;
    case 'values':
    case 'emotional-intelligence':
      maxPossibleScore = Object.keys(answers).length * 5;
      break;
    case 'coping':
    case 'workplace':
      maxPossibleScore = Object.keys(answers).length * 4;
      break;
    default:
      maxPossibleScore = Object.keys(answers).length * 3;
  }
  
  const normalizedScore = Math.round((totalScore / maxPossibleScore) * 100);

  if (quizType === 'anxiety' || quizType === 'depression') {
    let severityLevel: string;
    let recommendations: string[] = [];
    
    if (quizType === 'anxiety') {
      if (totalScore <= 4) severityLevel = 'minimal';
      else if (totalScore <= 9) severityLevel = 'mild';
      else if (totalScore <= 14) severityLevel = 'moderate';
      else severityLevel = 'severe';
      
      recommendations = STANDARD_RECOMMENDATIONS.anxiety[severityLevel];
    }
    
    if (quizType === 'depression') {
      if (totalScore <= 4) severityLevel = 'minimal';
      else if (totalScore <= 9) severityLevel = 'mild';
      else if (totalScore <= 14) severityLevel = 'moderate';
      else if (totalScore <= 19) severityLevel = 'moderately severe';
      else severityLevel = 'severe';
      
      recommendations = STANDARD_RECOMMENDATIONS.depression[severityLevel];
      
      const suicidalIdeationQuestion = "Over the last two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?";
      if (answers[suicidalIdeationQuestion] && answers[suicidalIdeationQuestion] >= 2) {
        recommendations.unshift("Contact a crisis helpline immediately: Call or text 988 to reach the Suicide & Crisis Lifeline");
      }
    }
    
    const interpretationText = ASSESSMENT_INTERPRETATION[quizType] || "";
    const feedback = `Your score is ${totalScore}, which indicates ${severityLevel} level symptoms.\n\n${interpretationText}`;
    
    return {
      score: normalizedScore,
      feedback,
      recommendations
    };
  }
  
  try {
    const answersString = Object.entries(answers)
      .map(([question, score]) => `Question: ${question}, Score: ${score}`)
      .join("\n");
    
    let contextPrompt;
    switch (quizType) {
      case 'mood':
        contextPrompt = "mood assessment focusing on emotional state patterns";
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
      
    const prompt = `I've taken a ${contextPrompt}. Here are my answers (scores vary by assessment type):
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
      score: normalizedScore,
      feedback: "I'm sorry, but I couldn't process your assessment right now. Please try again later.",
      recommendations: ["Take a break and practice self-care", "Try again later when the system is available"],
    };
  }
};
