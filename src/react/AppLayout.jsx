import React from 'react'
import { Stack, Typography, Container, Paper } from '@mui/material'
import { Outlet } from 'react-router-dom'
import AppLogo from '../assets/favicon.svg'
import Navbar from './Components/Navbar'

const borderRadius = 6

const AppLayout = () => (
  <Stack
    direction="row"
    justifyContent="center"
    sx={{
      width: '100%',
      height: '100%',
      paddingTop: 5,
      paddingBottom: 5,
      paddingX: 2
    }}
  >
    <Container
      maxWidth="sm"
      disableGutters
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginBottom={2}
        spacing={1}
      >
        <img
          src={AppLogo}
          alt="App Logo"
          style={{
            width: '40px',
            height: '40px'
          }}
        />
        <Typography variant="h5">A.U.R.A</Typography>
      </Stack>
      <Paper
        elevation={6}
        sx={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          overflow: 'hidden',
          borderRadius,
          background: '#121212'
        }}
      >
        <Stack
          flex="1 1 auto"
          direction="column"
          sx={{
            overflow: 'hidden',
            borderRadius,
            backgroundColor: 'background.default'
          }}
        >
          <Navbar />
          <Outlet />
        </Stack>
      </Paper>
    </Container>
  </Stack>
)

export default AppLayout
