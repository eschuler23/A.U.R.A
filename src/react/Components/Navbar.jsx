import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { date } = useParams()

  const getPageConfig = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Calendar',
          showBackButton: false,
          showEditButton: false,
          backPath: null
        }
      case '/log/new':
        return {
          title: 'New Entry',
          showBackButton: true,
          showEditButton: false,
          backPath: '/'
        }
      case `/log/edit/${date}`:
        return {
          title: 'Edit entry',
          showBackButton: true,
          showEditButton: false,
          backPath: `/log/${date}`
        }
      case `/log/${date}`:
        return {
          title: `${date}`,
          showBackButton: true,
          showEditButton: true,
          backPath: '/',
          editPath: `/log/edit/${date}`
        }
      default:
        return {
          title: 'Calendar',
          showBackButton: false,
          showEditButton: false,
          backPath: null
        }
    }
  }

  const { title, showBackButton, showEditButton, backPath, editPath } = getPageConfig()

  const handleBackClick = () => {
    if (backPath) {
      navigate(backPath)
    }
  }

  const handleEditClick = () => {
    if (editPath) {
      navigate(editPath, { state: location.state })
    }
  }

  return (
    <AppBar
      color="secondary"
      position="static"
      elevation={0}
      sx={{ borderRadius: 0 }}
    >
      <Toolbar>
        <IconButton
          size="small"
          onClick={handleBackClick}
          sx={{ visibility: showBackButton ? undefined : 'hidden' }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Typography
          variant="subtitle1"
          sx={{
            flexGrow: 1,
            textAlign: 'center'
          }}
        >
          {title}
        </Typography>
        <IconButton
          size="small"
          onClick={handleEditClick}
          sx={{ visibility: showEditButton ? undefined : 'hidden' }}
        >
          <EditCalendarOutlinedIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
