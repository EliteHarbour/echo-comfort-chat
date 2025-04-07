
import { QuizQuestion } from "./api";

// Anxiety Screening Quiz (GAD-7)
const anxietyQuiz: QuizQuestion[] = [
  {
    id: "anxiety-1",
    text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?"
  },
  {
    id: "anxiety-2",
    text: "Over the last 2 weeks, how often have you been unable to stop or control worrying?"
  },
  {
    id: "anxiety-3",
    text: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?"
  },
  {
    id: "anxiety-4",
    text: "Over the last 2 weeks, how often have you had trouble relaxing?"
  },
  {
    id: "anxiety-5",
    text: "Over the last 2 weeks, how often have you been so restless that it's hard to sit still?"
  },
  {
    id: "anxiety-6",
    text: "Over the last 2 weeks, how often have you become easily annoyed or irritable?"
  },
  {
    id: "anxiety-7",
    text: "Over the last 2 weeks, how often have you felt afraid as if something awful might happen?"
  }
];

// Depression Screening Quiz (PHQ-9)
const depressionQuiz: QuizQuestion[] = [
  {
    id: "depression-1",
    text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?"
  },
  {
    id: "depression-2",
    text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?"
  },
  {
    id: "depression-3",
    text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?"
  },
  {
    id: "depression-4",
    text: "Over the last 2 weeks, how often have you felt tired or had little energy?"
  },
  {
    id: "depression-5",
    text: "Over the last 2 weeks, how often have you had poor appetite or overeating?"
  },
  {
    id: "depression-6",
    text: "Over the last 2 weeks, how often have you felt bad about yourself—or that you're a failure or have let yourself or your family down?"
  },
  {
    id: "depression-7",
    text: "Over the last 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?"
  },
  {
    id: "depression-8",
    text: "Over the last 2 weeks, how often have you moved or spoken so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you've been moving around a lot more than usual?"
  },
  {
    id: "depression-9",
    text: "Over the last two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?"
  }
];

// Stress Level Assessment Quiz
const stressQuiz: QuizQuestion[] = [
  {
    id: "stress-1",
    text: "In the last month, how often have you felt that you were unable to control the important things in your life?"
  },
  {
    id: "stress-2",
    text: "In the last month, how often have you felt confident about your ability to handle your personal problems?"
  },
  {
    id: "stress-3",
    text: "In the last month, how often have you felt that things were going your way?"
  },
  {
    id: "stress-4",
    text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?"
  },
  {
    id: "stress-5",
    text: "In the last month, how often have you found that you could not cope with all the things that you had to do?"
  },
  {
    id: "stress-6",
    text: "In the last month, how often have you been able to control irritations in your life?"
  },
  {
    id: "stress-7",
    text: "In the last month, how often have you felt that you were on top of things?"
  },
  {
    id: "stress-8",
    text: "In the last month, how often have you been angered because of things that were outside of your control?"
  },
  {
    id: "stress-9",
    text: "In the last month, how often have you felt nervous and stressed?"
  },
  {
    id: "stress-10",
    text: "In the last month, how often have you found yourself thinking about things that you have to accomplish?"
  }
];

// Sleep Quality Quiz
const sleepQuiz: QuizQuestion[] = [
  {
    id: "sleep-1",
    text: "How long does it typically take you to fall asleep after going to bed?"
  },
  {
    id: "sleep-2",
    text: "How many times do you typically wake up during the night?"
  },
  {
    id: "sleep-3",
    text: "How would you rate your overall sleep quality in the past month?"
  },
  {
    id: "sleep-4",
    text: "How often do you feel tired or fatigued during the day due to poor sleep?"
  },
  {
    id: "sleep-5",
    text: "How many hours of actual sleep do you get on a typical night?"
  },
  {
    id: "sleep-6",
    text: "How often do you use electronic devices (phone, tablet, TV) within 30 minutes of going to bed?"
  },
  {
    id: "sleep-7",
    text: "How satisfied are you with your current sleep pattern?"
  },
  {
    id: "sleep-8",
    text: "How often do you use sleep medication (prescribed or over-the-counter)?"
  }
];

