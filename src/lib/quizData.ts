
import { QuizQuestion } from "./api";

// Anxiety Screening Quiz (GAD-7)
const anxietyQuiz: QuizQuestion[] = [
  {
    id: "anxiety-1",
    text: "Over the last 2 weeks, how often have you been bothered by feeling nervous, anxious, or on edge?",
    type: "single-choice"
  },
  {
    id: "anxiety-2",
    text: "Over the last 2 weeks, how often have you been unable to stop or control worrying?",
    type: "single-choice"
  },
  {
    id: "anxiety-3",
    text: "Over the last 2 weeks, how often have you been bothered by worrying too much about different things?",
    type: "single-choice"
  },
  {
    id: "anxiety-4",
    text: "Over the last 2 weeks, how often have you had trouble relaxing?",
    type: "single-choice"
  },
  {
    id: "anxiety-5",
    text: "Over the last 2 weeks, how often have you been so restless that it's hard to sit still?",
    type: "single-choice"
  },
  {
    id: "anxiety-6",
    text: "Over the last 2 weeks, how often have you become easily annoyed or irritable?",
    type: "single-choice"
  },
  {
    id: "anxiety-7",
    text: "Over the last 2 weeks, how often have you felt afraid as if something awful might happen?",
    type: "single-choice"
  }
];

// Depression Screening Quiz (PHQ-9)
const depressionQuiz: QuizQuestion[] = [
  {
    id: "depression-1",
    text: "Over the last 2 weeks, how often have you been bothered by little interest or pleasure in doing things?",
    type: "single-choice"
  },
  {
    id: "depression-2",
    text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    type: "single-choice"
  },
  {
    id: "depression-3",
    text: "Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    type: "single-choice"
  },
  {
    id: "depression-4",
    text: "Over the last 2 weeks, how often have you felt tired or had little energy?",
    type: "single-choice"
  },
  {
    id: "depression-5",
    text: "Over the last 2 weeks, how often have you had poor appetite or overeating?",
    type: "single-choice"
  },
  {
    id: "depression-6",
    text: "Over the last 2 weeks, how often have you felt bad about yourself—or that you're a failure or have let yourself or your family down?",
    type: "single-choice"
  },
  {
    id: "depression-7",
    text: "Over the last 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
    type: "single-choice"
  },
  {
    id: "depression-8",
    text: "Over the last 2 weeks, how often have you moved or spoken so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you've been moving around a lot more than usual?",
    type: "single-choice"
  },
  {
    id: "depression-9",
    text: "Over the last two weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
    type: "single-choice"
  }
];

// Stress Level Assessment Quiz
const stressQuiz: QuizQuestion[] = [
  {
    id: "stress-1",
    text: "In the last month, how often have you felt that you were unable to control the important things in your life?",
    type: "single-choice"
  },
  {
    id: "stress-2",
    text: "In the last month, how often have you felt confident about your ability to handle your personal problems?",
    type: "single-choice"
  },
  {
    id: "stress-3",
    text: "In the last month, how often have you felt that things were going your way?",
    type: "single-choice"
  },
  {
    id: "stress-4",
    text: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?",
    type: "single-choice"
  },
  {
    id: "stress-5",
    text: "In the last month, how often have you found that you could not cope with all the things that you had to do?",
    type: "single-choice"
  },
  {
    id: "stress-6",
    text: "In the last month, how often have you been able to control irritations in your life?",
    type: "single-choice"
  },
  {
    id: "stress-7",
    text: "In the last month, how often have you felt that you were on top of things?",
    type: "single-choice"
  },
  {
    id: "stress-8",
    text: "In the last month, how often have you been angered because of things that were outside of your control?",
    type: "single-choice"
  },
  {
    id: "stress-9",
    text: "In the last month, how often have you felt nervous and stressed?",
    type: "single-choice"
  },
  {
    id: "stress-10",
    text: "In the last month, how often have you found yourself thinking about things that you have to accomplish?",
    type: "single-choice"
  }
];

// Sleep Quality Quiz
const sleepQuiz: QuizQuestion[] = [
  {
    id: "sleep-1",
    text: "How long does it typically take you to fall asleep after going to bed?",
    type: "single-choice"
  },
  {
    id: "sleep-2",
    text: "How many times do you typically wake up during the night?",
    type: "single-choice"
  },
  {
    id: "sleep-3",
    text: "How would you rate your overall sleep quality in the past month?",
    type: "single-choice"
  },
  {
    id: "sleep-4",
    text: "How often do you feel tired or fatigued during the day due to poor sleep?",
    type: "single-choice"
  },
  {
    id: "sleep-5",
    text: "How many hours of actual sleep do you get on a typical night?",
    type: "single-choice"
  },
  {
    id: "sleep-6",
    text: "How often do you use electronic devices (phone, tablet, TV) within 30 minutes of going to bed?",
    type: "single-choice"
  },
  {
    id: "sleep-7",
    text: "How satisfied are you with your current sleep pattern?",
    type: "single-choice"
  },
  {
    id: "sleep-8",
    text: "How often do you use sleep medication (prescribed or over-the-counter)?",
    type: "single-choice"
  }
];

