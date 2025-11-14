"use client";

import { motion, AnimatePresence } from "framer-motion";

interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <div className="relative">
            {/* 회전하는 원형 로더 */}
            <motion.div
              className="h-16 w-16 rounded-full border-4 border-primary/20 border-t-primary"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            
            {/* 중앙 펄스 효과 */}
            <motion.div
              className="absolute inset-0 m-auto h-8 w-8 rounded-full bg-primary/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
          
          {/* 로딩 텍스트 */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute mt-32 text-sm text-muted-foreground"
          >
            페이지를 불러오는 중...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

