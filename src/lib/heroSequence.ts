export const FRAME_COUNT = 129;
const FOLDER_PATH = '/assets/hero-sequence/';

// Cache map to store loaded images
const imageCache = new Map<number, HTMLImageElement>();

export const getFramePath = (index: number) => {
  // hero_001.webp to hero_129.webp
  return `${FOLDER_PATH}hero_${(index + 1).toString().padStart(3, '0')}.webp`;
};

export const getFrame = (index: number): HTMLImageElement | undefined => {
  return imageCache.get(index);
};

// Phase 1: Load exactly the first frame
export const preloadFirstFrame = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (imageCache.has(0)) {
      resolve();
      return;
    }
    
    const img = new Image();
    img.src = getFramePath(0);
    img.onload = () => {
      imageCache.set(0, img);
      resolve();
    };
    img.onerror = reject;
  });
};

// Phase 2: Progressively load the rest in batches to avoid network/memory congestion
export const preloadSequence = (onProgress?: (progress: number) => void) => {
  let loaded = 1; // First frame is already loaded
  let currentIndex = 1;

  const loadNextBatch = () => {
    const batchSize = 10;
    const promises: Promise<void>[] = [];

    for (let i = 0; i < batchSize && currentIndex < FRAME_COUNT; i++, currentIndex++) {
      promises.push(
        new Promise<void>((resolve) => {
          if (imageCache.has(currentIndex)) {
            loaded++;
            if (onProgress) onProgress(loaded / FRAME_COUNT);
            resolve();
            return;
          }

          const img = new Image();
          const indexToLoad = currentIndex;
          
          img.onload = () => {
            imageCache.set(indexToLoad, img);
            loaded++;
            if (onProgress) onProgress(loaded / FRAME_COUNT);
            resolve();
          };
          
          img.onerror = () => {
            console.warn(`Failed to load frame ${indexToLoad}`);
            resolve(); // Resolve anyway to continue batch
          };
          
          img.src = getFramePath(indexToLoad);
        })
      );
    }

    if (promises.length > 0) {
      // Wait for current batch to finish before starting the next
      Promise.all(promises).then(() => {
        if (currentIndex < FRAME_COUNT) {
          // Small delay between batches to yield to main thread / rendering
          requestAnimationFrame(loadNextBatch);
        }
      });
    }
  };

  loadNextBatch();
};

export const clearSequenceCache = () => {
  // Clear the image sources to help GC if the component is unmounted
  imageCache.forEach((img) => {
    img.src = '';
  });
  imageCache.clear();
};
