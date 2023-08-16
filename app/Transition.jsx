'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'

const Transition = ({ children }) => {
  const router = useRouter()
  const pageKey = router.asPath

  return (
    <AnimatePresence mode='popLayout'>
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 2 } }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export default Transition
