import { AnimatePresence, motion } from 'framer-motion'

interface SceneTransitionProps {
  isVisible: boolean
  duration?: number
}

const SceneTransition: React.FC<SceneTransitionProps> = ({ isVisible, duration = 1 }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
          animate={{ backdropFilter: 'blur(10px)', opacity: 1 }}
          exit={{ backdropFilter: 'blur(0px)', opacity: 0 }}
          transition={{ duration, ease: 'easeInOut' }}
          style={{
            height: '700px',
            width: '610px',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            zIndex: 9999,
            marginLeft: '-5px',
            marginTop: '-5px',
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default SceneTransition
