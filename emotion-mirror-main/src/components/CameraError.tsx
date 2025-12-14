import { Camera, RefreshCw } from 'lucide-react';

interface CameraErrorProps {
  error: string;
  onRetry: () => void;
}

export const CameraError = ({ error, onRetry }: CameraErrorProps) => {
  return (
    <div className="glass-card rounded-3xl p-12 flex flex-col items-center gap-6 max-w-md w-full animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
        <Camera className="w-10 h-10 text-destructive" />
      </div>
      
      <div className="text-center space-y-2">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          Camera Access Required
        </h2>
        <p className="text-muted-foreground">{error}</p>
      </div>

      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium transition-smooth hover:opacity-90 hover:scale-105"
      >
        <RefreshCw className="w-5 h-5" />
        Grant Permission
      </button>

      <div className="text-sm text-muted-foreground text-center max-w-xs">
        <p>💡 Tip: Look for the camera icon in your browser's address bar and click "Allow"</p>
      </div>
    </div>
  );
};