// Personal Values Clarification Quiz (sample subset)
const valuesQuiz: QuizQuestion[] = [
  {
    id: "values-1",
    text: "Continuously expanding my knowledge through reading, courses, or other learning opportunities."
  },
  {
    id: "values-2",
    text: "Exploring new ideas and perspectives that challenge my current thinking."
  },
  {
    id: "values-3",
    text: "Being true to myself even when others might not understand my choices."
  },
  {
    id: "values-4",
    text: "Living in alignment with my true self rather than meeting others' expectations."
  },
  {
    id: "values-5",
    text: "Viewing challenges as opportunities for growth rather than obstacles."
  },
  {
    id: "values-6",
    text: "Learning valuable lessons from my mistakes and failures."
  },
  {
    id: "values-7",
    text: "Being honest in all my dealings, even when there might be personal cost."
  },
  {
    id: "values-8",
    text: "Having deep, meaningful connections with family members."
  },
  {
    id: "values-9",
    text: "Developing and maintaining close friendships."
  },
  {
    id: "values-10",
    text: "Understanding others' perspectives and feelings, even when different from mine."
  },
  {
    id: "values-11",
    text: "Contributing positively to my community or society."
  },
  {
    id: "values-12",
    text: "Doing work that aligns with my personal values and beliefs."
  },
  {
    id: "values-13",
    text: "Making a positive difference through my professional contributions."
  },
  {
    id: "values-14",
    text: "Taking care of my physical health through exercise and nutrition."
  },
  {
    id: "values-15",
    text: "Finding meaning in both joyful and difficult life experiences."
  }
];

// Emotional Intelligence (EQ) Assessment Quiz (sample subset)
const emotionalIntelligenceQuiz: QuizQuestion[] = [
  {
    id: "eq-1",
    text: "I can accurately identify when I'm feeling stressed versus when I'm feeling angry."
  },
  {
    id: "eq-2",
    text: "I can describe my emotions in detail beyond just \"good\" or \"bad.\""
  },
  {
    id: "eq-3",
    text: "I understand how my emotions affect my decision-making."
  },
  {
    id: "eq-4",
    text: "I can remain composed even when I'm feeling stressed."
  },
  {
    id: "eq-5",
    text: "I take time to calm down before responding when I'm upset."
  },
  {
    id: "eq-6",
    text: "I can adapt my plans when circumstances change unexpectedly."
  },
  {
    id: "eq-7",
    text: "I pursue goals with energy and persistence."
  },
  {
    id: "eq-8",
    text: "I can motivate myself to do tasks even when I don't feel like doing them."
  },
  {
    id: "eq-9",
    text: "I look for the positive aspects in difficult situations."
  },
  {
    id: "eq-10",
    text: "I can recognize emotions in others by observing their facial expressions and body language."
  },
  {
    id: "eq-11",
    text: "I listen attentively when others share their feelings or experiences."
  },
  {
    id: "eq-12",
    text: "I can understand others' perspectives even when I disagree with them."
  },
  {
    id: "eq-13",
    text: "I notice when someone is feeling uncomfortable or distressed in a situation."
  },
  {
    id: "eq-14",
    text: "I consider how my actions might affect others' feelings."
  },
  {
    id: "eq-15",
    text: "I communicate my thoughts and feelings clearly to others."
  },
  {
    id: "eq-16",
    text: "I can build rapport with different types of people."
  },
  {
    id: "eq-17",
    text: "I'm effective at resolving conflicts between people."
  },
  {
    id: "eq-18",
    text: "I adapt my communication style to fit different people and situations."
  },
  {
    id: "eq-19",
    text: "I maintain healthy boundaries in relationships."
  },
  {
    id: "eq-20",
    text: "I can read the social dynamics in a group situation."
  }
];

// Coping Mechanism Identifier Quiz (sample subset)
const copingQuiz: QuizQuestion[] = [
  {
    id: "coping-1",
    text: "When I'm in pain or stressed, I worry all the time about whether it will end."
  },
  {
    id: "coping-2",
    text: "When I'm experiencing difficulties, I feel I can't go on."
  },
  {
    id: "coping-3",
    text: "When I'm facing problems, I think \"This is terrible and is never going to get any better.\""
  },
  {
    id: "coping-4",
    text: "I try to ignore the discomfort or stress I'm feeling."
  },
  {
    id: "coping-5",
    text: "I don't pay attention to the stress or pain."
  },
  {
    id: "coping-6",
    text: "I try to think about something pleasant when I'm stressed."
  },
  {
    id: "coping-7",
    text: "I imagine myself in pleasant situations or places when dealing with problems."
  },
  {
    id: "coping-8",
    text: "I tell myself the discomfort or stress is a signal of progress, not a problem."
  },
  {
    id: "coping-9",
    text: "I rely on my faith in God or a higher power to get me through difficult times."
  },
  {
    id: "coping-10",
    text: "I tell myself I can overcome the stress or pain."
  },
  {
    id: "coping-11",
    text: "No matter how bad it gets, I know I can handle it."
  },
  {
    id: "coping-12",
    text: "How satisfied are you with your ability to cope with stress and difficult situations?"
  }
];

