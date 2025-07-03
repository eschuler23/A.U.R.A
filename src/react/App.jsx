import React from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import AppLayout from './AppLayout'

const theme = createTheme({
  palette: {
    primary: {
      main: '#d7d0ff',
      dark: '#b0a7e0',
      light: '#ebe7ff',
    },
    secondary: {
      main: '#FFFFF0',
    },
    background: {
      default: '#f5f4fb',
    },
    text: {
      primary: '#50505f',
      secondary: '#676775',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  }
})

const finalTheme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: defaultTheme => ({
        html: {
          width: '100%',
          height: '100%'
        },
        body: {
          width: '100%',
          height: '100%',
          background: defaultTheme.palette.grey[200]
        },
        '#app': {
          width: '100%',
          height: '100%'
        }
      })
    },
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
        fullWidth: false,
      },
      styleOverrides: {
        root: {
          borderRadius: 15,
          textTransform: 'none',
        },
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 15,
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
  }
});

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <ThemeProvider theme={finalTheme}>
    <CssBaseline />
    <Router>
      <AppLayout />
    </Router>
  </ThemeProvider>
)
