import React from 'react'
import Topbar from './componets/Topbar'

function MainLayout (props) {
  const { children } = props
  return (
    <>
      <Topbar />
      {children}
    </>
  )
}

export default MainLayout
