import { FC } from 'react'

import BlueLink from '@/components/BlueLink'
import SectionTitle from '@/components/containers/SectionTitle'
import { PokemonSpeciesVariety } from '@/types'
import formatName from '@/utils/formatName'

interface VarietiesProps {
  pokemonName: string
  varieties: Array<PokemonSpeciesVariety>
}

const PokemonVarieties: FC<VarietiesProps> = ({ pokemonName, varieties }) => {
  // Filter out gen 8+ forms
  const varietiesFiltered = varieties.filter((form) => {
    const {
      pokemon: { url: pokemonUrl },
    } = form
    const idNumber = pokemonUrl.match(/\/(\d+)\/$/)![1]
    return Number(idNumber) <= 10157
  })

  // Pokemon with no other forms have a variety length of just 1.
  if (varietiesFiltered.length <= 1) {
    return
  }

  // Construct a list of all the forms.
  const formsArray = varietiesFiltered.map((form, index) => {
    const {
      pokemon: { name: formName },
    } = form
    const localUrl = `/pokedex/${formName}/`
    return (
      <li key={index}>
        <BlueLink href={localUrl}>{formatName(formName)}</BlueLink>
      </li>
    )
  })

  return (
    <>
      <SectionTitle>{`${formatName(pokemonName)} has some other forms:`}</SectionTitle>
      <ul className="list-inside list-disc">{formsArray}</ul>
    </>
  )
}

export default PokemonVarieties
