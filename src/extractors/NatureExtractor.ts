import { Nature } from '@/types'

export const NatureExtractor = (nature: Nature) => {
  const { id, name, decreased_stat, hates_flavor, increased_stat, likes_flavor } = nature

  const decreasedStat = (decreased_stat?.name ?? 'None').replace('defense', 'defence')
  const hatesFlavour = hates_flavor?.name ?? 'None'
  const increasedStat = (increased_stat?.name ?? 'None').replace('defense', 'defence')
  const likesFlavour = likes_flavor?.name ?? 'None'

  return {
    decreasedStat,
    hatesFlavour,
    id,
    increasedStat,
    likesFlavour,
    name,
  }
}

export default NatureExtractor
