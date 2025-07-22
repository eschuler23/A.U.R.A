/**
 * Utility functions for handling image storage in browser's local storage
 */

const IMAGE_STORAGE_KEY = 'mhealth_images'

/**
 * Convert file to base64 string for storage
 * @param {File} file - The image file to convert
 * @returns {Promise<string>} Base64 string representation of the image
 */
export const fileToBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = () => resolve(reader.result)
  reader.onerror = (error) => reject(error)
  reader.readAsDataURL(file)
})

/**
 * Get all images from local storage
 * @returns {Object} Object containing all stored images
 */
export const getImagesFromStorage = () => {
  try {
    const stored = localStorage.getItem(IMAGE_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch (error) {
    console.error('Error parsing images from localStorage:', error)
    return {}
  }
}

/**
 * Clear old images to free up storage space (keeps images from last 30 days)
 */
export const clearOldImages = () => {
  try {
    const images = getImagesFromStorage()
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const filteredImages = {}
    Object.entries(images).forEach(([key, value]) => {
      if (value.timestamp && new Date(value.timestamp) > thirtyDaysAgo) {
        filteredImages[key] = value
      }
    })

    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(filteredImages))
  } catch (error) {
    console.error('Error clearing old images:', error)
  }
}

/**
 * Save image to local storage
 * @param {string} key - Unique identifier for the image
 * @param {string} base64Data - Base64 encoded image data
 */
export const saveImageToStorage = (key, base64Data) => {
  try {
    const existingImages = getImagesFromStorage()
    existingImages[key] = {
      data: base64Data,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(existingImages))
  } catch (error) {
    console.error('Error saving image to localStorage:', error)
    // If storage is full, try to clear old images
    if (error.name === 'QuotaExceededError') {
      clearOldImages()
      // Try saving again after clearing
      try {
        const existingImages = getImagesFromStorage()
        existingImages[key] = {
          data: base64Data,
          timestamp: new Date().toISOString()
        }
        localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(existingImages))
      } catch (retryError) {
        console.error('Failed to save image even after clearing storage:', retryError)
      }
    }
  }
}

/**
 * Retrieve image from local storage
 * @param {string} key - Unique identifier for the image
 * @returns {string|null} Base64 encoded image data or null if not found
 */
export const getImageFromStorage = (key) => {
  try {
    const images = getImagesFromStorage()
    return images[key]?.data || null
  } catch (error) {
    console.error('Error retrieving image from localStorage:', error)
    return null
  }
}

/**
 * Remove image from local storage
 * @param {string} key - Unique identifier for the image to remove
 */
export const removeImageFromStorage = (key) => {
  try {
    const images = getImagesFromStorage()
    delete images[key]
    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(images))
  } catch (error) {
    console.error('Error removing image from localStorage:', error)
  }
}

/**
 * Get storage usage information
 * @returns {Object} Information about storage usage
 */
export const getStorageInfo = () => {
  try {
    const images = getImagesFromStorage()
    const imageCount = Object.keys(images).length
    const storageSize = new Blob([localStorage.getItem(IMAGE_STORAGE_KEY) || '']).size

    return {
      imageCount,
      storageSize,
      storageSizeMB: (storageSize / 1024 / 1024).toFixed(2)
    }
  } catch (error) {
    console.error('Error getting storage info:', error)
    return {
      imageCount: 0,
      storageSize: 0,
      storageSizeMB: '0.00'
    }
  }
}

/**
 * Generate a unique key for an image based on date and timestamp
 * @param {string} date - Date string (YYYY-MM-DD format)
 * @returns {string} Unique key for the image
 */
export const generateImageKey = (date) => {
  const timestamp = new Date().getTime()
  return `${date}_${timestamp}`
}
