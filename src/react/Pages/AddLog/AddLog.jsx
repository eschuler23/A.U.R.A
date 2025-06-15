import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button, TextField, Typography, useTheme, useMediaQuery } from '@mui/material'
import { PhotoCamera as CameraIcon } from '@mui/icons-material'

const AddLog = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [tags, setTags] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImage(file)
    }
  }

  const handleSubmit = () => {
    navigate('/log-result', {
      state: {
        tags,
        imageUrl: selectedImage ? URL.createObjectURL(selectedImage) : null
      }
    })
  }

  return (
    <Stack
      spacing={isMobile ? 2 : 3}
      sx={{
        width: '100%',
        height: '100%',
        padding: isMobile ? 2 : 3
      }}
    >
      <Typography variant={isMobile ? 'h5' : 'h4'} align="center">
        Add New Log
      </Typography>

      <Button
        variant="contained"
        component="label"
        startIcon={<CameraIcon />}
        fullWidth
        size={isMobile ? 'medium' : 'large'}
      >
        {selectedImage ? 'Change Image' : 'Upload Picture'}
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleImageChange}
        />
      </Button>

      {selectedImage && (
        <Typography variant="body2" color="textSecondary">
          Selected:
          {' '}
          {selectedImage.name}
        </Typography>
      )}

      <TextField
        label="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
        placeholder="Enter tags separated by commas"
        size={isMobile ? 'small' : 'medium'}
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        fullWidth
        size={isMobile ? 'medium' : 'large'}
        disabled={!tags.trim() || !selectedImage}
      >
        Submit
      </Button>
    </Stack>
  )
}

export default AddLog
