import { getDownloadURL, ref } from 'firebase/storage'
import { FIREBASE_FOLDER } from '@/constants/music'
import { storage } from '@/data/firebase'
import { soundsUrl, SoundsUrlSchema } from '@/data/sounds'

export const fetchFirebaseSoundUrls = async (
  category?: keyof SoundsUrlSchema,
): Promise<{ [key: string]: string }> => {
  try {
    const soundUrls: { [key: string]: string } = {}

    // If category is specified, only fetch that category
    const categoriesToFetch = category ? { [category]: soundsUrl[category] } : soundsUrl

    for (const [categoryName, sounds] of Object.entries(categoriesToFetch)) {
      for (const [soundKey, fileName] of Object.entries(sounds)) {
        const soundRef = ref(storage, `${FIREBASE_FOLDER}/${fileName}`)
        const url = await getDownloadURL(soundRef)
        soundUrls[`${categoryName}_${soundKey}`] = url
      }
    }

    return soundUrls
  } catch (error) {
    console.error('Error fetching sound URLs:', error)
    throw error
  }
}
