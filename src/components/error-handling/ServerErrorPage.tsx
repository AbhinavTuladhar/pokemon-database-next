import React from 'react'

import { ErrorContainerPage } from '../containers'
import { TransitionLink } from '../ui/Link'
import { PageTitle } from '../ui/Title'

export const ServerErrorPage = () => (
  <ErrorContainerPage>
    <div className="py-10 text-center">
      <PageTitle> 500 Server Error </PageTitle>
      <div className="space-y-2">
        <span> Oops, something went wrong.</span>
        <div>
          <span> Go back </span>
          <TransitionLink href="/"> to the home page.</TransitionLink>
        </div>
      </div>
    </div>
  </ErrorContainerPage>
)
