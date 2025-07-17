import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppLayout from './AppLayout'
import Calendar from './Pages/Calendar/Calendar'
import LogEdit from './Pages/Log/LogEdit'
import LogView from './Pages/Log/LogView'
import Error404 from './Pages/Error404'

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AppLayout />}>
      <Route index element={<Calendar />} />
      <Route path="log/:date" element={<LogView />} />
      <Route path="log/edit/:date" element={<LogEdit />} />
      <Route path="log/new" element={<LogEdit />} />
      <Route path="*" element={<Error404 />} />
    </Route>
  </Routes>
)

export default AppRoutes
