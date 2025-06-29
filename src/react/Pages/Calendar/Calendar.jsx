import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

const Calendar = () => {
  const navigate = useNavigate()

  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        padding: 3
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => navigate('/add-log')}
        sx={{
          minWidth: '200px'
        }}
      >
        Add Log
      </Button>
    </Stack>
  )
}

export default Calendar
