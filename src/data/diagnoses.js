const diagnoses = {
  normalDischargeWhiteDischarge: {
    tags: [
      'White (clear to milky)',
      'Neutral / no odor',
      'Creamy, slightly viscous',
      'None'
    ],
    diagnosis: 'Normal white Discharge',
    recommendation: 'Beware moist environment, breathable cotton underwear and good hygiene are equally important',
    classification: {
      text: 'Normal',
      color: 'success.main',
      severity: 0
    }
  },
  lutealPhase: {
    tags: [
      'White-yellowish',
      'Neutral / no odor',
      'Thick',
      'None'
    ],
    diagnosis: 'Lutheal phase',
    recommendation: 'Due to increased progesterone levels this is is a normal part of the menstrual cycle and helps prepare the uterus for potential implantation of a fertilized egg',
    classification: {
      text: 'Normal',
      color: 'success.main',
      severity: 0
    }
  },
  cervicalMucusNonFertileCyclePhase: {
    tags: [
      'Milky white',
      'Neutral / no odor',
      'Creamy, slightly viscous, not stretchy',
      'None'
    ],
    diagnosis: 'Cervical Mucus, outside ovulation',
    recommendation: 'If close to menstration, this is an indication for unfertile window though sperm can survive up to 5 days.',
    classification: {
      text: 'Normal',
      color: 'success.main',
      severity: 0
    }
  },
  cervicalMucusFertileCyclePhaseOvulation: {
    tags: [
      'Clear',
      'Neutral / no odor',
      'Stretchy',
      'None'
    ],
    diagnosis: 'Cervical Mucus indicating ovulation',
    recommendation: 'If not trying to conceive, use protection, as this is peak fertility',
    classification: {
      text: 'Normal, use protection to prevent conception',
      color: 'success.main',
      severity: 0
    }
  },
  hormonalFluctuationPossiblyOvulatoryBleeding: {
    tags: [
      'Pink',
      'No / faint odor',
      'Thin, slightly bloody',
      'Shortly before/after period',
      'Around ovulation',
      'Atypical for cycle timing'
    ],
    diagnosis: 'Hormonal fluctuation, possibly ovulatory bleeding',
    recommendation: 'Observe and take picutres if persistend, might occur after exercise. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Mostly harmless, observe',
      color: 'warning.main',
      severity: 1
    }
  },
  oldBloodResidueHormonalFluctuation: {
    tags: [
      'Brown',
      'Metallic / old blood',
      'Slimy',
      'Shortly before/after period'
    ],
    diagnosis: 'Old blood residue, hormonal fluctuation',
    recommendation: 'Might be old residue released due to exercise. Brown discharge at cycle boundaries is common and usually harmless when isolated. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Mostly harmless, observe',
      color: 'warning.main',
      severity: 1
    }
  },
  bacterialVaginosis: {
    tags: [
      'Whitish gray',
      'Fishy',
      'Thin',
      'Itching, irritation',
      'Thin, lumpy'
    ],
    diagnosis: 'Bacterial vaginosis',
    recommendation: 'Keep area dry, avoid douching, use only water to wash, wear cotton underwear. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'To visit a doctor is recommended for testing and treatment with antibiotics',
      color: 'danger.main',
      severity: 2
    }
  },
  chlamydia: {
    tags: [
      'Yellow',
      'Whitish gray',
      'Foul',
      'Unpleasant',
      'Thick',
      'Painful urination'
    ],
    diagnosis: 'Chlamydia',
    recommendation: 'Avoid sexual activity, hydrate, and monitor symptoms until you see a doctor since top priority is clinical testing. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended',
      color: 'danger.main',
      severity: 3
    }
  },
  Gonorrhoea: {
    tags: [
      'Greenish',
      'Fishy / strong',
      'Foamier',
      'Foamy or crumbly',
      'Itching, burning',
      'Itching, irritation',
      'Redness, pain, fever',
      'Pain, fever, itching'
    ],
    diagnosis: 'Gonorrhoea',
    recommendation: 'Avoid sex, stay clean and dry, do not self-medicate — see a doctor since it can cause pelvic inflammatory disease if untreated. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended',
      color: 'danger.main',
      severity: 3
    }
  },
  vaginalFungusCandida: {
    tags: [
      'White-yellowish',
      'Yeasty / sour',
      'Lumpy, like cottage cheese',
      'Thick',
      'Itching, burning'
    ],
    diagnosis: 'Vaginal fungus (Candida)',
    recommendation: 'Use prescription-free ointment as remedy since it can often be self‑treated OTC, though doctor recommended if recurrence Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is recommended to prevent misdiagnosis.',
      color: 'danger.main',
      severity: 1
    }
  },
  possibleSexuallyTransmittedDisease: {
    tags: [
      'Pink (not related to cycle)',
      'Unpleasant',
      'Variable',
      'Atypical for cycle timing'
    ],
    diagnosis: 'Possible sexually transmitted disease',
    recommendation: 'Avoid sex, keep area clean, track symptoms, and seek urgent medical advice. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended',
      color: 'danger.main',
      severity: 3
    }
  },
  possibleInfection: {
    tags: [
      'Brown (with symptoms)',
      'Unpleasant',
      'Slimy / variable',
      'Redness, pain, fever',
      'Itching, irritation'
    ],
    diagnosis: 'Possible infection',
    recommendation: 'Keep area clean, wear breathable underwear, avoid irritants, see a doctor promptly. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is recommended.',
      color: 'danger.main',
      severity: 3
    }
  },
  trichomonads: {
    tags: [
      'Yellow-green',
      'Unpleasant',
      'Foamier',
      'Sparse to abundant'
    ],
    diagnosis: 'Trichomonads',
    recommendation: 'Avoid intercourse, maintain hygiene, don not use scented products, visit a doctor. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended.',
      color: 'danger.main',
      severity: 3
    }
  }
}

export default diagnoses
