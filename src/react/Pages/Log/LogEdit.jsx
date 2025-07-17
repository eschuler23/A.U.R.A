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

const LogEdit = () => {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState({
    color: [],
    odor: [],
    consistency: [],
    symptom: []
  })
  const [selectedImage, setSelectedImage] = useState(null)
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

        const foundLog = logs.find(
          (log) => log.date === date
        )

        if (foundLog) {
          setSelectedOptions(foundLog.selectedOptions)
          setSelectedImage(foundLog.imageUrl)
          setSelectedDate(new Date(foundLog.date))
        }
      } catch (error) {
        console.error('Fehler beim Laden des Logs:', error)
      }
    }

    fetchLog()
  }, [date])

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
    }
    handleMenuClose()
  }

  const handleCameraCapture = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(URL.createObjectURL(file))
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
    const log = {
      selectedOptions,
      date: selectedDate.toISOString().split('T')[0],
      imageUrl: selectedImage
    }

    try {
      if (date) {
        const res = await fetch('http://localhost:3001/logs')
        const logs = await res.json()
        const existingLog = logs.find((l) => l.date === date)

        if (existingLog) {
          //          TODO BACKEND MAHIR
          //          await fetch(`http://localhost:3001/logs/${existingLog.key}`, {
          //            method: 'DELETE'
          //          })
        }
      }

      const response = await fetch('http://localhost:3001/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(log)
      })

      if (!response.ok) {
        throw new Error(`Serverfehler: ${response.statusText}`)
      }

      navigate(`/log/${selectedDate.toISOString().split('T')[0]}`)
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
      {dischargeAttributes && dischargeAttributes.map(
        ({ key, title, icon: IconComponent, options }) => (
          <InfoCard
            key={key}
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
