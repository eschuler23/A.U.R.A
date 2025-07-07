import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Stack, Button, Typography, Box } from '@mui/material'

const LogView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedOptions, date, imageUrl } = location.state || {}

  return (
    <Stack
      spacing={3}
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
          padding: 2,
          paddingBottom: '80px'
        }}
      >
        <Stack spacing={3}>
          {selectedOptions && (
            <Box>
              <Typography variant="h6">Selected Options:</Typography>
              <pre style={{ whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(selectedOptions, null, 2)}
              </pre>
            </Box>
          )}

          {date && (
            <Box>
              <Typography variant="h6">Date:</Typography>
              <Typography>{new Date(date).toLocaleDateString()}</Typography>
            </Box>
          )}

          {imageUrl && (
            <Box>
              <Typography variant="h6">Image:</Typography>
              <Box
                component="img"
                src={imageUrl}
                alt="Uploaded"
                sx={{
                  width: '100%',
                  maxHeight: 300,
                  objectFit: 'contain',
                  borderRadius: 1
                }}
              />
            </Box>
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
          onClick={() => navigate('/')}
          fullWidth
          size="large"
          color="primary"
        >
          Add to Tracking
        </Button>
      </Box>
    </Stack>
  )
}

export default LogView
