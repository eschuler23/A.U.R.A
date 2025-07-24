import React, { useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
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
  const [searchParams] = useSearchParams()
  const [selectedOptions, setSelectedOptions] = useState({
    color: [],
    odor: [],
    consistency: [],
    symptom: []
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [imageKey, setImageKey] = useState(null)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const { date } = useParams()

  useEffect(() => {
    if (date === 'new') {
      const dateParam = searchParams.get('date')
      if (dateParam) {
        const parsedDate = new Date(`${dateParam}T00:00:00`)
        if (!Number.isNaN(parsedDate.getTime())) {
          setSelectedDate(parsedDate)
        } else {
          setSelectedDate(new Date())
        }
      } else {
        setSelectedDate(new Date())
      }
    }
  }, [date, searchParams])

  useEffect(() => {
    if (!date || date === 'new') return
    const fetchLog = async () => {
      try {
        const response = await fetch('http://localhost:3001/logs')
        const logs = await response.json()

        const foundLog = logs.find((log) => log.date === date)

        if (foundLog) {
          setSelectedOptions(foundLog.selectedOptions)
          // Fix timezone issue by using proper date parsing
          const dateParts = foundLog.date.split('-')
          const year = parseInt(dateParts[0], 10)
          const month = parseInt(dateParts[1], 10) - 1 // Month is 0-indexed
          const day = parseInt(dateParts[2], 10)
          setSelectedDate(new Date(year, month, day))

          if (foundLog.imageKey) {
            console.log('Looking for image with key:', foundLog.imageKey)
            const storedImage = getImageFromStorage(foundLog.imageKey)
            if (storedImage) {
              console.log('Found stored image for key:', foundLog.imageKey)
              setSelectedImage(storedImage)
              setImageKey(foundLog.imageKey)
            } else {
              console.log('No stored image found for key:', foundLog.imageKey)
              if (foundLog.imageUrl) {
                setSelectedImage(foundLog.imageUrl)
              }
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

  useEffect(() => {
    if (date === 'new' && !selectedImage) {
      const tempImage = getImageFromStorage(TEMP_IMAGE_KEY)
      if (tempImage) {
        setSelectedImage(tempImage)
        setImageKey(TEMP_IMAGE_KEY)
      }
    }
  }, [date, selectedImage])

  useEffect(
    () => () => {
      if (date === 'new' && imageKey === TEMP_IMAGE_KEY) {
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
          key = TEMP_IMAGE_KEY
        } else if (!imageKey) {
          let dateForKey
          if (selectedDate) {
            // Fix timezone issue by using proper date formatting
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
            const day = String(selectedDate.getDate()).padStart(2, '0')
            dateForKey = `${year}-${month}-${day}`
          } else if (date !== 'new') {
            dateForKey = date
          } else {
            const now = new Date()
            const year = now.getFullYear()
            const month = String(now.getMonth() + 1).padStart(2, '0')
            const day = String(now.getDate()).padStart(2, '0')
            dateForKey = `${year}-${month}-${day}`
          }
          console.log('Generating image key for date:', dateForKey)
          key = generateImageKey(dateForKey)
        } else {
          key = imageKey
        }

        console.log('Saving image with key:', key)
        try {
          saveImageToStorage(key, base64Data)
          setSelectedImage(base64Data)
          setImageKey(key)
          console.log('Image saved successfully to localStorage')
        } catch (storageError) {
          console.error('Failed to save to localStorage:', storageError)
          // Show user-friendly message for storage quota issues
          if (storageError.message.includes('Storage quota exceeded')) {
            // eslint-disable-next-line no-alert
            alert(`Storage is full! Your image cannot be saved permanently. 

To save images permanently:
1. Go to Storage Manager to backup/export your existing images
2. Clear old images you no longer need
3. Try uploading the image again

Your log will be saved without the image.`)
          }
          // Don't save blob URLs - just clear the image
          setSelectedImage(null)
          setImageKey(null)
        }
      } catch (error) {
        console.error('Error processing image:', error)
        setSelectedImage(null)
        setImageKey(null)
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
          key = TEMP_IMAGE_KEY
        } else if (!imageKey) {
          let dateForKey
          if (selectedDate) {
            // Fix timezone issue by using proper date formatting
            const year = selectedDate.getFullYear()
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
            const day = String(selectedDate.getDate()).padStart(2, '0')
            dateForKey = `${year}-${month}-${day}`
          } else if (date !== 'new') {
            dateForKey = date
          } else {
            const now = new Date()
            const year = now.getFullYear()
            const month = String(now.getMonth() + 1).padStart(2, '0')
            const day = String(now.getDate()).padStart(2, '0')
            dateForKey = `${year}-${month}-${day}`
          }
          console.log('Generating image key for date:', dateForKey)
          key = generateImageKey(dateForKey)
        } else {
          key = imageKey
        }

        console.log('Saving image with key:', key)
        try {
          saveImageToStorage(key, base64Data)
          setSelectedImage(base64Data)
          setImageKey(key)
          console.log('Camera image saved successfully to localStorage')
        } catch (storageError) {
          console.error(
            'Failed to save camera image to localStorage:',
            storageError
          )
          // Show user-friendly message for storage quota issues
          if (storageError.message.includes('Storage quota exceeded')) {
            // eslint-disable-next-line no-alert
            alert(`Storage is full! Your camera image cannot be saved permanently. 

To save images permanently:
1. Go to Storage Manager to backup/export your existing images
2. Clear old images you no longer need
3. Try taking the picture again

Your log will be saved without the image.`)
          }
          // Don't save blob URLs - just clear the image
          setSelectedImage(null)
          setImageKey(null)
        }
      } catch (error) {
        console.error('Error processing camera image:', error)
        setSelectedImage(null)
        setImageKey(null)
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
    if (selectedDate > new Date()) {
      // eslint-disable-next-line no-alert
      alert('Logs können nicht für zukünftige Daten erstellt werden.')
      return
    }

    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')
    const formattedDate = `${year}-${month}-${day}`

    let finalImageKey = imageKey
    if (date === 'new' && imageKey === TEMP_IMAGE_KEY) {
      finalImageKey = generateImageKey(formattedDate)
      if (selectedImage) {
        try {
          saveImageToStorage(finalImageKey, selectedImage)
          removeImageFromStorage(TEMP_IMAGE_KEY)
        } catch (storageError) {
          console.error(
            'Failed to save image to storage, proceeding without image:',
            storageError
          )
          // Still try to save the log without the image
          finalImageKey = null
        }
      }
    }

    const log = {
      selectedOptions,
      date: formattedDate,
      // Only save imageUrl if it's NOT a blob URL and NOT base64 data
      imageUrl:
        selectedImage &&
        !selectedImage.startsWith('data:') &&
        !selectedImage.startsWith('blob:')
          ? selectedImage
          : null,
      imageKey: finalImageKey
    }

    try {
      let response

      if (date && date !== 'new') {
        response = await fetch(`http://localhost:3001/logs/${date}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(log)
        })
      } else {
        response = await fetch('http://localhost:3001/logs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(log)
        })
      }

      if (!response.ok) {
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
          key={selectedDate?.toISOString()}
          label="Select Date"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          disabled={date && date !== 'new'}
          maxDate={new Date()}
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
