import Image from 'next/image'
import React, { useState } from 'react'
import styles from './Scene.module.css'
import Caption from '@/components/Caption'
import scenes from '@/data/scenes'
import useStore from '@/store'
import { GameName } from '@/types/games'
import { IInteractiveArea, SceneName } from '@/types/scenes'

const getSceneCaption = (sceneName: SceneName) => {
  const scene = scenes.find((scene) => scene.name === sceneName)
  return scene ? scene.message : ''
}

const Scene = () => {
  const currentScene = useStore((state) => state.currentScene)
  const setCurrentScene = useStore((state) => state.setCurrentScene)
  const setPlayGame = useStore((state) => state.setPlayGame)
  const hasPlayedGames = useStore((state) => state.hasPlayedGames)

  const [captionMessage, setCaptionMessage] = useState(getSceneCaption(currentScene))

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
      if (hasPlayedGames[openGame]) {
        // TODO open game to ask for confirmation and use setPlayGame there
        console.log('You have already played this game, do you want to play again?')
        setPlayGame(openGame) // TODO remove when modal is implemented
      } else {
        setPlayGame(openGame)
      }
    }
  }

  return (
    <>
      <section className={styles.sceneContainer}>
        {interactiveAreas.map((area: IInteractiveArea, index: number) => (
          <button
            key={index}
            className={styles.interactiveZone}
            style={{
              left: `${area.x * 100}%`,
              top: `${area.y * 100}%`,
              width: `${area.width || area.radius || 0}px`,
              height: `${area.height || area.radius || 0}px`,
              borderRadius: area.radius ? '50%' : '0px',
            }}
            onMouseEnter={() => setCaptionMessage(area.description)}
            onMouseLeave={() => setCaptionMessage(getSceneCaption(currentScene))}
            onClick={() =>
              handleAreaClick({ destination: area.navigateTo, openGame: area.openGame })
            }
            title={area.area}
          />
        ))}
        <Image
          src={`/scenes/${currentScene}.png`}
          alt="Scene"
          width={700}
          height={700}
          priority
          className={styles.sceneImage}
        />
      </section>
      <section className={styles.captionContainer}>
        <Caption message={captionMessage} />
      </section>
    </>
  )
}

export default Scene
