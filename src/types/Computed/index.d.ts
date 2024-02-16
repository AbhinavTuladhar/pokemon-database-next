import TypeExtractor from '@/extractors/TypeExtractor'

type TransformedType = ReturnType<typeof TypeExtractor>

interface StatTable {
  name: string
  value: number
  width: string
  colour: string
}

export type { TransformedType, StatTable }
