export const getRarityString = (chance: number, method: string) => {
  if (method === 'only-one') {
    return 'limited'
  }

  if (chance >= 50) {
    return 'common'
  } else if (chance >= 20 && chance < 50) {
    return 'uncommon'
  } else {
    return 'rare'
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
