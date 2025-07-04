import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button, Menu, MenuItem } from '@mui/material'
import {
  PhotoCamera as CameraIcon,
  Upload as UploadIcon
} from '@mui/icons-material'
import dischargeAttributes from '../../constants/dischargeAttributes'
import InfoCard from '../../Components/InfoCard'

const LogEdit = () => {
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = useState({
    color: [],
    odor: [],
    consistency: [],
    symptom: []
  })
  const [selectedImage, setSelectedImage] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
    }
    handleMenuClose()
  }

  const handleCameraCapture = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
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
    navigate('/log/1')
    //   try {
    //     TBD API call
    //     const id = response.id;
    //     navigate(`/log/${id}`);
    //   } catch (error) {
    //     TBD error handling
    //   }
  }

  return (
    <Stack
      spacing={2}
      sx={{
        padding: 3,
        overflow: 'auto'
      }}
    >
      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Preview"
          style={{
            maxWidth: '100%',
            maxHeight: 200,
            objectFit: 'contain',
            borderRadius: 8
          }}
        />
      )}
      <Button onClick={handleMenuClick}>
        {selectedImage ? 'Change Image' : 'Add Image'}
      </Button>
      {dischargeAttributes.map(
        ({ key, title, icon: IconComponent, options }) => (
          <InfoCard
            key={key}
            title={title}
            options={options}
            selectedOptions={selectedOptions[key]}
            onClickChip={(option) => handleChipClick(key, option)}
            icon={<IconComponent />}
          />
        )
      )}

      <Button
        onClick={handleSubmit}
        disabled={
          !selectedImage ||
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
