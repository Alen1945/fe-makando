import React from 'react'
import {Redirect} from 'react-router-dom'
import Dashboard from './Dashboard'
import User from './User'
import Categories from './Categories'
const listPage = {
  dashboard: Dashboard,
  users: User,
  categories: Categories
}
export default function DashboardAdmin (props) {
  const showPage = props.match.params.page
  let Page = listPage.dashboard
  if (showPage) {
    if (listPage[showPage]) {
      Page = listPage[showPage]
    } else {
      return (<Redirect to='/404'/>)
    }
  }
  return (<Page />)
}
