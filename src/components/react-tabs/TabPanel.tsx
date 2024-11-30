import React from 'react'
import type { ReactTabsFunctionComponent, TabPanelProps } from 'react-tabs'
import { TabPanel as ReactTabPanel } from 'react-tabs'

export const TabPanel: ReactTabsFunctionComponent<TabPanelProps> = ({ children, ...props }) => (
  <ReactTabPanel {...props}>
    <div className="mt-4">{children}</div>
  </ReactTabPanel>
)

TabPanel.tabsRole = 'TabPanel'
