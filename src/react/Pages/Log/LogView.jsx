import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Stack, Button, Typography, Box } from '@mui/material'
import InfoCard from '../../Components/InfoCard'
import dischargeAttributes from '../../Constants/dischargeAttributes'

const LogView = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { selectedOptions, date, imageUrl } = location.state || {}

  return (
    <Stack
      spacing={2}
      sx={{
        padding: 3,
        overflow: 'auto'
      }}
    >
      {imageUrl && (
        <Box
          component="img"
          src={imageUrl}
          alt="Uploaded"
          sx={{
            width: '100%',
            maxHeight: 300,
            objectFit: 'contain',
          }}
        />
      )}
      {selectedOptions && Object.entries(selectedOptions).map(
        ([title, options]) => (
          <InfoCard
            key={dischargeAttributes.find((attr => attr.key === title)).key}
            title={dischargeAttributes.find((attr => attr.key === title)).title}
            options={options}
            selectedOptions={options}
          />
        )
      )}
    </Stack>
  )
}

export default LogView
