import React, { FC } from 'react'

import { TypeCard } from '@/components/cards'
import BlueLink from '@/components/link'
import { TransformedPokemon } from '@/types'
import formatName from '@/utils/formatName'

interface AbilityAndTypeProps {
  abilities: TransformedPokemon['abilities']
  types: TransformedPokemon['types']
}

export const AbilityAndType: FC<AbilityAndTypeProps> = ({ abilities, types }) => {
  const abilityNames = abilities.map(ability => ability.ability.name)
  const typeNames = types.map(type => type.type.name)

  return (
    <table>
      <tbody>
        <tr>
          <th> Types: </th>
          <td>
            <div className="flex gap-x-2">
              {typeNames.map(type => (
                <TypeCard key={type} typeName={type} />
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <th> Abilities: </th>
          <td>
            <ul className="">
              {abilityNames.map(ability => (
                <li key={ability}>
                  <BlueLink href={`/ability/${ability}`}>{formatName(ability)}</BlueLink>
                </li>
              ))}
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
