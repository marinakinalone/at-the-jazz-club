import React from 'react'
import Image from 'next/image'
import Caption from '@/components/Caption'
import useStore from '@/store'
import styles from './Scene.module.css'
import { IInteractiveArea, SceneName } from '@/types/scenes'
import { GameName } from '@/types/games'

// TODO hover state on interactive areas to display caption
const Scene = () => {
  const currentScene = useStore((state) => state.currentScene)
  const interactiveAreas = useStore((state) => state.interactiveAreas)
  const setCurrentScene = useStore((state) => state.setCurrentScene)

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
      // TODO open game in modal
      console.log('open game', openGame)
    }
  }

  return (
    <>
      <section className={styles.sceneContainer}>
        {interactiveAreas.map((area: IInteractiveArea, index: number) => (
          <button
            key={index}
            className={styles.interactiveCircle}
            style={{
              left: `${area.x * 100}%`,
              top: `${area.y * 100}%`,
              width: `${area.width || area.radius || 0}px`,
              height: `${area.height || area.radius || 0}px`,
              borderRadius: area.radius ? '50%' : '0px',
            }}
            onClick={() => handleAreaClick({ destination: area.navigateTo })}
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
        <Caption message="Welcome to the club! Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!Welcome to the club!" />
      </section>
    </>
  )
}

export default Scene
