import React from 'react'
import {
  Stack,
  Typography,
  Container,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material'

import AppRoutes from './AppRoutes'
import AppLogo from '../assets/favicon.svg'

const borderRadius = 6

const AppLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        width: '100%',
        height: '100%',
        paddingTop: isMobile ? theme.spacing(2) : theme.spacing(5),
        paddingBottom: isMobile ? theme.spacing(2) : theme.spacing(5),
        paddingX: isMobile ? theme.spacing(1) : theme.spacing(2)
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
          marginBottom={isMobile ? 1 : 2}
          spacing={1}
        >
          <img
            src={AppLogo}
            alt="App Logo"
            style={{
              width: isMobile ? '32px' : '40px',
              height: isMobile ? '32px' : '40px'
            }}
          />
          <Typography variant={isMobile ? 'h6' : 'h5'}>
            A.U.R.A
          </Typography>
        </Stack>
        <Paper
          elevation={6}
          sx={{
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            padding: isMobile ? theme.spacing(1) : theme.spacing(2),
            overflow: 'hidden',
            borderRadius: theme.spacing(borderRadius),
            background: theme.palette.grey[900]
          }}
        >
          <Stack
            flex="1 1 auto"
            direction="column"
            sx={{
              overflow: 'hidden',
              borderRadius: theme.spacing(borderRadius),
              background: theme.palette.background.paper
            }}
          >
            <AppRoutes />
          </Stack>
        </Paper>
      </Container>
    </Stack>
  )
}

export default AppLayout
