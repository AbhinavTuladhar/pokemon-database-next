import { EvolutionDetail } from '@/types'
import formatName from './formatName'

const evolutionStringFinder = (evolutionDetails: Array<Partial<EvolutionDetail>> | undefined) => {
  const [evolutionStep] = evolutionDetails || []

  if (!evolutionStep) {
    return ''
  }

  // if (evolutionStep?.length === 0 || evolutionStep?.length > 1 || evolutionStep === undefined) {
  //   return
  // }

  const { trigger } = evolutionStep
  const triggerName = trigger?.name ?? ''

  switch (triggerName) {
    case 'level-up':
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

      // For use in various keys
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

      if (min_happiness && timeOfDay) {
        return `high happiness, ${formatName(timeOfDay)}time`
      } else if (heldItem && timeOfDay) {
        return `hold ${formatName(heldItem)} during ${formatName(timeOfDay)}time`
      } else if (min_level && timeOfDay) {
        return `level ${min_level}, ${formatName(timeOfDay)}time`
      } else if (heldItem && gender !== undefined) {
        return `use ${formatName(heldItem)}, ${genderName}`
      } else if (min_level && gender) {
        return `level ${min_level}, ${genderName}`
      } else if (knownMoveType && min_affection) {
        return `after ${formatName(knownMoveType)}-type move learned and ♥♥ affection`
      } else if (knownMove) {
        return `after ${formatName(knownMove)} learned`
      } else if (locationName) {
        switch (locationName) {
          case 'mt-coronet':
            return 'level up in magnetic field area'
          case 'eterna-forest':
            return 'level up near a mossy rock'
          case 'sinnoh-route-217':
            return 'level up near an icy rock'
          default:
            return 'Uncoded'
        }
      } else if (min_happiness !== undefined) {
        return 'high happiness'
      } else if (needs_overworld_rain) {
        return `level ${min_level}, rain`
      } else if (min_beauty) {
        return `level up with max beauty`
      } else if (relative_physical_stats !== undefined) {
        return `level ${min_level}, ${statMapping[String(relative_physical_stats)]}`
      } else if (partyPokemonType) {
        return `level ${min_level}, have ${formatName(partyPokemon)} type Pokémon in party`
      } else if (turn_upside_down) {
        return `level ${min_level}, turn device upside down`
      } else if (partyPokemon) {
        return `with ${formatName(partyPokemon)} in party`
      }
      return `level ${min_level}`

    case 'trade':
      const { held_item: held_item_nested, trade_species } = evolutionStep

      const heldItemTrade = held_item_nested?.name
      const tradeSpecies = trade_species?.name

      if (heldItemTrade) {
        return `trade holding ${formatName(heldItemTrade)}`
      } else if (tradeSpecies) {
        return `trade with ${formatName(tradeSpecies)}`
      }
      return 'trade'

    case 'use-item':
      const { item, gender: genderForItem = undefined } = evolutionStep
      const itemName = item?.name ?? ''
      const genderNameForItem = genderForItem === 2 ? 'Male' : 'Female'

      if (genderForItem) {
        return `use ${formatName(itemName)}, ${genderNameForItem}`
      }

      return `use ${formatName(itemName)}`

    case 'shed':
      return 'Level 20, empty spot in party, Pokéball in bag'

    default:
      return 'Some uncoded method'
  }
}

export default evolutionStringFinder
