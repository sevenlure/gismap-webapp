import { toArray, map } from 'lodash-es'

export const ICON = {
  'GENERAL/FOOD_N_DRINK': {
    iconUrl: 'static/images/icon/food.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/SHOPPING': {
    iconUrl: 'static/images/icon/shopping.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/HEALTH_N_BEAUTY': {
    iconUrl: 'static/images/icon/health-beauty.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/ENTERTAINMENT_N_LEISURE': {
    iconUrl: 'static/images/icon/entertaiment.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/SERVICES': {
    iconUrl: 'static/images/icon/services.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/ADMINISTRATIVE': {
    iconUrl: 'static/images/icon/administrative.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/OUTDOOR_N_SPORTS': {
    iconUrl: 'static/images/icon/outdoor.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/TRANSPORT': {
    iconUrl: 'static/images/icon/transport.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/ACADEMIES_N_EDUCATION': {
    iconUrl: 'static/images/icon/acdemies.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/ACCOMMODATION': {
    iconUrl: 'static/images/icon/accomdation.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/RELIGION': {
    iconUrl: 'static/images/icon/religion.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  },
  'GENERAL/UNCATEGORIZED_MARKERS': {
    iconUrl: 'static/images/icon/uncategorized.svg',
    iconSize: [20, 20],
    iconAnchor: [10, 0]
  }
}

// new L.icon({
//   iconUrl: 'static/images/icon/layers.svg',
//   iconSize: [20, 20],
//   iconAnchor: [0, 0]
// })

const _keyGeneral = {
  FOOD_N_DRINK: {
    key: 'GENERAL/FOOD_N_DRINK',
    name: 'Food & Drink'
  },
  SHOPPING: {
    key: 'GENERAL/SHOPPING',
    name: 'Shopping'
  },
  HEALTH_N_BEAUTY: {
    key: 'GENERAL/HEALTH_N_BEAUTY',
    name: 'Health & Beauty'
  },
  ENTERTAINMENT_N_LEISURE: {
    key: 'GENERAL/ENTERTAINMENT_N_LEISURE',
    name: 'Entertainment & Leisure'
  },
  SERVICES: {
    key: 'GENERAL/SERVICES',
    name: 'Services'
  },
  ADMINISTRATIVE: {
    key: 'GENERAL/ADMINISTRATIVE',
    name: 'Administrative'
  },
  OUTDOOR_N_SPORTS: {
    key: 'GENERAL/OUTDOOR_N_SPORTS',
    name: 'Outdoor & Sports'
  },
  TRANSPORT: {
    key: 'GENERAL/TRANSPORT',
    name: 'Transport'
  },
  ACADEMIES_N_EDUCATION: {
    key: 'GENERAL/ACADEMIES_N_EDUCATION',
    name: 'Academies & Education'
  },
  ACCOMMODATION: {
    key: 'GENERAL/ACCOMMODATION',
    name: 'Accomodation'
  },
  RELIGION: {
    key: 'GENERAL/RELIGION',
    name: 'Religion'
  },
  UNCATEGORIZED_MARKERS: {
    key: 'GENERAL/UNCATEGORIZED_MARKERS',
    name: 'Uncategorized'
  }
}

export const _keyObjArr = toArray(_keyGeneral)
export const _keyArr = map(_keyGeneral, 'key')

export default _keyGeneral
