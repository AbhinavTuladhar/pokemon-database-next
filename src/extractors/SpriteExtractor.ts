import { Pokemon } from '@/types'

const SpriteExtractor = (data: Pokemon) => {
  const {
    sprites: { other, versions },
  } = data

  // Getting the 'other' sprites
  const { dream_world, home, showdown } = other
  const officialArtwork = other['official-artwork']

  // Dream world sprites
  const { front_default: dreamWorldFrontDefault } = dream_world

  // Home spritess
  const {
    front_default: homeFrontDefault,
    // // front_female: homeFrontFemale,
    front_shiny: homeFrontShiny,
    // // front_shiny_female: homeFrontShinyFemale,
  } = home

  // Official sprites
  const { front_default: officialArtworkFrontDefault, front_shiny: officialArtworkFrontShiny } =
    officialArtwork

  // Animated showdown sprites
  const {
    front_default: showdownFrontDefault,
    // // front_female: showdownFrontFemale,
    front_shiny: showdownFrontShiny,
    // // front_shiny_female: showdownFrontShinyFemale,
    back_default: showdownBackDefault,
    // // back_female: showdownBackFemale,
    back_shiny: showdownBackShiny,
    // // back_shiny_female: showdownBackShinyFemale,
  } = showdown

  const dreamWorldSprites = {
    dreamWorldFrontDefault,
    // dreamWorldFrontFemale,
  }

  const homeSprites = {
    homeFrontDefault,
    // homeFrontFemale,
    homeFrontShiny,
    // homeFrontShinyFemale,
  }

  const officialArtworkSprites = {
    officialArtworkFrontDefault,
    officialArtworkFrontShiny,
  }

  const showdownSprites = {
    showdownFrontDefault,
    // showdownFrontFemale,
    showdownFrontShiny,
    // showdownFrontShinyFemale,
    showdownBackDefault,
    // showdownBackFemale,
    showdownBackShiny,
    // showdownBackShinyFemale,
  }

  /**
   * VERSION SPRITES START
   */
  const {
    'generation-i': generation1,
    'generation-ii': generation2,
    'generation-iii': generation3,
    'generation-iv': generation4,
    'generation-v': generation5,
    'generation-vi': generation6,
    'generation-vii': generation7,
  } = versions

  /**
   * GENERATION 1 START
   */
  const { 'red-blue': redBlue, yellow } = generation1

  const {
    back_default: redBlueBackDefault,
    back_gray: redBlueBackGray,
    // back_transparent: redBlueBackTransparent,
    front_default: redBlueFrontDefault,
    front_gray: redBlueFrontGray,
    // front_transparent: redBlueFrontTransparent,
  } = redBlue

  const {
    back_default: yellowBackDefault,
    back_gray: yellowBackGray,
    // back_transparent: yellowBackTransparent,
    front_default: yellowFrontDefault,
    front_gray: yellowFrontGray,
    // front_transparent: yellowFrontTransparent,
  } = yellow

  const redBlueSprites = {
    redBlueFrontDefault,
    redBlueFrontGray,
    redBlueBackDefault,
    redBlueBackGray,
    // redBlueBackTransparent,
    // redBlueFrontTransparent,
  }

  const yellowSprites = {
    yellowFrontDefault,
    yellowFrontGray,
    yellowBackDefault,
    yellowBackGray,
    // yellowBackTransparent,
    // yellowFrontTransparent,
  }

  const generation1Sprites = {
    yellowSprites,
    redBlueSprites,
  }

  /**
   * GENERATION 2 SPRITES
   */
  const { crystal, gold, silver } = generation2

  const crystalSprites = {
    frontDefaultCrystal: crystal.front_default,
    frontShinyCrystal: crystal.front_shiny,
    backDefaultCrystal: crystal.back_default,
    backShinyCrystal: crystal.back_shiny,
    // frontTransparentCrystal: crystal.front_transparent,
    // frontShinyTransparentCrystal: crystal.front_shiny_transparent,
    // backTransparentCrystal: crystal.back_transparent,
    // backShinyTransparent: crystal.back_shiny_transparent,
  }

  const goldSprites = {
    frontDefaultGold: gold.front_default,
    frontShinyGold: gold.front_shiny,
    backDefaultGold: gold.back_default,
    backShinyGold: gold.back_shiny,
    // frontTransparentGold: gold.front_transparent,
  }

  const silverSprites = {
    frontDefaultSilver: silver.front_default,
    frontShinySilver: silver.front_shiny,
    backDefaultSilver: silver.back_default,
    backShinySilver: silver.back_shiny,
    // frontTransparentSilver: silver.front_transparent,
  }

  const generation2Sprites = {
    crystalSprites,
    goldSprites,
    silverSprites,
  }

  /**
   * GENERATION 3 START
   */
  const {
    emerald,
    'ruby-sapphire': rubySapphire,
    'firered-leafgreen': fireredLeafgreen,
  } = generation3

  const emeraldSprites = {
    frontDefaultEmerald: emerald.front_default,
    frontShinyEmerald: emerald.front_shiny,
    backDefaultEmerald: rubySapphire.back_default,
    backShinyEmerald: rubySapphire.back_shiny,
  }

  const rubySapphireSprites = {
    frontDefaultRubySapphire: rubySapphire.front_default,
    frontShinyRubySapphire: rubySapphire.front_shiny,
    backDefaultRubySapphire: rubySapphire.back_default,
    backShinyRubySapphire: rubySapphire.back_shiny,
  }

  const fireredLeafgreenSprites = {
    frontDefaultFireredLeafgreen: fireredLeafgreen.front_default,
    frontShinyFireredLeafgreen: fireredLeafgreen.front_shiny,
    backDefaultFireredLeafgreen: fireredLeafgreen.back_default,
    backShinyFireredLeafgreen: fireredLeafgreen.back_shiny,
  }

  const generation3Sprites = {
    emeraldSprites,
    rubySapphireSprites,
    fireredLeafgreenSprites,
  }

  /**
   * GENERATION 4 START
   */
  const {
    'diamond-pearl': diamondPearl,
    'heartgold-soulsilver': heartgoldSoulsilver,
    platinum,
  } = generation4

  const diamondPearlSprites = {
    frontDefaultDiamondPearl: diamondPearl.front_default,
    frontShinyDiamondPearl: diamondPearl.front_shiny,
    backDefaultDiamondPearl: diamondPearl.back_default,
    backShinyDiamondPearl: diamondPearl.back_shiny,
    // // backFemaleDiamondPearl: diamondPearl.back_female,
    // // backShinyFemaleDiamondPearl: diamondPearl.back_shiny_female,
    // // frontFemaleDiamondPearl: diamondPearl.front_female,
    // // frontShinyFemaleDiamondPearl: diamondPearl.front_shiny_female,
  }

  const heartgoldSoulsilverSprites = {
    frontDefaultHeartgoldSoulsilver: heartgoldSoulsilver.front_default,
    frontShinyHeartgoldSoulsilver: heartgoldSoulsilver.front_shiny,
    backDefaultHeartgoldSoulsilver: heartgoldSoulsilver.back_default,
    backShinyHeartgoldSoulsilver: heartgoldSoulsilver.back_shiny,
    // // backFemaleHeartgoldSoulsilver: heartgoldSoulsilver.back_female,
    // // backShinyFemaleHeartgoldSoulsilver: heartgoldSoulsilver.back_shiny_female,
    // // frontFemaleHeartgoldSoulsilver: heartgoldSoulsilver.front_female,
    // // frontShinyFemaleHeartgoldSoulsilver: heartgoldSoulsilver.front_shiny_female,
  }

  const platinumSprites = {
    frontDefaultPlatinum: platinum.front_default,
    frontShinyPlatinum: platinum.front_shiny,
    backDefaultPlatinum: platinum.back_default,
    backShinyPlatinum: platinum.back_shiny,
    // // backFemalePlatinum: platinum.back_female,
    // // backShinyFemalePlatinum: platinum.back_shiny_female,
    // // frontFemalePlatinum: platinum.front_female,
    // // frontShinyFemalePlatinum: platinum.front_shiny_female,
  }

  const generation4Sprites = {
    heartgoldSoulsilverSprites,
    platinumSprites,
    diamondPearlSprites,
  }

  /**
   * GENERATION 5 START
   */

  const { 'black-white': blackWhite } = generation5

  const blackWhiteSprites = {
    frontDefault: blackWhite.front_default,
    frontShiny: blackWhite.front_shiny,
    backDefault: blackWhite.back_default,
    backShiny: blackWhite.back_shiny,
    // // animatedBackFemale: blackWhite.animated.back_female,
    // // animatedBackShinyFemale: blackWhite.animated.back_shiny_female,
    // // animatedFrontFemale: blackWhite.animated.front_female,
    // // animatedFrontShinyFemale: blackWhite.animated.front_shiny_female,
    // // backFemale: blackWhite.back_female,
    // // backShinyFemale: blackWhite.back_shiny_female,
    // // frontFemale: blackWhite.front_female,
    // // frontShinyFemale: blackWhite.front_shiny_female,
  }

  const blackWhiteAnimatedSprites = {
    animatedFrontDefault: blackWhite.animated.front_default,
    animatedFrontShiny: blackWhite.animated.front_shiny,
    animatedBackDefault: blackWhite.animated.back_default,
    animatedBackShiny: blackWhite.animated.back_shiny,
  }

  const generation5Sprites = {
    blackWhiteSprites,
    blackWhiteAnimatedSprites,
  }

  /**
   * GENERATION 6 START
   */
  const { 'x-y': XY, 'omegaruby-alphasapphire': ORAS } = generation6

  const ORAS_Sprites = {
    frontDefaultORAS: ORAS.front_default,
    frontShinyORAS: ORAS.front_shiny,
    // // frontFemaleORAS: ORAS.front_female,
    // // frontShinyFemaleORAS: ORAS.front_shiny_female,
  }

  const XY_Sprites = {
    frontDefaultXY: XY.front_default,
    frontShinyXY: XY.front_shiny,
    // // frontFemaleXY: XY.front_female,
    // // frontShinyFemaleXY: XY.front_shiny_female,
  }

  const generation6Sprites = {
    ORASSprites: ORAS_Sprites,
    XYSprites: XY_Sprites,
  }

  const { 'ultra-sun-ultra-moon': sunMoon, icons } = generation7

  const generation7Sprites = {
    sunMoonSprites: {
      frontDefaultIcons: icons.front_default,
      frontDefaultSunMoon: sunMoon.front_default,
      frontShinySunMoon: sunMoon.front_shiny,
      // // frontFemaleSunMoon: sunMoon.front_female,
      // // frontShinyFemaleSunMoon: sunMoon.front_shiny_female,
    },
  }

  const otherSprites = {
    dreamWorldSprites,
    homeSprites,
    officialArtworkSprites,
    showdownSprites,
  }

  return {
    otherSprites,
    generation1Sprites,
    generation2Sprites,
    generation3Sprites,
    generation4Sprites,
    generation5Sprites,
    generation6Sprites,
    generation7Sprites,
  }
}

export default SpriteExtractor
