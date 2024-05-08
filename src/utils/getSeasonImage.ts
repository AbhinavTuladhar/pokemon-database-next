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

const getFullSeasonImage = (time: string) => {
  const seasonImageFile = getSeasonImage(time)
  return `/seasons/${seasonImageFile}`
}

export default getFullSeasonImage
