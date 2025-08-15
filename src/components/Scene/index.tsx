import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useReward } from 'react-rewards'
import RecordText from '../RecordText'
import styles from './Scene.module.css'
import Caption from '@/components/Caption'
import { FINAL_SCENE } from '@/constants/scenes'
import jazzColors from '@/data/jazzColors'
import scenes from '@/data/scenes'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GameName } from '@/types/games'
import { Modals } from '@/types/modals'
import { Effect, EFFECTS, IInteractiveArea, SceneName } from '@/types/scenes'
import { sleep } from '@/utils/sleep'

const getSceneCaption = (sceneName: SceneName) => {
  const scene = scenes.find((scene) => scene.name === sceneName)
  return scene ? scene.message : ''
}

const Scene = () => {
  const currentScene = useMainStore((state) => state.currentScene)
  const setCurrentScene = useMainStore((state) => state.setCurrentScene)
  const playGame = useMainStore((state) => state.playGame)
  const playedGames = useMainStore((state) => state.playedGames)
  const [captionMessage, setCaptionMessage] = useState(getSceneCaption(currentScene))
  const openModal = useModalStore((state) => state.openModal)

  const { reward } = useReward('rewardFinal', 'balloons', {
    lifetime: 22000,
    decay: 1,
    elementCount: 62, // 62 ans 🎉
    startVelocity: 3,
    spread: 160,
    colors: jazzColors,
  })

  const getEffect = (effect: Effect) => {
    switch (effect) {
      case EFFECTS.MORE_BALLOONS: {
        reward()
        break
      }
      case EFFECTS.OPEN_MODAL: {
        openModal(Modals.END_CREDITS)
        break
      }
      default:
        return
    }
  }

  const interactiveAreas =
    scenes.find((scene) => scene.name === currentScene)?.interactiveAreas || []

  const handleAreaClick = ({
    destination,
    openGame,
    effect,
  }: {
    destination?: SceneName
    openGame?: GameName
    effect?: Effect
  }) => {
    if (destination) {
      setCurrentScene(destination)
    }

    if (openGame) {
      if (playedGames[openGame]) {
        openModal(Modals.REPLAY_GAME, openGame)
      } else {
        playGame(openGame)
      }
    }

    if (effect) {
      getEffect(effect)
    }
  }

  useEffect(() => {
    setCaptionMessage(getSceneCaption(currentScene))
  }, [currentScene])

  useEffect(() => {
    const triggerBalloons = async () => {
      await sleep(2500)
      reward()
    }
    if (currentScene === FINAL_SCENE) {
      triggerBalloons()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene])

  return (
    <>
      <section className={styles.sceneContainer}>
        {interactiveAreas.map((area: IInteractiveArea, index: number) => (
          <button
            key={index}
            className={styles.interactiveZone}
            style={{
              left: `${area.surface.x * 100}%`,
              top: `${area.surface.y * 100}%`,
              width: `${area.surface.width || area.surface.radius || 0}px`,
              height: `${area.surface.height || area.surface.radius || 0}px`,
              borderRadius: area.surface.radius ? '50%' : '0px',
            }}
            onMouseEnter={() => setCaptionMessage(area.description)}
            onMouseLeave={() => setCaptionMessage(getSceneCaption(currentScene))}
            onClick={() =>
              handleAreaClick({
                destination: area.navigateTo,
                openGame: area.openGame,
                effect: area.effect,
              })
            }
          />
        ))}
        {currentScene === FINAL_SCENE && <RecordText />}
        <Image
          src={`/scenes/${currentScene}.png`}
          alt="Scene"
          width={500}
          height={500}
          priority
          className={styles.sceneImage}
        />
      </section>

      <section className={styles.captionContainer}>
        <Caption message={captionMessage} />
      </section>
      <div id="rewardFinal" />
    </>
  )
}

export default Scene
