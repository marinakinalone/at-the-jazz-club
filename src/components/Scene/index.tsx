import React from 'react'
import Image from 'next/image'
import Caption from '@/components/Caption'
import useStore from '@/store'
import styles from './Scene.module.css'
import { SceneName } from '@/types/scenes'

const Scene = () => {
  const currentScene = useStore((state) => state.currentScene)
  const interactiveAreas = useStore((state) => state.interactiveAreas)
  const setCurrentScene = useStore((state) => state.setCurrentScene)

  const handleAreaClick = (navigateTo?: SceneName) => {
    if (navigateTo) {
      setCurrentScene(navigateTo) // Navigate to the new scene
    }
  }

  return (
    <>
      <section className={styles.sceneContainer}>
        {interactiveAreas.map((area, index) => (
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
            onClick={() => handleAreaClick(area.navigateTo)}
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
      {/* <Caption message="Welcome to the club!" /> */}
    </>
  )
}

export default Scene
