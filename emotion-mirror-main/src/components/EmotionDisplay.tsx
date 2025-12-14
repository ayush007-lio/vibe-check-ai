import { EmotionType, EMOTION_THEMES } from '@/types/emotion';

interface EmotionDisplayProps {
  emotion: EmotionType;
  confidence: number;
}

export const EmotionDisplay = ({ emotion, confidence }: EmotionDisplayProps) => {
  const theme = EMOTION_THEMES[emotion];

  return (
    <div className="flex flex-col items-center gap-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{theme.emojis[0]}</span>
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-foreground">
            {theme.label}
          </h2>
          <p className="text-muted-foreground font-medium">
            {Math.round(confidence)}% confident
          </p>
        </div>
        <span className="text-4xl">{theme.emojis[1]}</span>
      </div>
      
      <p className="emotion-text text-muted-foreground italic max-w-sm">
        "{theme.helperText}"
      </p>

      {/* Confidence bar */}
      <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 rounded-full"
          style={{ width: `${confidence}%` }}
        />
      </div>
    </div>
  );
};
