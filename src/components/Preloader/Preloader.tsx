import React, { useEffect, useState } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // We animate the progress bar to 100% over the 3 second loading period
    if (isLoading) {
      // Use a small delay before starting the CSS transition to ensure it triggers
      const timer = setTimeout(() => {
        setProgress(100);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <div className={`${styles.preloader} ${!isLoading ? styles.hidden : ''}`}>
      <div className={styles.content}>
        <img src="/assets/brand/logo.webp" alt="SPOT FIT" className={styles.logo} />
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
