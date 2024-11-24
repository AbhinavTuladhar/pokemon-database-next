import { FC } from 'react'
import classNames from 'classnames'
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'

interface ArrowProps {
  state: 'asc' | 'desc' | false
}

const SortingArrows: FC<ArrowProps> = ({ state }) => (
  <div className="flex w-4 flex-col text-sm">
    <GoTriangleUp
      className={classNames('block duration-200', {
        'visible opacity-100': state === 'asc' || state === false,
        'invisible opacity-0': state !== 'asc' && state !== false,
      })}
    />
    <GoTriangleDown
      className={classNames('-mt-2 block duration-200', {
        'visible opacity-100': state === 'desc' || state === false,
        'invisible opacity-0': state !== 'desc' && state !== false,
      })}
    />
  </div>
)

export default SortingArrows
