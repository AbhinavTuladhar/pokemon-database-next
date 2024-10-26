'use client'

import { motion } from 'framer-motion'

export function AnimatedPageWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.35,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}
