import React from 'react'

import { Stack, Typography } from '@mui/material'
import Gif404 from '../../assets/404.gif'

const Error404 = () => (
  <Stack flex="1 1 auto" justifyContent="center" alignItems="center">
    <Typography variant="h5" color="error">
      Error 404
    </Typography>
    <img src={Gif404} alt="U Shall not Pass Meme" />
  </Stack>
)

export default Error404
