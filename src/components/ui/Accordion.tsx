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

interface AccordionTriggerProps extends PropsWithChildren {}
interface AccordionContentProps extends PropsWithChildren {}
interface AccordionProps extends PropsWithChildren {}
type AccordionComponent = FC<AccordionProps> & {
  Trigger: FC<AccordionTriggerProps>
  Content: FC<AccordionContentProps>
}

const Accordion: AccordionComponent = ({ children }) => {
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

const AccordionTrigger: FC<AccordionTriggerProps> = ({ children }) => {
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
const AccordionContent: FC<AccordionContentProps> = ({ children }) => {
  const { isOpen } = useAccordion()

  return (
    <div
      className={classNames(
        'grid transition-[grid-template-rows] duration-500 ease-in-out',
        { 'grid-rows-[1fr]': isOpen },
        { 'grid-rows-[0fr]': !isOpen },
      )}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  )
}

Accordion.Trigger = AccordionTrigger
Accordion.Content = AccordionContent

export default Accordion
