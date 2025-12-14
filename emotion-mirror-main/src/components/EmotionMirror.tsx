import { useEffect, useState } from 'react';
import { useFaceDetection } from '@/hooks/useFaceDetection';
import { EMOTION_THEMES } from '@/types/emotion';
import { LoadingScreen } from './LoadingScreen';
import { CameraError } from './CameraError';
import { WebcamView } from './WebcamView';
import { EmotionDisplay } from './EmotionDisplay';
import { FloatingEmojis } from './FloatingEmojis';
import { Sparkles } from 'lucide-react';

export const EmotionMirror = () => {
  const [debugMode, setDebugMode] = useState(false);
  const {
    isModelLoading,
    modelError,
    currentEmotion,
    hasCameraAccess,
    cameraError,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    startDetection,
    downloadSnapshot,
  } = useFaceDetection();

  // Get current theme class
  const currentTheme = currentEmotion 
    ? EMOTION_THEMES[currentEmotion.emotion] 
    : EMOTION_THEMES.neutral;

  // Apply theme class to body
  useEffect(() => {
    const body = document.body;
    
    // Remove all emotion classes
    Object.values(EMOTION_THEMES).forEach(theme => {
      body.classList.remove(theme.className);
    });
    
    // Add current emotion class
    body.classList.add(currentTheme.className);

    return () => {
      Object.values(EMOTION_THEMES).forEach(theme => {
        body.classList.remove(theme.className);
      });
    };
  }, [currentTheme.className]);

  // Start camera when models are loaded
  useEffect(() => {
    if (!isModelLoading && !modelError) {
      startCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isModelLoading, modelError, startCamera, stopCamera]);

  // Start detection when camera is ready
  useEffect(() => {
    if (hasCameraAccess) {
      // Small delay to ensure video is playing
      const timer = setTimeout(() => {
        startDetection(debugMode);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasCameraAccess, debugMode, startDetection]);

  // Show loading screen while models are loading
  if (isModelLoading) {
    return <LoadingScreen />;
  }

  // Show error if models failed to load
  if (modelError) {
    return <LoadingScreen error={modelError} onRetry={() => window.location.reload()} />;
  }

  // Show camera error
  if (hasCameraAccess === false && cameraError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <CameraError error={cameraError} onRetry={startCamera} />
      </div>
    );
  }

  return (
    <>
      {/* Floating emojis */}
      {currentEmotion && <FloatingEmojis emotion={currentEmotion.emotion} />}

      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 gap-8 relative z-20">
        {/* Header */}
        <header className="text-center space-y-2 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              AI Emotion Mirror
            </h1>
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <p className="text-muted-foreground text-lg">
            See how AI perceives your emotions in real-time
          </p>
        </header>

        {/* Main content */}
        <main className="w-full max-w-2xl space-y-8">
          {/* Webcam view */}
          <WebcamView
            videoRef={videoRef as React.RefObject<HTMLVideoElement>}
            canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
            debugMode={debugMode}
            onDebugToggle={setDebugMode}
            onSnapshot={downloadSnapshot}
            isActive={hasCameraAccess === true}
          />

          {/* Emotion display */}
          {currentEmotion && (
            <EmotionDisplay
              emotion={currentEmotion.emotion}
              confidence={currentEmotion.confidence}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-auto pt-8">
          <p>Powered by face-api.js • Made with 💜</p>
        </footer>
      </div>
    </>
  );
};
