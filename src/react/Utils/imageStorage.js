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
 * NOTE: This function is kept for manual use only - no automatic deletion
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
    console.log('Manual cleanup completed - removed images older than 30 days')
  } catch (error) {
    console.error('Error clearing old images:', error)
  }
}

/**
 * Get storage usage information and warn if approaching limits
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
      storageSizeMB: (storageSize / 1024 / 1024).toFixed(2),
      isNearQuota: storageSize > 4 * 1024 * 1024 // Warn if over 4MB (quota is usually 5-10MB)
    }
  } catch (error) {
    console.error('Error getting storage info:', error)
    return {
      imageCount: 0,
      storageSize: 0,
      storageSizeMB: '0.00',
      isNearQuota: false
    }
  }
}

/**
 * Save image to local storage
 * @param {string} key
 * @param {string} base64Data
 */
export const saveImageToStorage = (key, base64Data) => {
  const storageInfo = getStorageInfo()
  if (storageInfo.isNearQuota) {
    console.warn('Warning: LocalStorage is approaching quota limit. Consider exporting/backing up your images.')
  }

  try {
    const existingImages = getImagesFromStorage()
    existingImages[key] = {
      data: base64Data,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem(IMAGE_STORAGE_KEY, JSON.stringify(existingImages))
    console.log('Image saved successfully with key:', key)
  } catch (error) {
    console.error('Error saving image to localStorage:', error)

    // If storage is full, provide helpful error message but DON'T delete images
    if (error.name === 'QuotaExceededError') {
      const currentStorageInfo = getStorageInfo()
      const errorMessage = `Storage quota exceeded! You have ${currentStorageInfo.imageCount} images using ${currentStorageInfo.storageSizeMB}MB. 
      
To continue saving images, you can:
1. Export/backup your existing images
2. Use the storage manager to manually review and remove old images if needed
3. Clear browser cache for other websites to free up space

Your existing images will NOT be automatically deleted.`

      console.error(errorMessage)
      throw new Error('Storage quota exceeded. Please manage your storage manually to continue.')
    } else {
      throw error
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
 * Generate a unique key for an image based on date and timestamp
 * @param {string} date - Date string (YYYY-MM-DD format)
 * @returns {string} Unique key for the image
 */
export const generateImageKey = (date) => {
  const timestamp = new Date().getTime()
  return `${date}_${timestamp}`
}

/**
 * Debug function to log all stored images and their keys
 * Useful for troubleshooting image storage issues
 */
export const debugImageStorage = () => {
  try {
    const images = getImagesFromStorage()
    console.log('=== Image Storage Debug ===')
    console.log('Total images stored:', Object.keys(images).length)

    if (Object.keys(images).length === 0) {
      console.log('No images found in localStorage')
      return
    }

    Object.entries(images).forEach(([key, value]) => {
      console.log(`Key: ${key}`)
      console.log(`  Timestamp: ${value.timestamp}`)
      console.log(`  Data length: ${value.data ? value.data.length : 'null'}`)
      console.log(`  Has data: ${!!value.data}`)
    })

    // Check storage usage
    const storageInfo = getStorageInfo()
    console.log('Storage info:', storageInfo)
  } catch (error) {
    console.error('Error debugging image storage:', error)
  }
}
