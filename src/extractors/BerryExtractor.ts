import { Berry } from '@/types'

export const BerryExtractor = (data: Berry) => {
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

  const flavourInfo = flavors.map(flavour => {
    const {
      flavor: { name },
      potency,
    } = flavour
    return {
      name,
      potency,
    }
  })

  return {
    firmness,
    flavours: flavourInfo,
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