// Workplace Stress Evaluation Quiz (sample subset)
const workplaceQuiz: QuizQuestion[] = [
  {
    id: "workplace-1",
    text: "How often do you feel overwhelmed by your workload?"
  },
  {
    id: "workplace-2",
    text: "How frequently do you work beyond regular hours to complete your tasks?"
  },
  {
    id: "workplace-3",
    text: "How often do you face unrealistic deadlines that create pressure?"
  },
  {
    id: "workplace-4",
    text: "How often do you feel you have little or no control over your work priorities?"
  },
  {
    id: "workplace-5",
    text: "How frequently are you excluded from decisions that directly affect your work?"
  },
  {
    id: "workplace-6",
    text: "How often do you receive unclear or conflicting instructions about your job responsibilities?"
  },
  {
    id: "workplace-7",
    text: "How frequently do you feel caught between conflicting demands from different stakeholders?"
  },
  {
    id: "workplace-8",
    text: "How often do you experience conflict or tension with colleagues?"
  },
  {
    id: "workplace-9",
    text: "How frequently do you feel a lack of support from your manager or supervisor?"
  },
  {
    id: "workplace-10",
    text: "How often do you worry about job security or potential layoffs?"
  },
  {
    id: "workplace-11",
    text: "How often does work interfere with your personal life or family responsibilities?"
  },
  {
    id: "workplace-12",
    text: "How frequently do you think about work-related issues during your personal time?"
  },
  {
    id: "workplace-13",
    text: "How often do you feel that your workplace culture is overly competitive or unsupportive?"
  },
  {
    id: "workplace-14",
    text: "How often do you experience physical symptoms (headaches, muscle tension, fatigue) that you attribute to work stress?"
  },
  {
    id: "workplace-15",
    text: "How often do you have difficulty sleeping due to work-related concerns?"
  }
];

// Cognitive Processing Assessment Quiz
const cognitiveQuiz: QuizQuestion[] = [
  {
    id: "cognitive-1",
    text: "When facing a new situation, I prefer to: (1) Rely on concrete facts and past experiences, (2) Explore possibilities and theoretical implications, (3) Combine both approaches equally, (4) It depends entirely on the specific situation"
  },
  {
    id: "cognitive-2",
    text: "I find it easier to remember: (1) Specific details and facts, (2) Overall concepts and connections, (3) Both equally well, (4) It depends on the subject matter"
  },
  {
    id: "cognitive-3",
    text: "When making important decisions, I typically: (1) Create a detailed list of pros and cons, (2) Trust my instincts and overall impression, (3) Use both approaches equally, (4) It depends on the type of decision"
  },
  {
    id: "cognitive-4",
    text: "When learning something new, I prefer: (1) Step-by-step instructions, (2) Understanding the overall concept first, (3) A mix of both approaches, (4) It depends on what I'm learning"
  },
  {
    id: "cognitive-5",
    text: "When solving problems, I typically: (1) Follow established procedures, (2) Develop innovative approaches, (3) Use both conventional and creative methods, (4) Change my approach based on the specific problem"
  }
];

// Social Engagement Assessment Quiz
const socialEngagementQuiz: QuizQuestion[] = [
  {
    id: "social-1",
    text: "After spending time with a large group of people, I typically feel: (1) Energized and wanting more social interaction, (2) Drained and needing time alone to recharge, (3) Somewhat tired but still positive about the experience, (4) It depends entirely on the specific people and context"
  },
  {
    id: "social-2",
    text: "I prefer social gatherings that are: (1) Large, lively, and full of activity, (2) Small, intimate, with meaningful conversation, (3) Moderate-sized with a mix of activities and conversation, (4) Varied depending on my mood and energy level"
  },
  {
    id: "social-3",
    text: "When meeting new people, I usually: (1) Initiate conversation and actively engage, (2) Wait for others to approach me first, (3) Gradually warm up as I become comfortable, (4) Act differently depending on the social context"
  },
  {
    id: "social-4",
    text: "I process my thoughts best by: (1) Talking them through with others, (2) Reflecting on them privately, (3) A combination of discussion and private reflection, (4) Different methods depending on the type of thoughts"
  },
  {
    id: "social-5",
    text: "I generally prefer: (1) Working collaboratively in groups, (2) Working independently on my own, (3) A mix of collaborative and independent work, (4) Whatever approach best suits the specific task"
  }
];

