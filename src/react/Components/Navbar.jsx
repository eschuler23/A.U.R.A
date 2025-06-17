import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Determine page title and back navigation based on current route
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
        borderTopLeftRadius: theme.spacing(1),
        borderTopRightRadius: theme.spacing(1)
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: isMobile ? '56px' : '64px',
          paddingX: theme.spacing(1)
        }}
      >
        {/* Left side - Back button or empty space */}
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
              sx={{ padding: theme.spacing(1) }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </div>

        {/* Center - Page title */}
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          component="h1"
          sx={{
            fontWeight: 'medium',
            textAlign: 'center',
            flex: 1
          }}
        >
          {title}
        </Typography>

        {/* Right side - Empty space for symmetry */}
        <div style={{ width: '48px' }} />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
