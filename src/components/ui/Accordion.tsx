import { createContext, FC, PropsWithChildren, useContext, useState } from 'react'
import classNames from 'classnames'
import { RxCaretDown } from 'react-icons/rx'

interface AccordionContextValue {
  isOpen: boolean
  toggle: () => void
}

const AccordionContext = createContext<AccordionContextValue | null>(null)

const useAccordion = () => {
  const context = useContext(AccordionContext)

  if (!context) {
    throw new Error('useAccordion must be used within an AccordionProvider')
  }

  return context
}

export const Accordion: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => {
    setIsOpen(prev => (prev === true ? false : true))
  }

  return (
    <AccordionContext.Provider value={{ isOpen, toggle }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  )
}

export const AccordionTrigger: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, toggle } = useAccordion()

  return (
    <button
      className="mt-4 flex w-full cursor-pointer items-center gap-x-2 border-b border-b-gray-500 px-2 py-4"
      onClick={toggle}
      aria-expanded={isOpen}
    >
      <div className="flex-1 text-left">{children}</div>
      <RxCaretDown className={classNames('size-6 duration-300', { 'rotate-180': isOpen })} />
    </button>
  )
}
export const AccordionContent: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen } = useAccordion()

  return (
    <div
      className={classNames(
        'grid transition-all duration-500 ease-in-out',
        { 'visible grid-rows-[1fr] opacity-100': isOpen },
        { 'invisible grid-rows-[0fr] opacity-0': !isOpen },
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}
