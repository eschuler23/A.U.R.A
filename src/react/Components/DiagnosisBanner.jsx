import { Paper } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const DiagnosisBanner = ({ diagnoses }) => (diagnoses ? (
  <Paper
    sx={{
      padding: 3,
      backgroundColor: diagnoses.color
    }}
  >
    <b>{diagnoses.classification}</b>
    {diagnoses.diagnoses.map((diagnosis) => (
      <>
        <br />
        diagnosis:
        {` ${diagnosis.diagnosis}`}
        <br />
        recommendation:
        {` ${diagnosis.recommendation}`}
        <br />
      </>
    ))}
  </Paper>
) : (
  <Paper
    sx={{
      padding: 3,
      backgroundColor: '#d2d2d2'
    }}
  >
    hihi
  </Paper>
))

DiagnosisBanner.propTypes = {
  diagnoses: PropTypes.shape({
    color: PropTypes.string,
    classification: PropTypes.string,
    diagnoses: PropTypes.arrayOf(PropTypes.shape({
      diagnosis: PropTypes.string,
      recommendation: PropTypes.string
    }))
  })
}

export default DiagnosisBanner
