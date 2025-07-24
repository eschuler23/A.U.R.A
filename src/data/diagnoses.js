const diagnoses = {
  normalDischargeWhiteDischarge: {
    tags: [
      'White (clear to milky)',
      'Neutral / no odor',
      'Creamy, slightly viscous',
      'None'
    ],
    diagnosis: 'Normal white Discharge',
    recommendation: 'Beware moist environment, dont use panty liners to prevent bacteria build up',
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
    recommendation: 'If close to menstration, this is an indication for unfertile window',
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
    recommendation: 'Around ovulation this is a sign of fertility, use protection to prevent conception',
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
    diagnosis: 'Hormonal fluctuation, possibly ovulatory bleeding Ovulatory bleeding',
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
    recommendation: 'Might be old residue released due to exercise. Keep logging symptoms daily to track progress.',
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
    recommendation: 'Keep area dry, avoid douching, use only water to wash, wear cotton underwear.',
    classification: {
      text: 'To visit a doctor is recommended',
      color: 'danger.main',
      severity: 0
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
    recommendation: 'Avoid sexual activity, hydrate, and monitor symptoms until you see a doctor. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended',
      color: 'danger.main',
      severity: 1
    }
  },
  Gonorrhoea: {
    tags: [
      'Greenish',
      'Fishy / strong',
      'Fishy',
      'Foamier',
      'Foamy or crumbly',
      'Itching, burning',
      'Itching, irritation',
      'Redness, pain, fever',
      'Pain, fever, itching'
    ],
    diagnosis: 'Gonorrhoea',
    recommendation: 'Avoid sex, stay clean and dry, do not self-medicate — see a doctor ASAP. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended',
      color: 'danger.main',
      severity: 1
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
    recommendation: 'Use prescription-free ointment as remedy. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended to prevent misdiagnosis.',
      color: 'danger.main',
      severity: 2
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
  },
  vulvovaginalCandidiasis: {
    tags: [
      'Milky white',
      'No / faint odor',
      'Yeasty / sour',
      'Thick',
      'Slimy',
      'Itching, irritation',
      'Painful urination',
      'Pain during sexual intercourse',
      'discomfort vulvitis and vaginitis'
    ],
    diagnosis: 'Vulvovaginal candidiasis',
    recommendation: 'If symptoms occur for the first time, recur repeatedly or during pregnancy, a visit to the doctor is strongly recommended. Keep logging symptoms daily to track progress.',
    classification: {
      text: 'Visiting a doctor is strongly recommended.',
      color: 'danger.main',
      severity: 3
    }
  }
}

export default diagnoses
