import React, { FC, ReactNode } from 'react'

import { TransitionLink } from '@/components/ui/Link'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import { TransformedPokemon } from '@/types'
import { formatName } from '@/utils/string.utils'

const TypeList: FC<{ types: Array<string> }> = ({ types }) => (
  <div>
    <div className="flex gap-x-2">
      {types.map(type => (
        <TypeCard key={type} typeName={type} />
      ))}
    </div>
  </div>
)

const AbilityList: FC<{ abilities: Array<string> }> = ({ abilities }) => (
  <ul>
    {abilities.map(ability => (
      <li key={ability}>
        <TransitionLink href={`/ability/${ability}`}>{formatName(ability)}</TransitionLink>
      </li>
    ))}
  </ul>
)

const TableRow: FC<{ header: string; content: ReactNode }> = ({ header, content }) => (
  <tr>
    <th className="w-[1%] text-right font-normal text-nowrap"> {header}: </th>
    <td className="pl-4">{content}</td>
  </tr>
)

interface AbilityAndTypeProps {
  abilities: TransformedPokemon['abilities']
  types: TransformedPokemon['types']
  generation: number
}

export const AbilityAndType: FC<AbilityAndTypeProps> = ({ abilities, types, generation }) => {
  const abilityNames = abilities.map(ability => ability.ability.name)
  const typeNames = types.map(type => type.type.name)

  // Abilities don't exist in generation 1 and 2

  return (
    <table>
      <tbody>
        <TableRow header="Type" content={<TypeList types={typeNames} />} />
        {generation > 2 ? (
          <TableRow header="Ability" content={<AbilityList abilities={abilityNames} />} />
        ) : null}
      </tbody>
    </table>
  )
}