// Personal Values Clarification Quiz (sample subset)
const valuesQuiz: QuizQuestion[] = [
  {
    id: "values-1",
    text: "Continuously expanding my knowledge through reading, courses, or other learning opportunities.",
    type: "single-choice"
  },
  {
    id: "values-2",
    text: "Exploring new ideas and perspectives that challenge my current thinking.",
    type: "single-choice"
  },
  {
    id: "values-3",
    text: "Being true to myself even when others might not understand my choices.",
    type: "single-choice"
  },
  {
    id: "values-4",
    text: "Living in alignment with my true self rather than meeting others' expectations.",
    type: "single-choice"
  },
  {
    id: "values-5",
    text: "Viewing challenges as opportunities for growth rather than obstacles.",
    type: "single-choice"
  },
  {
    id: "values-6",
    text: "Learning valuable lessons from my mistakes and failures.",
    type: "single-choice"
  },
  {
    id: "values-7",
    text: "Being honest in all my dealings, even when there might be personal cost.",
    type: "single-choice"
  },
  {
    id: "values-8",
    text: "Having deep, meaningful connections with family members.",
    type: "single-choice"
  },
  {
    id: "values-9",
    text: "Developing and maintaining close friendships.",
    type: "single-choice"
  },
  {
    id: "values-10",
    text: "Understanding others' perspectives and feelings, even when different from mine.",
    type: "single-choice"
  },
  {
    id: "values-11",
    text: "Contributing positively to my community or society.",
    type: "single-choice"
  },
  {
    id: "values-12",
    text: "Doing work that aligns with my personal values and beliefs.",
    type: "single-choice"
  },
  {
    id: "values-13",
    text: "Making a positive difference through my professional contributions.",
    type: "single-choice"
  },
  {
    id: "values-14",
    text: "Taking care of my physical health through exercise and nutrition.",
    type: "single-choice"
  },
  {
    id: "values-15",
    text: "Finding meaning in both joyful and difficult life experiences.",
    type: "single-choice"
  }
];

// Emotional Intelligence (EQ) Assessment Quiz (sample subset)
const emotionalIntelligenceQuiz: QuizQuestion[] = [
  {
    id: "eq-1",
    text: "I can accurately identify when I'm feeling stressed versus when I'm feeling angry.",
    type: "single-choice"
  },
  {
    id: "eq-2",
    text: "I can describe my emotions in detail beyond just \"good\" or \"bad.\"",
    type: "single-choice"
  },
  {
    id: "eq-3",
    text: "I understand how my emotions affect my decision-making.",
    type: "single-choice"
  },
  {
    id: "eq-4",
    text: "I can remain composed even when I'm feeling stressed.",
    type: "single-choice"
  },
  {
    id: "eq-5",
    text: "I take time to calm down before responding when I'm upset.",
    type: "single-choice"
  },
  {
    id: "eq-6",
    text: "I can adapt my plans when circumstances change unexpectedly.",
    type: "single-choice"
  },
  {
    id: "eq-7",
    text: "I pursue goals with energy and persistence.",
    type: "single-choice"
  },
  {
    id: "eq-8",
    text: "I can motivate myself to do tasks even when I don't feel like doing them.",
    type: "single-choice"
  },
  {
    id: "eq-9",
    text: "I look for the positive aspects in difficult situations.",
    type: "single-choice"
  },
  {
    id: "eq-10",
    text: "I can recognize emotions in others by observing their facial expressions and body language.",
    type: "single-choice"
  },
  {
    id: "eq-11",
    text: "I listen attentively when others share their feelings or experiences.",
    type: "single-choice"
  },
  {
    id: "eq-12",
    text: "I can understand others' perspectives even when I disagree with them.",
    type: "single-choice"
  },
  {
    id: "eq-13",
    text: "I notice when someone is feeling uncomfortable or distressed in a situation.",
    type: "single-choice"
  },
  {
    id: "eq-14",
    text: "I consider how my actions might affect others' feelings.",
    type: "single-choice"
  },
  {
    id: "eq-15",
    text: "I communicate my thoughts and feelings clearly to others.",
    type: "single-choice"
  },
  {
    id: "eq-16",
    text: "I can build rapport with different types of people.",
    type: "single-choice"
  },
  {
    id: "eq-17",
    text: "I'm effective at resolving conflicts between people.",
    type: "single-choice"
  },
  {
    id: "eq-18",
    text: "I adapt my communication style to fit different people and situations.",
    type: "single-choice"
  },
  {
    id: "eq-19",
    text: "I maintain healthy boundaries in relationships.",
    type: "single-choice"
  },
  {
    id: "eq-20",
    text: "I can read the social dynamics in a group situation.",
    type: "single-choice"
  }
];

