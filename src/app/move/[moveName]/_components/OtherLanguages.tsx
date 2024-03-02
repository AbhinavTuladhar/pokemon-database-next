import { FC } from 'react'
import SectionTitle from '@/components/containers/SectionTitle'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableCell from '@/components/containers/TableCell'
import languageNameMapping from '@/data/languageNameMapping'
import { Name } from '@/types'

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
  moveName: string
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
}

const OtherLanguages: FC<OtherLanguageProps> = ({ names }) => {
  let languagesList = names.map((obj) => {
    const {
      language: { name: languageName },
      name: moveName,
    } = obj
    return { languageName, moveName }
  })

  const languagesListNew = processLanuages(languagesList)

  const nameRows = languagesListNew.map((row, index) => {
    return (
      <TableRow key={index}>
        <TableCellHeader>{row.languageName}</TableCellHeader>
        <TableCell>{row.moveName}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Other Languages</SectionTitle>
      <TableContainer>{nameRows}</TableContainer>
    </>
  )
}

export default OtherLanguages
