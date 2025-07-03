import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Stack,
  Button,
  TextField,
  Typography,
  Menu,
  MenuItem,
  Box
} from '@mui/material'
import {
  PhotoCamera as CameraIcon,
  Upload as UploadIcon,
  Image as ImageIcon
} from '@mui/icons-material'

const LogEdit = ({ day }) => {
  const navigate = useNavigate()
  const [tags, setTags] = useState('')
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
      spacing={0}
      sx={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          padding: 3,
          paddingBottom: '80px'
        }}
      >
        <Stack spacing={3}>
          <TextField
            label="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            fullWidth
            placeholder="Enter tags separated by commas"
          />

          <Button
            variant="contained"
            onClick={handleMenuClick}
            fullWidth
            startIcon={<ImageIcon />}
          >
            {selectedImage ? 'Change Image' : 'Add Image'}
          </Button>

          {selectedImage && (
            <Stack spacing={1} alignItems="center">
              <Typography variant="body2" color="textSecondary">
                Selected:
                {selectedImage.name}
              </Typography>
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
            </Stack>
          )}
        </Stack>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 2,
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          disabled={!tags.trim() || !selectedImage}
        >
          Submit
        </Button>
      </Box>

      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem component="div">
          <Button
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