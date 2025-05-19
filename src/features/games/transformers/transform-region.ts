import { Region } from '@/types'

export const transformRegion = (regionalData: Region) => {
  const { name: regionName, locations } = regionalData
  return { regionName, locations }
}

export default transformRegion
