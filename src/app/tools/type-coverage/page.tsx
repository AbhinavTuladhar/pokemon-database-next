import { PageTitle } from '@/components/ui/Title'
import { typeList } from '@/features/pokemon/data/type.data'
import TypesService from '@/features/pokemon/services/types.service'
import { transformType } from '@/features/pokemon/transformers/transform-type'

import MainPage from './_components'

const getAllTypeData = async () => {
  const typeData = await TypesService.getByNames(typeList)

  const transformedTypeData = typeData.map(type => {
    const extractedInfo = transformType(type)
    const { name: typeName, doubleDamageTo, halfDamageTo, noDamageTo } = extractedInfo
    const attackingTypeInfo = {
      doubleDamageTo,
      halfDamageTo,
      noDamageTo,
    }
    return { typeName, attackingTypeInfo }
  })

  return transformedTypeData
}

const Page = async () => {
  const data = await getAllTypeData()

  return (
    <div>
      <PageTitle> Type Coverage Calculator </PageTitle>
      <MainPage data={data} />
    </div>
  )
}

export default Page
