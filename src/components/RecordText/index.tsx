import React, { useEffect, useState } from 'react'
import styles from './RecordText.module.css'

const outerText = 'On va voir Stacey Kent en concert...'
const innerText = '...le 9 avril 2026 à la Cité des Congrès !!!'

const RecordText = () => {
  const [outerIndex, setOuterIndex] = useState(0)
  const [innerIndex, setInnerIndex] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    if (outerIndex >= outerText.length && innerIndex >= innerText.length) {
      setFinished(true)
      return
    }
    const interval = setInterval(() => {
      setOuterIndex((i) => (i < outerText.length ? i + 1 : i))
      setInnerIndex((i) => (i < innerText.length ? i + 1 : i))
    }, 50)
    return () => clearInterval(interval)
  }, [outerIndex, innerIndex])

  return (
    <svg viewBox="0 0 600 600" className={styles.svg}>
      <defs>
        <path
          id="outerCircle"
          d="M 255,273 m -120,0 a 120,120 0 1,1 240,0 a 120,120 0 1,1 -240,0"
        />
        <path id="innerCircle" d="M 255,273 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0" />

        {/* <circle cx="255" cy="273" r="3" fill="red" /> // This is the center of the turntable */}
      </defs>
      <text className={`${styles.text} ${finished ? styles.spinningOuter : ''}`}>
        <textPath xlinkHref="#outerCircle" startOffset="0">
          {outerText.slice(0, outerIndex)}
        </textPath>
      </text>
      <text className={`${styles.text} ${finished ? styles.spinningInner : ''}`}>
        <textPath xlinkHref="#innerCircle" startOffset="0">
          {innerText.slice(0, innerIndex)}
        </textPath>
      </text>
    </svg>
  )
}

export default RecordText
