import { create } from 'zustand'
import { SoundsUrlSchema } from '@/data/sounds'

interface SoundState {
  sounds: { [key: string]: HTMLAudioElement }
  isLoading: boolean
  isLoaded: boolean
  error: string | null
  isSilent: boolean

  loadSounds: (soundUrls: Partial<SoundsUrlSchema> | { [key: string]: string }) => Promise<void>
  playSound: (soundKey: string) => void
  stopSound: (soundKey: string) => void
  setIsSilent: () => void
  cleanup: () => void
}

export const useSoundStore = create<SoundState>((set, get) => ({
  sounds: {},
  isLoading: false,
  isLoaded: false,
  error: null,
  isSilent: false,

  loadSounds: async (soundUrls) => {
    set({ isLoading: true, error: null })

    try {
      const soundPromises = Object.entries(soundUrls).map(async ([key, url]) => {
        const audio = new Audio()
        audio.src = url
        audio.preload = 'auto'

        return new Promise<[string, HTMLAudioElement]>((resolve, reject) => {
          audio.addEventListener('canplaythrough', () => resolve([key, audio]))
          audio.addEventListener('error', reject)
        })
      })

      const loadedSounds = await Promise.all(soundPromises)
      const soundMap = Object.fromEntries(loadedSounds)

      set({
        sounds: soundMap,
        isLoading: false,
        isLoaded: true,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load sounds',
        isLoading: false,
      })
    }
  },

  playSound: (soundKey) => {
    if (get().isSilent) return
    const { sounds } = get()

    const sound = sounds[soundKey]
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(() => console.error('Error playing sound:', soundKey))
    }
  },

  stopSound: (soundKey) => {
    const { sounds } = get()
    const sound = sounds[soundKey]
    if (sound) {
      sound.pause()
      sound.currentTime = 0
    }
  },

  setIsSilent: () => {
    const shouldHaveSound = !get().isSilent

    if (!shouldHaveSound) {
      const { sounds } = get()
      Object.values(sounds).forEach((sound) => {
        sound.pause()
        sound.currentTime = 0
      })
    }
    set({ isSilent: shouldHaveSound })
  },

  cleanup: () => {
    const { sounds } = get()
    Object.values(sounds).forEach((sound) => {
      sound.pause()
      sound.src = ''
    })
    set({ sounds: {}, isLoaded: false })
  },
}))
