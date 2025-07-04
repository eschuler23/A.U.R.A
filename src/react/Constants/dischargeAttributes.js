import PaletteIcon from '@mui/icons-material/Palette'
import AirIcon from '@mui/icons-material/Air'
import WavesIcon from '@mui/icons-material/Waves'
import HealingIcon from '@mui/icons-material/Healing'

const dischargeAttributes = [
  {
    key: 'color',
    title: 'Color',
    icon: PaletteIcon,
    options: [
      'White (clear to milky)',
      'Milky white',
      'Clear',
      'Pink',
      'Brown',
      'Whitish gray',
      'Yellow',
      'Greenish',
      'White-yellowish',
      'Pink (not related to cycle)',
      'Brown (with symptoms)',
      'Yellow-green',
      'No discharge'
    ]
  },
  {
    key: 'odor',
    title: 'Odor',
    icon: AirIcon,
    options: [
      'Neutral / no odor',
      'No / faint odor',
      'Metallic / old blood',
      'Fishy',
      'Unpleasant',
      'Possibly unpleasant',
      'Fishy / strong',
      'Yeasty / sour'
    ]
  },
  {
    key: 'consistency',
    title: 'Consistency',
    icon: WavesIcon,
    options: [
      'Creamy, slightly viscous',
      'Thick',
      'Creamy, slightly viscous, not stretchy',
      'Stretchy',
      'Thin, slightly bloody',
      'Slimy',
      'Watery',
      'Foamy or crumbly',
      'Lumpy, like cottage cheese, thick',
      'Variable',
      'Slimy / variable',
      'Thin, lumpy',
      'Foamier',
      'Sparse to abundant'
    ]
  },
  {
    key: 'symptom',
    title: 'Additional Symptoms',
    icon: HealingIcon,
    options: [
      'None',
      'Around ovulation / period',
      'Shortly before/after period',
      'Possibly itching, irritation',
      'Painful urination',
      'Itching, redness, pain, fever',
      'Itching, burning',
      'Atypical for cycle timing',
      'Pain, fever, itching',
      'Vulvar itching, dyspareunia, dysuria, discomfort, vulvitis and vaginitis',
      '“Strawberry cervix”'
    ]
  }
]

export default dischargeAttributes
