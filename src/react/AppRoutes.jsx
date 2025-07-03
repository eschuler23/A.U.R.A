import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Stack } from '@mui/material'
import Calendar from './Pages/Calendar/Calendar'
import LogEdit from './Pages/Log/LogEdit'
import LogView from './Pages/Log/LogView'
import Error404 from './Pages/Error404'
import Navbar from './Components/Navbar'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Calendar />} />
    <Route path="/log/:id" element={<LogView />} />
    <Route path="/log/new" element={<LogEdit />} />
    <Route path="/log/:id/edit" element={<LogEdit />} />
    <Route path="/*" element={<Error404 />} />
  </Routes>
)

export default AppRoutes