// Coping Mechanism Identifier Quiz (sample subset)
const copingQuiz: QuizQuestion[] = [
  {
    id: "coping-1",
    text: "When I'm in pain or stressed, I worry all the time about whether it will end.",
    type: "single-choice"
  },
  {
    id: "coping-2",
    text: "When I'm experiencing difficulties, I feel I can't go on.",
    type: "single-choice"
  },
  {
    id: "coping-3",
    text: "When I'm facing problems, I think \"This is terrible and is never going to get any better.\"",
    type: "single-choice"
  },
  {
    id: "coping-4",
    text: "I try to ignore the discomfort or stress I'm feeling.",
    type: "single-choice"
  },
  {
    id: "coping-5",
    text: "I don't pay attention to the stress or pain.",
    type: "single-choice"
  },
  {
    id: "coping-6",
    text: "I try to think about something pleasant when I'm stressed.",
    type: "single-choice"
  },
  {
    id: "coping-7",
    text: "I imagine myself in pleasant situations or places when dealing with problems.",
    type: "single-choice"
  },
  {
    id: "coping-8",
    text: "I tell myself the discomfort or stress is a signal of progress, not a problem.",
    type: "single-choice"
  },
  {
    id: "coping-9",
    text: "I rely on my faith in God or a higher power to get me through difficult times.",
    type: "single-choice"
  },
  {
    id: "coping-10",
    text: "I tell myself I can overcome the stress or pain.",
    type: "single-choice"
  },
  {
    id: "coping-11",
    text: "No matter how bad it gets, I know I can handle it.",
    type: "single-choice"
  },
  {
    id: "coping-12",
    text: "How satisfied are you with your ability to cope with stress and difficult situations?",
    type: "single-choice"
  }
];

// Workplace Stress Evaluation Quiz (sample subset)
const workplaceQuiz: QuizQuestion[] = [
  {
    id: "workplace-1",
    text: "How often do you feel overwhelmed by your workload?",
    type: "single-choice"
  },
  {
    id: "workplace-2",
    text: "How frequently do you work beyond regular hours to complete your tasks?",
    type: "single-choice"
  },
  {
    id: "workplace-3",
    text: "How often do you face unrealistic deadlines that create pressure?",
    type: "single-choice"
  },
  {
    id: "workplace-4",
    text: "How often do you feel you have little or no control over your work priorities?",
    type: "single-choice"
  },
  {
    id: "workplace-5",
    text: "How frequently are you excluded from decisions that directly affect your work?",
    type: "single-choice"
  },
  {
    id: "workplace-6",
    text: "How often do you receive unclear or conflicting instructions about your job responsibilities?",
    type: "single-choice"
  },
  {
    id: "workplace-7",
    text: "How frequently do you feel caught between conflicting demands from different stakeholders?",
    type: "single-choice"
  },
  {
    id: "workplace-8",
    text: "How often do you experience conflict or tension with colleagues?",
    type: "single-choice"
  },
  {
    id: "workplace-9",
    text: "How frequently do you feel a lack of support from your manager or supervisor?",
    type: "single-choice"
  },
  {
    id: "workplace-10",
    text: "How often do you worry about job security or potential layoffs?",
    type: "single-choice"
  },
  {
    id: "workplace-11",
    text: "How often does work interfere with your personal life or family responsibilities?",
    type: "single-choice"
  },
  {
    id: "workplace-12",
    text: "How frequently do you think about work-related issues during your personal time?",
    type: "single-choice"
  },
  {
    id: "workplace-13",
    text: "How often do you feel that your workplace culture is overly competitive or unsupportive?",
    type: "single-choice"
  },
  {
    id: "workplace-14",
    text: "How often do you experience physical symptoms (headaches, muscle tension, fatigue) that you attribute to work stress?",
    type: "single-choice"
  },
  {
    id: "workplace-15",
    text: "How often do you have difficulty sleeping due to work-related concerns?",
    type: "single-choice"
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
    default:
      return anxietyQuiz; // Default to anxiety quiz if an invalid type is provided
  }
};
