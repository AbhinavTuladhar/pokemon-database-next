import { EvolutionDetail } from '@/types'

import formatName from './formatName'

const evolutionStringFinder = (evolutionDetails: Array<Partial<EvolutionDetail>> | undefined) => {
  const [evolutionStep] = evolutionDetails || []

  if (!evolutionStep) {
    return ''
  }

  const { trigger } = evolutionStep
  const triggerName = trigger?.name ?? ''

  switch (triggerName) {
    case 'level-up':
      return getLevelUpEvolutionString(evolutionStep)

    case 'trade':
      return getTradeEvolutionString(evolutionStep)

    case 'use-item':
      return getUseItemEvolutionString(evolutionStep)

    case 'shed':
      return 'Level 20, empty spot in party, Pokéball in bag'

    default:
      return 'Some uncoded method'
  }
}

const getLevelUpEvolutionString = (evolutionStep: Partial<EvolutionDetail>) => {
  const {
    min_level,
    min_happiness,
    min_beauty,
    known_move,
    known_move_type,
    min_affection,
    location,
    time_of_day: timeOfDay,
    held_item,
    gender,
    needs_overworld_rain,
    relative_physical_stats,
    party_type,
    turn_upside_down,
    party_species,
  } = evolutionStep

  const genderName = gender === 2 ? 'Male' : 'Female'
  const statMapping: Record<string, string> = {
    '-1': 'Attack < Defence',
    '0': 'Attack = Defence',
    '1': 'Attack > Defence',
  }

  const knownMove = known_move?.name
  const knownMoveType = known_move_type?.name
  const locationName = location?.name
  const heldItem = held_item?.name
  const partyPokemonType = party_type?.name
  const partyPokemon = party_species?.name ?? ''

  const getHappinessString = () =>
    min_happiness && timeOfDay ? `high happiness, ${formatName(timeOfDay)}time` : null

  const getHeldItemString = () =>
    heldItem && timeOfDay
      ? `hold ${formatName(heldItem)} during ${formatName(timeOfDay)}time`
      : null

  const getLevelTimeString = () =>
    min_level && timeOfDay ? `level ${min_level}, ${formatName(timeOfDay)}time` : null

  const getHeldItemGenderString = () =>
    heldItem && gender !== undefined ? `use ${formatName(heldItem)}, ${genderName}` : null

  const getLevelGenderString = () =>
    min_level && gender !== undefined ? `level ${min_level}, ${genderName}` : null

  const getKnownMoveTypeAffectionString = () =>
    knownMoveType && min_affection
      ? `after ${formatName(knownMoveType)}-type move learned and ♥♥ affection`
      : null

  const getKnownMoveString = () => (knownMove ? `after ${formatName(knownMove)} learned` : null)

  const getLocationString = () => {
    switch (locationName) {
      case 'mt-coronet':
        return 'level up in magnetic field area'
      case 'eterna-forest':
        return 'level up near a mossy rock'
      case 'sinnoh-route-217':
        return 'level up near an icy rock'
      default:
        return null
    }
  }

  const getOtherConditionsString = () => {
    if (min_happiness !== undefined) return 'high happiness'
    if (needs_overworld_rain) return `level ${min_level}, rain`
    if (min_beauty) return 'level up with max beauty'
    if (relative_physical_stats !== undefined) {
      return `level ${min_level}, ${statMapping[String(relative_physical_stats)]}`
    }
    if (partyPokemonType) {
      return `level ${min_level}, have ${formatName(partyPokemon)} type Pokémon in party`
    }
    if (turn_upside_down) return `level ${min_level}, turn device upside down`
    if (partyPokemon) return `with ${formatName(partyPokemon)} in party`
    return null
  }

  // Call helper functions in order of priority
  return (
    getHappinessString() ??
    getHeldItemString() ??
    getLevelTimeString() ??
    getHeldItemGenderString() ??
    getLevelGenderString() ??
    getKnownMoveTypeAffectionString() ??
    getKnownMoveString() ??
    getLocationString() ??
    getOtherConditionsString() ??
    `level ${min_level}`
  )
}

const getTradeEvolutionString = (evolutionStep: Partial<EvolutionDetail>) => {
  const { held_item: held_item_nested, trade_species } = evolutionStep

  const heldItemTrade = held_item_nested?.name
  const tradeSpecies = trade_species?.name

  if (heldItemTrade) {
    return `trade holding ${formatName(heldItemTrade)}`
  } else if (tradeSpecies) {
    return `trade with ${formatName(tradeSpecies)}`
  }
  return 'trade'
}

const getUseItemEvolutionString = (evolutionStep: Partial<EvolutionDetail>) => {
  const { item, gender: genderForItem = undefined } = evolutionStep
  const itemName = item?.name ?? ''
  const genderNameForItem = genderForItem === 2 ? 'Male' : 'Female'

  if (genderForItem) {
    return `use ${formatName(itemName)}, ${genderNameForItem}`
  }

  return `use ${formatName(itemName)}`
}

export default evolutionStringFinder
