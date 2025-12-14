import { useState, useEffect, useRef, useCallback } from 'react';
import * as faceapi from 'face-api.js';
import { EmotionType, EmotionData } from '@/types/emotion';

const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';

const STABILIZATION_THRESHOLD = 5;

export const useFaceDetection = () => {
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [modelError, setModelError] = useState<string | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionData | null>(null);
  const [hasCameraAccess, setHasCameraAccess] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const emotionBufferRef = useRef<EmotionType[]>([]);
  const lastStableEmotionRef = useRef<EmotionType>('neutral');

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      try {
        setIsModelLoading(true);
        setModelError(null);
        
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        ]);
        
        setIsModelLoading(false);
      } catch (error) {
        console.error('Error loading models:', error);
        setModelError('Failed to load AI models. Please refresh the page.');
        setIsModelLoading(false);
      }
    };

    loadModels();
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setHasCameraAccess(true);
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setHasCameraAccess(false);
      setCameraError('Unable to access camera. Please grant permission and try again.');
    }
  }, []);

  // Stop camera stream
  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  // Map face-api expression to our emotion type
  const mapExpression = (expression: string): EmotionType => {
    const mapping: Record<string, EmotionType> = {
      happy: 'happy',
      sad: 'sad',
      angry: 'angry',
      surprised: 'surprised',
      fearful: 'fear',
      disgusted: 'disgust',
      neutral: 'neutral',
    };
    return mapping[expression] || 'neutral';
  };

  // Get stabilized emotion (only change if detected for N consecutive frames)
  const getStabilizedEmotion = (newEmotion: EmotionType): EmotionType => {
    emotionBufferRef.current.push(newEmotion);
    
    if (emotionBufferRef.current.length > STABILIZATION_THRESHOLD) {
      emotionBufferRef.current.shift();
    }

    // Check if all recent emotions are the same
    const allSame = emotionBufferRef.current.every(
      e => e === emotionBufferRef.current[0]
    );

    if (allSame && emotionBufferRef.current.length === STABILIZATION_THRESHOLD) {
      lastStableEmotionRef.current = emotionBufferRef.current[0];
    }

    return lastStableEmotionRef.current;
  };

  // Detection loop
  const detectEmotions = useCallback(async (showLandmarks: boolean) => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.paused) {
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = { width: video.videoWidth, height: video.videoHeight };
    
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceExpressions();

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (detections.length > 0) {
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      
      // Draw bounding box
      resizedDetections.forEach(detection => {
        const box = detection.detection.box;
        ctx.strokeStyle = 'hsl(var(--primary))';
        ctx.lineWidth = 3;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        
        // Get dominant expression
        const expressions = detection.expressions;
        const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
        const [topExpression, confidence] = sorted[0];
        
        const rawEmotion = mapExpression(topExpression);
        const stableEmotion = getStabilizedEmotion(rawEmotion);
        
        setCurrentEmotion({
          emotion: stableEmotion,
          confidence: confidence * 100,
        });

        // Draw emotion label
        const label = `${stableEmotion.charAt(0).toUpperCase() + stableEmotion.slice(1)} ${Math.round(confidence * 100)}%`;
        ctx.fillStyle = 'hsl(var(--primary))';
        ctx.font = 'bold 18px "Space Grotesk", sans-serif';
        ctx.fillText(label, box.x, box.y - 10);

        // Draw landmarks if debug mode is on
        if (showLandmarks) {
          const landmarks = detection.landmarks.positions;
          landmarks.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
            ctx.fillStyle = 'hsl(140 70% 50%)';
            ctx.fill();
          });
        }
      });
    }

    animationRef.current = requestAnimationFrame(() => detectEmotions(showLandmarks));
  }, []);

  // Start detection loop
  const startDetection = useCallback((showLandmarks: boolean) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    detectEmotions(showLandmarks);
  }, [detectEmotions]);

  // Capture snapshot
  const captureSnapshot = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Create a temporary canvas to merge video and overlay
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth;
    tempCanvas.height = video.videoHeight;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (!tempCtx) return null;

    // Draw video frame (flipped)
    tempCtx.translate(tempCanvas.width, 0);
    tempCtx.scale(-1, 1);
    tempCtx.drawImage(video, 0, 0);
    tempCtx.setTransform(1, 0, 0, 1, 0, 0);
    
    // Draw overlay canvas
    tempCtx.drawImage(canvas, 0, 0);

    return tempCanvas.toDataURL('image/png');
  }, []);

  // Download snapshot
  const downloadSnapshot = useCallback(() => {
    const dataUrl = captureSnapshot();
    if (!dataUrl) return;

    const link = document.createElement('a');
    link.download = `mood-snapshot-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
  }, [captureSnapshot]);

  return {
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
  };
};
