import { create } from 'zustand'
import { BACKGROUND_MUSIC_KEYS } from '@/constants/scenes'
import { SoundsUrlSchema } from '@/data/sounds'
import { fadeVolume } from '@/utils/fadeVolume'

interface CurrentlyPlaying {
  soundKey: string
  timeWhenStopped: number
}
interface SoundState {
  sounds: { [key: string]: HTMLAudioElement }
  isLoading: boolean
  isLoaded: boolean
  error: string | null
  isSilent: boolean
  currentlyPlaying: CurrentlyPlaying | null

  loadSounds: (soundUrls: Partial<SoundsUrlSchema> | { [key: string]: string }) => Promise<void>
  playSound: (soundKey: string) => void
  stopSound: (soundKey: string) => void
  setIsSilent: () => void
  cleanup: () => void
}

const useSoundStore = create<SoundState>((set, get) => ({
  sounds: {},
  isLoading: false,
  isLoaded: false,
  error: null,
  isSilent: false,
  currentlyPlaying: null,

  loadSounds: async (soundUrls) => {
    set({ isLoading: true, error: null })

    try {
      const soundPromises = Object.entries(soundUrls).map(async ([key, url]) => {
        const audio = new Audio()
        audio.src = url
        audio.preload = 'auto'
        if (key === 'global_background' || key === 'global_final') {
          audio.loop = true
        }

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

    const { sounds, currentlyPlaying } = get()
    const sound = sounds[soundKey]
    if (sound) {
      const isBackgroundMusic =
        currentlyPlaying &&
        currentlyPlaying.soundKey === soundKey &&
        BACKGROUND_MUSIC_KEYS.includes(soundKey)
      if (isBackgroundMusic) {
        sound.currentTime = currentlyPlaying.timeWhenStopped
      } else {
        sound.currentTime = 0
      }
      sound.play().catch(() => console.error('Error playing sound:', soundKey))

      if (isBackgroundMusic) {
        fadeVolume(sound, 0, 1, 2000)
      }
      if (soundKey === 'global_background' || soundKey === 'global_final') {
        set({ currentlyPlaying: { soundKey, timeWhenStopped: 0 } })
      }
    }
  },

  stopSound: (soundKey) => {
    const { sounds } = get()
    const sound = sounds[soundKey]
    if (sound) {
      fadeVolume(sound, sound.volume, 0, 500, () => {
        sound.pause()
        if (BACKGROUND_MUSIC_KEYS.includes(soundKey)) {
          // Save the time when stopped
          set({ currentlyPlaying: { soundKey, timeWhenStopped: sound.currentTime } })
        }
      })
    }
  },

  setIsSilent: () => {
    const isSilent = !get().isSilent
    const { sounds, currentlyPlaying } = get()

    if (isSilent) {
      // Pause current sound and save its position
      if (currentlyPlaying) {
        const sound = sounds[currentlyPlaying.soundKey]
        if (sound) {
          sound.pause()

          if (BACKGROUND_MUSIC_KEYS.includes(currentlyPlaying.soundKey)) {
            set({
              currentlyPlaying: {
                soundKey: currentlyPlaying.soundKey,
                timeWhenStopped: sound.currentTime,
              },
            })
          }
        }
      }
      set({ isSilent })
    } else {
      // Resume from saved position
      if (currentlyPlaying) {
        const sound = sounds[currentlyPlaying.soundKey]
        if (sound) {
          sound.currentTime = currentlyPlaying.timeWhenStopped
          sound.play().catch(() => console.error('Error playing sound:', currentlyPlaying.soundKey))
          fadeVolume(sound, 0, 1, 2000)
        }
      }
      set({ isSilent })
    }
  },

  cleanup: () => {
    const { sounds } = get()
    Object.values(sounds).forEach((sound) => {
      sound.pause()
      sound.src = ''
    })
    set({ sounds: {}, isLoaded: false, currentlyPlaying: null })
  },
}))

export default useSoundStore
