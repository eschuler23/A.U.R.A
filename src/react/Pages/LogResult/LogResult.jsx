import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Stack,
  Button,
  Typography,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material'

const LogResult = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { tags, imageUrl } = location.state || {}
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

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
          padding: theme.spacing(isMobile ? 2 : 3),
          paddingBottom: '80px'
        }}
      >
        <Stack spacing={isMobile ? 2 : 3}>
          {tags && (
            <Box>
              <Typography variant={isMobile ? 'subtitle1' : 'h6'}>
                Tags:
              </Typography>
              <Typography>{tags}</Typography>
            </Box>
          )}

          {imageUrl && (
            <Box>
              <Typography variant={isMobile ? 'subtitle1' : 'h6'}>
                Image:
              </Typography>
              <Box
                component="img"
                src={imageUrl}
                alt="Uploaded"
                sx={{
                  width: '100%',
                  maxHeight: isMobile ? 200 : 300,
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
          padding: theme.spacing(isMobile ? 1.5 : 2),
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}
      >
        <Button
          variant="contained"
          onClick={() => navigate('/')}
          fullWidth
          size={isMobile ? 'medium' : 'large'}
          color="primary"
        >
          Add to Tracking
        </Button>
      </Box>
    </Stack>
  )
}

export default LogResult
