'use client'

import { motion, Variants } from 'framer-motion'

const variants: Variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.2 } },
}

export default function AnimtedPageWrapper({ children }: { children: React.ReactNode }) {
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
