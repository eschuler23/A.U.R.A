import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Stack, Button, Menu, MenuItem } from '@mui/material'
import {
  PhotoCamera as CameraIcon,
  Upload as UploadIcon
} from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import InfoCard from '../../Components/InfoCard'
import dischargeAttributes from '../../Constants/dischargeAttributes'
import {
  fileToBase64,
  saveImageToStorage,
  getImageFromStorage,
  generateImageKey,
  removeImageFromStorage
} from '../../Utils/imageStorage'

const TEMP_IMAGE_KEY = 'temp_new_log_image'

const LogEdit = () => {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState({
    color: [],
    odor: [],
    consistency: [],
    symptom: []
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageKey, setImageKey] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { date } = useParams()

  useEffect(() => {
    if (!date) return

    const fetchLog = async () => {
      try {
        const response = await fetch('http://localhost:3001/logs')
        const logs = await response.json()

        const foundLog = logs.find((log) => log.date === date)

        if (foundLog) {
          setSelectedOptions(foundLog.selectedOptions)
          setSelectedDate(new Date(foundLog.date))

          // Try to load image from local storage first
          if (foundLog.imageKey) {
            const storedImage = getImageFromStorage(foundLog.imageKey)
            if (storedImage) {
              setSelectedImage(storedImage)
              setImageKey(foundLog.imageKey)
            } else if (foundLog.imageUrl) {
              // Fallback to imageUrl if local storage doesn't have the image
              setSelectedImage(foundLog.imageUrl)
            }
          } else if (foundLog.imageUrl) {
            setSelectedImage(foundLog.imageUrl)
          }
        }
      } catch (error) {
        console.error('Fehler beim Laden des Logs:', error)
      }
    }

    fetchLog()
  }, [date])

  // Load temporary image for new logs on page refresh
  useEffect(() => {
    if (date === 'new' && !selectedImage) {
      const tempImage = getImageFromStorage(TEMP_IMAGE_KEY)
      if (tempImage) {
        setSelectedImage(tempImage)
        setImageKey(TEMP_IMAGE_KEY)
      }
    }
  }, [date, selectedImage])

  // Cleanup temporary image when component unmounts (for new logs only)
  useEffect(
    () => () => {
      // Only cleanup if we're creating a new log and the image wasn't saved
      if (date === 'new' && imageKey === TEMP_IMAGE_KEY) {
        // Add a small delay to allow submission to complete
        setTimeout(() => {
          const tempImage = getImageFromStorage(TEMP_IMAGE_KEY)
          if (tempImage) {
            removeImageFromStorage(TEMP_IMAGE_KEY)
          }
        }, 1000)
      }
    },
    [date, imageKey]
  )

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const base64Data = await fileToBase64(file)
        let key

        if (date === 'new') {
          // For new logs, use temporary key until the log is saved
          key = TEMP_IMAGE_KEY
        } else if (!imageKey) {
          // For existing logs without imageKey, generate a new one
          let dateForKey
          if (selectedDate) {
            dateForKey = selectedDate.toISOString().split('T')[0]
          } else if (date !== 'new') {
            dateForKey = date
          } else {
            dateForKey = new Date().toISOString().split('T')[0]
          }
          key = generateImageKey(dateForKey)
        } else {
          // Use existing imageKey
          key = imageKey
        }

        saveImageToStorage(key, base64Data)
        setSelectedImage(base64Data)
        setImageKey(key)
      } catch (error) {
        console.error('Error saving image to storage:', error)
        // Fallback to URL.createObjectURL if local storage fails
        setSelectedImage(URL.createObjectURL(file))
      }
    }
    handleMenuClose()
  }

  const handleCameraCapture = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const base64Data = await fileToBase64(file)
        let key

        if (date === 'new') {
          // For new logs, use temporary key until the log is saved
          key = TEMP_IMAGE_KEY
        } else if (!imageKey) {
          // For existing logs without imageKey, generate a new one
          let dateForKey
          if (selectedDate) {
            dateForKey = selectedDate.toISOString().split('T')[0]
          } else if (date !== 'new') {
            dateForKey = date
          } else {
            dateForKey = new Date().toISOString().split('T')[0]
          }
          key = generateImageKey(dateForKey)
        } else {
          // Use existing imageKey
          key = imageKey
        }

        saveImageToStorage(key, base64Data)
        setSelectedImage(base64Data)
        setImageKey(key)
      } catch (error) {
        console.error('Error saving image to storage:', error)
        // Fallback to URL.createObjectURL if local storage fails
        setSelectedImage(URL.createObjectURL(file))
      }
    }
    handleMenuClose()
  }

  const handleChipClick = (attribute, selectedOption) => {
    setSelectedOptions((prev) => {
      const current = prev[attribute] || []
      const updated = current.includes(selectedOption)
        ? current.filter((i) => i !== selectedOption)
        : [...current, selectedOption]

      return {
        ...prev,
        [attribute]: updated
      }
    })
  }

  const handleSubmit = async () => {
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    // Handle image key for new logs
    let finalImageKey = imageKey
    if (date === 'new' && imageKey === TEMP_IMAGE_KEY) {
      // Generate a permanent key for the new log
      finalImageKey = generateImageKey(formattedDate)
      // Move image from temporary to permanent storage
      if (selectedImage) {
        saveImageToStorage(finalImageKey, selectedImage)
        // Remove temporary image
        removeImageFromStorage(TEMP_IMAGE_KEY)
      }
    }

    const log = {
      selectedOptions,
      date: formattedDate,
      // Only send imageUrl if it's not a base64 string (for backwards compatibility)
      // For base64 images stored locally, only send the imageKey
      imageUrl:
        selectedImage && selectedImage.startsWith('data:')
          ? null
          : selectedImage,
      imageKey: finalImageKey // Add imageKey to identify the image in local storage
    }

    try {
      let response

      // Debug logging
      console.log('Submitting log:', {
        date,
        formattedDate,
        hasImage: !!selectedImage,
        imageKey: finalImageKey,
        imageSize: selectedImage ? selectedImage.length : 0,
        isBase64: selectedImage?.startsWith('data:')
      })

      if (date && date !== 'new') {
        // Update existing log
        response = await fetch(`http://localhost:3001/logs/${date}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(log)
        })
      } else {
        // Create new log
        response = await fetch('http://localhost:3001/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(log)
        })
      }

      if (!response.ok) {
        const errorText = await response.text()
        console.error(
          'Server response:',
          response.status,
          response.statusText,
          errorText
        )
        throw new Error(`Serverfehler: ${response.statusText}`)
      }

      navigate(`/log/${formattedDate}`)
    } catch (error) {
      console.error('Fehler beim Speichern des Logs:', error)
      // eslint-disable-next-line no-alert
      alert('Speichern fehlgeschlagen. Bitte versuche es erneut.')
    }
  }

  return (
    <Stack
      spacing={2}
      sx={{
        padding: 3,
        overflow: 'auto'
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          disabled={!!date}
        />
      </LocalizationProvider>
      {selectedImage && (
        <img
          src={selectedImage}
          alt="Preview"
          style={{
            maxWidth: '100%',
            maxHeight: 200,
            objectFit: 'contain'
          }}
        />
      )}
      <Button onClick={handleMenuClick}>
        {selectedImage ? 'Change Image' : 'Add Image'}
      </Button>
      {dischargeAttributes &&
        dischargeAttributes.map(
          ({ key, title, icon: IconComponent, options }) => (
            <InfoCard
              key={key}
              attrKey={key}
              title={title}
              options={options}
              selectedOptions={selectedOptions[key]}
              onClickChip={(option) => handleChipClick(key, option)}
              icon={<IconComponent />}
              clickable
            />
          )
        )}

      <Button
        onClick={handleSubmit}
        disabled={
          !selectedImage ||
          !selectedDate ||
          Object.values(selectedOptions).every((arr) => arr.length === 0)
        }
      >
        Submit
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem component="div">
          <Button
            variant="text"
            component="label"
            startIcon={<CameraIcon />}
            sx={{ justifyContent: 'flex-start', minWidth: '200px' }}
          >
            Take Picture
            <input
              hidden
              accept="image/*"
              type="file"
              capture="environment"
              onChange={handleCameraCapture}
              id="camera-input"
            />
          </Button>
        </MenuItem>
        <MenuItem component="div">
          <Button
            variant="text"
            component="label"
            startIcon={<UploadIcon />}
            sx={{ justifyContent: 'flex-start', minWidth: '200px' }}
          >
            Upload Image
            <input
              hidden
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              id="file-input"
            />
          </Button>
        </MenuItem>
      </Menu>
    </Stack>
  )
}

export default LogEdit
