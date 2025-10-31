'use client'

import { FC, MouseEvent, ReactNode, useEffect } from 'react'
import Link, { LinkProps } from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import classNames from 'classnames'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

const DELAY = 300

interface BlueLinkProps extends LinkProps {
  className?: string
  children?: ReactNode
  boldFlag?: boolean
  nonTextFlag?: boolean
}

/**
 * A custom component which add a smooth transition between pages. Initially next-view-transitions
 * library was used, but caused issues with the top loading bar.
 * @param className - additional classnames
 * @param children - children of the component
 * @param nonTextFlag - enabled if the children are not just text elements.
 * @param boldFlag - for making the text bold.
 */
export const TransitionLink: FC<BlueLinkProps> = ({
  children,
  className = '',
  nonTextFlag = false,
  boldFlag = false,
  ...props
}) => {
  const router = useRouter()
  const pathname = usePathname()

  // For checking if the link is an internal page link. If so, then skip the page transition logic.
  const { href } = props
  const isIdLink = href.toString().startsWith('#')

  const handleTransition = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (isIdLink) return

    event.preventDefault()
    const mainPageLayout = document.querySelector('.main-layout')

    if (!mainPageLayout) {
      return
    }

    // Scroll to top of page when link is clicked
    window.scroll(0, 0)

    mainPageLayout.classList.add('page-transition')
    await sleep(DELAY)
    router.push(props.href as string)
  }

  // Remove page transition class on page change
  useEffect(() => {
    const mainPageLayout = document.querySelector('.main-layout')

    if (mainPageLayout) {
      mainPageLayout.classList.remove('page-transition')
    }
  }, [pathname])

  return (
    <Link
      {...props}
      className={classNames(className, {
        'font-bold': boldFlag,
        'fancy-link': !nonTextFlag,
      })}
      onClick={handleTransition}
      scroll={isIdLink}
    >
      {children}
    </Link>
  )
}
