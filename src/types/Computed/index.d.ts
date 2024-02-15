import TypeExtractor from '@/extractors/TypeExtractor'

type TransformedType = ReturnType<typeof TypeExtractor>

export type { TransformedType }
