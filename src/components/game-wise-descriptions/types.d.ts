export interface RowProps {
  description: string
  generation: string
  versionGroupNames: Array<string>
}

export interface DescriptionProps {
  descriptionData: Array<RowProps>
}
