const diagnosis = {
  normalDischargeWhiteDischarge: {
    tags: [
      'White (clear to milky)',
      'Neutral / no odor',
      'Creamy, slightly viscous',
      'None'
    ],
    causes: ['normal white Discharge']
  },
  lutealPhase: {
    tags: [
      'White-yellowish',
      'Neutral / no odor',
      'Thick',
      'None'

    ],
    causes: ['lutheal Phase']
  },
  cervicalMucusNonFertileCyclePhase: {
    tags: ['Milky white',
      'Neutral / no odor',
      'Creamy, slightly viscous, not stretchy',
      'None'

    ],
    causes: ['Cervical Mucus, outside ovulation']
  },
  cervicalMucusFertileCyclePhaseOvulation: {
    tags: ['Clear',
      'Neutral / no odor',
      'Stretchy',
      'None'

    ],
    causes: ['Cervical Mucus indicating ovulation']
  },
  hormonalFluctuationPossiblyOvulatoryBleeding: {
    tags: ['Pink',
      'No / faint odor',
      'Thin, slightly bloody',
      'Shortly before/after period',
      'Around ovulation',
      'Atypical for cycle timing'

    ],
    causes: ['hormonal fluctuation, possibly ovulatory bleeding Ovulatory bleeding']
  },
  oldBloodResidueHormonalFluctuation: {
    tags: ['Brown',
      'Metallic / old blood',
      'Slimy',
      'Shortly before/after period'

    ],
    causes: ['Old blood residue, hormonal fluctuation']
  },
  bacterialVaginosis: {
    tags: ['Whitish gray',
      'Fishy',
      'Thin',
      'Itching, irritation',
      'Thin, lumpy'

    ],
    causes: ['Bacterial vaginosis']
  },
  chlamydia: {
    tags: [
      'White (clear to milky)',
      'Yellow',
      'Whitish gray',
      'Foul',
      'Thick',
      'Painful urination'

    ],
    causes: ['Chlamydia']
  },
  trichomonadsGonorrhoea: {
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
    causes: ['Trichomonads, gonorrhoea']
  },
  vaginalFungusCandida: {
    tags: ['White-yellowish',
      'Yeasty / sour',
      'Lumpy, like cottage cheese',
      'Thick',
      'Itching, burning'

    ],
    causes: ['Vaginal fungus (Candida)']
  },
  possibleSexuallyTransmittedDisease: {
    tags: ['Pink (not related to cycle)',
      'Unpleasant',
      'Variable',
      'Atypical for cycle timing'

    ],
    causes: ['Possible sexually transmitted disease']
  },
  possibleInfection: {
    tags: ['Brown (with symptoms)',
      'Unpleasant',
      'Slimy / variable',
      'Redness, pain, fever',
      'Itching, irritation'

    ],
    causes: ['Possible infection']
  },
  trichomonads: {
    tags: ['Yellow-green',
      'Unpleasant',
      'Foamier',
      'Sparse to abundant'

    ],
    causes: ['Trichomonads']
  },
  vulvovaginalCandidiasis: {
    tags: ['White (clear to milky)',
      'Milky white',
      'No / faint odor',
      'Thick',
      'Itching, irritation',
      'Painful urination',
      'Pain during sexual intercourse',
      'discomfort vulvitis and vaginitis'
    ],
    causes: ['Vulvovaginal candidiasis']
  }
}

export default diagnosis
