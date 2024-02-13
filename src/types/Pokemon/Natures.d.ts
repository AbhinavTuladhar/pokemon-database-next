import { NamedApiResource } from "../utils/NamedResource";
import { TODO } from "../utils/TODO";
import { Stats } from "./Stats";

export interface Nature {
  id: number,
  name: string,
  decreased_stat: NamedApiResource<Stats>,
  increased_stat: NamedApiResource<Stats>,
  hates_flavor: NamedApiResource<TODO> // Berry flavour
  likes_flavor: NamedApiResource<TODO> // Berry flavour
  pokeathlon_stat_changes: Array<NatureStatChange>
  move_battle_style_preferences: Array<MoveBattleStylePreference>
  names: Array<name>
}

interface NatureStatChange {
  max_change: number,
  pokeathlon_stat: NamedApiResource<TODO> // Pokeathlon stat
}

interface MoveBattleStylePreference {
  low_hp_preference: number,
  high_hp_preference: number,
  move_battle_style: NamedApiResource<TODO> // Move battle style
}