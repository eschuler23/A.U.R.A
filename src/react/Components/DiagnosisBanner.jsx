import { Paper } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'

const DiagnosisBanner = ({ diagnoses }) => {
  if (diagnoses) {
    return (
      <Paper
        sx={{
          padding: 3,
          backgroundColor: diagnoses.color
        }}
      >
        <b>Diagnoses:</b>
        <br />
        <b>{diagnoses.classification}</b>
        {diagnoses.diagnoses.map((diagnosis) => (
          <React.Fragment key={diagnosis.diagnosis}>
            <br />
            diagnosis:
            {` ${diagnosis.diagnosis}`}
            <br />
            recommendation:
            {` ${diagnosis.recommendation}`}
            <br />
          </React.Fragment>
        ))}
      </Paper>
    )
  }

  return (
    <Paper
      sx={{
        padding: 3,
        backgroundColor: '#d2d2d2'
      }}
    >
      <b>Last entrys Diagnose:</b>
      <br />
      <i>No viable diagnosis</i>
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
