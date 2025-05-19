/**
 *
 */
const buildTimeArray = (conditionValues: Array<string>) => {
  const newArray: [string, string, string] = ['', '', '']

  conditionValues.forEach(condition => {
    let index = 0

    switch (condition) {
      case 'time-morning':
        index = 0
        break
      case 'time-day':
        index = 1
        break
      case 'time-night':
        index = 2
        break
      default:
        break
    }

    newArray[index] = condition
  })
  return newArray
}
const buildSeasonArray = (conditionValues: Array<string>) => {
  const newArray: [string, string, string, string] = ['', '', '', '']

  conditionValues.forEach(condition => {
    let index = 0
    switch (condition) {
      case 'season-spring':
        index = 0
        break
      case 'season-summer':
        index = 1
        break
      case 'season-autumn':
        index = 2
        break
      case 'season-winter':
        index = 3
        break
      default:
        break
    }

    newArray[index] = condition
  })
  return newArray
}

export const buildEncounterConditionData = (
  conditionType: string,
  conditionValues: Array<string>,
) => {
  const emptyArray: [string, string, string] = ['', '', '']
  switch (conditionType) {
    case 'time':
      return buildTimeArray(conditionValues)
    case 'season':
      return buildSeasonArray(conditionValues)
    default:
      return emptyArray
  }
}
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

const getSeasonImage = (season: string) => {
  switch (season) {
    case 'season-spring':
      return 'spring.png'
    case 'season-summer':
      return 'summer.png'
    case 'season-autumn':
      return 'autumn.png'
    case 'season-winter':
      return 'winter.png'
    default:
      return 's.png'
  }
}

export const getFullSeasonImage = (time: string) => {
  const seasonImageFile = getSeasonImage(time)
  return `/seasons/${seasonImageFile}`
}
const getTimeImage = (time: string) => {
  switch (time) {
    case 'time-morning':
      return 'morning.png'
    case 'time-day':
      return 'day.png'
    case 'time-night':
      return 'night.png'
    default:
      return 's.png'
  }
}

export const getFullTimeImage = (time: string) => {
  const timeImageFile = getTimeImage(time)
  return `/time-of-day/${timeImageFile}`
}
