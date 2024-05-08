export const getRarityString = (chance: number, method: string) => {
  if (method === 'only-one') {
    return 'Limited'
  }

  if (chance >= 50) {
    return 'Common'
  } else if (chance >= 20 && chance < 50) {
    return 'Uncommon'
  } else {
    return 'Rare'
  }
}

export const getRarityImage = (chance: number, method: string) => {
  if (method === 'only-one') {
    return 'rarity-limited.png'
  }

  if (chance >= 50) {
    return 'rarity-common.png'
  } else if (chance >= 20 && chance < 50) {
    return 'rarity-uncommon.png'
  } else {
    return 'rarity-rare.png'
  }
}

export const getFullRarityImage = (chance: number, method: string) => {
  const rarityImageFile = getRarityImage(chance, method)
  return `/rarity-types/${rarityImageFile}`
}
