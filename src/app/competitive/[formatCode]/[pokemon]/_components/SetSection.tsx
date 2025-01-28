import React, { FC } from 'react'

import HtmlRenderer from '@/components/html-renderer'
import { FlatPokemonSet } from '@/types'

import EvRow from './EvRow'
import { MoveList } from './MoveList'
import SetRow from './SetRow'

interface SectionProps extends FlatPokemonSet {
  description?: string
}

export const SetSection: FC<SectionProps> = ({
  moves,
  set,
  ability,
  description,
  evs,
  item,
  nature,
}) => {
  return (
    <div className="">
      <h4 className="my-2 text-2xl font-bold"> {set} </h4>
      <article className="my-4 grid items-center gap-4 rounded border border-gray-700 px-8 py-4 sm:grid-cols-2">
        <MoveList moves={moves} />
        <div className="flex flex-col">
          {ability ? <SetRow header="Ability" value={ability} /> : null}
          {item ? <SetRow header="Item" value={item} /> : null}
          {nature ? <SetRow header="Nature" value={nature} /> : null}
          {evs ? <EvRow evData={evs} /> : null}
        </div>
      </article>
      <HtmlRenderer html={description} />
    </div>
  )
}
