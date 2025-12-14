import { useEffect, useState } from 'react';
import { EmotionType, EMOTION_THEMES } from '@/types/emotion';

interface FloatingEmoji {
  id: number;
  emoji: string;
  left: number;
  delay: number;
}

interface FloatingEmojisProps {
  emotion: EmotionType;
}

export const FloatingEmojis = ({ emotion }: FloatingEmojisProps) => {
  const [emojis, setEmojis] = useState<FloatingEmoji[]>([]);
  const theme = EMOTION_THEMES[emotion];

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji: FloatingEmoji = {
        id: Date.now() + Math.random(),
        emoji: theme.emojis[Math.floor(Math.random() * theme.emojis.length)],
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      };

      setEmojis(prev => [...prev.slice(-15), newEmoji]);
    }, 800);

    return () => clearInterval(interval);
  }, [theme.emojis]);

  // Clear emojis when emotion changes
  useEffect(() => {
    setEmojis([]);
  }, [emotion]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {emojis.map(emoji => (
        <span
          key={emoji.id}
          className="floating-emoji"
          style={{
            left: `${emoji.left}%`,
            animationDelay: `${emoji.delay}s`,
            bottom: '-50px',
          }}
        >
          {emoji.emoji}
        </span>
      ))}
    </div>
  );
};
