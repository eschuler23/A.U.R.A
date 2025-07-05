import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Stack, Button } from '@mui/material'
<<<<<<< HEAD
import { Add as AddIcon } from '@mui/icons-material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
=======
>>>>>>> origin/main

const Calendar = () => {
  const navigate = useNavigate()

  const [logs, setLogs] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/logs')
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error('Fehler beim Laden der Logs:', err))
  }, [])

  const renderDay = (day, _value, DayComponentProps) => {
    const isLogged = logs.some(
      (log) => new Date(log.date).toDateString() === day.toDateString()
    )

    return (
      <PickersDay
        day={DayComponentProps.day}
        selected={DayComponentProps.selected}
        disabled={DayComponentProps.disabled}
        today={DayComponentProps.today}
        outsideCurrentMonth={DayComponentProps.outsideCurrentMonth}
        sx={{
          ...(isLogged && {
            backgroundColor: '#90caf9',
            color: 'white',
            '&:hover': {
              backgroundColor: '#64b5f6'
            }
          })
        }}
      />
    )
  }

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateCalendar
          onChange={(date) => {
            const selectedLog = logs.find(
              (log) => new Date(log.date).toDateString() === date.toDateString()
            )
            if (selectedLog) {
              navigate('/log-result', { state: selectedLog })
            }
          }}
          renderDay={renderDay}
        />
      </LocalizationProvider>

      <Button
        onClick={() => navigate('/log/new')}
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
