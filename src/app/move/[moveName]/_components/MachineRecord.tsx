import { FC } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import { gameBlackLists } from '@/data/blacklists'
import gameNameMap from '@/data/gameNameMap'
import gameToGenerationMap from '@/data/gameToGenerationMap'
import { MachineApi } from '@/services/MachineApi'
import type { MachineVersionDetail } from '@/types'
import { getResourceId } from '@/utils/urlUtils'

interface RecordProps {
  machineList: Array<MachineVersionDetail>
}

const getMachineInfo = async (ids: Array<number>) => {
  const responses = await MachineApi.getByIds(ids)
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
  const formattedData = responses.filter(
    machine =>
      machine.versionName !== 'colosseum' &&
      machine.versionName !== 'xd' &&
      !gameBlackLists.includes(machine.versionName),
  )
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

const MachineRecord: FC<RecordProps> = async ({ machineList }) => {
  const machineIds = machineList.map(machine => {
    const {
      machine: { url },
    } = machine
    return +getResourceId(url)
  })

  const machineInfo = await getMachineInfo(machineIds)

  const finalMachineData = groupByGenerations(getTmNumbers(machineInfo))

  const tableRows = finalMachineData.map((machine, rowIndex) => {
    const { machine: machineName, versionName } = machine
    return (
      <TableRow key={rowIndex}>
        <TableCellHeader wrapFlag={true}>
          <ul>
            {versionName.map((version, index) => (
              <li key={index}>{gameNameMap[version]}</li>
            ))}
          </ul>
        </TableCellHeader>
        <TableCell>{machineName}</TableCell>
      </TableRow>
    )
  })

  return (
    <>
      <SectionTitle>Machine/Record</SectionTitle>
      <TableContainer>
        <tbody>{tableRows}</tbody>
      </TableContainer>
    </>
  )
}

export default MachineRecord
