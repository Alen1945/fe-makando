import React from 'react'
import DashboardNavRes from './componets/DashboardNavRes'

function DashboardRes (props) {
  const { children, isLogin } = props
  return (
    <>
      <DashboardNavRes isLogin={isLogin} />
      <div style={{ marginTop: 50 }}>
        {children}
      </div>
    </>
  )
}

export default DashboardRes