// Emotional Landscape Assessment Quiz
const emotionalLandscapeQuiz: QuizQuestion[] = [
  {
    id: "emotional-1",
    text: "When I experience strong emotions, I typically: (1) Express them openly and immediately, (2) Keep them to myself and process them privately, (3) Share them selectively with trusted people, (4) Handle them differently depending on the specific emotion"
  },
  {
    id: "emotional-2",
    text: "I would describe my emotional state as generally: (1) Highly expressive and variable, (2) Even-keeled and consistent, (3) Moderately expressive with occasional intensity, (4) Varying significantly depending on circumstances"
  },
  {
    id: "emotional-3",
    text: "When others share their emotional challenges with me, I tend to: (1) Offer solutions and practical advice, (2) Listen and empathize with their feelings, (3) Balance empathy with practical support, (4) Respond differently based on the person and situation"
  },
  {
    id: "emotional-4",
    text: "When faced with a setback, my first reaction is usually: (1) Strong emotional response (frustration, disappointment, etc.), (2) Calm acceptance and practical problem-solving, (3) Brief emotional acknowledgment followed by problem-solving, (4) Variable depending on the importance of the setback"
  },
  {
    id: "emotional-5",
    text: "I would describe my approach to my own emotions as: (1) Openly embracing and expressing them, (2) Analyzing and understanding them rationally, (3) Acknowledging them while maintaining perspective, (4) Different approaches for different emotions"
  }
];

// Motivational Drivers Assessment Quiz
const motivationalQuiz: QuizQuestion[] = [
  {
    id: "motivational-1",
    text: "When setting personal goals, I tend to: (1) Aim very high, striving for exceptional achievement, (2) Set realistic, comfortable goals I know I can achieve, (3) Set challenging but attainable goals, (4) Set different types of goals in different areas of my life"
  },
  {
    id: "motivational-2",
    text: "Recognition from others for my accomplishments is: (1) Very important to my sense of satisfaction, (2) Not particularly important to how I feel about my work, (3) Somewhat nice but not my primary motivation, (4) Important in some contexts but not others"
  },
  {
    id: "motivational-3",
    text: "When faced with a difficult challenge, I typically: (1) Feel energized and motivated to overcome it, (2) Feel concerned about potential failure, (3) Experience a mix of excitement and apprehension, (4) React differently depending on the type of challenge"
  },
  {
    id: "motivational-4",
    text: "I am most motivated by work that: (1) Offers opportunities for advancement and achievement, (2) Aligns with my personal values and interests, (3) Provides a balance of achievement and meaning, (4) Varies based on my current priorities and life stage"
  },
  {
    id: "motivational-5",
    text: "When I succeed at something, I typically: (1) Quickly look for the next, greater challenge, (2) Feel satisfied and content with my accomplishment, (3) Feel good while considering what's next, (4) React differently depending on what I've accomplished"
  }
];

// Adaptability Patterns Assessment Quiz
const adaptabilityQuiz: QuizQuestion[] = [
  {
    id: "adaptability-1",
    text: "When faced with unexpected changes, I typically: (1) Welcome them as exciting opportunities, (2) Feel uncomfortable and prefer maintaining stability, (3) Accept them while needing some adjustment time, (4) React differently depending on the type of change"
  },
  {
    id: "adaptability-2",
    text: "I would describe my preference for routine as: (1) Low, I enjoy variety and frequent changes, (2) High, I thrive with consistent, predictable patterns, (3) Moderate, appreciating both routine and novelty, (4) Dependent on the area of life (e.g., work vs. leisure)"
  },
  {
    id: "adaptability-3",
    text: "When learning about different cultural perspectives, I typically: (1) Eagerly embrace new viewpoints and reconsider my own, (2) Prefer to maintain my established perspectives, (3) Consider new viewpoints while maintaining core values, (4) Vary in openness depending on the specific topic"
  },
  {
    id: "adaptability-4",
    text: "When plans need to change at the last minute, I: (1) Easily adjust and may even enjoy the spontaneity, (2) Feel significantly disrupted and frustrated, (3) Feel initial disappointment but can adapt reasonably well, (4) React differently depending on the importance of the plans"
  },
  {
    id: "adaptability-5",
    text: "I approach new technologies or ways of doing things: (1) With enthusiasm and eagerness to incorporate them, (2) With caution, preferring proven methods, (3) With measured interest, adopting what seems beneficial, (4) Differently depending on the specific innovation"
  }
];

// Function to get questions for a specific quiz type
export const getQuizQuestions = (quizType: string): QuizQuestion[] => {
  switch (quizType) {
    case 'anxiety':
      return anxietyQuiz;
    case 'depression':
      return depressionQuiz;
    case 'stress':
      return stressQuiz;
    case 'sleep':
      return sleepQuiz;
    case 'values':
      return valuesQuiz;
    case 'emotional-intelligence':
      return emotionalIntelligenceQuiz;
    case 'coping':
      return copingQuiz;
    case 'workplace':
      return workplaceQuiz;
    case 'cognitive':
      return cognitiveQuiz;
    case 'social-engagement':
      return socialEngagementQuiz;
    case 'emotional-landscape':
      return emotionalLandscapeQuiz;
    case 'motivational':
      return motivationalQuiz;
    case 'adaptability':
      return adaptabilityQuiz;
    default:
      return anxietyQuiz; // Default to anxiety quiz if an invalid type is provided
  }
};
