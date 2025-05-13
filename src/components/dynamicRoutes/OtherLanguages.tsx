import { FC } from 'react'

import languageNameMapping from '@/data/languageNameMapping'
import { Name } from '@/types'

import { Table, TableCell, TableHeader, TableRow } from '../ui/Table'
import { SectionTitle } from '../ui/Title'

const customOrder: Record<string, number> = {
  'English': 1,
  'Japanese': 2,
  'German': 3,
  'French': 4,
  'Italian': 5,
  'Spanish': 6,
  'Korean': 7,
  'Chinese (Simplified)': 8,
  'Chinese (Traditional)': 9,
}

interface LanguageProcessorProps {
  languageName: string
  name: string
}

// For expanding the language name and then re-ordering the objects in the array in a very specific order as mentioned above.
const processLanguages = (arr: Array<LanguageProcessorProps>) => {
  const validLanguages = Object.keys(languageNameMapping)
  const filteredLanguages = arr.filter(obj => validLanguages.includes(obj.languageName))
  const properLanguages = filteredLanguages.map(obj => {
    return { ...obj, languageName: languageNameMapping[obj.languageName] }
  })
  return properLanguages.sort((a, b) => customOrder[a.languageName] - customOrder[b.languageName])
}

interface OtherLanguageProps {
  names: Array<Name>
  hideTitle?: boolean
}

export const OtherLanguages: FC<OtherLanguageProps> = ({ names, hideTitle }) => {
  let languagesList = names.map(obj => {
    const {
      language: { name: languageName },
      name,
    } = obj
    return { languageName, name }
  })

  const languagesListNew = processLanguages(languagesList)

  const nameRows = languagesListNew.map((row, index) => {
    return (
      <TableRow key={row.languageName + index}>
        <TableHeader>{row.languageName}</TableHeader>
        <TableCell>{row.name}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      {!hideTitle && <SectionTitle>Other Languages</SectionTitle>}
      <Table>
        <tbody>{nameRows}</tbody>
      </Table>
    </>
  )
}
