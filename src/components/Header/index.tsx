import React, { useMemo } from 'react'
import styles from './Header.module.css'
import { limelight } from '@/app/layout'
import jazzColors from '@/data/jazzColors'

const Header = ({ title, maxDuration = 7 }: { title: string; maxDuration: number }) => {
  const characters = title.split('')

  const characterStyles = useMemo(
    () =>
      characters.map((_, index) => {
        const jazzColor = jazzColors[index % jazzColors.length]
        const duration = Math.random() * maxDuration + 1
        const offset = Math.random() * 15
        const direction = index % 2 === 0 ? -1 : 1
        const initialOffset = `${direction * (offset + 50)}px`
        const finalOffset = `${direction * offset}px`

        return {
          color: jazzColor,
          duration,
          initialOffset,
          finalOffset,
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, maxDuration],
  )

  const animatedTitle = characters.map((char, index) => {
    if (char === ' ') return <span key={index}>&nbsp;&nbsp;</span>

    const style = characterStyles[index]
    return (
      <span
        key={index}
        className={styles.character}
        style={
          {
            '--color': style.color,
            '--final-offset': style.finalOffset,
            '--initial-offset': style.initialOffset,
            '--duration': `${style.duration}s`,
          } as React.CSSProperties
        }
      >
        {char}
      </span>
    )
  })

  return <h1 className={`${styles.header} ${limelight.className}`}>{animatedTitle}</h1>
}

export default Header
