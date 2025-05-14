import { FC } from 'react'

import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { SectionTitle } from '@/components/ui/Title'
import gameToGenerationMap from '@/data/gameToGenerationMap'
import { versionNames } from '@/data/whiteLists'
import MachineService from '@/features/games/services/machine.service'
import type { MachineVersionDetail } from '@/types'
import { getResourceId } from '@/utils/urlUtils'

interface RecordProps {
  machineList: Array<MachineVersionDetail>
}

const getMachineInfo = async (ids: Array<number>) => {
  const responses = await MachineService.getByIds(ids)
  return responses
}

const getTmNumbers = (responses: Awaited<ReturnType<typeof getMachineInfo>>) => {
  return responses.map(response => {
    const {
      item: { name: TmNumber },
      version_group: { name: versionName },
      move: { name: moveName },
    } = response
    const formattedTM = TmNumber.slice(0, 2).toLocaleUpperCase() + TmNumber.slice(2)

    return {
      name: moveName,
      machine: formattedTM,
      versionName,
      generation: gameToGenerationMap[versionName],
    }
  })
}

interface GroupedMachines {
  machine: string
  generation: string
  versionName: string[]
}

const groupByGenerations = (responses: ReturnType<typeof getTmNumbers>) => {
  // const formattedData = responses.filter(
  //   machine =>
  //     machine.versionName !== 'colosseum' &&
  //     machine.versionName !== 'xd' &&
  //     !gameBlackLists.includes(machine.versionName),
  // )

  const formattedData = responses.filter(machine => versionNames.includes(machine.versionName))

  const transformedData = formattedData.reduce(
    (acc, item) => {
      const { machine, generation, versionName } = item
      if (acc[generation] !== undefined) {
        acc[generation].versionName.push(versionName)
      } else {
        acc[generation] = {
          machine,
          generation,
          versionName: [versionName],
        }
      }
      return acc
    },
    {} as Record<string, GroupedMachines>,
  )

  return transformedData ? Object.values(transformedData) : []
}

export const MachineRecord: FC<RecordProps> = async ({ machineList }) => {
  const machineIds = machineList.map(machine => {
    const {
      machine: { url },
    } = machine
    return +getResourceId(url)
  })

  const machineInfo = await getMachineInfo(machineIds)

  // Mapping to get the object keys to align with the component props.
  const finalMachineData = groupByGenerations(getTmNumbers(machineInfo)).map(machine => {
    const { machine: description, versionName: versionGroupNames } = machine
    return {
      description,
      versionGroupNames,
    }
  })

  return (
    <>
      {finalMachineData.length > 1 ? (
        <>
          <SectionTitle>Machine/Record</SectionTitle>
          <GameWiseDescriptions descriptionData={finalMachineData} />
        </>
      ) : null}
    </>
  )
}
