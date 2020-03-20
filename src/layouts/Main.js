import React from 'react'
import Topbar from './componets/Topbar'

function MainLayout (props) {
  const { children } = props
  return (
    <>
      <Topbar isHome={props.isHome}/>
      {children}
    </>
  )
}

export default MainLayout
