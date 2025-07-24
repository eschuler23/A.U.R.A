import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Box } from '@mui/material'
import InfoCard from '../../Components/InfoCard'
import dischargeAttributes from '../../Constants/dischargeAttributes'
import getDiagnoses from '../../Utils/diagnoses'
import DiagnosisBanner from '../../Components/DiagnosisBanner'
import { getImageFromStorage } from '../../Utils/imageStorage'

const LogView = () => {
  const [options, setOptions] = useState(null)
  const [image, setImage] = useState(null)
  const { date } = useParams()

  const diagnoses = getDiagnoses(Object.values(options ?? {}).flat())
  useEffect(() => {
    if (!date) return

    const fetchLog = async () => {
      try {
        const response = await fetch('http://localhost:3001/logs')
        const logs = await response.json()

        const foundLog = logs.find((log) => log.date === date)

        if (foundLog) {
          setOptions(foundLog.selectedOptions)

          if (foundLog.imageKey) {
            console.log('Looking for image with key:', foundLog.imageKey)
            const storedImage = getImageFromStorage(foundLog.imageKey)
            if (storedImage) {
              console.log('Found stored image for key:', foundLog.imageKey)
              setImage(storedImage)
            } else {
              console.log('No stored image found for key:', foundLog.imageKey)
              if (foundLog.imageUrl) {
                setImage(foundLog.imageUrl)
              }
            }
          } else if (foundLog.imageUrl) {
            setImage(foundLog.imageUrl)
          }
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
      <DiagnosisBanner diagnoses={diagnoses} />
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
      {options &&
        Object.entries(options).map(([title, opt]) => {
          const attribute = dischargeAttributes.find(
            (attr) => attr.key === title
          )

          return (
            <InfoCard
              key={attribute.key}
              attrKey={attribute.key}
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
