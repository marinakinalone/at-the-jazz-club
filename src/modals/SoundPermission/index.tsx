import ConfirmationModal from '../shared/ConfirmationModal'
import useModalStore from '@/stores/modalStore'
import { AnimationTimeout, Modals } from '@/types/modals'

const SoundPermission = () => {
      const closeModal = useModalStore((state) => state.closeModal)

  const handleAllowSound = () => {
    // TODO logic to allow sound
    closeModal(Modals.SOUND_PERMISSION, AnimationTimeout.MEDIUM)
  }

    const handleNoSound = () => {
        // TODO logic to disable sound
           closeModal(Modals.SOUND_PERMISSION, AnimationTimeout.MEDIUM)
  } 

    return (
    <ConfirmationModal
      title={'Voulez-vous activer le son ?'}
      message={
        'Vous pouvez activer ou désactiver le son à tout moment en bas de la page. Pour une expérience optimale, nous vous recommandons de l’activer.'
      }
      primaryButtonLabel={'Oui'}
      handlePrimaryButtonClick={handleAllowSound}
      secondaryButtonLabel={'Non'}
      handleSecondaryButtonClick={handleNoSound}
      displayCloseButton={false}
    />
  )
}

export default SoundPermission