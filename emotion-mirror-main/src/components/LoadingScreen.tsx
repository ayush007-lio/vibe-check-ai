import { Brain } from 'lucide-react';

interface LoadingScreenProps {
  error?: string | null;
  onRetry?: () => void;
}

export const LoadingScreen = ({ error, onRetry }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="glass-card rounded-3xl p-12 flex flex-col items-center gap-6 max-w-md w-full animate-fade-in">
        <div className="relative">
          <Brain className="w-16 h-16 text-primary animate-pulse-soft" />
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-primary/20 animate-ping" />
        </div>
        
        {error ? (
          <>
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Oops! Something went wrong
              </h2>
              <p className="text-muted-foreground">{error}</p>
            </div>
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-smooth hover:opacity-90"
              >
                Try Again
              </button>
            )}
          </>
        ) : (
          <>
            <div className="text-center space-y-2">
              <h2 className="font-display text-2xl font-semibold text-foreground">
                Initializing AI Brain...
              </h2>
              <p className="text-muted-foreground">
                Loading emotion detection models
              </p>
            </div>
            
            <div className="loading-spinner" />
            
            <div className="flex gap-2">
              {['🧠', '👁️', '😊'].map((emoji, i) => (
                <span 
                  key={i} 
                  className="text-2xl animate-bounce-gentle"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  {emoji}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
