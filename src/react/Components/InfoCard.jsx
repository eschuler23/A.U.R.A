import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent, CardHeader, Chip, IconButton } from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined'

const InfoCard = ({
  title,
  icon,
  options = [],
  selectedOptions = [],
  onClickChip
}) => (
  <Card sx={{ flexShrink: 0 }}>
    <CardHeader
      avatar={icon}
      title={title}
      action={
        <IconButton>
          <InfoOutlineIcon />
        </IconButton>
      }
      sx={{ paddingBottom: 0 }}
    />
    <CardContent sx={{ paddingTop: 0 }}>
      {options.map((option) => {
        const isSelected = selectedOptions.includes(option)
        return (
          <Chip
            key={option}
            label={option}
            variant="filled"
            clickable
            onClick={() => onClickChip(option)}
            sx={{
              borderRadius: '20px',
              backgroundColor: isSelected ? 'primary.dark' : 'primary.light',
              margin: '8px 8px 0 0',
              color: isSelected ? 'secondary.main' : undefined,
              '&:hover': {
                backgroundColor: 'primary.dark',
                color: 'secondary.main'
              }
            }}
          />
        )
      })}
    </CardContent>
  </Card>
)

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  onClickChip: PropTypes.func
}

export default InfoCard
