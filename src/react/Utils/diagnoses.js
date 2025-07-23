import diagnoses from '../../data/diagnoses'

// if 2 or more tags of the diagnosis match, return the all  diagnosis but the color of the most severe diagnosis

export default function getDiagnoses(tags) {
  const matchedDiagnoses = Object.values(diagnoses)
    .filter(diagnosis => {
      const commonElements = diagnosis.tags.filter(tag => tags.includes(tag))
      return commonElements.length >= 3
    })

  if (matchedDiagnoses.length === 0) {
    return null
  }

  const mostSevereDiagnosis = matchedDiagnoses.reduce((prev, current) => ((prev.classification.severity > current.classification.severity) ? prev : current))

  return {
    color: mostSevereDiagnosis.classification.color,
    classification: mostSevereDiagnosis.classification.text,
    diagnoses: matchedDiagnoses.map(diagnosis => ({
      diagnosis: diagnosis.diagnosis,
      recommendation: diagnosis.recommendation
    }))
  }
}
