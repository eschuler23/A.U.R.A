import React from 'react'
import PropTypes from 'prop-types'
import { Box, Card, CardContent, CardHeader, Chip, IconButton, Collapse, Typography } from '@mui/material'
import InfoOutlineIcon from '@mui/icons-material/InfoOutlined'
import InfoIcon from '@mui/icons-material/Info'
import infoList from '../Constants/dischargeAttributeInfo'

const InfoCard = ({
  attrKey,
  title,
  icon = null,
  options = [],
  selectedOptions = [],
  onClickChip = () => {},
  clickable = false
}) => {
  const [collapse, setCollapse] = React.useState(false)
  const handleCollapse = () => setCollapse(true)
  const handleCloseCollapse = () => setCollapse(false)

  return (options.length > 0 &&
    <Card sx={{ flexShrink: 0 }}>
      <CardHeader
        avatar={icon}
        title={title}
        action={
          <IconButton onClick={collapse ? handleCloseCollapse : handleCollapse}>
            {collapse ? <InfoIcon /> : <InfoOutlineIcon />}
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
              clickable={clickable}
              onClick={clickable ? () => onClickChip(option) : undefined}
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
      <Collapse
        in={collapse}
      >
        <Box sx={{ padding: '0 32px 16px 32px' }}>
          <Typography variant="caption" color="text.secondary">
            {infoList[attrKey]}
          </Typography>
        </Box>
      </Collapse>
    </Card>
  )
}

InfoCard.propTypes = {
  attrKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.string),
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  onClickChip: PropTypes.func,
  clickable: PropTypes.bool
}

export default InfoCard
