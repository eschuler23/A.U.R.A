import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Stack } from '@mui/material'
import Calendar from './Pages/Calendar/Calendar'
import AddLog from './Pages/AddLog/AddLog'
import LogResult from './Pages/LogResult/LogResult'
import Error404 from './Pages/Error404'
import Navbar from './Components/Navbar'

const AppRoutes = () => (
  <Stack
    direction="column"
    sx={{
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }}
  >
    <Navbar />
    <Stack
      flex={1}
      sx={{
        overflow: 'hidden'
      }}
    >
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/add-log" element={<AddLog />} />
        <Route path="/log-result" element={<LogResult />} />
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Stack>
  </Stack>
)

export default AppRoutes
