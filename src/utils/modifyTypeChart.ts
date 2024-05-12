/**
 * Used for modifying the type chart on the basis of some specific abilities.
 */

interface TypeChart {
  type: string
  multiplier: number
}

// Negate water damage, increase fire damage by 25%
const handleDrySkin = (typeChart: TypeChart): TypeChart => {
  const { type, multiplier } = typeChart
  if (type === 'water') {
    return { type, multiplier: 0 }
  }
  if (type === 'fire') {
    return { type, multiplier: multiplier * 1.25 }
  }
  return typeChart
}

const handleFlashFire = (typeChart: TypeChart): TypeChart => {
  const { type } = typeChart
  if (type === 'fire') {
    return { type, multiplier: 0 }
  }
  return typeChart
}

const handleHeatProof = (typeChart: TypeChart): TypeChart => {
  const { type, multiplier } = typeChart
  if (type === 'fire') {
    return { type, multiplier: multiplier * 0.5 }
  }
  return typeChart
}

const handleLevitate = (typeChart: TypeChart): TypeChart => {
  const { type } = typeChart
  if (type === 'ground') {
    return { type, multiplier: 0 }
  }
  return typeChart
}

const handleElectricAbsorb = (typeChart: TypeChart): TypeChart => {
  const { type } = typeChart
  if (type === 'electric') {
    return { type, multiplier: 0 }
  }
  return typeChart
}

const handlePoweredDownMoves = (typeChart: TypeChart): TypeChart => {
  const { type, multiplier } = typeChart
  if (multiplier > 1) {
    return { type, multiplier: multiplier * 0.75 }
  }
  return typeChart
}

const handleWaterAbsorb = (typeChart: TypeChart): TypeChart => {
  const { type } = typeChart
  if (type === 'water') {
    return { type, multiplier: 0 }
  }
  return typeChart
}

const handleThickFat = (typeChart: TypeChart): TypeChart => {
  const { type, multiplier } = typeChart
  if (type === 'fire' || type === 'ice') {
    return { type, multiplier: multiplier * 0.5 }
  }
  return typeChart
}

const handleWonderGuard = (typeChart: TypeChart): TypeChart => {
  const { multiplier, type } = typeChart
  if (multiplier < 2) {
    return { type, multiplier: 0 }
  }
  return typeChart
}

const modifyTypeChart = (typeChart: Array<TypeChart>, ability: string) => {
  switch (ability) {
    // Negate water damage, increase fire damage by 25%
    case 'dry-skin':
      return typeChart.map(handleDrySkin)
    // Negate fire damage
    case 'flash-fire':
      return typeChart.map(handleFlashFire)
    // Decrease fire damage by 50%
    case 'heatproof':
      return typeChart.map(handleHeatProof)
    // Negate ground damage
    case 'levitate':
      return typeChart.map(handleLevitate)
    // Negate electirc damage
    case 'volt-absorb':
    case 'motor-drive':
      return typeChart.map(handleElectricAbsorb)
    // Power down super-effective moves
    case 'filter':
    case 'solid-rock':
      return typeChart.map(handlePoweredDownMoves)
    // Negate water damage
    case 'water-absorb':
      return typeChart.map(handleWaterAbsorb)
    // Weaken fire and ice type moves
    case 'thick-fat':
      return typeChart.map(handleThickFat)
    // Make only syper-effective moves hit
    case 'wonder-guard':
      return typeChart.map(handleWonderGuard)

    // For EVERY OTHER ability return the unmodified type chart.
    default:
      return typeChart
  }
}

export default modifyTypeChart
