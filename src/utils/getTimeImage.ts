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

const getFullTimeImage = (time: string) => {
  const timeImageFile = getTimeImage(time)
  return `/time-of-day/${timeImageFile}`
}

export default getFullTimeImage
