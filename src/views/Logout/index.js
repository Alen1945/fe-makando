import React from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'js-cookie'

export default function Logout (props) {
  const { setIsLogin } = props
  cookie.remove('tokenm4k4nd0')
  setIsLogin(0)
  return (<Redirect to='/login' />)
}