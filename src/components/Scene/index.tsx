import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useReward } from 'react-rewards'
import RecordText from '../RecordText'
import styles from './Scene.module.css'
import Caption from '@/components/Caption'
import { FINAL_SCENE } from '@/constants/scenes'
import scenes from '@/data/scenes'
import useMainStore from '@/stores/mainStore'
import useModalStore from '@/stores/modalStore'
import { GameName } from '@/types/games'
import { Modals } from '@/types/modals'
import { IInteractiveArea, SceneName } from '@/types/scenes'
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

  useEffect(() => {
    setCaptionMessage(getSceneCaption(currentScene))
  }, [currentScene])

  const interactiveAreas =
    scenes.find((scene) => scene.name === currentScene)?.interactiveAreas || []

  const handleAreaClick = ({
    destination,
    openGame,
  }: {
    destination?: SceneName
    openGame?: GameName
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
  }

  const { reward } = useReward('rewardMemory', 'balloons', {
    lifetime: 22000,
    decay: 1,
    elementCount: 62, // 62 ans 🎉
    startVelocity: 3,
    spread: 160,
    colors: [
      '#f4b301',
      '#ff5100',
      '#9e27b5',
      '#fce5bd',
      '#5a7aff',
      '#bb009e',
      '#00ce38',
      '#d20125',
      '#4dadab',
      '#e49ae6',
    ],
  })

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
              handleAreaClick({ destination: area.navigateTo, openGame: area.openGame })
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
      <div id="rewardMemory" />
    </>
  )
}

export default Scene
