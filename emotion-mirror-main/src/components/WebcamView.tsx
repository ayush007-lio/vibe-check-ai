import { RefObject, useEffect } from 'react';
import { Camera, Download, Eye, EyeOff } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface WebcamViewProps {
  videoRef: RefObject<HTMLVideoElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  debugMode: boolean;
  onDebugToggle: (value: boolean) => void;
  onSnapshot: () => void;
  isActive: boolean;
}

export const WebcamView = ({
  videoRef,
  canvasRef,
  debugMode,
  onDebugToggle,
  onSnapshot,
  isActive,
}: WebcamViewProps) => {
  return (
    <div className="glass-card rounded-3xl p-4 md:p-6 shadow-2xl animate-fade-in">
      {/* Video container */}
      <div className="relative rounded-2xl overflow-hidden bg-muted">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full max-w-[640px] h-auto rounded-2xl transform scale-x-[-1]"
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full transform scale-x-[-1]"
        />
        
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <Camera className="w-16 h-16 text-muted-foreground animate-pulse-soft" />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-4 px-2">
        {/* Debug toggle */}
        <div className="flex items-center gap-3">
          <Switch
            checked={debugMode}
            onCheckedChange={onDebugToggle}
            id="debug-mode"
          />
          <label 
            htmlFor="debug-mode" 
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground cursor-pointer"
          >
            {debugMode ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
            Debug Mode
          </label>
        </div>

        {/* Snapshot button */}
        <button
          onClick={onSnapshot}
          disabled={!isActive}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-medium transition-smooth hover:opacity-90 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Download className="w-5 h-5" />
          <span className="hidden sm:inline">Mood Snapshot</span>
        </button>
      </div>
    </div>
  );
};
