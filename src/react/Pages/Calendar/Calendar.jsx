import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button, useTheme, useMediaQuery } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

const Calendar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack
      spacing={isMobile ? 2 : 3}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        padding: theme.spacing(isMobile ? 2 : 3)
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('/add-log')}
        size={isMobile ? 'medium' : 'large'}
        sx={{
          minWidth: isMobile ? 'auto' : '200px'
        }}
      >
        Add Log
      </Button>
    </Stack>
  )
}

export default Calendar
