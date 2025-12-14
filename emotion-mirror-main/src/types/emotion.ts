export type EmotionType = 
  | 'happy' 
  | 'sad' 
  | 'angry' 
  | 'surprised' 
  | 'fear' 
  | 'disgust' 
  | 'neutral';

export interface EmotionData {
  emotion: EmotionType;
  confidence: number;
}

export interface EmotionTheme {
  className: string;
  emojis: string[];
  helperText: string;
  label: string;
}

export const EMOTION_THEMES: Record<EmotionType, EmotionTheme> = {
  happy: {
    className: 'emotion-happy',
    emojis: ['🎉', '✨', '😄', '🌟', '💛'],
    helperText: 'Keep shining!',
    label: 'Happy',
  },
  sad: {
    className: 'emotion-sad',
    emojis: ['💙', '🌧️', '🫂', '💫', '🌈'],
    helperText: "It's okay to feel this way. Breathe.",
    label: 'Sad',
  },
  angry: {
    className: 'emotion-angry',
    emojis: ['🔥', '💢', '🌬️', '🧘', '🍃'],
    helperText: 'Take a deep breath. Count to 10.',
    label: 'Angry',
  },
  surprised: {
    className: 'emotion-surprised',
    emojis: ['😲', '⚡', '🎆', '🎊', '💜'],
    helperText: 'Wow! Unexpected news?',
    label: 'Surprised',
  },
  fear: {
    className: 'emotion-fear',
    emojis: ['🛡️', '🔦', '🧘', '💜', '🌙'],
    helperText: 'You are safe. We are here.',
    label: 'Fear',
  },
  disgust: {
    className: 'emotion-disgust',
    emojis: ['🤢', '🍃', '🧼', '🌿', '💚'],
    helperText: 'Not your cup of tea?',
    label: 'Disgust',
  },
  neutral: {
    className: 'emotion-neutral',
    emojis: ['😐', '☕', '🧘', '🌤️', '💭'],
    helperText: 'Calm and collected.',
    label: 'Neutral',
  },
};
