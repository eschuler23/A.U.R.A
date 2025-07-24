import { Paper, Typography, Box } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const DiagnosisBanner = ({ diagnoses }) => {
  if (diagnoses) {
    return (
      <Paper
        sx={{
          p: 2,
          backgroundColor: diagnoses.color,
          textAlign: 'center'
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
          Evaluation:
          {diagnoses.classification}
        </Typography>
        {diagnoses.diagnoses.map((diagnosis) => (
          <Box key={diagnosis.diagnosis} sx={{ mt: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              Diagnose:
            </Typography>
            <Typography variant="body2">
              {diagnosis.diagnosis}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 'bold' }}>
              Recommendation:
            </Typography>
            <Typography variant="body2">
              {diagnosis.recommendation}
            </Typography>
          </Box>
        ))}
      </Paper>
    )
  }

  return (
    <Paper
      sx={{
        padding: 2,
        backgroundColor: 'primary.light',
        textAlign: 'center'
      }}
    >
      <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
        Diagnose
      </Typography>
      <Typography variant="subtitle2" sx={{ fontWeight: 'cursive' }}>
        No viable diagnose for the last log!
      </Typography>
    </Paper>
  )
}

DiagnosisBanner.propTypes = {
  diagnoses: PropTypes.shape({
    color: PropTypes.string,
    classification: PropTypes.string,
    diagnoses: PropTypes.arrayOf(
      PropTypes.shape({
        diagnosis: PropTypes.string,
        recommendation: PropTypes.string
      })
    )
  })
}

export default DiagnosisBanner
