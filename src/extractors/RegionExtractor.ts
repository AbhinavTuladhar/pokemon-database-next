import { Region } from '@/types'

const RegionExtractor = (regionalData: Region) => {
  const { name: regionName, locations } = regionalData
  return { regionName, locations }
}

export default RegionExtractor
