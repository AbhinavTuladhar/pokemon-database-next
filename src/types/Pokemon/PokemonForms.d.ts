import { NamedApiResource } from "../utils/NamedResource";
import { Pokemon } from "./Pokemon";
import { TODO } from "../utils/TODO";
import { Name } from "../utils/Common";

export interface PokemonForm {
  id: number,
  name: string,
  order: number,
  form_order: number,
  is_default: boolean,
  is_battle_only: boolean,
  is_mega: boolean,
  form_name: string,
  pokemon: NamedApiResource<Pokemon>,
  types: Array<TODO>,
  sprites: TODO,
  version_group: NamedApiResource<TODO>,
  names: Array<Name>,
  form_names: Array<Name>
}