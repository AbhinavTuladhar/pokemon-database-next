import { FC } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import languageNameMapping from '@/data/languageNameMapping'
import { Genus, Name } from '@/types'

const customOrder: Record<string, number> = {
  English: 1,
  Japanese: 2,
  German: 3,
  French: 4,
  Italian: 5,
  Spanish: 6,
  Korean: 7,
  'Chinese (Simplified)': 8,
  'Chinese (Traditional)': 9,
}

interface LanguageProcessorProps {
  languageName: string
  pokemonName?: string
  genusName?: string
}

// For expanding the language name and then re-ordering the objects in the array in a very specific order as mentioned above.
const processLanuages = (arr: Array<LanguageProcessorProps>) => {
  const validLanguages = Object.keys(languageNameMapping)
  const filteredLanguages = arr.filter((obj) => validLanguages.includes(obj.languageName))
  const properLanguages = filteredLanguages.map((obj) => {
    return { ...obj, languageName: languageNameMapping[obj.languageName] }
  })
  return properLanguages.sort((a, b) => customOrder[a.languageName] - customOrder[b.languageName])
}

interface OtherLanguageProps {
  names: Array<Name>
  genera: Array<Genus>
}

const OtherLanguages: FC<OtherLanguageProps> = ({ names, genera }) => {
  const languagesList = names.map((obj) => {
    const {
      language: { name: languageName },
      name: pokemonName,
    } = obj
    return { languageName, pokemonName }
  })

  const generaList = genera.map((obj) => {
    const {
      language: { name: languageName },
      genus: genusName,
    } = obj
    return { languageName, genusName }
  })

  const languagesListNew = processLanuages(languagesList)
  const generaListNew = processLanuages(generaList)

  const nameRows = languagesListNew.map((row, index) => {
    return (
      <TableRow key={index}>
        <TableCellHeader>{row.languageName}</TableCellHeader>
        <TableCell>{row.pokemonName}</TableCell>
      </TableRow>
    )
  })

  const genusRows = generaListNew.map((row, index) => {
    return (
      <TableRow key={index}>
        <TableCellHeader>{row.languageName}</TableCellHeader>
        <TableCell>{row.genusName}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Other Languages</SectionTitle>
      <div className="grid grid-cols-2-flexible gap-x-10 gap-y-16">
        <TableContainer>{nameRows}</TableContainer>

        <TableContainer>{genusRows}</TableContainer>
      </div>
    </>
  )
}

export default OtherLanguages
