import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Calendar from './Pages/Calendar/Calendar'
import AddLog from './Pages/AddLog/AddLog'
import LogResult from './Pages/LogResult/LogResult'
import Error404 from './Pages/Error404'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Calendar />} />
    <Route path="/add-log" element={<AddLog />} />
    <Route path="/log-result" element={<LogResult />} />
    <Route path="*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
