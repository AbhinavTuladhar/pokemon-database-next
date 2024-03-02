import { Berry } from '@/types'

const BerryExtractor = (data: Berry) => {
  const {
    firmness: { name: firmness },
    flavors,
    growth_time: growthTime,
    id,
    item: { name: itemName, url },
    max_harvest: maxHarvest,
    name,
    size,
    smoothness,
    soil_dryness: soilDryness,
  } = data

  return {
    firmness,
    flavors,
    growthTime,
    id,
    itemName,
    url,
    maxHarvest,
    name,
    size,
    smoothness,
    soilDryness,
  }
}

export default BerryExtractor
