
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LandingAnimationProps {
  onComplete: () => void;
}

export function LandingAnimation({ onComplete }: LandingAnimationProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    // Sequence the animations
    const timer1 = setTimeout(() => setShowLogo(true), 500);
    const timer2 = setTimeout(() => setShowText(true), 1500);
    const timer3 = setTimeout(() => setShowSubtext(true), 2500);
    const timer4 = setTimeout(() => onComplete(), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center space-y-8">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                duration: 1,
                ease: "easeOut",
                type: "spring",
                damping: 15
              }}
              className="relative"
            >
              <div className="relative w-48 h-48 mx-auto">
                <img 
                  src="/lovable-uploads/5b99b38c-b9d3-4d08-9b92-17c75afa5d3e.png" 
                  alt="DRONA Logo" 
                  className="w-full h-full object-contain"
                />
                {/* Radar pulse animation around the logo */}
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
                <div className="absolute inset-4 rounded-full border border-green-400/20 animate-pulse"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-2"
            >
              <h1 className="text-5xl font-bold text-white tracking-wider">
                DRONA
              </h1>
              <div className="h-0.5 w-32 bg-gradient-to-r from-cyan-400 to-green-400 mx-auto"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showSubtext && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-3"
            >
              <p className="text-xl text-slate-300 font-medium">
                Defence Ready Operations for Networked Aircrafts
              </p>
              <p className="text-cyan-400 text-sm font-mono">
                System Initializing...
              </p>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background circuit pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
        <div className="absolute top-1/3 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
        <div className="absolute bottom-1/4 left-1/3 w-px h-24 bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
        <div className="absolute bottom-1/3 right-1/3 w-16 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      </div>
    </div>
  );
}
