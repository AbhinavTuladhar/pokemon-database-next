import { FC } from 'react'
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai'

interface ProsAndConsProps {
  title: string
  doubeDamageList: React.JSX.Element[]
  halfDamageList: React.JSX.Element[]
  noDamageList: React.JSX.Element[]
  doubleDamageMessage: string
  halfDamageMessage: string
  noDamageMessage: string
}

export const ProsAndConsInfo: FC<ProsAndConsProps> = ({
  doubeDamageList,
  doubleDamageMessage,
  halfDamageList,
  halfDamageMessage,
  noDamageList,
  noDamageMessage,
  title,
}) => (
  <div className="flex flex-col flex-wrap">
    <div className="text-4xl font-bold">
      <span> {title} </span>
      <span className="text-gray-500 italic dark:text-gray-300"> pros & cons </span>
    </div>
    {doubeDamageList?.length > 0 && (
      <>
        <div className="my-2 flex flex-row items-start gap-2 py-2">
          <AiFillCheckCircle className="text-green-400" />
          <span className="-mt-1">{doubleDamageMessage}</span>
        </div>
        <div className="ml-5 flex flex-row flex-wrap gap-2">{doubeDamageList}</div>
      </>
    )}

    <div className="my-2 flex flex-row items-start gap-2 py-2">
      <AiFillCloseCircle className="text-red-400" />
      <span className="-mt-1"> {halfDamageMessage}</span>
    </div>
    <div className="ml-5 flex flex-row flex-wrap gap-2">{halfDamageList}</div>

    {noDamageList?.length > 0 && (
      <>
        <div className="my-2 flex flex-row items-start gap-2 py-2">
          <AiFillCloseCircle className="text-red-400" />
          <span className="-mt-1"> {noDamageMessage} </span>
        </div>
        <div className="ml-5 flex flex-row flex-wrap gap-2">{noDamageList}</div>
      </>
    )}
  </div>
)
