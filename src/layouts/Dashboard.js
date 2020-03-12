import React from 'react'
import DashboardNav from './componets/DashboardNav'

function MainLayout (props) {
  const { children } = props
  return (
    <>
      <DashboardNav />
      <div style={{marginTop:50}}>
        {children}
      </div>
    </>
  )
}

export default MainLayout
