import React from 'react'

import ScreenSize from '../screen-size'
import Scroll from '../scroll'

export const Helpers = () => (
  <>
    <Scroll />
    {['development', 'preview'].includes(process.env.ENVIRONMENT) && <ScreenSize />}
  </>
)
