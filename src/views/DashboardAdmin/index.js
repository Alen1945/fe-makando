import React from 'react'
import Dashboard from './Dashboard'

export default function DashboardAdmin (props) {
  const Page = () => {
    const showPage = props.match.params.page
    if (!showPage) {
      return (<Dashboard {...props}/>)
    } else {
      return (<h1>hello</h1>)
    }
  }
  return (<Page />)
}
