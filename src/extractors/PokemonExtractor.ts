import { Pokemon } from '@/types'

const PokemonExtractor = (data: Pokemon) => {
  const {
    abilities,
    base_experience,
    forms,
    game_indices,
    height,
    id,
    moves,
    name,
    order,
    species: { url: speciesLink },
    sprites: {
      other: {
        'official-artwork': { front_default, front_shiny },
        home: { front_default: homeSprite },
        showdown: { front_default: animatedSprite, front_shiny: animatedShinySprite },
      },
      versions: {
        'generation-i': {
          yellow: { front_default: firstGenDefaultSprite },
        },
        'generation-ii': {
          crystal: { front_default: secondGenDefaultSprite, front_shiny: secondGenShinySprite },
        },
        'generation-iii': {
          emerald: { front_default: thirdGenDefaultSprite, front_shiny: thirdGenShinySprite },
        },
        'generation-iv': {
          platinum: { front_default: fourthGenDefaultSprite, front_shiny: fourthGenShinySprite },
        },
        'generation-v': {
          'black-white': { front_default: fifthGenDefaultSprite, front_shiny: fifthGenShinySprite },
        },
        'generation-vi': {
          'omegaruby-alphasapphire': {
            front_default: sixthGenDefaultSprite,
            front_shiny: sixthGenShinySprite,
          },
        },
        'generation-vii': {
          'ultra-sun-ultra-moon': { front_default: gameSprite, front_shiny: sevenGenthShinySprite },
        },
        'generation-viii': {
          icons: { front_default: icon },
        },
      },
    },
    stats,
    types,
    weight,
  } = data

  const spriteCollection = [
    { generation: 'Generation 1', frontSprite: firstGenDefaultSprite, shinySprite: null },
    {
      generation: 'Generation 2',
      frontSprite: secondGenDefaultSprite,
      shinySprite: secondGenShinySprite,
    },
    {
      generation: 'Generation 3',
      frontSprite: thirdGenDefaultSprite,
      shinySprite: thirdGenShinySprite,
    },
    {
      generation: 'Generation 4',
      frontSprite: fourthGenDefaultSprite,
      shinySprite: fourthGenShinySprite,
    },
    {
      generation: 'Generation 5',
      frontSprite: fifthGenDefaultSprite,
      shinySprite: fifthGenShinySprite,
    },
    {
      generation: 'Generation 6',
      frontSprite: sixthGenDefaultSprite,
      shinySprite: sixthGenShinySprite,
    },
    { generation: 'Generation 7', frontSprite: gameSprite, shinySprite: sevenGenthShinySprite },
    { generation: 'Icon', frontSprite: icon, shinySprite: null },
    { generation: 'Animated', frontSprite: animatedSprite, shinySprite: animatedShinySprite },
  ]

  const nationalNumber = parseInt(speciesLink.match(/\/(\d+)\/$/)![1])
  return {
    abilities,
    base_experience,
    forms,
    game_indices,
    height,
    homeSprite,
    id,
    moves,
    name,
    nationalNumber,
    order,
    speciesLink,
    front_default,
    front_shiny,
    gameSprite,
    icon,
    spriteCollection,
    stats,
    types,
    weight,
  }
}

export default PokemonExtractor
