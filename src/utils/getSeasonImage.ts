const getSeasonImage = (season: string) => {
  const [_, seasonName] = season.split('-')
  switch (seasonName) {
    case 'spring':
      return 'spring.png'
    case 'summer':
      return 'summer.png'
    case 'autumn':
      return 'autumn.png'
    case 'winter':
      return 'winter.png'
    default:
      return 's.png'
  }
}

const getFullSeasonImage = (time: string) => {
  const seasonImageFile = getSeasonImage(time)
  return `/seasons/${seasonImageFile}`
}

export default getFullSeasonImage
