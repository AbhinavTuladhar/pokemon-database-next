import { FC } from 'react'

import { PageTitle } from '../containers'
import BlueLink from '../link'

interface ContainerProps {
  pageUrl: string
}

const ErrorContainer: FC<ContainerProps> = ({ pageUrl }) => {
  return (
    <>
      <title> Error 404: Page not found | Pokémon Database </title>
      <div className="absolute inset-0 z-[999] grid h-dvh place-items-center bg-gray-800 ">
        <div className="w-11/12 rounded-md bg-black px-4 pb-8 text-white lg:w-1/2">
          <div className="text-center">
            <PageTitle> Page Not Found. </PageTitle>
          </div>
          <div className="space-x-1">
            <span> The requested page </span>
            <span className="bg-gray-600 px-1 font-serif"> {pageUrl} </span>
            <span> could not be found. Please check that you typed the url correctly. </span>
          </div>
          <div className="mt-4">
            <span>
              <span> Return to the </span>
              <BlueLink href="/"> Pokémon Database home page. </BlueLink>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorContainer
