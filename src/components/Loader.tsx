"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 1500; // ms
    const interval = 30; // update interval
    const step = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsVisible(false), 400);
          return 100;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ink-0"
    >
      <div className="w-64">
        <div className="flex justify-between items-end mb-4 text-paper-dim font-mono text-xs uppercase tracking-widest">
          <span>Initializing</span>
          <span className="text-bloom">{Math.min(Math.round(progress), 100)}%</span>
        </div>
        
        <div className="h-[2px] w-full bg-line relative overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 bottom-0 bg-bloom"
            style={{ width: `${progress}%` }}
            initial={{ width: 0 }}
          />
        </div>
        
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-1 h-1 bg-bloom rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
