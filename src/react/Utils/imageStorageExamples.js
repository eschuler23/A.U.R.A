/**
 * Example usage of the image storage utilities
 * This demonstrates how images are saved to and retrieved from local storage
 */

import {
  fileToBase64,
  saveImageToStorage,
  getImageFromStorage,
  getStorageInfo,
  generateImageKey,
  clearOldImages,
  removeImageFromStorage
} from './imageStorage'

// Example: Save an image file to local storage
export const saveImageExample = async (file, date) => {
  try {
    // Convert file to base64
    const base64Data = await fileToBase64(file)

    // Generate a unique key for the image
    const imageKey = generateImageKey(date)

    // Save to local storage
    saveImageToStorage(imageKey, base64Data)

    console.log('Image saved successfully with key:', imageKey)
    return imageKey
  } catch (error) {
    console.error('Error saving image:', error)
    return null
  }
}

// Example: Retrieve an image from local storage
export const getImageExample = (imageKey) => {
  try {
    const imageData = getImageFromStorage(imageKey)
    if (imageData) {
      console.log('Image retrieved successfully')
      return imageData
    }
    console.log('Image not found in storage')
    return null
  } catch (error) {
    console.error('Error retrieving image:', error)
    return null
  }
}

// Example: Check storage usage
export const checkStorageUsage = () => {
  const info = getStorageInfo()
  console.log('Storage info:')
  console.log(`- Number of images: ${info.imageCount}`)
  console.log(`- Storage size: ${info.storageSizeMB} MB`)
  return info
}

// Example: Clean up old images
export const cleanupImages = () => {
  try {
    clearOldImages()
    console.log('Old images cleaned up successfully')
  } catch (error) {
    console.error('Error cleaning up images:', error)
  }
}

// Example: Remove a specific image
export const removeImageExample = (imageKey) => {
  try {
    removeImageFromStorage(imageKey)
    console.log('Image removed successfully')
  } catch (error) {
    console.error('Error removing image:', error)
  }
}

/*
How to use in your components:

1. Import the storage utilities:
   import { fileToBase64, saveImageToStorage, getImageFromStorage, generateImageKey } from '../Utils/imageStorage'

2. When a user uploads an image:
   const handleImageUpload = async (event) => {
     const file = event.target.files[0]
     if (file) {
       const base64Data = await fileToBase64(file)
       const imageKey = generateImageKey(dateString)
       saveImageToStorage(imageKey, base64Data)
       setImage(base64Data)
       setImageKey(imageKey)
     }
   }

3. When loading an existing log:
   useEffect(() => {
     if (log.imageKey) {
       const storedImage = getImageFromStorage(log.imageKey)
       if (storedImage) {
         setImage(storedImage)
       }
     }
   }, [])

4. When saving a log:
   const logData = {
     ...otherData,
     imageKey: imageKey, // Store the key, not the full image data
     imageUrl: image    // Keep for backwards compatibility
   }

Benefits:
- Images persist across page refreshes
- No need to re-upload images when editing logs
- Automatic cleanup of old images to prevent storage overflow
- Fallback to URL-based images for backwards compatibility
*/
