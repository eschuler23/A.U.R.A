import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Box } from '@mui/material'
import InfoCard from '../../Components/InfoCard'
import dischargeAttributes from '../../Constants/dischargeAttributes'

const LogView = () => {
  const [options, setOptions] = useState(null)
  const [image, setImage] = useState(null)
  const { date } = useParams()

  useEffect(() => {
    if (!date) return

    const fetchLog = async () => {
      try {
        const response = await fetch('http://localhost:3001/logs')
        const logs = await response.json()

        const foundLog = logs.find(
          (log) => log.date === date
        )

        if (foundLog) {
          setOptions(foundLog.selectedOptions)
          setImage(foundLog.imageUrl)
        }
      } catch (error) {
        console.error('Fehler beim Laden des Logs:', error)
      }
    }

    fetchLog()
  }, [date])

  return (
    <Stack
      spacing={2}
      sx={{
        padding: 3,
        overflow: 'auto'
      }}
    >
      {image && (
        <Box
          component="img"
          src={image}
          alt="Uploaded"
          sx={{
            width: '100%',
            maxHeight: 300,
            objectFit: 'contain'
          }}
        />
      )}
      {options && Object.entries(options).map(([title, opt]) => {
        const attribute = dischargeAttributes.find(attr => attr.key === title)

        return (
          <InfoCard
            key={attribute.key}
            title={attribute.title}
            options={opt}
            selectedOptions={opt}
            icon={<attribute.icon />}
          />
        )
      })}
    </Stack>
  )
}

export default LogView
