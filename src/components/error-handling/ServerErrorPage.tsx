import React from 'react'

import { ErrorContainerPage, PageTitle } from '../containers'
import { BlueLink } from '../ui/Link'

export const ServerErrorPage = () => (
  <ErrorContainerPage>
    <div className="py-10 text-center">
      <PageTitle> 500 Server Error </PageTitle>
      <div className="space-y-2">
        <span> Oops, something went wrong.</span>
        <div>
          <span> Go back </span>
          <BlueLink href="/"> to the home page.</BlueLink>
        </div>
      </div>
    </div>
  </ErrorContainerPage>
)
