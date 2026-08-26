import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import styles from './Hero.module.css';

export interface HeroCanvasHandle {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  drawFrame: (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => void;
}

const HeroSequenceCanvas = forwardRef<HeroCanvasHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Custom draw function to mimic object-fit: cover
  const drawFrame = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    if (!ctx.canvas || !img.complete || img.naturalWidth === 0) return;
    
    const canvas = ctx.canvas;
    
    // Use the actual pixel dimensions of the canvas rather than CSS dimensions
    const cWidth = canvas.width;
    const cHeight = canvas.height;
    const iWidth = img.naturalWidth;
    const iHeight = img.naturalHeight;

    const hRatio = cWidth / iWidth;
    const vRatio = cHeight / iHeight;
    const ratio = Math.max(hRatio, vRatio);
    
    const centerShift_x = (cWidth - iWidth * ratio) / 2;
    const centerShift_y = (cHeight - iHeight * ratio) / 2;
    
    ctx.clearRect(0, 0, cWidth, cHeight);
    ctx.drawImage(img, 0, 0, iWidth, iHeight, centerShift_x, centerShift_y, iWidth * ratio, iHeight * ratio);
  };

  useImperativeHandle(ref, () => ({
    get canvas() {
      return canvasRef.current;
    },
    get context() {
      return canvasRef.current?.getContext('2d') || null;
    },
    drawFrame
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      // Cap DPR at 2 for performance on high-density displays (e.g. 3x Retina mobile devices)
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      // Set actual internal canvas resolution based on window size
      // This is safer than getBoundingClientRect() during GSAP pinning
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale context so we don't have to worry about DPR in draw calls (if doing primitive drawing)
      // Though for drawImage, it's fine as long as we use canvas.width/height directly.
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} />;
});

HeroSequenceCanvas.displayName = 'HeroSequenceCanvas';

export default HeroSequenceCanvas;
