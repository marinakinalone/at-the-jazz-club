export const fadeVolume = (
  audio: HTMLAudioElement,
  from: number,
  to: number,
  duration: number,
  callback?: () => void,
) => {
  const steps = 20
  const stepTime = duration / steps
  let currentStep = 0

  audio.volume = from
  const volumeStep = (to - from) / steps

  const fadeInterval = setInterval(() => {
    currentStep++
    audio.volume = Math.min(Math.max(audio.volume + volumeStep, 0), 1)

    if (currentStep >= steps) {
      clearInterval(fadeInterval)
      if (callback) callback()
    }
  }, stepTime)
}
