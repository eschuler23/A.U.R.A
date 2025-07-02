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
      paper: '#ffffff',
    },
    text: {
      primary: '#676775',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
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
    }
  }
})

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <AppLayout />
    </Router>
  </ThemeProvider>
)
