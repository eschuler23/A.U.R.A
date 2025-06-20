import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getPageConfig = () => {
    switch (location.pathname) {
      case '/':
        return {
          title: 'Calendar',
          showBackButton: false,
          backPath: null
        }
      case '/add-log':
        return {
          title: 'New Log',
          showBackButton: true,
          backPath: '/'
        }
      case '/log-result':
        return {
          title: 'Log Result',
          showBackButton: true,
          backPath: '/add-log'
        }
      default:
        return {
          title: 'Calendar',
          showBackButton: false,
          backPath: null
        }
    }
  }

  const { title, showBackButton, backPath } = getPageConfig()

  const handleBackClick = () => {
    if (backPath) {
      navigate(backPath)
    }
  }

  return (
    <AppBar
      position="static"
      color="primary"
      elevation={1}
      sx={{
        borderRadius: 0,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: '64px',
          paddingX: 1
        }}
      >
        <div
          style={{
            width: '48px',
            display: 'flex',
            justifyContent: 'flex-start'
          }}
        >
          {showBackButton && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleBackClick}
              sx={{ padding: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </div>

        <Typography
          variant="h5"
          component="h1"
          sx={{
            fontWeight: 'medium',
            textAlign: 'center',
            flex: 1
          }}
        >
          {title}
        </Typography>

        <div style={{ width: '48px' }} />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
