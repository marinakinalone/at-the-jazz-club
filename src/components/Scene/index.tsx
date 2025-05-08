import React from 'react'
import Image from 'next/image'
import Caption from '@/components/Caption'
import useStore from '@/store'
import styles from './Scene.module.css'
import { IInteractiveArea, SceneName } from '@/types/scenes'
import { GameName } from '@/types/games'
import scenes from '@/data/scenes'
import { GAMES } from '@/constants/games'
import RightSequenceGame from '@/games/RightSequence'
import MemoryGame from '@/games/Memory'

const { RIGHT_SEQUENCE, MEMORY } = GAMES

// TODO hover state on interactive areas to display caption
const Scene = () => {
  const currentScene = useStore((state) => state.currentScene)
  const setCurrentScene = useStore((state) => state.setCurrentScene)
  const setPlayGame = useStore((state) => state.setPlayGame)
  const playGame = useStore((state) => state.playGame)
  const hasPlayedGames = useStore((state) => state.hasPlayedGames)

  const interactiveAreas = scenes.find((scene) => scene.name === currentScene)?.interactiveAreas || [];


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
        setPlayGame(openGame); // TODO remove when modal is implemented
      } else {
      setPlayGame(openGame)
    }
  }
  }

  // TODO move playGame logic to page?

  return (
    <>
        {playGame === RIGHT_SEQUENCE && <RightSequenceGame />}
        {playGame === MEMORY && <MemoryGame />}
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
            onClick={() => handleAreaClick({ destination: area.navigateTo, openGame: area.openGame })}
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
