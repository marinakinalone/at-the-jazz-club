import React from 'react'
import ModalContainer from '@/components/ModalContainer'
import { AnimationDuration, AnimationName } from '@/types/modals'

const Credits = () => {
  return (
    <ModalContainer
      animationDuration={AnimationDuration.LONG}
      animationName={AnimationName.PUFF_IN}
    >
      Credits
    </ModalContainer>
  )
}

export default Credits
