const diagnoses = {
  normalDischargeWhiteDischarge: {
    tags: [
      'White (clear to milky)',
      'Neutral / no odor',
      'Creamy, slightly viscous',
      'None'
    ],
    diagnosis: 'normal white Discharge',
    recommendation: 'beware moist environment, dont use panty liners to prevent bacteria build up',
    classification: {
      text: 'normal',
      color: '#d0ffd6',
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
    diagnosis: 'lutheal Phase',
    recommendation: 'Due to increased progesterone levels this is is a normal part of the menstrual cycle and helps prepare the uterus for potential implantation of a fertilized egg',
    classification: {
      text: 'normal',
      color: '#d0ffd6',
      severity: 0
    }

  },
  cervicalMucusNonFertileCyclePhase: {
    tags: ['Milky white',
      'Neutral / no odor',
      'Creamy, slightly viscous, not stretchy',
      'None'

    ],
    diagnosis: 'Cervical Mucus, outside ovulation',
    recommendation: 'If close to menstration, this is an indication for unfertile window',
    classification: {
      text: 'normal',
      color: '#d0ffd6',
      severity: 0
    }

  },
  cervicalMucusFertileCyclePhaseOvulation: {
    tags: ['Clear',
      'Neutral / no odor',
      'Stretchy',
      'None'

    ],
    diagnosis: 'Cervical Mucus indicating ovulation',
    recommendation: 'Around ovulation this is a sign of fertility, use protection to prevent conception',
    classification: {
      text: 'normal, use protection to prevent conception',
      color: '#d0ffd6',
      severity: 0
    }

  },
  hormonalFluctuationPossiblyOvulatoryBleeding: {
    tags: ['Pink',
      'No / faint odor',
      'Thin, slightly bloody',
      'Shortly before/after period',
      'Around ovulation',
      'Atypical for cycle timing'

    ],
    diagnosis: 'hormonal fluctuation, possibly ovulatory bleeding Ovulatory bleeding',
    recommendation: 'Observe and take picutres if persistend, might occur after exercise.',
    classification: {
      text: 'mostly harmless, observe',
      color: '#fff8d0',
      severity: 1
    }

  },
  oldBloodResidueHormonalFluctuation: {
    tags: ['Brown',
      'Metallic / old blood',
      'Slimy',
      'Shortly before/after period'

    ],
    diagnosis: 'Old blood residue, hormonal fluctuation',
    recommendation: 'might be an indecation for starting menstruation, check for cycletypical timing',
    classification: {
      text: '',
      color: '#fff8d0',
      severity: 1
    }

  },
  bacterialVaginosis: {
    tags: ['Whitish gray',
      'Fishy',
      'Thin',
      'Itching, irritation',
      'Thin, lumpy'

    ],
    diagnosis: 'Bacterial vaginosis',
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
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
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
      severity: 1
    }

  },
  Gonorrhoea: {
    tags: ['Greenish',
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
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
      severity: 1
    }

  },
  vaginalFungusCandida: {
    tags: ['White-yellowish',
      'Yeasty / sour',
      'Lumpy, like cottage cheese',
      'Thick',
      'Itching, burning'

    ],
    diagnosis: 'Vaginal fungus (Candida)',
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
      severity: 2
    }

  },
  possibleSexuallyTransmittedDisease: {
    tags: ['Pink (not related to cycle)',
      'Unpleasant',
      'Variable',
      'Atypical for cycle timing'

    ],
    diagnosis: 'Possible sexually transmitted disease',
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
      severity: 3
    }

  },
  possibleInfection: {
    tags: ['Brown (with symptoms)',
      'Unpleasant',
      'Slimy / variable',
      'Redness, pain, fever',
      'Itching, irritation'

    ],
    diagnosis: 'Possible infection',
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
      severity: 3
    }

  },
  trichomonads: {
    tags: ['Yellow-green',
      'Unpleasant',
      'Foamier',
      'Sparse to abundant'

    ],
    diagnosis: 'Trichomonads',
    recommendation: '',
    classification: {
      text: '',
      color: '#ffd0d0',
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
    recommendation: '',
    classification: {
      text: 'lmao',
      color: '#ffd0d0',
      severity: 3
    }

  }
}

export default diagnoses
