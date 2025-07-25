import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Stack, Typography, Box } from '@mui/material'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { PickersDay } from '@mui/x-date-pickers/PickersDay'
import DiagnosisBanner from '../../Components/DiagnosisBanner'
import getDiagnoses from '../../Utils/diagnoses'

const CustomDay = ({
  logs = [],
  day,
  outsideCurrentMonth,
  selected,
  today,
  disabled,
  onDaySelect
}) => {
  const isLogged =
    !outsideCurrentMonth &&
    logs.some((log) => new Date(log.date).toDateString() === day.toDateString())

  const isFuture = day > new Date()

  return (
    <PickersDay
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      selected={selected}
      today={today}
      disabled={disabled || isFuture}
      onDaySelect={onDaySelect}
      sx={{
        ...(isLogged && {
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark'
          }
        }),
        ...(isFuture && {
          color: 'text.disabled',
          cursor: 'not-allowed',
          '&:hover': {
            backgroundColor: 'transparent'
          }
        })
      }}
    />
  )
}

CustomDay.propTypes = {
  logs: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired
    })
  ),
  day: PropTypes.instanceOf(Date).isRequired,
  outsideCurrentMonth: PropTypes.bool.isRequired,
  selected: PropTypes.bool,
  today: PropTypes.bool,
  disabled: PropTypes.bool,
  onDaySelect: PropTypes.func
}

const Calendar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [logs, setLogs] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )
  const lastLog = sortedLogs[0]

  const tags = lastLog?.selectedOptions
    ? Object.values(lastLog.selectedOptions).flat()
    : []
  const diagnoses = getDiagnoses(tags)

  useEffect(() => {
    fetch('http://localhost:3001/logs')
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error('Fehler beim Laden der Logs:', err))
  }, [location.pathname])

  return (
    <Stack
      sx={{
        padding: 3,
        overflow: 'auto'
      }}
    >
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
          height: '100%',
          padding: 3,
          textAlign: 'center'
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography variant="subtitle2">
            It’s good to have you here. Your body deserves attention and care.
          </Typography>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar
            maxDate={new Date()}
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date)
              if (date <= new Date()) {
                const selectedLog = logs.find(
                  (log) => new Date(log.date).toDateString() === date.toDateString()
                )
                if (selectedLog) {
                  navigate(`/log/${selectedLog.date}`)
                } else {
                  navigate(`/log/new?date=${date.toISOString().split('T')[0]}`)
                }
              }
            }}
            slots={{ day: CustomDay }}
            slotProps={{ day: { logs } }}
          />
        </LocalizationProvider>
      </Stack>
      <DiagnosisBanner
        sx={{
          width: '100%',
          maxWidth: 600
        }}
        diagnoses={diagnoses}
      />
    </Stack>
  )
}

export default Calendar
