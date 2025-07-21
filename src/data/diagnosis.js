const diagnoses = {
  normalDischargeWhiteDischarge: {
    tags: [
      'White (clear to milky)',
      'Neutral / no odor',
      'Creamy, slightly viscous',
      'None'
    ],
    diagnosis: 'normal white Discharge'
  },
  lutealPhase: {
    tags: [
      'White-yellowish',
      'Neutral / no odor',
      'Thick',
      'None'

    ],
    diagnosis: 'lutheal Phase'
  },
  cervicalMucusNonFertileCyclePhase: {
    tags: ['Milky white',
      'Neutral / no odor',
      'Creamy, slightly viscous, not stretchy',
      'None'

    ],
    diagnosis: 'Cervical Mucus, outside ovulation'
  },
  cervicalMucusFertileCyclePhaseOvulation: {
    tags: ['Clear',
      'Neutral / no odor',
      'Stretchy',
      'None'

    ],
    diagnosis: 'Cervical Mucus indicating ovulation'
  },
  hormonalFluctuationPossiblyOvulatoryBleeding: {
    tags: ['Pink',
      'No / faint odor',
      'Thin, slightly bloody',
      'Shortly before/after period',
      'Around ovulation',
      'Atypical for cycle timing'

    ],
    diagnosis: 'hormonal fluctuation, possibly ovulatory bleeding Ovulatory bleeding'
  },
  oldBloodResidueHormonalFluctuation: {
    tags: ['Brown',
      'Metallic / old blood',
      'Slimy',
      'Shortly before/after period'

    ],
    diagnosis: 'Old blood residue, hormonal fluctuation'
  },
  bacterialVaginosis: {
    tags: ['Whitish gray',
      'Fishy',
      'Thin',
      'Itching, irritation',
      'Thin, lumpy'

    ],
    diagnosis: 'Bacterial vaginosis'
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
    diagnosis: 'Chlamydia'
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
    diagnosis: 'Gonorrhoea'
  },
  vaginalFungusCandida: {
    tags: ['White-yellowish',
      'Yeasty / sour',
      'Lumpy, like cottage cheese',
      'Thick',
      'Itching, burning'

    ],
    diagnosis: 'Vaginal fungus (Candida)'
  },
  possibleSexuallyTransmittedDisease: {
    tags: ['Pink (not related to cycle)',
      'Unpleasant',
      'Variable',
      'Atypical for cycle timing'

    ],
    diagnosis: 'Possible sexually transmitted disease'
  },
  possibleInfection: {
    tags: ['Brown (with symptoms)',
      'Unpleasant',
      'Slimy / variable',
      'Redness, pain, fever',
      'Itching, irritation'

    ],
    diagnosis: 'Possible infection'
  },
  trichomonads: {
    tags: ['Yellow-green',
      'Unpleasant',
      'Foamier',
      'Sparse to abundant'

    ],
    diagnosis: 'Trichomonads'
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
    diagnosis: 'Vulvovaginal candidiasis'
  }
}

export default diagnoses
