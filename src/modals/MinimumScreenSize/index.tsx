import React from 'react'
import Message from '@/components/Message'
import ModalContainer from '@/components/ModalContainer'
import SubHeader from '@/components/SubHeader'
import { AnimationDuration, AnimationName } from '@/types/modals'

const MinimumScreenSize = () => {
  return (
    <ModalContainer
      animationDuration={AnimationDuration.IMMEDIATE}
      animationName={AnimationName.PUFF_IN}
    >
      <SubHeader title="taille ou format d'écran non pris en charge" />
      <Message content="description" />
    </ModalContainer>
  )
}

export default MinimumScreenSize
