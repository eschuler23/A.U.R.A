# Image Storage with Local Storage

This implementation adds persistent image storage to the mHealth application using the browser's local storage. Images are automatically saved when uploaded and persist across page refreshes.

## Features

- **Persistent Image Storage**: Images are converted to base64 and stored in browser's local storage
- **Automatic Fallback**: If local storage fails, falls back to traditional URL.createObjectURL
- **Storage Management**: Automatic cleanup of old images (30+ days) to prevent storage overflow
- **Backwards Compatibility**: Existing logs with imageUrl still work
- **Error Handling**: Graceful handling of storage quotas and errors

## How It Works

### Image Upload Process

1. User selects an image (camera or file upload)
2. Image is converted to base64 string using FileReader API
3. A unique key is generated based on date and timestamp
4. Image data is stored in localStorage with metadata (timestamp)
5. Image key is saved with the log data for retrieval

### Image Retrieval Process

1. When loading a log, check if it has an `imageKey`
2. If yes, retrieve the image from localStorage using the key
3. If image not found in storage, fall back to `imageUrl`
4. Display the retrieved image

### Storage Management

- **Automatic Cleanup**: Images older than 30 days are automatically removed
- **Quota Management**: If storage is full, old images are cleared and save is retried
- **Storage Info**: Utilities to check storage usage and image count

## Code Changes

### New Files

#### `/src/react/Utils/imageStorage.js`

Core utilities for handling image storage:

- `fileToBase64(file)` - Convert file to base64
- `saveImageToStorage(key, base64Data)` - Save image to localStorage
- `getImageFromStorage(key)` - Retrieve image from localStorage
- `generateImageKey(date)` - Generate unique keys
- `clearOldImages()` - Clean up old images
- `getStorageInfo()` - Get storage statistics

### Modified Files

#### `/src/react/Pages/Log/LogEdit.jsx`

- Added image storage imports
- Added `imageKey` state for tracking stored images
- Modified `handleImageChange` and `handleCameraCapture` to save images to localStorage
- Updated `useEffect` to load images from localStorage
- Modified `handleSubmit` to include imageKey in log data

#### `/src/react/Pages/Log/LogView.jsx`

- Added image storage import
- Updated `useEffect` to prioritize localStorage images over imageUrl

## Usage Examples

### Saving an Image

```javascript
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (file) {
    try {
      const base64Data = await fileToBase64(file)
      const key = generateImageKey(selectedDate.toISOString().split('T')[0])
      saveImageToStorage(key, base64Data)
      setSelectedImage(base64Data)
      setImageKey(key)
    } catch (error) {
      console.error('Error saving image:', error)
      // Fallback to URL.createObjectURL
      setSelectedImage(URL.createObjectURL(file))
    }
  }
}
```

### Loading an Image

```javascript
useEffect(() => {
  if (log.imageKey) {
    const storedImage = getImageFromStorage(log.imageKey)
    if (storedImage) {
      setImage(storedImage)
    } else if (log.imageUrl) {
      setImage(log.imageUrl) // Fallback
    }
  }
}, [log])
```

### Storage Management

```javascript
// Check storage usage
const storageInfo = getStorageInfo()
console.log(
  `${storageInfo.imageCount} images using ${storageInfo.storageSizeMB} MB`
)

// Clean up old images
clearOldImages()

// Remove specific image
removeImageFromStorage(imageKey)
```

## Browser Storage Considerations

### Storage Limits

- **localStorage**: ~5-10MB depending on browser
- **Base64 encoding**: Increases file size by ~33%
- **Automatic cleanup**: Prevents storage overflow

### Browser Support

- **Modern browsers**: Full support for localStorage and FileReader
- **Fallback**: URL.createObjectURL for unsupported scenarios

### Performance

- **Base64 encoding**: Minimal overhead for typical image sizes
- **Memory usage**: Images loaded on-demand, not kept in memory
- **Network**: No additional network requests for stored images

## Error Handling

### Storage Quota Exceeded

```javascript
if (error.name === 'QuotaExceededError') {
  clearOldImages() // Remove old images
  // Retry saving
}
```

### Image Not Found

```javascript
const storedImage = getImageFromStorage(key)
if (!storedImage && log.imageUrl) {
  setImage(log.imageUrl) // Fallback to original URL
}
```

### FileReader Errors

```javascript
try {
  const base64Data = await fileToBase64(file)
  // Save to storage
} catch (error) {
  // Fallback to URL.createObjectURL
  setSelectedImage(URL.createObjectURL(file))
}
```

## Benefits

1. **User Experience**: Images persist across page refreshes
2. **Performance**: No need to re-upload images when editing
3. **Offline Support**: Images available without network connection
4. **Storage Efficiency**: Automatic cleanup prevents storage bloat
5. **Backwards Compatibility**: Existing functionality continues to work

## Future Enhancements

- **Image Compression**: Reduce storage usage with image compression
- **IndexedDB**: Migration to IndexedDB for larger storage capacity
- **Cloud Sync**: Optional cloud storage integration
- **Image Thumbnails**: Generate thumbnails for better performance
