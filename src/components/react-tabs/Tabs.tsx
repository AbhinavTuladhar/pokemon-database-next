import React from 'react'
import { Tabs as ReactTabs } from 'react-tabs'
import { ReactTabsFunctionComponent, TabsProps } from 'react-tabs'

export const Tabs: ReactTabsFunctionComponent<TabsProps> = ({ children, ...props }) => (
  <ReactTabs {...props}>{children}</ReactTabs>
)

Tabs.tabsRole = 'Tabs'
