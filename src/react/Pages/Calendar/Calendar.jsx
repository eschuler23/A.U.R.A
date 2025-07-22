import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Stack, Button } from '@mui/material'
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

  return (
    <PickersDay
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      selected={selected}
      today={today}
      disabled={disabled}
      onDaySelect={onDaySelect}
      sx={{
        ...(isLogged && {
          backgroundColor: 'primary.main',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark'
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
  const lastLog = logs[logs.length - 1]
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
      spacing={2}
      sx={{
        padding: 3,
        overflow: 'auto'
      }}
    >
      <DiagnosisBanner
        sx={{
          // fullWidth: true,
          width: '100%',
          maxWidth: 600,
          marginBottom: 2
        }}
        diagnoses={diagnoses}
      />
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
                (log) =>
                  new Date(log.date).toDateString() === date.toDateString()
              )
              if (selectedLog) {
                navigate(`/log/${selectedLog.date}`)
              }
            }}
            slots={{ day: CustomDay }}
            slotProps={{ day: { logs } }}
          />
        </LocalizationProvider>

        <Button onClick={() => navigate('/log/new')} sx={{ minWidth: '35px' }}>
          +
        </Button>
      </Stack>
    </Stack>
  )
}

export default Calendar
