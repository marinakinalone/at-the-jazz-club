import React from 'react'
import styles from './ConfirmationModal.module.css'
import Message from '@/components/Message'
import ModalContainer from '@/components/ModalContainer'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import SubHeader from '@/components/SubHeader'
import { AnimationDuration, AnimationName } from '@/types/modals'

interface IConfirmationModal {
  title: string
  message: string
  primaryButtonLabel: string
  secondaryButtonLabel: string
  handlePrimaryButtonClick: () => void
  handleSecondaryButtonClick: () => void
}

const ConfirmationModal = ({
  title,
  message,
  primaryButtonLabel,
  secondaryButtonLabel,
  handlePrimaryButtonClick,
  handleSecondaryButtonClick,
}: IConfirmationModal) => {
  return (
    <ModalContainer
      animationName={AnimationName.swashIn}
      animationDuration={AnimationDuration.medium}
    >
      <div className={styles.contentContainer}>
        <SubHeader title={title} />
        <Message content={message} />
        <div className={styles.buttonContainer}>
          <SecondaryButton label={secondaryButtonLabel} handleClick={handleSecondaryButtonClick} />
          <PrimaryButton label={primaryButtonLabel} handleClick={handlePrimaryButtonClick} />
        </div>
      </div>
    </ModalContainer>
  )
}

export default ConfirmationModal
